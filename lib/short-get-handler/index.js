const {SxgToDate} =  require('newbase60')

module.exports = async function shortGetHandler(req) {
  const {getLink_pages} = await import('../models/link_pages.mjs')
  const {getShort_links} = await import('../models/short_links.mjs')
  const path = req.rawPath

  const linkPages = await getLink_pages()
  const linkPage = linkPages.find(link=>link.page_url===path.replace(/^\//,''))
  if (linkPage) {
    return {
      json:{linkPage}
    }
  }
  const shortLinks = await getShort_links()
  const shortLink = shortLinks.find(link=>link.short_url===path.replace(/^\//,''))
  if (shortLink) {
    return {
      status:302,
      location: shortLink.long_url
    }
  }

  const parsed = parseShort(path.replace(/^\//,''))
  if (!parsed) {
    return {
      status:404
    }
  }

  try {
    const dateParts = extractDateParts(SxgToDate(parsed.sxgDate))
    if (!dateParts) {
      return {
        status:404
      }
    }
    const {year,dayOfMonth,month} = dateParts
    const types = {b:'blog',n:'note',c:'comment'}
    const location = `/${year}/${month}/${dayOfMonth}/${types[parsed.type]}/${parsed.ordinal}`
    return {
      status:302,
      location
    }
  } catch(err) {
    return {
      status:404
    }
  }

}

function extractDateParts(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return null;
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
    return null;
  }

  let type = str.charAt(0);
  let sxgDate = str.substring(1, 4);
  let ordinal = parseInt(str.substring(4));

  if (isNaN(ordinal)) {
    return null;
  }

  return {
    type,
    sxgDate,
    ordinal
  };
}
