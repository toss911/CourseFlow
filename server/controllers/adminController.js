import { pool } from "../utils/db.js";
import { cloudinaryUpload } from "../utils/upload.js";

export const videoSubLessonUpload = async (req, res) => {};

export const addCourse = async (req, res) => {
  const adminId = req.query.adminId;
  const createdDate = new Date();

  console.log(req.files);

  const newCourse = {
    courseName: req.body.course_name,
    price: req.body.price,
    learningTime: req.body.learning_time,
    courseSummary: req.body.course_summary,
    detail: req.body.course_detail,
    category: req.body.category,
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
  newCourse.courseAttachFiles = await cloudinaryUpload(
    ...req.files.course_attached_files,
    "upload",
    "course_attached_files"
  );
  newSubLesson.subLessonVideo = await cloudinaryUpload(
    ...req.files.sub_lesson_videos,
    "upload",
    "sub_lesson_videos"
  );

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
     ( (select lesson_id from second_insert), $13, $14, $15);`,
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
      newSubLesson.sequence
    ]
  );

  return res.json({
    message: "Course created successfully"
  })
};
