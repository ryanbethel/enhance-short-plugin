import { SxgToDate } from 'newbase60'
// import { getLink_pages } from '../../../../../../lib/models/link_pages.mjs'
// import { getShort_links } from '../../../../../../lib/models/short_links.mjs'
import { getLink_pages } from 'enhance-short-plugin/link_pages'
import { getShort_links } from 'enhance-short-plugin/short_pages'

export async function get(req) {
  console.log("root catchall", req)
  // const { getLink_pages } = await import('../../../../../../lib/models/link_pages.mjs')
  // const { getShort_links } = await import('../../../../../../lib/models/short_links.mjs')
  const path = req.rawPath

  console.log("here1")
  const linkPages = await getLink_pages()
  const linkPage = linkPages.find(link => link.page_url === path.replace(/^\//, ''))
  if (linkPage) {
    return {
      json: { linkPage }
    }
  }
  console.log("here2")
  const shortLinks = await getShort_links()
  const shortLink = shortLinks.find(link => link.short_url === path.replace(/^\//, ''))
  if (shortLink) {
    return {
      status: 302,
      location: shortLink.long_url
    }
  }

  console.log("here3")
  try {
    const parsed = parseShort(path.replace(/^\//, ''))
    const { year, dayOfMonth, month } = extractDateParts(SxgToDate(parsed.sxgDate))
    const types = { b: 'blog', n: 'note', c: 'comment' }
    const location = parsed ? `/${year}/${month}/${dayOfMonth}/${types[parsed.type]}/${parsed.ordinal}` : '/'
    return {
      status: 302,
      location
    }
  } catch (err) {
    console.log(err)
  }

  return {
    status: 404
  }

}

function extractDateParts(date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date object');
  }

  let year = date.getFullYear();
  let dayOfMonth = date.getDate();
  // JavaScript's getMonth() function returns a 0-based month number, so we add 1 to get the human-readable month number
  let month = date.getMonth() + 1;

  return {
    year,
    dayOfMonth,
    month
  };
}

function parseShort(str) {
  if (str.length < 5) {
    throw new Error('Invalid string format');
  }

  let type = str.charAt(0);
  let sxgDate = str.substring(1, 4);
  let ordinal = parseInt(str.substring(4));

  if (isNaN(ordinal)) {
    throw new Error('Invalid number format');
  }

  return {
    type,
    sxgDate,
    ordinal
  };
}
