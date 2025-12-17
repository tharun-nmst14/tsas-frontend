// IMPORTANT LINKS - LOCAL SETUP
const backendURL = "http://https://tsas-backend.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    fetch(`${backendURL}/api/important-links`)
        .then(response => response.json())
        .then(links => {
            const container = document.getElementById("important-links-container");
            container.innerHTML = "";

            if (!Array.isArray(links) || links.length === 0) {
                container.innerHTML =
                    "<p class='text-muted'>No important links available.</p>";
                return;
            }

            links.forEach((link, index) => {
                const isNew = index === 0; // latest link

                container.innerHTML += `
                    <div class="notice-card">
                        <a href="${link.url}" 
                           target="_blank" 
                           rel="noopener noreferrer">
                            🔗 <strong>${link.title}</strong>
                        </a>
                        ${isNew ? `<span class="badge bg-danger ms-2">NEW</span>` : ""}
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error loading important links:", error);
            document.getElementById("important-links-container").innerHTML =
                "<p class='text-danger'>Failed to load important links.</p>";
        });
});
