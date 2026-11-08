// Guarda a tag <script> atual para descobrir onde este arquivo está
const navbarScript = document.currentScript;

// Espera o HTML carregar para só depois inserir a navbar
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Caminho do navbar.html a partir do script (js/ -> components/)
        const navbarFile = new URL(
            "../components/navbar.html",
            navbarScript.src
        );

        // Busca o arquivo e espera a resposta
        const res = await fetch(navbarFile);

        // Se der erro (ex.: 404), lança um erro de propósito
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        
        // Converte a resposta em texto (o HTML da navbar)
        const html = await res.text();

        // Pega a div vazia #navbar das páginas
        const navbar = document.getElementById("navbar");

        // Garante que a div existe antes de usar
        if (!navbar) {
            throw new Error("Elemento #navbar não encontrado.");
        }

        // Insere o HTML da navbar dentro da div
        navbar.innerHTML = html;

    } catch (error) {
        // Mostra o erro no console para facilitar o debug
        console.error("Erro ao carregar a navbar:", error);
    }
});