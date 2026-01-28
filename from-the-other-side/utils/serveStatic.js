import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js';
import { getContentType } from './getContentType.js';

export async function serveStatic(req, res, baseDir) {

    const publicDir = path.join(baseDir, 'public')
    const pathToResource = path.join(
        publicDir,
        req.url === '/' ? 'index.html' : req.url)

    const ext = path.extname(pathToResource);

    const contentType = getContentType(ext)
    // const absPathToResorce = path.join(__dirname, 'public', 'index.html');
    // const relPathToResorce = path.join('public', 'index.html');
    /*
        Challenge 1:         
        - Store index.html as a buffer in a const ‘content’. 
        - As this is an async process, do this inside a try/catch block.
        - For now, just log the error in the catch block.
        - You will need to change something to do with the function declaration. What is it?

        Challenge 3:        
            - Import sendResponse() and use it to serve index.html. 
            Pass in all of the information sendResponse() is expecting.
            serveStatic() will need another param. What is it?
            
            Make any changes necessary in server.js and delete any unneeded code.
    */
    try {
        const content = await fs.readFile(pathToResource)
        sendResponse(res, 200, contentType, content)
    } catch (err) {
        /*
            Challenge:
            If the error code is “ENOENT”, serve the 404.html page.  
            If there’s another error, serve a 500 with this string: 
            `<html><h1>Server Error: ${err.code}</h1></html>`. 

            The Content-Type for the 500 can be ‘text/html’.
        */
        if (err.code === 'ENOENT') {
            const content = await fs.readFile(path.join(publicDir, '404.html'))
            sendResponse(res, 404, 'text/html', content)
        } else {
            const content = `<html><h1>Server Error: ${err.code}</h1></html>`
            sendResponse(res, 500, 'text/html', content)
        }
        console.log(err.code)
    }
}
