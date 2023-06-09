// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  const short_link = store.short_link || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
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
</enhance-page-container>`
}
