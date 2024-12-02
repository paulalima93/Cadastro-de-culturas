// Cálculo automático para "Área Total"
document.querySelectorAll('.area-propria, .area-arrendada').forEach(input => {
    input.addEventListener('input', function () {
        // Identificar o campo correspondente de "Área Total"
        const totalField = document.querySelector(`input[name="${this.dataset.total}"]`);

        // Identificar os valores de "Área Própria" e "Área Arrendada"
        const propria = parseFloat(document.querySelector(`.area-propria[data-total="${this.dataset.total}"]`)?.value || 0);
        const arrendada = parseFloat(document.querySelector(`.area-arrendada[data-total="${this.dataset.total}"]`)?.value || 0);

        // Atualizar o valor no campo "Área Total"
        totalField.value = (propria + arrendada).toFixed(2);
    });
});

// Envio dos dados via formulário
document.getElementById("culturasForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await axios.post('/api/culturas', data);
        if (response.status === 200) {
            alert("Dados enviados com sucesso!");
            this.reset();
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Erro ao enviar os dados. Tente novamente.");
    }
});

// Adicionar nova linha à tabela "Informações das Propriedades"
document.getElementById("add-row").addEventListener("click", function () {
    const tbody = document.getElementById("propriedades-body");
    const rowCount = tbody.querySelectorAll("tr").length + 1;

    // Criação de nova linha com campos atualizados
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" class="form-control" name="matricula_${rowCount}"></td>
        <td><input type="text" class="form-control" name="nome_fazenda_${rowCount}"></td>
        <td><input type="number" step="0.01" class="form-control" name="area_total_${rowCount}"></td>
        <td><input type="number" step="0.01" class="form-control" name="area_util_${rowCount}"></td>
        <td><input type="number" step="0.01" class="form-control" name="area_construida_${rowCount}"></td>
        <td><input type="number" step="0.01" class="form-control" name="percentual_soja_${rowCount}"></td>
        <td><input type="number" step="0.01" class="form-control" name="percentual_milho_${rowCount}"></td>
        <td><input type="number" step="0.01" class="form-control" name="percentual_outras_culturas_${rowCount}"></td>
        <td><input type="text" class="form-control" name="cidade_uf_${rowCount}"></td>
        <td><input type="number" step="0.01" class="form-control" name="valor_mercado_${rowCount}"></td>
        <td><input type="number" step="0.01" class="form-control" name="valor_venda_forcada_${rowCount}"></td>
        <td><input type="text" class="form-control" name="coordenadas_${rowCount}"></td>
        <td>
            <select class="form-control" name="arrendada_propria_${rowCount}">
                <option value="arrendada">Arrendada</option>
                <option value="propria">Própria</option>
            </select>
        </td>
    `;

    // Adicionar a nova linha ao corpo da tabela
    tbody.appendChild(newRow);
});

document.addEventListener("input", function () {
    const valores = document.querySelectorAll(".valores");
    const porcentagens = document.querySelectorAll(".porcentagens");
    const totalValores = document.getElementById("total-valores");
    const totalPorcentagem = document.getElementById("total-porcentagem");

    let somaValores = 0;

    // Calcular a soma dos valores
    valores.forEach((input, index) => {
        const valor = parseFloat(input.value) || 0;
        somaValores += valor;
    });

    // Atualizar o total de valores
    totalValores.value = somaValores.toFixed(2);

    // Atualizar porcentagens
    valores.forEach((input, index) => {
        const valor = parseFloat(input.value) || 0;
        const porcentagem = somaValores > 0 ? (valor / somaValores) * 100 : 0;
        porcentagens[index].value = porcentagem.toFixed(2) + "%";
    });

    // Atualizar o total de porcentagem
    totalPorcentagem.value = "100.00%";
});

document.addEventListener("input", function () {
    const valoresABC = document.querySelectorAll(".valores-abc");
    const percentuaisABC = document.querySelectorAll(".percentuais-abc");
    const totalABC = document.getElementById("total-abc");
    const totalPercentualABC = document.getElementById("total-percentual-abc");

    let somaValores = 0;

    // Calcular a soma dos valores
    valoresABC.forEach(input => {
        const valor = parseFloat(input.value) || 0;
        somaValores += valor;
    });

    // Atualizar o total de valores
    totalABC.value = somaValores.toFixed(2);

    // Atualizar os percentuais acumulados
    valoresABC.forEach((input, index) => {
        const valor = parseFloat(input.value) || 0;
        const percentual = somaValores > 0 ? (valor / somaValores) * 100 : 0;
        percentuaisABC[index].value = percentual.toFixed(2) + "%";
    });

    // Atualizar o total de percentual (sempre será 100% se os cálculos estiverem corretos)
    totalPercentualABC.value = "100.00%";
});

