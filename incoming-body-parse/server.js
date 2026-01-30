import path from 'node:path'
import http from 'node:http'
import fs from 'node:fs/promises'
import { getContentType } from './utils/getContentType.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {

  /* handle post here*/

  const publicDir = path.join(__dirname, 'public')
  const pathToResource = path.join(
    publicDir, 
    req.url === '/' ? 'index.html' : req.url
  )

  const content = await fs.readFile(pathToResource)

  const extName = path.extname(pathToResource)
 
  const contentType = getContentType(extName)

  res.statusCode = 200
  res.setHeader('Content-Type', contentType)
  res.end(content)

})

server.listen(PORT, () => console.log('connected on port 8000'))