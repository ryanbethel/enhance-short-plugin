// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteLink_page } from '../../../../../../../../../lib/models/link_pages.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post(req) {
  const authorized = !!(req.session.authorized)
  if (!authorized) return { status: 401 }

  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, link_page: removed, ...newSession } = session
  try {
    let link_page = await deleteLink_page(id)
    return {
      session: newSession,
      json: { link_page },
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
