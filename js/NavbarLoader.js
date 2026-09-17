const navbarScript = document.currentScript;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const navbarFile = new URL(
            "../components/navbar.html",
            navbarScript.src
        );

        const res = await fetch(navbarFile);

        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        
        const html = await res.text();

        const navbar = document.getElementById("navbar");

        if (!navbar) {
            throw new Error("Elemento #navbar não encontrado.");
        }

        navbar.innerHTML = html;

    } catch (error) {
        console.error("Erro ao carregar a navbar:", error);
    }
});