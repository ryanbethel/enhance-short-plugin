// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteShort_link } from '../../../../../../../../../lib/models/short_links.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post(req) {
  const authorized = !!(req.session.authorized)
  if (!authorized) return { status: 401 }

  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, short_link: removed, ...newSession } = session
  try {
    let short_link = await deleteShort_link(id)
    return {
      session: newSession,
      json: { short_link },
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
