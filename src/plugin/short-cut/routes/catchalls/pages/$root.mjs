export default function linkPage({ html, state }) {
  const { linkPage } = state.store

  return html`
    <style>
        a {
            display: block;
            text-align: center;
            max-width: 300px;
            margin: 10px;
            padding: 15px 30px;
            background-color: blue; 
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
    <h1>${linkPage.title || ''}</h1>
    <p>${linkPage.description || ''}</p>

    <a href="${linkPage.link_url_1}" target="_blank">${linkPage.link_text_1}</a>
    <a href="${linkPage.link_url_1}" target="_blank">${linkPage.link_text_1}</a>
    <a href="${linkPage.link_url_1}" target="_blank">${linkPage.link_text_1}</a>
    <a href="${linkPage.link_url_1}" target="_blank">${linkPage.link_text_1}</a>
    <a href="${linkPage.link_url_1}" target="_blank">${linkPage.link_text_1}</a>
`
}
