const buttonsScript = document.currentScript;

const projectRoot = new URL("../", buttonsScript.src);

document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");

    if (!el) return;

    e.preventDefault();

    const action = el.dataset.action;

    switch (action) {

        case "rule":
            window.location.href = new URL(
                "pages/Rule/rule.html",
                projectRoot
            );
            break;

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

        case "home":
            window.location.href = new URL(
                "index.html",
                projectRoot
            );
            break;

        default:
            console.warn("Ação não tratada:", action);
    }
});