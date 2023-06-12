# Enhance short plugin
Shortcut utilities for personal sites

## Getting started
Install the plugin:
```sh
npm install https://github.com/ryanbethel/enhance-short-plugin.git
``` 

Add it to the project manifest:
```arc
# app.arc
@plugins
enhance-short-plugin
```

## What it does
- Personal link shortner
- Redirects (with top priority so they are not accidently overridden)
- Link tree pages
- Algorithmic perminant short links for posts (`/2023/01/02/blog/1/my-article` can be accessed with `/b5xg1`)

## Redirects
Redirects with enhance are difficult if you want them to take priority over any built in dynamic routes.
You can make an enhance root catchall with api/$$.mjs, but it will be overridden by any other matching route in the app.
This plugin accepts redirects in the form of a `app/redirects.json` and defines a specific lambda handler for each one.
This ensures that the redirects will have priority over any other route in the app that might otherwise match.


```json
{
  "/serverless-o-auth-with-multiple-providers": {
    "permanent": true,
    "location": "/2020/11/2/blog/1/simple-serverless-oauth-few-dependencies"
  },
  "/something": {
    "permanent": false,
    "location": "/somewhere/else"
  }
}

```

## Link Shortner
To add a new short link navigate to `/admin/short_links`.
Use the form to add a new short link.
You can specify perminent or temporary for 301 or 302 redirects.
These short links can be same site if the path is relative `short` or off site `https://google.com`.

Additional planned features include generating suggested easy to remember links from a list of words (i.e. `/catdog`).

## Link Trees
To add a new link tree navigate to `/admin/link_pages`.
Use the form to add a new page of links with a title and description. 
This accomodates up to 10 links currently.

To customize the link page template add a two new dynamic pages (`/pages/$linkpage.mjs` and `/pages/$linkpage/$$.mjs`).
These two page templates recieve the link page object in the state.

## Algorithmic perminent short links for posts
Perminant short links are determined by algorithm for posts that match the following url scheme.
`/<year>/<month>/<day>/<type>/<ordinal>/<slug>`
i.e. `/2020/11/16/blog/1/graphql-with-dynamodb-a-good-fit/`
The ordinal gives the order of posts within a given day if there are more than one.

The shortened link for the above example becomes `/b59h1`. 
The first letter 'b' is the type of post 'blog'.
The second three characters are a compressed date using a base 60 format.
The final number is the orginal. 
The slug in this url scheme is optional. The date, type, and ordinal fully define the post so the slug just makes the url more readable.

This shortlink format was borrowed from [indieweb.org/permashortlink](https://indieweb.org/permashortlink).

## Internal Routes used
This plugin uses an internal `/api/$root.mjs` and `api/$root/$$.mjs` routes to catch any links, shortened urls, and permishortlinks.
You should avoid redefining a root dynamic route and a root dynamic catchall in your app. 
These would override functions of the plugin.

## Authentication
The routes for adding short links and link pages are behind authentication.
This authentication should be handled in your main app.
This can be done with the enhance blog template or otherwise. 
The plugin assumes an authenticated user will have an `authorized` object attached to the user session.






