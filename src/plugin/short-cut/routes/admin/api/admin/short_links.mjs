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
