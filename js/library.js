// --- Your GitHub repo info ---
const repoUser = "<your-username>";
const repoName = "<your-repo>";

// --- Load books from /books/ folder ---
async function loadBooks() {
    const res = await fetch(`https://api.github.com/repos/${repoUser}/${repoName}/contents/books`);
    const files = await res.json();

    // Filter only EPUB files
    const books = files.filter(f => f.name.toLowerCase().endsWith(".epub"));

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

    // --- Search bar ---
    const search = document.getElementById("search");
    search.addEventListener("input", () => {
        const q = search.value.toLowerCase();
        [...list.children].forEach(child => {
            child.style.display = child.textContent.toLowerCase().includes(q)
                ? "block"
                : "none";
        });
    });
}

// --- Start ---
loadBooks();
