import { pool } from "../utils/db.js";

export const getAll = async (req, res) => {
  try {
    let keywords = req.query.keywords || "";
    keywords = "\\m" + keywords;

    const results = await pool.query(
      `
        SELECT courses.course_id, courses.course_name, courses.summary, courses.cover_image_directory, courses.learning_time, count(lessons.lesson_id) as lessons_count
        FROM lessons
        INNER JOIN courses
        ON courses.course_id = lessons.course_id
        WHERE courses.course_name ~* $1
        GROUP BY courses.course_id
        ORDER BY courses.course_id asc
      `,
      [keywords]
    );

    return res.json({
      data: results.rows,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.query.byUser;

    // Query course detail
    let course_data = await pool.query(
      `
          SELECT *
          FROM courses
          WHERE course_id = $1`,
      [courseId]
    );
    course_data = course_data.rows[0];

    const lessons = await pool.query(
      `
        SELECT lessons.lesson_id, lessons.lesson_name, sub_lessons.sub_lesson_id, sub_lessons.sub_lesson_name
        FROM courses
        INNER JOIN lessons 
        ON courses.course_id = lessons.course_id
        INNER JOIN sub_lessons 
        ON lessons.lesson_id = sub_lessons.lesson_id
        WHERE courses.course_id=$1`,
      [courseId]
    );

    course_data.lessons = {};
    lessons.rows.map((lesson) => {
      if (lesson.lesson_name in course_data.lessons) {
        course_data.lessons[lesson.lesson_name].push(lesson.sub_lesson_name);
      } else {
        course_data.lessons[lesson.lesson_name] = [];
        course_data.lessons[lesson.lesson_name].push(lesson.sub_lesson_name);
      }
    });

    const filterCategory = await pool.query(
      `
        SELECT courses.course_id, courses.course_name, courses.summary, courses.cover_image_directory, courses.learning_time, CAST(COUNT(lessons.lesson_id) AS INTEGER) as lessons_count
        FROM courses
        INNER JOIN lessons
        ON courses.course_id = lessons.course_id
        WHERE courses.category = $1 AND courses.course_id != $2
        GROUP BY courses.course_id
        ORDER BY random()
        limit 3`,
      [course_data.category, courseId]
    );

    const files = await pool.query(
      `
        SELECT file_name, size, directory, type
        FROM files
        WHERE course_id=$1
        ORDER BY type ASC, file_name ASC`,
      [courseId]
    );
    course_data.files = [];
    files.rows.map((file) => {
      course_data.files.push(file);
    });

    // Query user's subscription/desire course status
    let subscribeStatus;
    let desireStatus;
    if (userId) {
      const coursesSubscription = await pool.query(
        `
        SELECT *
        FROM subscriptions
        WHERE course_id = $1 AND user_id = $2`,
        [courseId, userId]
      );
      if (Boolean(coursesSubscription.rowCount)) {
        subscribeStatus = true;
      } else {
        subscribeStatus = false;
      }

      const desiredCourses = await pool.query(
        `
        SELECT *
        FROM desired_courses
        WHERE course_id = $1 AND user_id = $2
              `,
        [courseId, userId]
      );
      if (Boolean(desiredCourses.rowCount)) {
        desireStatus = true;
      } else {
        desireStatus = false;
      }
    }

    return res.json({
      data: course_data,
      dataCategory: filterCategory.rows,
      subscribeStatus,
      desireStatus,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const postSubscribeOrAddCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.query.byUser;
    const action = req.body.action;

    let message;

    if (/subscribe/i.test(action)) {
      await pool.query(
        `INSERT INTO subscriptions(user_id, course_id, status)
              VALUES ($1, $2, $3)`,
        [userId, courseId, 0]
      );
      message = "The course has been successfully subscribed";
    } else if (/add/i.test(action)) {
      await pool.query(
        `INSERT INTO desired_courses(user_id, course_id)
              VALUES ($1, $2)`,
        [userId, courseId]
      );
      message =
        "The course has been successfully added to the desired courses list";
    } else if (/remove/i.test(action)) {
      await pool.query(
        `DELETE FROM desired_courses WHERE user_id = $1 AND course_id = $2`,
        [userId, courseId]
      );
      message =
        "The course has been successfully deleted from the desired courses list";
    }

    return res.json({
      message,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getLearningById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.query.byUser;
    let course_data = await pool.query(
      `
      SELECT courses.course_id, courses.course_name, courses.summary
      FROM courses
      WHERE course_id = $1`,
      [courseId]
    );
    course_data = course_data.rows[0];

    let lessons = await pool.query(
      `
      SELECT  lessons.lesson_name, lessons.lesson_id, sub_lessons.sub_lesson_name , sub_lessons.sub_lesson_id
      FROM courses
      INNER JOIN lessons 
      ON courses.course_id = lessons.course_id
      INNER JOIN sub_lessons 
      ON lessons.lesson_id = sub_lessons.lesson_id
      WHERE courses.course_id=$1
      order by lessons.sequence ASC, sub_lessons.sequence ASC`,
      [courseId]
    );

    course_data.lessons = {};
    lessons.rows.map((lesson) => {
      if (lesson.lesson_id in course_data.lessons) {
        course_data.lessons[lesson.lesson_id].sub_lessons = {
          ...course_data.lessons[lesson.lesson_id].sub_lessons,
          [lesson.sub_lesson_id]: {
            sub_lesson_name: lesson.sub_lesson_name,
            video_directory: lesson.video_directory,
            watched_status: false,
          },
        };
      } else {
        course_data.lessons[lesson.lesson_id] = {
          lesson_name: lesson.lesson_name,
          sub_lessons: {
            [lesson.sub_lesson_id]: {
              sub_lesson_name: lesson.sub_lesson_name,
              video_directory: lesson.video_directory,
              watched_status: false,
            },
          },
        };
      }
    });

    let checkWatchedStatus = await pool.query(
      `
      select users_sub_lessons.user_id,users_sub_lessons.sub_lesson_id,lessons.course_id,lessons.lesson_id
      from users_sub_lessons
      inner join sub_lessons
      on users_sub_lessons.sub_lesson_id = sub_lessons.sub_lesson_id
      inner join lessons
      on sub_lessons.lesson_id = lessons.lesson_id
      where users_sub_lessons.user_id = $1 AND lessons.course_id = $2
      `,
      [userId, courseId]
    );
    checkWatchedStatus = checkWatchedStatus.rows;
    const checkAssignStatus = await pool.query(
      `
      select users_assignments.user_id, users_assignments.submitted_date, sub_lessons.sub_lesson_id
      from lessons
      inner join sub_lessons
      on lessons.lesson_id = sub_lessons.lesson_id
      inner join assignments
      on sub_lessons.sub_lesson_id = assignments.sub_lesson_id
      inner join users_assignments
      on assignments.assignment_id = users_assignments.assignment_id
      where users_assignments.user_id = $1 and lessons.course_id = $2 and users_assignments.submitted_date is not null
      `,
      [userId, courseId]
    );

    for (let i = 0; i < checkWatchedStatus.length; i++) {
      course_data.lessons[checkWatchedStatus[i].lesson_id].sub_lessons[
        checkWatchedStatus[i].sub_lesson_id
      ].watched_status = true;
    }

    return res.json({
      data: { ...course_data, percentProgress: res.locals.percentProgress },
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const postWatchedAndAcceptedHomeWork = async (req, res) => {
  try {
    const userId = req.query.byUser;
    const courseId = req.params.courseId;
    const acceptedDate = new Date();
    await pool.query(
      `
    INSERT INTO users_sub_lessons(user_id, sub_lesson_id)
    VALUES ($1, $2)`,
      [userId, courseId]
    );

    // 1. รอถามเรื่อง 1 sub-lesson มีแค่ 1 assignment รึเปล่า
    // 2. ถามเรื่องเวลาที่ user accept assignment จะให้ status ของ assignment นั้นเป็นอะไร หรือให้ไม่แสดงขึ้นมาเลย?
    // 3. เจอบัคว่าหน้า learning ที่ควรจะให้แค่เฉพาะคนที่ subscribed เข้าได้ แต่อันนี้เข้าได้ทุกคน
    let assignmentId = pool.query(`
    SELECT assignments.assignment_id
    FROM assignments
    WHERE
    `);

    await pool.query(
      `
    INSERT INTO users_assignments(user_id, assignment_id, accepted_date, status)
    VALUES ($1, $2, $3, $4)`,
      [userId, assignmentId, acceptedDate, "pending"]
    );
    return res.json({ userId, courseId });
  } catch (error) {
    return res.sendStatus(500);
  }
};
