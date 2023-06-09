// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getLink_pages, upsertLink_page, validate } from '../../../../../../../lib/models/link_pages.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get(req) {
  const authorized = !!(req.session.authorized)
  if (!authorized) return { location: '/login' }

  const link_pages = await getLink_pages()
  if (req.session.problems) {
    let { problems, link_page, ...session } = req.session
    return {
      session,
      json: { problems, link_pages, link_page }
    }
  }

  return {
    json: { link_pages }
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
  let { problems, link_page } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, link_page },
      json: { problems, link_page },
      location: '/admin/link_pages'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, link_page: removed, ...newSession } = session
  try {
    const result = await upsertLink_page(link_page)
    return {
      session: newSession,
      json: { link_page: result },
      location: '/admin/link_pages'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/admin/link_pages'
    }
  }
}
