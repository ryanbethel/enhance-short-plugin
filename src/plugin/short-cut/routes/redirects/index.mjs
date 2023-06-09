import arc from '@architect/functions'
import {readFileSync} from 'fs'
import { join } from 'path'
const redirectsJson = readFileSync(join('node_modules', '@architect', 'views',  'redirects.json'), 'utf8')
const redirects = JSON.parse(redirectsJson)

export const handler = arc.http.async(redirectHandler)
function redirectHandler(req) {
  const redirect = redirects[req.rawPath]
  if (redirect) {
    return {
      status: redirect.type==="permanent" ? 301 : 302,
      location: redirect.location
    }
  }
}
