// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getShort_links, upsertShort_link, validate } from '../../../../../../../lib/models/short_links.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get(req) {
  const authorized = !!(req.session.authorized)
  if (!authorized) return { location: '/login' }

  const short_links = await getShort_links()
  if (req.session.problems) {
    let { problems, short_link, ...session } = req.session
    return {
      session,
      json: { problems, short_links, short_link }
    }
  }

  return {
    json: { short_links }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post(req) {
  const authorized = !!(req.session.authorized)
  if (!authorized) return { status: 401 }

  const session = req.session
  // Validate
  let { problems, short_link } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, short_link },
      json: { problems, short_link },
      location: '/admin/short_links'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, short_link: removed, ...newSession } = session
  try {
    const result = await upsertShort_link(short_link)
    return {
      session: newSession,
      json: { short_link: result },
      location: '/admin/short_links'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/admin/short_links'
    }
  }
}


const shortWords = [
  'act', 'add', 'age', 'aim', 'air', 'all', 'arm', 'art', 'ask', 'bag',
  'bar', 'bed', 'big', 'bit', 'box', 'boy', 'bus', 'buy', 'can', 'car',
  'cat', 'cut', 'dad', 'day', 'dog', 'dry', 'due', 'ear', 'eat', 'end',
  'eye', 'far', 'fat', 'few', 'fit', 'fix', 'fly', 'for', 'fun', 'gap',
  'gas', 'get', 'guy', 'hat', 'her', 'him', 'hit', 'hot', 'how', 'ice',
  'ill', 'ink', 'jar', 'jet', 'job', 'key', 'kid', 'kin', 'kit', 'leg',
  'let', 'lie', 'lip', 'log', 'lot', 'low', 'mad', 'man', 'map', 'mat',
  'may', 'mom', 'mud', 'net', 'new', 'not', 'now', 'nut', 'oak', 'old',
  'one', 'out', 'pan', 'pen', 'pet', 'pie', 'pin', 'pit', 'pot', 'put',
  'ran', 'rat', 'red', 'rip', 'row', 'rub', 'run', 'sad', 'saw', 'sea',
  'see', 'set', 'she', 'sit', 'sky', 'son', 'sun', 'tab', 'tea', 'tie',
  'tin', 'tip', 'top', 'toy', 'try', 'two', 'use', 'van', 'vet', 'war',
  'was', 'way', 'web', 'wet', 'who', 'why', 'win', 'yes', 'yet', 'you',
  'zip', 'ant', 'bee', 'cow', 'cub', 'dog', 'egg', 'fun', 'hen', 'ink',
  'jam', 'kid', 'lap', 'men', 'nip', 'owl', 'pig', 'rug', 'sip', 'tin',
  'urn', 'vow', 'wax', 'yip', 'zap', 'bay', 'cay', 'day', 'ebb', 'hay',
  'icy', 'joy', 'key', 'lay', 'may', 'nay', 'oaf', 'pay', 'ray', 'say',
  'toy', 'way', 'boy', 'coy', 'dry', 'guy', 'joy', 'soy', 'toy', 'wry',
  'gym', 'shy', 'sky', 'sly', 'spy', 'try', 'why', 'pry', 'fry', 'cry',
  'ply', 'bye'
]
