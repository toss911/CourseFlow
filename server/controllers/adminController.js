import { pool } from "../utils/db.js";
import { cloudinaryUpload } from "../utils/upload.js";

// POST course // check if there are attached files or not

export const addCourse = async (req, res) => {
  const adminId = req.query.adminId;
  const createdDate = new Date();

  const newCourse = {
    courseName: req.body.course_name,
    price: req.body.price,
    learningTime: req.body.learning_time,
    courseSummary: req.body.course_summary,
    detail: req.body.course_detail,
    category: req.body.category,
    courseAttachFiles: [],
  };

  const newLesson = {
    lessonName: req.body.lesson_name,
    sequence: req.body.lesson_sequence,
  };

  const newSubLesson = {
    subLessonName: req.body.sub_lesson_name,
    sequence: req.body.sub_lesson_sequence,
  };

  newCourse.courseCoverImage = await cloudinaryUpload(
    ...req.files.course_cover_images,
    "upload",
    "course_cover_images"
  );
  newCourse.courseVideoTrailer = await cloudinaryUpload(
    ...req.files.course_video_trailers,
    "upload",
    "course_video_trailers"
  );

  newSubLesson.subLessonVideo = await cloudinaryUpload(
    ...req.files.sub_lesson_videos,

    "upload",
    "sub_lesson_videos"
  );

  // If there are attached files
  if (req.files.course_attached_files != undefined) {
    let fileName = [];
    let fileType = [];
    let fileSize = [];

    for (let file of req.files.course_attached_files) {
      fileName.push(file.originalname);
      fileType.push(file.mimetype);
      fileSize.push(file.size);
      newCourse.courseAttachFiles.push(
        JSON.stringify(
          await cloudinaryUpload(file, "upload", "course_attached_files")
        )
      );
    }

    await pool.query(
      `
      with first_insert as (
          INSERT INTO courses(admin_id, course_name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, category) 
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
          RETURNING course_id
       ), 
       second_insert as (
         INSERT INTO lessons( course_id, lesson_name, sequence) 
         VALUES
         ( (select course_id from first_insert), $11, $12)
         RETURNING lesson_id
       ),
       third_insert as (
          INSERT INTO sub_lessons ( lesson_id , sub_lesson_name, video_directory, sequence) 
       VALUES 
       ( (select lesson_id from second_insert), $13, $14, $15)
          
       )
       insert into files (course_id, file_name, type, size, directory)
       VALUES ( (select course_id from first_insert), unnest($16::text[]), unnest($17::text[]), unnest($18::int[]), unnest($19::text[]));
       
  
       `,
      [
        adminId,
        newCourse.courseName,
        newCourse.courseSummary,
        newCourse.detail,
        newCourse.price,
        newCourse.learningTime,
        newCourse.courseCoverImage,
        newCourse.courseVideoTrailer,
        createdDate,
        newCourse.category,
        newLesson.lessonName,
        newLesson.sequence,
        newSubLesson.subLessonName,
        newSubLesson.subLessonVideo,
        newSubLesson.sequence,
        fileName,
        fileType,
        fileSize,
        newCourse.courseAttachFiles,
      ]
    );
  } else {
    await pool.query(
      `
      with first_insert as (
          INSERT INTO courses(admin_id, course_name, summary, detail, price, learning_time, cover_image_directory, video_trailer_directory, created_date, category) 
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
          RETURNING course_id
       ), 
       second_insert as (
         INSERT INTO lessons( course_id, lesson_name, sequence) 
         VALUES
         ( (select course_id from first_insert), $11, $12)
         RETURNING lesson_id
       )
        INSERT INTO sub_lessons ( lesson_id , sub_lesson_name, video_directory, sequence) 
       VALUES 
       ( (select lesson_id from second_insert), $13, $14, $15)
  
       `,
      [
        adminId,
        newCourse.courseName,
        newCourse.courseSummary,
        newCourse.detail,
        newCourse.price,
        newCourse.learningTime,
        newCourse.courseCoverImage,
        newCourse.courseVideoTrailer,
        createdDate,
        newCourse.category,
        newLesson.lessonName,
        newLesson.sequence,
        newSubLesson.subLessonName,
        newSubLesson.subLessonVideo,
        newSubLesson.sequence,
      ]
    );
  }

  return res.json({
    message: "Course created successfully",
  });
};

// GET course

