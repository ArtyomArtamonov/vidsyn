import { Express, Request, Response } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';

export const handleUploads = (app: Express, setVideoName: (path: string) => void) => {
    app.get("/upload", (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname + '/../../html/upload.html'));
    })

    var storage = multer.diskStorage(
        {
            destination: path.resolve(__dirname + '/../../video/'),
            filename: function (req, file, cb) {
                cb(null, "video.mp4");
            }
        }
    );

    var upload = multer({ storage: storage });
    app.post("/upload-video", upload.single("video"), (req: Request, res: Response) => {
        console.log('uploaded video');
        // TODO: support more video types
        if (req.file && req.file.mimetype !== "video/mp4") {
            res.status(400).send("Invalid file type");
        }
        setVideoName(path.join(req.file!.destination, req.file!.filename));
        res.json({ message: 'video uploaded' });
    });
}
