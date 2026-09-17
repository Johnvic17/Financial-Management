const footerScript = document.currentScript;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const footerFile = new URL(
            "../components/footer.html",
            footerScript.src
        );

        const res = await fetch(footerFile);

        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        
        const html = await res.text();

        const footer = document.getElementById("footer");

        if (!footer) {
            throw new Error("Elemento #footer não encontrado.");
        }

        footer.innerHTML = html;

    } catch (error) {
        console.error("Erro ao carregar a footer:", error);
    }
});

