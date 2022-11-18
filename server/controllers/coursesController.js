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
        SELECT courses.course_id, courses.course_name, courses.summary, courses.cover_image_directory, courses.learning_time, CAST(COUNT(lessons.lesson_id) AS INTEGER) AS lessons_count
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
      /* Checking that user has already added this course or not */
      let isCourseAdded = await pool.query(
        `
        SELECT EXISTS 
        (SELECT *
          FROM desired_courses
          WHERE user_id = $1 AND course_id = $2)
        `,
        [userId, courseId]
      );

      isCourseAdded = isCourseAdded.rows[0].exists;
      if (isCourseAdded) {
        await pool.query(
          `
          DELETE FROM desired_courses
          WHERE user_id = $1 AND course_id = $2
          `,
          [userId, courseId]
        );
      }
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

export const getDesire = async (req, res) => {
  try {
    const userId = req.query.byUser;
    let courseDesire = await pool.query(
      `select desired_courses.course_id, courses.course_name, courses.summary, courses.cover_image_directory, courses.learning_time, COUNT(lessons.lesson_id)
      from desired_courses
      inner join courses
      on courses.course_id = desired_courses.course_id
      inner join lessons
      on courses.course_id = lessons.course_id
      where desired_courses.user_id = $1
      group by desired_courses.course_id, courses.course_id`,
      [userId]
    );
    let course = courseDesire.rows;

    return res.json({
      data: course,
    });
  } catch (err) {
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
      SELECT  lessons.lesson_name, lessons.lesson_id, sub_lessons.sub_lesson_name , sub_lessons.sub_lesson_id , assignments.assignment_id , sub_lessons.video_directory, users_assignments.submitted_date
      FROM courses
      INNER JOIN lessons 
      ON courses.course_id = lessons.course_id
      INNER JOIN sub_lessons 
      ON lessons.lesson_id = sub_lessons.lesson_id
      LEFT JOIN assignments
      ON sub_lessons.sub_lesson_id = assignments.sub_lesson_id
      LEFT JOIN users_assignments
      ON users_assignments.assignment_id = assignments.assignment_id
      WHERE courses.course_id=$1
      order by lessons.sequence ASC, sub_lessons.sequence ASC`,
      [courseId]
    );
    lessons = lessons.rows;

    course_data.lessons = {};
    lessons.map((lesson) => {
      if (lesson.lesson_id in course_data.lessons) {
        course_data.lessons[lesson.lesson_id].sub_lessons = {
          ...course_data.lessons[lesson.lesson_id].sub_lessons,
          [lesson.sub_lesson_id]: {
            sub_lesson_name: lesson.sub_lesson_name,
            video_directory: lesson.video_directory,
            watched_status: false,
            assign_status: false,
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
              assign_status: false,
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
    //console.log("checkWatchedStatus: ", checkWatchedStatus);

    for (let i = 0; i < checkWatchedStatus.length; i++) {
      course_data.lessons[String(checkWatchedStatus[i].lesson_id)].sub_lessons[
        String(checkWatchedStatus[i].sub_lesson_id)
      ].watched_status = true;
    }

    // let checkAssignStatus = await pool.query(
    //   `
    //   select users_assignments.user_id, users_assignments.submitted_date, sub_lessons.sub_lesson_id, lessons.lesson_id , assignments.assignment_id
    //   from lessons
    //   inner join sub_lessons
    //   on lessons.lesson_id = sub_lessons.lesson_id
    //   inner join assignments
    //   on sub_lessons.sub_lesson_id = assignments.sub_lesson_id
    //   inner join users_assignments
    //   on assignments.assignment_id = users_assignments.assignment_id
    //   where users_assignments.user_id = $1 and lessons.course_id = $2
    //   `,
    //   [userId, courseId]
    // );
    // checkAssignStatus = checkAssignStatus.rows;
    // console.log("checkAssignStatus: ", checkAssignStatus);

    let assign_data = {};
    lessons.map((lesson) => {
      // ให้ส่ง sub_lesson_id ที่ไม่มี assignment ออกมาด้วย แต่ขึ้นเป็น null
      // console.log("lessons ", lessons);

      if (lesson.submitted_date != null) {
        assign_data[lesson.sub_lesson_id] = {
          ...assign_data[lesson.sub_lesson_id],
          [lesson.assignment_id]: true,
        };
      } else {
        assign_data[lesson.sub_lesson_id] = {
          ...assign_data[lesson.sub_lesson_id],
          [lesson.assignment_id]: false,
        };
      }
    });
    //console.log(lessons);
    //console.log("assign_data: ", assign_data);
    // assign_data:  {
    // '1001': { '1518': true },
    // '1002': { '1030': false },
    // '1003': { '1057': true, '1356': false },
    // '1004': { '1529': true, '1638': false },
    // }

    // ทำเงื่อนไขเช็ค assign_data -> ทำให้ data เป็น '556': false; -> เอาค่าที่ได้ไปแมพใส่ไปใน assign_status
    // let newData = {};
    // Object.entries(assign_data).map((subLessonId) => {
    //   console.log(
    //     "Object.values(assign_data): ",
    //     Object.values(subLessonId[1])[0]
    //   );
    // for (let i = 0; i < subLessonId[1].length; i++) {
    //   if (Object.values(subLessonId[1])) {
    //   }
    // }

    //console.log("assignId: ", assignId);
    // กรณีที่ sub_lesson นั้น ไม่มี assign
    //if (assignId === "null") {
    //newData = { [Object.keys(assign_data)[key]]: false };
    // newData = {
    //   ...newData,
    //   [Object.keys(assign_data)[key]]: true,
    // };
    // กรณีที่ sub_lesson นั้น เป็น true ทั้งหมด หรือ มี false แค่อันเดียว
    //}else if(d){

    // if (Object.values(subLessonId)) {
    // }
    //});
    //console.log("newData = ", newData);
    //console.log("assign: ", assign_data);

    // for (let i = 0; i < checkAssignStatus.length; i++) {
    //   course_data.lessons[checkAssignStatus[i].lesson_id].sub_lessons[
    //     checkAssignStatus[i].sub_lesson_id
    //   ].assign_status = true;
    // }

    return res.json({
      data: { ...course_data, percentProgress: res.locals.percentProgress },
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const postWatchedOrAccepted = async (req, res) => {
  try {
    const userId = req.query.byUser;
    const subLessonId = req.params.subLessonId;
    const action = req.body.action;
    const dateNow = new Date();

    if (/accepted/i.test(action)) {
      let result = await pool.query(
        `
      SELECT assignment_id
      FROM sub_lessons
      INNER JOIN assignments
      ON sub_lessons.sub_lesson_id = assignments.sub_lesson_id
      WHERE sub_lessons.sub_lesson_id = $1`,
        [subLessonId]
      );
      result = result.rows;

      const assignmentList = [];
      for (let i = 0; i < result.length; i++) {
        assignmentList.push(result[i].assignment_id);
      }

      const sqlStatement = format(
        `
        INSERT INTO users_assignments(user_id, assignment_id, accepted_date, status)
        VALUES (%s, UNNEST(ARRAY[%s]), %L, %L)`,
        userId,
        assignmentList,
        dateNow,
        "pending"
      );

      await pool.query(sqlStatement);
      res.json({
        message: "Successfully insert data into users_assignments table",
      });
    } else if (/watched/i.test(action)) {
      // ลองดูวิธีการบล็อคการยิง API มา Insert ซ้ำภายใน Front-end อีกที
      const isExisted = await pool.query(
        `
        SELECT *
        FROM users_sub_lessons
        WHERE user_id = $1 AND sub_lesson_id = $2
        `,
        [userId, subLessonId]
      );
      if (!Boolean(isExisted.rowCount)) {
        await pool.query(
          `
            INSERT INTO users_sub_lessons(user_id, sub_lesson_id, created_date)
            VALUES ($1, $2, $3)`,
          [userId, subLessonId, dateNow]
        );
      }
      return res.json({
        message: "Successfully insert data into users_sub_lessons table",
      });
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getSubLesson = async (req, res) => {
  const userId = req.query.byUser;
  const subLessonId = req.params.subLessonId;
  const courseId = req.params.courseId;

  let querySubLesson = await pool.query(
    `
    SELECT sub_lessons.sub_lesson_name, sub_lessons.video_directory, assignments.assignment_id, assignments.detail, assignments.duration
    FROM lessons
    INNER JOIN sub_lessons
    ON lessons.lesson_id = sub_lessons.lesson_id
    LEFT JOIN assignments
    ON sub_lessons.sub_lesson_id = assignments.sub_lesson_id
    WHERE lessons.course_id = $1 AND sub_lessons.sub_lesson_id = $2`,
    [courseId, subLessonId]
  );
  querySubLesson = querySubLesson.rows;
  const subLessonData = {
    sub_lesson_id: subLessonId,
    sub_lesson_name: querySubLesson[0].sub_lesson_name,
    video_directory: querySubLesson[0].video_directory,
    assignments: {},
  };
  querySubLesson.map((assignment) => {
    if (assignment.assignment_id !== null) {
      subLessonData.assignments[assignment.assignment_id] = {
        detail: assignment.detail,
        duration: assignment.duration,
      };
    } else {
      subLessonData.assignments = null;
    }
  });

  let queryAssignmentStatus = await pool.query(
    `
    SELECT assignments.assignment_id, assignments.duration, users_assignments.answer, users_assignments.accepted_date, users_assignments.status, users_assignments.user_assignment_id, users_assignments.answer, users_assignments.submitted_date
    FROM assignments
    INNER JOIN users_assignments
    ON assignments.assignment_id = users_assignments.assignment_id
    WHERE assignments.sub_lesson_id = $1 AND users_assignments.user_id = $2
    `,
    [subLessonId, userId]
  );

  if (Boolean(queryAssignmentStatus.rowCount)) {
    subLessonData.assignment_status = "accepted";
    queryAssignmentStatus.rows.map((assignment) => {
      subLessonData.assignments[String(assignment.assignment_id)].answer =
        assignment.answer;
      subLessonData.assignments[
        String(assignment.assignment_id)
      ].submitted_date = assignment.submitted_date;
      // If an assignment status is overdue => Stored in response's data immediately (no need to check overdue status again)
      if (
        assignment.status === "overdue" ||
        assignment.status === "submitted"
      ) {
        subLessonData.assignments[String(assignment.assignment_id)].status =
          assignment.status;
      } else {
        // If an assignment status isn't overdue => Need to check whether it is overdue or not first
        let daysAfterAccepted = Math.abs(assignment.accepted_date - new Date());
        daysAfterAccepted = daysAfterAccepted / (1000 * 60 * 60 * 24);
        // If it is overdue => Changed status to "overdue" then send into response's data and also update the database
        if (daysAfterAccepted >= assignment.duration) {
          assignment.status = "overdue";
          pool.query(
            `
            UPDATE users_assignments
            SET status = 'overdue'
            WHERE user_assignment_id = $1
            `,
            [assignment.user_assignment_id]
          );
        }
        subLessonData.assignments[String(assignment.assignment_id)].status =
          assignment.status;
      }
    });
  } else {
    /* In case of there is no assignment in that sub lesson, assignment_status will automatically be assigned as "accepted" */
    if (subLessonData.assignments === null) {
      subLessonData.assignment_status = "accepted";
    } else {
      subLessonData.assignment_status = "unaccepted";
    }
  }

  return res.json({ data: subLessonData });
};
