// --- Get URL parameters ---
const params = new URLSearchParams(window.location.search);
const file = params.get("file");
const title = params.get("title") || "Untitled";

// --- Set title ---
const titleEl = document.getElementById("title");
if (titleEl) {
    titleEl.textContent = decodeURIComponent(title);
}

// --- Viewer element ---
const viewerEl = document.getElementById("viewer");

// --- Validate file ---
if (!file) {
    viewerEl.textContent = "No EPUB file specified.";
} else if (!file.toLowerCase().endsWith(".epub")) {
    viewerEl.textContent = "Only EPUB files are supported.";
} else {
    renderEpub(file);
}

// --- EPUB rendering ---
function renderEpub(url) {
    try {
        const book = ePub(url);

        // Render into #viewer
        book.renderTo("viewer", {
            flow: "paginated",
            width: "100%",
            height: "100%"
        });

        // Optional: track location changes
        book.on("renderer:locationChanged", (loc) => {
            localStorage.setItem("lastLocation:" + url, loc.start.cfi);
        });

        // Optional: resume last location
        const last = localStorage.getItem("lastLocation:" + url);
        if (last) {
            book.rendition.display(last);
        } else {
            book.rendition.display();
        }

    } catch (err) {
        console.error(err);
        viewerEl.textContent = "Failed to load EPUB.";
    }
}
