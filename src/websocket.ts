import WebSocket from 'ws';

export const runWebSocketServer = (port: number) => {
    const wss = new WebSocket.Server({ port: port });

    wss.on('connection', (ws: WebSocket) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log("opened connection");

            ws.send('Hello World', (err: Error | undefined) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });

    wss.on('message', (message: string) => {
        console.log(message);
    })

    console.log(`WebSocket server started on port ${port}`);
}


