import http from 'node:http';
import { serveStatic } from './utils/serveStatic.js';
import { getData } from './utils/getData.js';
import { handleGet, handlePost } from './handlers/routeHandlers.js';

/*
    Challenge #0: 
        1. Initialise a nodejs project:
            Name: “from-the-other-side”.
            Description: “A platform for sharing ghostly encounters”.
        2. Enable modular js (in package.json).
        hint.md for help
    Challenge #1: 
        1.Set up a server that serves the string 
            '<html><h1>The server is working</h1></html>'.
            What should the content type be? 
            What status code should you send?
        2. Listen on port 8000 and log a connection message to the console.
        3. Open the browser to see your first served HTML.
*/
const __dirname = import.meta.dirname;
//console.log(await getData());

const server = http.createServer(async (req, res) => {

    if (req.url === '/api') {
        if (req.method === 'GET') {
            return await handleGet(res)
        } else if (req.method === 'POST') {
            return await handlePost(res)
        }
        /*
            Challenge: 
            1. Add a route for a POST request to '/api'.
            2. When a request comes in, pass the req and res to handlePost().
        */
    }
    else if (!req.url.startsWith('/api')) {
        await serveStatic(req, res, __dirname);
    }
});

const PORT = 8001;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
