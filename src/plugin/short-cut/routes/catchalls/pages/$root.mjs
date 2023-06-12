export default function linkPage({ html, state }) {
  const { linkPage } = state.store

  return html`
    <style>
        .container {
            width: 80%;
            text-align: center;
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            justify-items: center;
        }

        h1, p {
            grid-column: 1 / -1;
        }

        .btn {
            width: 100%;
            padding: 20px;
            text-decoration: none;
            font-size: 20px;
            color: var(--color-dark);
            background: lightgreen ;
            border-radius: 5px;
            transition: background 0.3s;
        }

        .btn:hover {
            background: #0056b3;
        }

        @media screen and (min-width: 600px) {
            .container {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
    <main class="container">
    <h1 class="">${linkPage.title || ''}</h1>
    <p>${linkPage.description || ''}</p>

    ${linkPage.link_url_1 ? `<a href="${linkPage.link_url_1}" class="btn" target="_blank">${linkPage.link_text_1}</a>` : ''}
    ${linkPage.link_url_2 ? `<a href="${linkPage.link_url_2}" class="btn" target="_blank">${linkPage.link_text_2}</a>` : ''}
    ${linkPage.link_url_3 ? `<a href="${linkPage.link_url_3}" class="btn" target="_blank">${linkPage.link_text_3}</a>` : ''}
    ${linkPage.link_url_4 ? `<a href="${linkPage.link_url_4}" class="btn" target="_blank">${linkPage.link_text_4}</a>` : ''}
    ${linkPage.link_url_5 ? `<a href="${linkPage.link_url_5}" class="btn" target="_blank">${linkPage.link_text_5}</a>` : ''}
    ${linkPage.link_url_6 ? `<a href="${linkPage.link_url_6}" class="btn" target="_blank">${linkPage.link_text_6}</a>` : ''}
    ${linkPage.link_url_7 ? `<a href="${linkPage.link_url_7}" class="btn" target="_blank">${linkPage.link_text_7}</a>` : ''}
    ${linkPage.link_url_8 ? `<a href="${linkPage.link_url_8}" class="btn" target="_blank">${linkPage.link_text_8}</a>` : ''}
    ${linkPage.link_url_9 ? `<a href="${linkPage.link_url_9}" class="btn" target="_blank">${linkPage.link_text_9}</a>` : ''}
    ${linkPage.link_url_10 ? `<a href="${linkPage.link_url_10}" class="btn" target="_blank">${linkPage.link_text_10}</a>` : ''}
    </main>
`
}
