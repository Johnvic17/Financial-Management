const form = document.querySelector('#form-simulador');
const resultado = document.querySelector('#resultado');

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const renda = parseFloat(document.querySelector('#renda').value) || 0;
    const necessidades = parseFloat(document.querySelector('#necessidades').value) || 0;
    const desejos = parseFloat(document.querySelector('#desejos').value) || 0;
    const poupanca = parseFloat(document.querySelector('#poupanca').value) || 0;

    if (renda <= 0) {
        resultado.innerHTML = `<div class="alert alert-warning mb-0">Informe uma renda mensal maior que zero.</div>`;
        return;
    }

    // "max" = o limite não deve ser ultrapassado; "min" = o ideal é atingir pelo menos
    const categorias = [
        { nome: 'Necessidades', valor: necessidades, meta: 50, tipo: 'max' },
        { nome: 'Desejos',      valor: desejos,      meta: 30, tipo: 'max' },
        { nome: 'Poupança',     valor: poupanca,     meta: 20, tipo: 'min' },
    ];

    const linhas = categorias.map(({ nome, valor, meta, tipo }) => {
        const pct = (valor / renda) * 100;
        const ok = tipo === 'max' ? pct <= meta : pct >= meta;
        const cor = ok ? 'success' : 'danger';

        return `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>${nome}</span>
                    <span class="badge text-bg-${cor}">${pct.toFixed(1)}% (meta ${meta}%)</span>
                </div>
                <div class="progress" role="progressbar" aria-label="${nome}">
                    <div class="progress-bar bg-${cor}" style="width: ${Math.min(pct, 100)}%"></div>
                </div>
                <small class="text-white-50">${brl(valor)} · ideal: ${brl(renda * meta / 100)}</small>
            </div>`;
    }).join('');

    const restante = renda - (necessidades + desejos + poupanca);
    const aviso = restante < 0
        ? `<div class="alert alert-danger mb-0">Seus gastos passam da renda em ${brl(Math.abs(restante))}.</div>`
        : `<div class="alert alert-secondary mb-0">Valor não alocado: ${brl(restante)}</div>`;

    resultado.innerHTML = `<h2 class="h5 mb-4">Sua análise</h2>${linhas}${aviso}`;
});5