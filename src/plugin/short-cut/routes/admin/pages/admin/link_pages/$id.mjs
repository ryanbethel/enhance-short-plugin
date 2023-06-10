// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
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
  <enhance-text-input label="Page route" type="text" id="page_url" name="page_url" value="${link_page?.page_url}" errors="${problems?.page_url?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link_text_1" type="text" id="link_text_1" name="link_text_1" value="${link_page?.link_text_1}" errors="${problems?.link_text_1?.errors}"></enhance-text-input>
  <enhance-text-input label="Link_url_1" type="text" id="link_url_1" name="link_url_1" value="${link_page?.link_url_1}" errors="${problems?.link_url_1?.errors}"></enhance-text-input>

  <enhance-text-input label="Link_text_2" type="text" id="link_text_2" name="link_text_2" value="${link_page?.link_text_2 || ''}" errors="${problems?.link_text_2?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link_url_2" type="text" id="link_url_2" name="link_url_2" value="${link_page?.link_url_2 || ''}" errors="${problems?.link_url_2?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link_text_3" type="text" id="link_text_3" name="link_text_3" value="${link_page?.link_text_3 || ''}" errors="${problems?.link_text_3?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link_url_3" type="text" id="link_url_3" name="link_url_3" value="${link_page?.link_url_3 || ''}" errors="${problems?.link_url_3?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link_text_4" type="text" id="link_text_4" name="link_text_4" value="${link_page?.link_text_4 || ''}" errors="${problems?.link_text_4?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link_url_4" type="text" id="link_url_4" name="link_url_4" value="${link_page?.link_url_4 || ''}" errors="${problems?.link_url_4?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link_text_5" type="text" id="link_text_5" name="link_text_5" value="${link_page?.link_text_5 || ''}" errors="${problems?.link_text_5?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link_url_5" type="text" id="link_url_5" name="link_url_5" value="${link_page?.link_url_5 || ''}" errors="${problems?.link_url_5?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link_text_6" type="text" id="link_text_6" name="link_text_6" value="${link_page?.link_text_6 || ''}" errors="${problems?.link_text_6?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link_url_6" type="text" id="link_url_6" name="link_url_6" value="${link_page?.link_url_6 || ''}" errors="${problems?.link_url_6?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link_text_7" type="text" id="link_text_7" name="link_text_7" value="${link_page?.link_text_7 || ''}" errors="${problems?.link_text_7?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link_url_7" type="text" id="link_url_7" name="link_url_7" value="${link_page?.link_url_7 || ''}" errors="${problems?.link_url_7?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link_text_8" type="text" id="link_text_8" name="link_text_8" value="${link_page?.link_text_8 || ''}" errors="${problems?.link_text_8?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link_url_8" type="text" id="link_url_8" name="link_url_8" value="${link_page?.link_url_8 || ''}" errors="${problems?.link_url_8?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link_text_9" type="text" id="link_text_9" name="link_text_9" value="${link_page?.link_text_9 || ''}" errors="${problems?.link_text_9?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link_url_9" type="text" id="link_url_9" name="link_url_9" value="${link_page?.link_url_9 || ''}" errors="${problems?.link_url_9?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link_text_10" type="text" id="link_text_10" name="link_text_10" value="${link_page?.link_text_10 || ''}" errors="${problems?.link_text_10?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link_url_10" type="text" id="link_url_10" name="link_url_10" value="${link_page?.link_url_10 || ''}" errors="${problems?.link_url_10?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Theme" type="text" id="theme" name="theme" value="${link_page?.theme}" errors="${problems?.theme?.errors}"></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${link_page?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
