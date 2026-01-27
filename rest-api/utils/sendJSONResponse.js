export const sendJSONResponse = (res, statusCode, payload) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Or specifically 'http://localhost:5173'
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
}