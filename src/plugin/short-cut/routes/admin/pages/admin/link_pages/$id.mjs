// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  const link_page = store.link_page || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/admin/link_pages/${link_page.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Link_page">
  <enhance-text-input label="Title" type="text" id="title" name="title" value="${link_page?.title}" errors="${problems?.title?.errors}"></enhance-text-input>
  <enhance-text-input label="Description" type="text" id="description" name="description" value="${link_page?.description}" errors="${problems?.description?.errors}"></enhance-text-input>
  <enhance-text-input label="Link_text_1" type="text" id="link_text_1" name="link_text_1" value="${link_page?.link_text_1}" errors="${problems?.link_text_1?.errors}"></enhance-text-input>
  <enhance-text-input label="Link_url_1" type="text" id="link_url_1" name="link_url_1" value="${link_page?.link_url_1}" errors="${problems?.link_url_1?.errors}"></enhance-text-input>
  <enhance-text-input label="Theme" type="text" id="theme" name="theme" value="${link_page?.theme}" errors="${problems?.theme?.errors}"></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${link_page?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
