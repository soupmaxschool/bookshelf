const repoUser = "soupmaxschool";
const repoName = "bookshelf";

async function loadBooks() {
    const res = await fetch(`https://api.github.com/repos/${repoUser}/${repoName}/contents/books`);
    const files = await res.json();

    const books = files.filter(f =>
        f.name.endsWith(".pdf") || f.name.endsWith(".epub")
    );

    const list = document.getElementById("book-list");

    books.forEach(book => {
        const item = document.createElement("div");
        item.className = "book-item";
        item.innerHTML = `
            <h3>${book.name}</h3>
            <a href="reader.html?file=${book.download_url}&title=${encodeURIComponent(book.name)}">
                Open
            </a>
        `;
        list.appendChild(item);
    });

    document.getElementById("search").addEventListener("input", e => {
        const q = e.target.value.toLowerCase();
        [...list.children].forEach(child => {
            child.style.display = child.textContent.toLowerCase().includes(q)
                ? "block"
                : "none";
        });
    });
}

loadBooks();
