// Guarda a tag <script> atual (mesma ideia do buttons.js), para descobrir onde este arquivo está
const footerScript = document.currentScript;

// Espera o HTML da página carregar antes de mexer nele.
// O "async" permite usar "await" dentro da função.
document.addEventListener("DOMContentLoaded", async () => {
    // try/catch: se algo der errado, o erro é tratado e o site não quebra
    try {
        // Monta o caminho do footer.html a partir da localização deste script (js/ -> components/)
        const footerFile = new URL(
            "../components/footer.html",
            footerScript.src
        );

        // fetch busca o arquivo; o await espera a resposta chegar
        const res = await fetch(footerFile);

        // res.ok é falso para erros como 404 (arquivo não encontrado). Aí lançamos um erro de propósito
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        
        // Converte a resposta em texto (o HTML do rodapé)
        const html = await res.text();

        // Pega a div vazia que está nas páginas
        const footer = document.getElementById("footer");

        // Garante que a div existe antes de usar
        if (!footer) {
            throw new Error("Elemento #footer não encontrado.");
        }

        // Insere o HTML do rodapé dentro da div
        footer.innerHTML = html;

    } catch (error) {
        // Mostra o erro no console para facilitar o debug
        console.error("Erro ao carregar a footer:", error);
    }
});

