import data from '@begin/data'
import { validator } from '@begin/validator'
import { Short_link } from './schemas/short_link.mjs'

const deleteShort_link = async function (key) {
  await data.destroy({ table: 'short_links', key })
  return { key }
}

const upsertShort_link = async function (short_link) {
  return data.set({ table: 'short_links', ...short_link })
}

const getShort_link = async function (key) {
  return data.get({ table: 'short_links', key })
}

const getShort_links = async function () {
  const databasePageResults = await data.page({
    table: 'short_links',
    limit: 25
  })

  let short_links = []
  for await (let databasePageResult of databasePageResults) {
    for (let short_link of databasePageResult) {
      delete short_link.table
      short_links.push(short_link)
    }
  }

  return short_links
}

const validate = {
  shared (req) {
    return validator(req, Short_link)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, short_link: data } : { short_link: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, short_link: data } : { short_link: data }
  }
}

export {
  deleteShort_link,
  getShort_link,
  getShort_links,
  upsertShort_link,
  validate
}
