import { pool } from "../utils/db.js";
import { cloudinaryUpload } from "../utils/upload.js";

export const videoSubLessonUpload = async (req, res) => {};


// POST course

export const addCourse = async (req, res) => {
  const adminId = req.query.adminId;
  const createdDate = new Date();

  let fileName = [];
  let fileType = [];
  let fileSize = [];

  console.log(req.files.course_attached_files);

  for (let file of req.files.course_attached_files) {
    fileName.push(file.originalname);
    fileType.push(file.mimetype);
    fileSize.push(file.size);
  }

  console.log(fileName);
  console.log(fileType);
  console.log(fileSize);

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
  for (let file of req.files.course_attached_files) {
    newCourse.courseAttachFiles.push(
      JSON.stringify(
        await cloudinaryUpload(file, "upload", "course_attached_files")
      )
    );
  }

  newSubLesson.subLessonVideo = await cloudinaryUpload(
    ...req.files.sub_lesson_videos,
    "upload",
    "sub_lesson_videos"
  );

  console.log(newCourse.courseAttachFiles);

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

  return res.json({
    message: "Course created successfully",
  });
};

// GET course

export const getCourse = async (req, res) => {
  
  const courseId = req.params.courseId;
  const adminId = req.query.adminId;

  const courseData = await pool.query(`
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
  [courseId, adminId]);

  const courseAttachedFiles = await pool.query(`
  SELECT * from files where course_id = $1
  `,
  [courseId]);

  return res.json({
    data: courseData.rows[0],
    attachedFiles: courseAttachedFiles.rows
  })

}




