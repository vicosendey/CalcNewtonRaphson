function allResults(tabelaResultados){
    let respostaPrincipal = `<br><h4>Resultado: X = ${tabelaResultados[tabelaResultados.length-1].valorNovoXn} com erro de +/- ${erro.value}</h4>`;

    let tabelaTopo = 
    `
    <thead>
        <tr>
            <th class="col">N</th>
            <th class="col">Xn</th>
            <th class="col">f(x)</th>
            <th class="col">f'(x)</th>
            <th class="col">Erro</th>
            <th class="col">Xn+1</th>
        </tr>
    </thead>
    `;
    
    let tabelaVal = "";
    for(var i = 0; i < tabelaResultados.length; i++){
        tabelaVal += 
        `<tr>
            <th scope="row">${i}</td>
            <td>${tabelaResultados[i].valorDeXn}</td> 
            <td>${tabelaResultados[i].equacaoXn}</td>
            <td>${tabelaResultados[i].derivadaXn}</td>
            <td>${tabelaResultados[i].erroAtual}</td>
            <td>${tabelaResultados[i].valorNovoXn}</td>
        </tr>`;
    }
 
    let respostaFinal = 
    `${respostaPrincipal}
    <table>
        <thead>
            ${tabelaTopo}
        </head>
        <tbody>
            ${tabelaVal}
        </tbody>
    </table>`;
    return respostaFinal;
}

exports.show = function(tabelaResultados, erro){
    return allResults(tabelaResultados, erro);
}