import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (files) => {
    const fileUrl = [];
    for (let file of files.avatar) {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "courseflow",
            type: "private",
        });

        fileUrl.push({
            url: result.secure_url,
            publicId: result.publid_id
        });

        await fs.unlink(file.path)
    }

    return fileUrl;
};

export { cloudinaryUpload };