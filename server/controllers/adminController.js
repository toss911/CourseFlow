import { pool } from "../utils/db.js";
import { cloudinaryUpload } from "../utils/upload.js";

export const videoSubLessonUpload = async (req, res) => {};

export const addCourse = async (req, res) => {
  const adminId = req.params.userId;
  const newCourse = {
    course_name: req.body.course_name,
    price: req.body.price,
    learning_time: req.body.learning_time,
    course_summary: req.body.course_summary,
    course_detail: req.body.course_detail,
  };

  const courseCoverImage = await cloudinaryUpload(
    ...req.files.course_cover_image,
    "upload",
    "course_cover_images"
  );
  const courseVideoTrailer = await cloudinaryUpload(
    ...req.files.course_video_trailer,
    "upload",
    "course_video_trailers"
  );
  const courseAttachFiles = await cloudinaryUpload(
    ...req.files.course_attach_files,
    "upload",
    "course_attach_files"
  );
  const subLessonVideo = await cloudinaryUpload(
    ...req.files.subLessonVideo,
    "upload",
    "sub_lesson_videos"
  );

  await pool.query(``);
};

export const getAllCoursesDataByAdmin = async (req, res) => {
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