export const getCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const adminId = req.query.adminId;

  const courseData = await pool.query(
    `
  SELECT courses.course_name, courses.summary, courses.detail, courses.price,
  courses.learning_time, courses.cover_image_directory, courses.video_trailer_directory,
  courses.created_date, courses.category, lessons.lesson_name, lessons.sequence,
  sub_lessons.sub_lesson_name, sub_lessons.video_directory, sub_lessons.sequence, sub_lessons.duration
  FROM courses
  INNER JOIN lessons
  ON lessons.course_id = courses.course_id
  INNER JOIN sub_lessons
  ON sub_lessons.lesson_id = lessons.lesson_id
  WHERE courses.course_id = $1 AND courses.admin_id = $2`,
    [courseId, adminId]
  );

  const courseAttachedFiles = await pool.query(
    `
  SELECT * from files where course_id = $1
  `,
    [courseId]
  );

  let arrOfFilesDirectory = [];
  for (let file of courseAttachedFiles.rows) {
    arrOfFilesDirectory.push(file.directory);
  }

  const filesMetaData = courseAttachedFiles.rows;
  filesMetaData.unshift(
    {
      file_name: "cover image",
      cover_image_directory: courseData.rows[0].cover_image_directory,
    },
    {
      file_name: "video trailer",
      video_directory: courseData.rows[0].video_trailer_directory,
    },
    {
      file_name: "sub lesson video",
      sub_lesson_videos: courseData.rows[0].video_directory,
    }
  );
  console.log(filesMetaData);

  return res.json({
    data: courseData.rows[0],
    filesMetaData: filesMetaData,
    allMediaUrls: [
      courseData.rows[0].cover_image_directory,
      courseData.rows[0].video_trailer_directory,
      courseData.rows[0].video_directory,
      ...arrOfFilesDirectory,
    ], // create a file object out of these media urls.
  });
};

// PUT course

export const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const adminId = req.query.adminId;
  const action = req.body.action;
  const mediaFiles = req.files;
  console.log(mediaFiles);

  const updatedCourse = {
    courseName: req.body.course_name,
    price: req.body.price,
    learningTime: req.body.learning_time,
    courseSummary: req.body.course_summary,
    detail: req.body.course_detail,
    category: req.body.category,
    courseAttachFiles: [],
  };

  const updatedLesson = {
    lessonName: req.body.lesson_name,
    sequence: req.body.lesson_sequence,
  };

  const updatedSubLesson = {
    subLessonName: req.body.sub_lesson_name,
    sequence: req.body.sub_lesson_sequence,
  };

  if (Object.keys(mediaFiles).length === 0) {
    // if admin did not change any media
    await pool.query(
      `
      with course_update as (
        UPDATE courses
         SET course_name = $1, summary = $2,
        detail = $3, price = $4, learning_time = $5,
        updated_date= $6, category = $7
        WHERE course_id = $8 AND admin_id = $9
        returning course_id
      ),
      lesson_update as (
        UPDATE lessons
          SET lesson_name = $10, sequence = $11
        WHERE course_id IN (SELECT course_id FROM course_update)
        RETURNING lesson_id
      )
        UPDATE sub_lessons
        SET sub_lesson_name = $12, 
        sequence = $13
        WHERE lesson_id IN (SELECT lesson_id FROM lesson_update)
      `,
      [
        updatedCourse.courseName,
        updatedCourse.courseSummary,
        updatedCourse.detail,
        updatedCourse.price,
        updatedCourse.learningTime,
        new Date(),
        updatedCourse.category,
        courseId,
        adminId,
        updatedLesson.lessonName,
        updatedLesson.sequence,
        updatedSubLesson.subLessonName,
        updatedSubLesson.sequence,
      ]
    );
    return res.json({
      message: "updated successfully 1",
    });
  } else {
    const filesPublicIdForDelete = [];
    const jsonsOfAllFiles = JSON.parse(req.body.all_media);
    for (let i of jsonsOfAllFiles) {
      filesPublicIdForDelete.push(JSON.parse(i).public_id);
    }

    //delete everything from cloudinary
    for (let filePublicId of filesPublicIdForDelete) {
      await cloudinaryUpload(filePublicId, "delete");
    }

    // upload everything to cloudinary again
    updatedCourse.courseCoverImage = await cloudinaryUpload(
      ...req.files.course_cover_images,
      "upload",
      "course_cover_images"
    );

    updatedCourse.courseVideoTrailer = await cloudinaryUpload(
      ...req.files.course_video_trailers,
      "upload",
      "course_video_trailers"
    );

    for (let file of req.files.course_attached_files) {
      updatedCourse.courseAttachFiles.push(
        JSON.stringify(
          await cloudinaryUpload(file, "upload", "course_attached_files")
        )
      );
    }

    let fileName = [];
    let fileType = [];
    let fileSize = [];

    // console.log(req.files.course_attached_files);

    for (let file of req.files.course_attached_files) {
      fileName.push(file.originalname);
      fileType.push(file.mimetype);
      fileSize.push(file.size);
    }

    // console.log(updatedCourse.courseAttachFiles);

    updatedSubLesson.subLessonVideo = await cloudinaryUpload(
      ...req.files.sub_lesson_videos,
      "upload",
      "sub_lesson_videos"
    );

    // update the files' directory except for attached files
    await pool.query(
      `
with course_update as (
  UPDATE courses
   SET course_name = $1, summary = $2,
  detail = $3, price = $4, learning_time = $5,
  cover_image_directory = $6, video_trailer_directory = $7,
  updated_date= $8, category = $9
  WHERE course_id = $10 AND admin_id = $11
  returning course_id
),
lesson_update as (
  UPDATE lessons
    SET lesson_name = $12, sequence = $13
  WHERE course_id IN (SELECT course_id FROM course_update)
  RETURNING lesson_id
)
  UPDATE sub_lessons
  SET sub_lesson_name = $14, video_directory = $15,
  sequence = $16
  WHERE lesson_id IN (SELECT lesson_id FROM lesson_update)

`,
      [
        updatedCourse.courseName,
        updatedCourse.courseSummary,
        updatedCourse.detail,
        updatedCourse.price,
        updatedCourse.learningTime,
        updatedCourse.courseCoverImage,
        updatedCourse.courseVideoTrailer,
        new Date(),
        updatedCourse.category,
        courseId,
        adminId,
        updatedLesson.lessonName,
        updatedLesson.sequence,
        updatedSubLesson.subLessonName,
        updatedSubLesson.subLessonVideo,
        updatedLesson.sequence,
      ]
    );

    await pool.query(
      `
    DELETE from files WHERE course_id = $1
    `,
      [courseId]
    );

    await pool.query(
      `
    INSERT INTO files (course_id, file_name, type, size, directory)
    VALUES ( $1, unnest($2::text[]), unnest($3::text[]), unnest($4::int[]), unnest($5::text[]));
    `,
      [courseId, fileName, fileType, fileSize, updatedCourse.courseAttachFiles]
    );

    return res.json({
      message: "updated successfully",
    });
  }
};

