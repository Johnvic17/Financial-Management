// Pega o formulário e a div onde o resultado vai aparecer
const form = document.querySelector('#form-simulador');
const resultado = document.querySelector('#resultado');

// Função auxiliar que formata um número como moeda brasileira (ex.: 1500 -> R$ 1.500,00)
const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Executa quando o usuário clica em "Calcular" (evento submit)
form.addEventListener('submit', (e) => {
    // Impede a página de recarregar ao enviar o formulário
    e.preventDefault();

    // Lê os valores dos inputs e converte para número.
    // O "|| 0" evita NaN quando o campo está vazio.
    const renda = parseFloat(document.querySelector('#renda').value) || 0;
    const necessidades = parseFloat(document.querySelector('#necessidades').value) || 0;
    const desejos = parseFloat(document.querySelector('#desejos').value) || 0;
    const poupanca = parseFloat(document.querySelector('#poupanca').value) || 0;

    // Validação: sem renda não dá para calcular porcentagem (e evita divisão por zero)
    if (renda <= 0) {
        resultado.innerHTML = `<div class="alert alert-warning mb-0">Informe uma renda mensal maior que zero.</div>`;
        return; // Para a função aqui
    }

    // Array de objetos com as 3 categorias da regra 50-30-20.
    // "max" = o limite não deve ser ultrapassado; "min" = o ideal é atingir pelo menos
    const categorias = [
        { nome: 'Necessidades', valor: necessidades, meta: 50, tipo: 'max' },
        { nome: 'Desejos',      valor: desejos,      meta: 30, tipo: 'max' },
        { nome: 'Poupança',     valor: poupanca,     meta: 20, tipo: 'min' },
    ];

    // map() percorre cada categoria e gera um bloco de HTML; join('') junta tudo em um texto só.
    // As chaves { } na função recebem as propriedades do objeto direto (destructuring).
    const linhas = categorias.map(({ nome, valor, meta, tipo }) => {
        // Calcula quantos % da renda foi gasto nessa categoria
        const pct = (valor / renda) * 100;

        // Verifica se está dentro da meta (depende se é "max" ou "min")
        const ok = tipo === 'max' ? pct <= meta : pct >= meta;

        // Verde (success) se estiver ok, vermelho (danger) se não
        const cor = ok ? 'success' : 'danger';

        // Template string: monta o HTML com badge, barra de progresso e valores.
        // Math.min(pct, 100) impede a barra de passar de 100% de largura.
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

    // Quanto sobrou (ou faltou) da renda depois de somar tudo
    const restante = renda - (necessidades + desejos + poupanca);

    // Se for negativo, gastou mais do que ganha: alerta vermelho. Senão, mostra o que sobrou.
    const aviso = restante < 0
        ? `<div class="alert alert-danger mb-0">Seus gastos passam da renda em ${brl(Math.abs(restante))}.</div>`
        : `<div class="alert alert-secondary mb-0">Valor não alocado: ${brl(restante)}</div>`;

    // Coloca o resultado final na tela, substituindo a mensagem inicial
    resultado.innerHTML = `<h2 class="h5 mb-4">Sua análise</h2>${linhas}${aviso}`;
});5