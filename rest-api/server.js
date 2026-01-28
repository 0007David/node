import http from 'node:http';
import { InferenceClient } from '@huggingface/inference';

import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js';
import { getDataByPathParams } from './utils/getDataByPathParams.js';
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'

const PORT = 8000;

const server = http.createServer(async (req, res) => {
    /*
    Challenge:
    1. Store our data in a const ‘destinations’.
    2. When a GET request is received to the ‘/api' endpoint, send our JSON stringified data.
        Think: What changes will you need to make to get this to work?
    */
    const destinations = await getDataFromDB();

    /*
      Challenge:
    1. Complete the two lines of code below.
        hint.md for help!
    */

    const urlObj = new URL(req.url, `http://${req.headers.host}`);

    const queryObj = Object.fromEntries(urlObj.searchParams);    
    /*
        Challenge: 
        1. Check the ‘method’ property on the req object.
        Only serve our string if it’s ‘GET’.
    */

    if (urlObj.pathname === '/api' && req.method === 'GET') {

        /*
            Challenge:

            1. Update filteredData so it holds only the objects the client wants 
                based on query params. If the client doesn’t use any query params, 
                serve all of the data.
                The query params we are accepting are:
                'country', 'continent', and 'is_open_to_public'.

                Keep our code tidy by doing the the filtering in a util function.
        
            Challenge:
            1. Access the ‘setHeader’ method on the response object and pass in two strings to set the      
            Content-Type to ‘application/json’ - watch out for casing! 
            2. Access the 'statusCode' property and set it to 200.
        */
        /*
            Challenge:

            1. Update filteredData so it holds only the objects the client wants 
                based on query params. If the client doesn’t use any query params, 
                serve all of the data.
                The query params we are accepting are:
                'country', 'continent', and 'is_open_to_public'.

                Keep our code tidy by doing the the filtering in a util function.
        */
       let filteredData = getDataByQueryParams(destinations, queryObj);        
        sendJSONResponse(res, 200, filteredData);

    } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
        /* Challenge:
        1. Check if the url starts with “/api/continent”.
            (Is there a JS method that allows you to check what a string starts with?)
        2. If it does, serve only items from that continent.
            (How can you get to what comes after the final slash?)
            (What method can you use to filter data?) */
        const continent = req.url.split('/').pop();
        const filteredData = getDataByPathParams(destinations, 'continent', continent);
        sendJSONResponse(res, 200, filteredData);
    } else if (req.url.startsWith('/api/country') && req.method === 'GET') {
        const country = req.url.split('/').pop();
        const filteredData = getDataByPathParams(destinations, 'country', country);
        sendJSONResponse(res, 200, filteredData);
    } else if (req.url.startsWith('/api/chat') && req.method === 'POST') {
        const SYSTEM_PROMPT = `
            You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
        `;
        const ingredientsString = ["all the main spices", "pasta", "ground beef", "tomato paste"];
        const accessToken = "hf_xxxYourHuggingFaceAccessTokenxxx";
        const hf = new InferenceClient(accessToken);
        const out = await hf.chatCompletion({
            // model: "mistralai/Mixtral-8x7B-v0.1",
            // provider: "together",
            model: "Qwen/Qwen3-32B",
            provider: "cerebras",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
            temperature: 0.1,
        });

        sendJSONResponse(res, 200, { content: out.choices[0].message.content });

    } else if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Or specifically 'http://localhost:5173'
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.writeHead(204);
        res.end();
        return;
    } else {
        /*
        Challenge:
        1. If the client tries to access a route that isn’t covered by the above, send this object: 
            {error: "not found", message: "The requested route does not exist"}
        Think: what do we need to send along with the data?
        */
        sendJSONResponse(res, 404, { error: "not found", message: "The requested route does not exist" });
    }


});

/*
Challenge:
1. Recreate our server so we send a string over http when a GET request comes in. 
2. Test it by making a GET request to http://localhost:8000 in the network widget.
See hint.md for prompts.
*/

server.listen(PORT, function (req) {
    console.log(`Server running on port: ${PORT}`);


});
