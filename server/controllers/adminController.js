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
      course_detail: req.body.course_detail
    };

    const courseCoverImage = await cloudinaryUpload(...req.files.course_cover_image, "upload", "course_cover_images");
    const courseVideoTrailer = await cloudinaryUpload(...req.files.course_video_trailer, "upload", "course_video_trailers");
    const courseAttachFiles = await cloudinaryUpload(...req.files.course_attach_files, "upload", "course_attach_files");
    const subLessonVideo = await cloudinaryUpload(...req.files.subLessonVideo, "upload", "sub_lesson_videos")

    await pool.query(``)
};