// DELETE course

export const deleteCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const adminId = req.query.adminId;

  // Step1: Delete all media related to that course from cloudinary

  const courseMediaFiles = await pool.query(
    `
  SELECT courses.cover_image_directory, courses.video_trailer_directory, sub_lessons.video_directory
  FROM courses
  INNER join lessons
  ON lessons.course_id = courses.course_id
  INNER JOIN sub_lessons
  ON sub_lessons.lesson_id = lessons.lesson_id
  WHERE courses.course_id = $1 AND admin_id = $2
  `,
    [courseId, adminId]
  );

  const courseAttachedFiles = await pool.query(
    `
  SELECT * from files where course_id = $1
  `,
    [courseId]
  );

  let filesPublicIdForDelete = [];

  for (let file of courseAttachedFiles.rows) {
    filesPublicIdForDelete.push(JSON.parse(file.directory).public_id);
  }

  for (let publicId of Object.values(courseMediaFiles.rows[0])) {
    console.log(JSON.parse(publicId).public_id);
    filesPublicIdForDelete.push(JSON.parse(publicId).public_id);
  }

  console.log(filesPublicIdForDelete);

  for (let filePublicId of filesPublicIdForDelete) {
    await cloudinaryUpload(filePublicId, "delete");
  }

  // Step2: Delete course from database

  await pool.query(
    `
  DELETE from courses WHERE course_id = $1 AND admin_id = $2`,
    [courseId, adminId]
  );

  return res.json({
    message: "course deleted",
  });
};

