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

    <a href="${linkPage.link_url_1}" class="btn" target="_blank">${linkPage.link_text_1}</a>
    <a href="${linkPage.link_url_1}" class="btn" target="_blank">${linkPage.link_text_1}</a>
    <a href="${linkPage.link_url_1}" class="btn" target="_blank">${linkPage.link_text_1}</a>
    <a href="${linkPage.link_url_1}" class="btn" target="_blank">${linkPage.link_text_1}</a>
    <a href="${linkPage.link_url_1}" class="btn" target="_blank">${linkPage.link_text_1}</a>
    </main>
`
}
