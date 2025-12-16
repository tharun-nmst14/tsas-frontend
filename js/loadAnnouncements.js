fetch("https://tsas-backend.onrender.com/api/announcements")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("announcement-container");
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<div class='announcement'>No announcements yet.</div>";
            return;
        }

       data.forEach(a => {

    const created = new Date(a.createdAt);
    const formatted = created.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    const now = new Date();
    const diffHours = (now - created) / (1000 * 60 * 60);
    const isNew = diffHours <= 24;

    container.innerHTML += `
        <div class="announcement">
            <strong>
                ${a.title}
                ${isNew ? '<span class="badge bg-danger ms-2">NEW</span>' : ''}
            </strong><br>

            <!-- 👇 THIS IS WHERE THE LINE GOES -->
            <small>🕒 ${formatted}</small>
        </div>
    `;
});

    })
    .catch(() => {
        document.getElementById("announcement-container").innerHTML =
            "<p class='text-danger'>Failed to load announcements.</p>";
    });
