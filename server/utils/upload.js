import dotenv from 'dotenv'
dotenv.config();

import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    // url: `process.env.DB_URL`,
    url:'mongodb://localhost:27017/blog',
    options: { useNewUrlParser: true },
    files: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.memeType) === -1)
            return `${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }

})
export default multer({ storage }); 