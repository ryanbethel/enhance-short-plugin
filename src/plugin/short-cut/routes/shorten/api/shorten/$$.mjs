import { DateToSxg } from 'newbase60'

export async function get(req) {


  const { path: activePath } = req
  const docPath = activePath.replace(/^\/?short/, '') 

  return {
    json: getShortLink(docPath)
  }
}

function getShortLink(path) {
  const shortDomain = process.env.SHORT_DOMAIN || 'http://localhost:3333'
  const parts = path.split('/')

  const year = parts[1]
  const month = parts[2].padStart(2, '0')
  const day = parts[3].padStart(2, '0')
  const type = parts[4]
  const ordinal = parts[5]

  const sxg = DateToSxg(new Date(`${year}-${month}-${day}`))

  const types = {
    blog:'b',
    note:'n',
  }
  return `${shortDomain}/${types[type]}${sxg}${ordinal}`
}

