fetch("https://tsas-backend.onrender.com/api/notices")

    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("notice-container");
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<p>No notices available.</p>";
            return;
        }

       data.forEach(notice => {

    const created = new Date(notice.createdAt);
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
        <div class="notice-card">
            <strong>
                ${notice.title}
                ${isNew ? '<span class="badge bg-danger ms-2">NEW</span>' : ''}
            </strong><br>

            <!-- 👇 THIS IS WHERE THE LINE GOES -->
            <small>🕒 ${formatted}</small><br>

            <a href="${notice.fileUrl}" target="_blank" download>Download</a>
        </div>
    `;
});

    })
    .catch(() => {
        document.getElementById("notice-container").innerHTML =
            "<p class='text-danger'>Failed to load notices.</p>";
    });
