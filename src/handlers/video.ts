import { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const handleVideo = (app: Express, getVideoPath: () => string) => {
    app.get('/', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname + '/../../html/index.html'));
    })

    app.get("/video", (req: Request, res: Response) => {
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
        }
        var filepath = getVideoPath();
        var filesize = fs.statSync(filepath).size;

        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range!.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, filesize - 1);
        const contentLength = end - start + 1;

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${filesize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(filepath, { start, end });
        videoStream.pipe(res);
    });
}
