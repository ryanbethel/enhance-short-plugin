// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getShort_link, upsertShort_link, validate } from '../../../../../../../../models/short_links.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const authorized = !!(req.session.authorized)
  if (!authorized) return { location: '/login' }

  if (req.session.problems) {
    let { problems, short_link, ...session } = req.session
    return {
      session,
      json: { problems, short_link }
    }
  }

  const id = req.pathParameters?.id
  const result = await getShort_link(id)
  return {
    json: { short_link: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const authorized = !!(req.session.authorized)
  if (!authorized) return { status: 401 }

  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, short_link } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, short_link },
      json: { problems, short_link },
      location: `/admin/short_links/${short_link.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, short_link: removed, ...newSession } = session
  try {
    const result = await upsertShort_link({ key: id, ...short_link })
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
