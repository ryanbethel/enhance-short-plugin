// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  let short_links = store.short_links || []
  const short_link = store.short_link || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Short_links page</h1>
    ${short_links.map(item => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">short_url: </strong>${item?.short_url || ''}</p>
  <p class="pb-2"><strong class="capitalize">long_url: </strong>${item?.long_url || ''}</p>
  <p class="pb-2"><strong class="capitalize">type: </strong>${item?.type || ''}</p>
  <p class="pb-2"><strong class="capitalize">same_site: </strong>${item?.same_site || ''}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mb-1">
  <enhance-link href="/admin/short_links/${item.key}">Edit this short_link</enhance-link>
</p>
<form action="/admin/short_links/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this short_link</span></enhance-submit-button>
</form>
</article>`).join('\n')}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New short_link</summary>
    <enhance-form
  action="/admin/short_links/${short_link.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Short_link">
  <enhance-text-input label="Short_url" type="text" id="short_url" name="short_url" value="${short_link?.short_url}" errors="${problems?.short_url?.errors}"></enhance-text-input>
  <enhance-text-input label="Long_url" type="text" id="long_url" name="long_url" value="${short_link?.long_url}" errors="${problems?.long_url?.errors}"></enhance-text-input>
  <enhance-text-input label="Type" type="text" id="type" name="type" value="${short_link?.type}" errors="${problems?.type?.errors}"></enhance-text-input>
  <enhance-checkbox label="Same_site" type="checkbox" id="same_site" name="same_site" value="${short_link?.same_site}" errors="${problems?.same_site?.errors}"></enhance-checkbox>
  <input type="hidden" id="key" name="key" value="${short_link?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</details>
</main>
</enhance-page-container>
  `
}
