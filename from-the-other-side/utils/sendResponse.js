/*
    Challenge 2:

    - Create and export a function called sendResponse().  
    What 4 things should this function take in as parameters?

*/
export function sendResponse(res, statsuCode, contentType, payload) {

    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.setHeader('Access-Control-Allow-Methods', 'GET')
    // res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Methods': 'POST'})

    res.statusCode = statsuCode
    res.setHeader('Content-Type', contentType)
    res.end(payload)
}