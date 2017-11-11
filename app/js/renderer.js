const newtonRaphsonLogic = require("../js/newtonRaphson/newtonRaphsonLogic");
const newtonRaphsonView = require("../js/newtonRaphson/newtonRaphsonView");

let equacaoStr = document.querySelector(".equacao");
let erro = document.querySelector(".erro");
let botao = document.querySelector(".enviar");
let resposta = document.querySelector(".resultados");

//remover todos console.log
botao.addEventListener("click", ()=> {
    let equacaoStrVal = newtonRaphsonLogic.validateEquation(equacaoStr.value);
    let derivadaStrVal = newtonRaphsonLogic.derivative(equacaoStrVal).toString();
    let pontosAB = newtonRaphsonLogic.bolzano(equacaoStrVal);
    let pontosXnM = newtonRaphsonLogic.minValue(derivadaStrVal, pontosAB);
    let tabelaResultados = newtonRaphsonLogic.interactions(equacaoStrVal, derivadaStrVal, pontosXnM, erro.value, []);
    resposta.innerHTML = newtonRaphsonView.show(tabelaResultados, erro.value);
});
