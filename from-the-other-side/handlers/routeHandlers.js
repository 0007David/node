import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { addNewSighting } from '../utils/addNewSighting.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'
import { sightingEvents } from '../events/sightingEvents.js'
import { stories } from "../data/stories.js";

export async function handleGet(res) {
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 200, 'application/json', content)
}

/*
Challenge:
  1. Create and export a function called handlePost().
  2. For now, that function can just log 'POST request received'.
*/
export async function handlePost(req, res) {
    try {
        // parseJSONBody() will collect and parse the incoming JSON
        const parseBody = await parseJSONBody(req);

        // santizeData()
        const sanitizeBody = sanitizeInput(parseBody);
        // addNewSighting() will do the donkey work of adding the data to our dataset
        await addNewSighting(sanitizeBody);
        sightingEvents.emit('sighting-added', sanitizeBody)
        // sendResponse()
        sendResponse(res, 201, 'application/json', JSON.stringify(sanitizeBody));
    } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }));
    }
}

export function handleNews(req, res) {
    res.statusCode = 200

    /*
    Challenge 1:
      1. Set Content-Type, Cache-Control, and Connection headers
    */
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    setInterval(() => {
        let randomIndex = Math.floor(Math.random() * stories.length)

        /*
        Challenge 2:
          1. Use res.write() to send an object to the frontend. 
        
          The object should include:
            - an event property with a descriptive name.
            - a story chosen at random from the stories array.
    
          Remember, the object is contained in a string which starts with 'data: '. 
          What do you need at the end of the string to signal the end of a message block?
        
        */
       res.write(
        `data: ${JSON.stringify({ event: 'new-update', story: stories[randomIndex] })}\n\n`
        )

    }, 3000)
}

