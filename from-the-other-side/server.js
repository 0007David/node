import http from 'node:http';
import path from 'node:path';
import { serveStatic } from './utils/serveStatic.js';
import { getData } from './utils/getData.js';

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


console.log(await getData());

const server = http.createServer(async (req, res) => {

    await serveStatic(req, res, __dirname);

});

const PORT = 8001;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});