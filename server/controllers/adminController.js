import { pool } from "../utils/db.js";
import { cloudinaryUpload } from "../utils/upload.js";

// POST course // check if there are attached files or not

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
