import express, { Express, Request, Response } from 'express';
import { runWebSocketServer } from './websocket';
import { handleUploads } from './handlers/upload';
import { handleVideo } from './handlers/video';

var videoPath = "";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

handleUploads(app, (path: string) => {
    videoPath = path;
    console.log(path);
});
handleVideo(app, () => {
    return videoPath;
});

runWebSocketServer(8081);

app.listen(8080, () => {
    console.log('Listening on port 8080');
})

