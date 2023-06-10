const { DateToSxg } = require('newbase60')
const { readFileSync } = require('fs')
const path = require('path')
// const checkDates = require('./check-dates.js')

function readRedirects({ inventory }) {
  const cwd = inventory.inv._project.cwd
  const redirectsJson = readFileSync(path.join(cwd, 'app', 'redirects.json'), 'utf8')
  return JSON.parse(redirectsJson)
}

function postsDir({ inventory }) {
  const cwd = inventory.inv._project.cwd
  return path.join(cwd, 'app', 'blog', 'posts')
}


module.exports = {
  calcShortLink: function getShortLink(path) {
    const shortDomain = process.env.SHORT_DOMAIN || 'http://localhost:3333'
    const parts = path.split('/')

    const year = parts[1]
    const month = parts[2].padStart(2, '0')
    const day = parts[3].padStart(2, '0')
    const type = parts[4]
    const ordinal = parts[5]

    const sxg = DateToSxg(new Date(`${year}-${month}-${day}`))

    const types = {
      blog: 'b',
      note: 'n',
    }
    return `${shortDomain}/${types[type]}${sxg}${ordinal}`
  },
  // sandbox: { 
  //   start: (params)=>{
  //     checkDates(postsDir(params))
  //   },
  //   watcher: (params) => {
  //     let { filename } = params
  //     if (!filename.includes(postsDir(params)) || !filename.endsWith('.md')) {
  //       return
  //     }
  //     checkDates(postsDir(params))
  //   }
  // },
  // deploy: { 
  //   start: (params)=>{
  //     checkDates(postsDir(params))
  //   }
  // },
  set: {
    http(params) {
      const redirects = readRedirects(params)
      const redirectHandler = path.join(__dirname, 'routes', 'redirects')
      const redirectRoutes = Object.keys(redirects).map(route => (
        {
          method: 'get',
          path: route,
          src: redirectHandler,
          config: {
            // shared: false,
            views: true,
          }
        }
      )
      )

      return [
        ...redirectRoutes,
        {
          method: 'get',
          path: '/short',
          src: path.join(__dirname, 'routes', 'short'),
          config: {
            // shared: false,
            views: true,
          }
        },
        {
          method: 'get',
          path: '/admin/*',
          src: path.join(__dirname, 'routes', 'admin'),
          config: {
            // shared: false,
            views: true,
          }
        },
        {
          method: 'post',
          path: '/admin/*',
          src: path.join(__dirname, 'routes', 'admin'),
          config: {
            // shared: false,
            views: true,
          }
        },
        {
          method: 'get',
          path: '/shorten/*',
          src: path.join(__dirname, 'routes', 'shorten'),
          config: {
            // shared: false,
            views: true,
          }
        },
        {
          method: 'get',
          path: '/:root',
          src: path.join(__dirname, 'routes', 'catchalls'),
          config: {
            // shared: false,
            views: true,
          }
        },
        {
          method: 'get',
          path: '/:root/*',
          src: path.join(__dirname, 'routes', 'catchalls'),
          config: {
            // shared: false,
            views: true,
          }
        },

      ]
    }

  }
}
