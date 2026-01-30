# List of content 

## Build a REST API 

- The core HTTP module
- Creating a server
- Sending status codes (200, 400, etc)
- Setting headers
- Handling request/ responses
- Filtering data
- Extracting query params
- Packages.json is the blueprint
  - Contains metadata (name, version, author, description, etc.)
  - Simplifies collaboration
    - Manage dependencies
    - Define scripts  
 - Nodemon for auto-restarting server on file changes

- Same-Origin Policy (CORS): <br> By default, browsers enforce a same-origin policy. This means requests can only be made to the same protocol, domain and port as the one serving the web page.<br> CORS is a mechanism that allows servers to specify who can access their resources and how. It does this by adding specific HTTP headers to responses.

## From the other Side

- Serve assests
  - Reading and serving data
    - Identify what resources the client wants.
    - Identify the path to that resource:
      - The current module's directory
      - The path to the resource from that directory
    - Read the resources we want to serve using FS module
    - Send those resources to the client
  - Using import.meta: <br> is an object specific to the modular JS environment, which provides metadata about the current module.  
- Provide data via an API
- Add user input to our data
- Extra
  - A section on events

We will be studying:

- The FS module
- The path module <br> 
  - Absolute Path: 
    - show the full location of the file or folder on the system where your code is running. 
    - Always the same, no matter where you run your main script (server.js in our case).
    - Independent of the current working directory (CWD).
  - Relative Path:
    - Relate to the file it appears in.
    - Often includes <.> (current folder) or <..> (up one folder).
    - We often see this in import statements.
  - Relatives paths creaded with Path Module:
    - Start the current Working Directory.
    - Are therefore affected bu changes to the CWD.
    - That means they are not as safe, but sometimes more flexible.
- Serving static assets
- Global vars in Node.js
- Using a dependency to sanitize input
- Event-Driver Architecture
- Events: an event signal that something happened
  - A user cicks a button
  - A file finishes downloading
  - A network request is received
  - And many more...
- Event Emitters 
- Server-sent events: <br> A standard allowing servers to push real-time updates to clients over HTTP.
  - chat apps
  - Doorbell cams
  - Anything where two-way communication is needed
- 

Diferencia res.writeHead() y res.setHeader():

- res.setHeader(): Sets a response header but doesn't send it immediately. Allows you to set or modify headers indivially, at any point before sending the response.
  - Potenncial problem: A header set using setHeader() after writeHead() will not be included in the response.<br> A header set using setHeader() can be overruled by a header set with writeHead().
  
- res.writeHead(): Sends any headers immediately. No further modification is posible.

## Stretch Goals

- Genter error handling
  - A client requests /api/xyz which does not exist
  - A client requests /api but uses a method other than GET or POST
  - A client sends invalid JSON in a POST request
- Add uuids to incoming data
  - Use a dependency to generate the uuids
- Handle POST Request
  - Collect the incoming data chunks
  - Parse it
  - Sanitize it
  - Get our existing data
  - add the new data to the existing data
  - Write the completed data to the JSON file
  - ignore authentication for now
- Add better filtering
- XSS Attack (Cross-Site Scripting) <br> attack is a security vulnerability that allows an attacker to inject malicious scripts into web pages.
- Expand this api and sell it!