export const getAdminCourses = async (req, res) => {
  try {
    let searchText = req.query.searchText || "";
    searchText = "\\m" + searchText;
    const adminId = req.query.byAdmin;

    // Change ISO date to normal date before sending data to FE
    const changeDateFormat = (iso_Date) => {
      if (iso_Date === null) {
        return "null";
      }
      const isoDate = new Date(iso_Date);
      let year = isoDate.getFullYear();
      let month = isoDate.getMonth() + 1;
      let date = isoDate.getDate();
      let time = isoDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (date < 10) {
        date = "0" + date;
      }

      if (month < 10) {
        month = "0" + month;
      }

      let normalDate = date + "/" + month + "/" + year + " " + time;

      return normalDate;
    };

    const results = await pool.query(
      `
      SELECT courses.cover_image_directory, courses.course_name, count(lessons.lesson_id) as lessons_count, courses.price, courses.created_date, courses.updated_date, courses.course_id
      FROM lessons
      INNER JOIN courses
      ON courses.course_id = lessons.course_id
      WHERE courses.course_name ~* $1 AND courses.admin_id = $2
      GROUP BY courses.course_id
      ORDER BY courses.updated_date DESC
        `,
      [searchText, adminId]
    );

    for (let course of results.rows) {
      course.cover_image_directory = JSON.parse(course.cover_image_directory);
      course.created_date = changeDateFormat(course.created_date);
      course.updated_date = changeDateFormat(course.updated_date);
    }

    return res.json({
      data: results.rows,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

// export const deleteCourse = async (req, res) => {
//   try {
//     const admin_id = req.query.byAdmin;
//     const course_id = req.params.courseId;

//     /* Validate whether this admin owned the course or not */
//     let doesAdminOwnThisCourse = await pool.query(
//       `
//     SELECT EXISTS
//     (SELECT *
//       FROM courses
//     WHERE admin_id = $1 AND course_id = $2)
//     `,
//       [admin_id, course_id]
//     );
//     doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
//     if (!doesAdminOwnThisCourse) {
//       return res
//         .status(403)
//         .json({ message: "You have no permission to delete this course" });
//     }

//     /* Delete an assignment from "assignments" table */
//     await pool.query(
//       `
//     DELETE FROM courses
//     WHERE course_id = $1
//     `,
//       [course_id]
//     );

//     return res.json({ message: "Course has been successfully deleted" });
//   } catch (error) {
//     return res.sendStatus(500);
//   }
// };

export const getAllCoursesData = async (req, res) => {
  try {
    const adminId = req.query.byAdmin;

    let fetchAllCoursesData = await pool.query(
      `
      SELECT courses.course_id, courses.course_name, lessons.lesson_id, lessons.lesson_name, sub_lessons.sub_lesson_id, sub_lessons.sub_lesson_name, sub_lessons.duration
      FROM courses
      INNER JOIN lessons
      ON courses.course_id = lessons.course_id
      INNER JOIN sub_lessons
      ON lessons.lesson_id = sub_lessons.lesson_id
      WHERE courses.admin_id = $1
      ORDER BY courses.course_id ASC, lessons.sequence ASC, sub_lessons.sequence ASC
      `,
      [adminId]
    );
    fetchAllCoursesData = fetchAllCoursesData.rows;

    /* Transform data structure from array of objects to purely object */
    const allCoursesData = {};
    fetchAllCoursesData.map((item) => {
      if (item.course_id in allCoursesData) {
        if (item.lesson_id in allCoursesData[item.course_id].lessons) {
          allCoursesData[item.course_id].lessons[item.lesson_id].sub_lessons = {
            ...allCoursesData[item.course_id].lessons[item.lesson_id]
              .sub_lessons,
            [item.sub_lesson_id]: {
              sub_lesson_name: item.sub_lesson_name,
              duration: item.duration,
            },
          };
        } else {
          allCoursesData[item.course_id].lessons[item.lesson_id] = {
            lesson_name: item.lesson_name,
            sub_lessons: {
              [item.sub_lesson_id]: {
                sub_lesson_name: item.sub_lesson_name,
                duration: item.duration,
              },
            },
          };
        }
      } else {
        allCoursesData[item.course_id] = {
          course_name: item.course_name,
          lessons: {
            [item.lesson_id]: {
              lesson_name: item.lesson_name,
              sub_lessons: {
                [item.sub_lesson_id]: {
                  sub_lesson_name: item.sub_lesson_name,
                  duration: item.duration,
                },
              },
            },
          },
        };
      }
    });
    return res.json({ data: allCoursesData });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const postNewAssignment = async (req, res) => {
  try {
    const admin_id = req.query.byAdmin;
    const sub_lesson_id = req.body.sub_lesson_id;
    const detail = req.body.detail;
    const duration = req.body.duration;

    /* Validate whether this admin owned the course or not */
    let doesAdminOwnThisCourse = await pool.query(
      `
      SELECT EXISTS 
      (SELECT *
        FROM courses
      INNER JOIN lessons
      ON courses.course_id = lessons.course_id
      INNER JOIN sub_lessons
      ON lessons.lesson_id = sub_lessons.lesson_id
      WHERE courses.admin_id = $1 AND sub_lessons.sub_lesson_id = $2)
      `,
      [admin_id, sub_lesson_id]
    );
    doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
    if (!doesAdminOwnThisCourse) {
      return res
        .status(403)
        .json({ message: "You have no permission to manipulate this course" });
    }

    /* Update duration of assignments in "sub_lessons" table */
    await pool.query(
      `
      UPDATE sub_lessons
      SET duration = $1
      WHERE sub_lesson_id = $2
      `,
      [duration, sub_lesson_id]
    );

    /* Insert new assignment into "assignments" table */
    await pool.query(
      `
      INSERT INTO assignments(sub_lesson_id, detail, created_date, updated_date)
      VALUES ($1, $2, $3, $4)
      `,
      [sub_lesson_id, detail, new Date(), new Date()]
    );

    return res.json({ message: "Assignment has been successfully added" });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getAllAssignment = async (req, res) => {
  try {
    let searchText = req.query.searchText || "";
    searchText = "\\m" + searchText;
    const adminId = req.query.byAdmin;

    const changeDateFormat = (iso_Date) => {
      if (iso_Date === null) {
        return "null";
      }
      const isoDate = new Date(iso_Date);
      let year = isoDate.getFullYear();
      let month = isoDate.getMonth() + 1;
      let date = isoDate.getDate();
      let time = isoDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (date < 10) {
        date = "0" + date;
      }

      if (month < 10) {
        month = "0" + month;
      }

      let normalDate = date + "/" + month + "/" + year + " " + time;

      return normalDate;
    };

    const result = await pool.query(
      `SELECT assignments.detail, courses.course_name, lessons.lesson_name, sub_lessons.sub_lesson_name, assignments.created_date, assignments.updated_date, assignments.assignment_id
      FROM courses
      INNER JOIN lessons
      ON lessons.course_id = courses.course_id
      INNER JOIN sub_lessons
      ON sub_lessons.lesson_id = lessons.lesson_id
      INNER JOIN assignments
      ON assignments.sub_lesson_id = sub_lessons.sub_lesson_id
      WHERE assignments.detail ~* $1 and courses.admin_id = $2
      ORDER BY assignments.updated_date DESC`,
      [searchText, adminId]
    );

    for (let course of result.rows) {
      course.created_date = changeDateFormat(course.created_date);
      course.updated_date = changeDateFormat(course.updated_date);
    }

    return res.json({
      data: result.rows,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getAssignmentById = async (req, res) => {
  const admin_id = req.query.byAdmin;
  const assignment_id = req.params.assignmentId;

  /* Validate whether this admin owned the course or not */
  let doesAdminOwnThisCourse = await pool.query(
    `
  SELECT EXISTS 
  (SELECT *
    FROM courses
  INNER JOIN lessons
  ON courses.course_id = lessons.course_id
  INNER JOIN sub_lessons
  ON lessons.lesson_id = sub_lessons.lesson_id
  INNER JOIN assignments
  ON sub_lessons.sub_lesson_id = assignments.sub_lesson_id
  WHERE courses.admin_id = $1 AND assignments.assignment_id = $2)
  `,
    [admin_id, assignment_id]
  );
  doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
  if (!doesAdminOwnThisCourse) {
    return res
      .status(403)
      .json({ message: "You have no permission to delete this assignment" });
  }

  let data = await pool.query(
    `
    SELECT courses.course_id, lessons.lesson_id, sub_lessons.sub_lesson_id, assignments.detail
    FROM courses
    INNER JOIN lessons
    ON courses.course_id = lessons.course_id
    INNER JOIN sub_lessons
    ON lessons.lesson_id = sub_lessons.lesson_id
    INNER JOIN assignments
    ON sub_lessons.sub_lesson_id = assignments.sub_lesson_id
    WHERE courses.admin_id = $1 AND assignments.assignment_id = $2
    `,
    [admin_id, assignment_id]
  );

  data = data.rows[0];
  data = {
    ...data,
    course_id: String(data.course_id),
    lesson_id: String(data.lesson_id),
    sub_lesson_id: String(data.sub_lesson_id),
  };
  return res.json({ data });
};

export const editAssignment = async (req, res) => {
  try {
    const admin_id = req.query.byAdmin;
    const assignment_id = req.params.assignmentId;
    const sub_lesson_id = req.body.sub_lesson_id;
    const detail = req.body.detail;
    const duration = req.body.duration;

    /* Validate whether this admin owned the course or not */
    let doesAdminOwnThisCourse = await pool.query(
      `
    SELECT EXISTS 
    (SELECT *
      FROM courses
    INNER JOIN lessons
    ON courses.course_id = lessons.course_id
    INNER JOIN sub_lessons
    ON lessons.lesson_id = sub_lessons.lesson_id
    WHERE courses.admin_id = $1 AND sub_lessons.sub_lesson_id = $2)
    `,
      [admin_id, sub_lesson_id]
    );
    doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
    if (!doesAdminOwnThisCourse) {
      return res
        .status(403)
        .json({ message: "You have no permission to edit this course" });
    }

    /* Update duration of assignments in "sub_lessons" table */
    await pool.query(
      `
    UPDATE sub_lessons
    SET duration = $1
    WHERE sub_lesson_id = $2
    `,
      [duration, sub_lesson_id]
    );

    /* Update an assignment in "assignments" table */
    await pool.query(
      `
    UPDATE assignments
    SET sub_lesson_id = $1,
        detail = $2,
        updated_date = $3
    WHERE assignment_id = $4
    `,
      [sub_lesson_id, detail, new Date(), assignment_id]
    );

    return res.json({ message: "Assignment has been successfully edited" });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const admin_id = req.query.byAdmin;
    const assignment_id = req.params.assignmentId;

    /* Validate whether this admin owned the course or not */
    let doesAdminOwnThisCourse = await pool.query(
      `
    SELECT EXISTS 
    (SELECT *
      FROM courses
    INNER JOIN lessons
    ON courses.course_id = lessons.course_id
    INNER JOIN sub_lessons
    ON lessons.lesson_id = sub_lessons.lesson_id
    INNER JOIN assignments
    ON sub_lessons.sub_lesson_id = assignments.sub_lesson_id
    WHERE courses.admin_id = $1 AND assignments.assignment_id = $2)
    `,
      [admin_id, assignment_id]
    );
    doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
    if (!doesAdminOwnThisCourse) {
      return res
        .status(403)
        .json({ message: "You have no permission to delete this assignment" });
    }

    /* Delete an assignment from "assignments" table */
    await pool.query(
      `
    DELETE FROM assignments
    WHERE assignment_id = $1
    `,
      [assignment_id]
    );

    return res.json({ message: "Assignment has been successfully deleted" });
  } catch (error) {
    return res.sendStatus(500);
  }
};

// get course for edit-lesson-page
export const getCourseLesson = async (req, res) => {
  const course_id = req.params.courseId;
  const lesson_id = req.params.lessonId;
  const admin_id = req.query.byAdmin;

  /* Validate whether this admin owned the course or not */
  let doesAdminOwnThisCourse = await pool.query(
    `
  SELECT EXISTS 
  (SELECT *
    FROM courses
  INNER JOIN lessons
  ON courses.course_id = lessons.course_id
  INNER JOIN sub_lessons
  ON lessons.lesson_id = sub_lessons.lesson_id
  WHERE courses.admin_id = $1 AND courses.course_id = $2)
  `,
    [admin_id, course_id]
  );
  doesAdminOwnThisCourse = doesAdminOwnThisCourse.rows[0].exists;
  if (!doesAdminOwnThisCourse) {
    return res
      .status(403)
      .json({ message: "You have no permission to delete this assignment" });
  }

  let data = await pool.query(
    `
  SELECT courses.course_id,courses.course_name, courses.summary, courses.detail, courses.price,
  courses.learning_time, courses.cover_image_directory, courses.video_trailer_directory,
  courses.created_date, courses.category, lessons.lesson_id, lessons.lesson_name, lessons.sequence,
  sub_lessons.sub_lesson_id, sub_lessons.sub_lesson_name, sub_lessons.video_directory, sub_lessons.sequence, sub_lessons.duration
  FROM courses
  INNER JOIN lessons
  ON lessons.course_id = courses.course_id
  INNER JOIN sub_lessons
  ON sub_lessons.lesson_id = lessons.lesson_id
  WHERE courses.course_id = $1 AND courses.admin_id = $2 AND sub_lessons.lesson_id = $3`,
    [course_id, admin_id, lesson_id]
  );

  data = data.rows[0];
  data = {
    ...data,
    course_id: String(data.course_id),
    lesson_id: String(data.lesson_id),
    sub_lesson_id: String(data.sub_lesson_id),
  };
  return res.json({ data });
};
