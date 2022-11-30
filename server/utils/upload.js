import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (file, action, nameFolder) => {
  try {
    if (/upload/i.test(action)) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `courseflow/${nameFolder}`,
        type: "private",
        resource_type: "auto"
      });
      await fs.unlink(file.path);
      return { url: result.secure_url, public_id: result.public_id };
    } else if (/delete/i.test(action)) {
      await cloudinary.uploader.destroy(file, {
        type: "private",
      });
    }
  } catch (error) {
    console.log("Error from uploading:", error);
  }
};


export { cloudinaryUpload };
