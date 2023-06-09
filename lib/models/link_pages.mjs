import data from '@begin/data'
import { validator } from '@begin/validator'
import { Link_page } from './schemas/link_page.mjs'

const deleteLink_page = async function (key) {
  await data.destroy({ table: 'link_pages', key })
  return { key }
}

const upsertLink_page = async function (link_page) {
  return data.set({ table: 'link_pages', ...link_page })
}

const getLink_page = async function (key) {
  return data.get({ table: 'link_pages', key })
}

const getLink_pages = async function () {
  const databasePageResults = await data.page({
    table: 'link_pages',
    limit: 25
  })

  let link_pages = []
  for await (let databasePageResult of databasePageResults) {
    for (let link_page of databasePageResult) {
      delete link_page.table
      link_pages.push(link_page)
    }
  }

  return link_pages
}

const validate = {
  shared (req) {
    return validator(req, Link_page)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, link_page: data } : { link_page: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, link_page: data } : { link_page: data }
  }
}

export {
  deleteLink_page,
  getLink_page,
  getLink_pages,
  upsertLink_page,
  validate
}
