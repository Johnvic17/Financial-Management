// document.currentScript guarda a tag <script> que está sendo executada agora.
// Só funciona durante a execução inicial do arquivo, por isso é salvo logo no começo.
const buttonsScript = document.currentScript;

// Monta a URL da raiz do projeto: pega o caminho do script (.../js/buttons.js) e sobe uma pasta ("../").
// Assim os links funcionam de qualquer página, não importa em que pasta ela esteja.
const projectRoot = new URL("../", buttonsScript.src);

// Event delegation: um único "ouvinte" de clique no documento inteiro,
// em vez de um para cada botão.
document.addEventListener("click", (e) => {
    // Procura o elemento clicado (ou um pai dele) que tenha o atributo data-action
    const el = e.target.closest("[data-action]");

    // Se o clique foi em outra coisa, não faz nada
    if (!el) return;

    // Cancela o comportamento padrão (ex.: um <a href> navegando sozinho)
    e.preventDefault();

    // Lê o valor do data-action (ex.: <button data-action="simulator">)
    const action = el.dataset.action;

    // O switch escolhe a página de destino conforme a ação
    switch (action) {

        case "rule":
            // Redireciona para a página da regra, montando o caminho a partir da raiz
            window.location.href = new URL(
                "pages/Rule/rule.html",
                projectRoot
            );
            break;

        // Os outros cases (organization, reserve, simulator, whatIs, tips, 503020 e home)
        // seguem exatamente o mesmo padrão, só mudando o caminho da página.

        case "organization":
            window.location.href = new URL(
                "pages/Organization/organization.html",
                projectRoot
            );
            break;

        case "reserve":
            window.location.href = new URL(
                "pages/Reserve/reserve.html",
                projectRoot
            );
            break;

        case "simulator":
            window.location.href = new URL(
                "pages/Simulator/simulator.html",
                projectRoot
            );
            break;

        case "whatIs":
            window.location.href = new URL(
                "pages/WhatIs/whatIs.html",
                projectRoot
            );
            break;

        case "tips":
            window.location.href = new URL(
                "pages/Tips/tips.html",
                projectRoot
            );
            break;

        case "503020":
            window.location.href = new URL(
                "pages/503020/503020.html",
                projectRoot
            );
            break;

        case "home":
            window.location.href = new URL(
                "index.html",
                projectRoot
            );
            break;        

        // Se aparecer uma ação que não existe no switch, avisa no console para facilitar o debug
        default:
            console.warn("Ação não tratada:", action);
    }
});