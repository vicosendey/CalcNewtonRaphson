const math = require("mathjs"); 
   

module.exports = {
    // Implementar verificação...
    validateEquation(equacaoStr){
        equacaoStr = equacaoStr.replace(/,/g, ".");
        equacaoStr = equacaoStr.replace(/expr /gi, "e^");
        equacaoStr = equacaoStr.replace(/expr/gi, "e^");
        equacaoStr = equacaoStr.replace(/ln/gi, "log");

        if (equacaoStr.search(/x/i) == -1){
            console.log("Por favor, utilize X como incognita");
        }
    
        return equacaoStr;
    },
    
    derivative(equacaoStr){
        let equacao = math.parse(equacaoStr);
        return math.derivative(equacao, math.parse("x"));        
    },
    
    bolzano(equacaoStrVal){
        let tentativasVal = [1, 2, 5, 10, 20, 50, 100, 200, 500,
            1000, 2000, 5000, 10000, -10000, -5000, -2000, -1000, -500,
            -200, -100, -50, -20, -10, -5, -2, -1];     
        let tentativaAtual = 0;
        let melhorPalpitePositivoX = 10000;
        let melhorPalpitePositivoVal = 10000;
        let melhorPalpiteNegativoX = -10000;
        let melhorPalpiteNegativoVal = -10000;

        for(var i=0; i < tentativasVal.length; i++){
            tentativaAtual = math.eval(equacaoStrVal, { x : tentativasVal[i] });
            if(tentativaAtual < 0 && tentativaAtual > melhorPalpiteNegativoVal){
                melhorPalpiteNegativoVal = tentativaAtual;
                melhorPalpiteNegativoX = tentativasVal[i];
            }
            if(tentativaAtual > 0 && tentativaAtual < melhorPalpitePositivoVal){
                melhorPalpitePositivoVal = tentativaAtual;
                melhorPalpitePositivoX = tentativasVal[i];
            }
            if(Math.abs(Math.abs(melhorPalpiteNegativoX) - Math.abs(melhorPalpitePositivoX)) < 5){
                break;
            }
        }

        return {
            pontoA : melhorPalpitePositivoX,
            pontoB : melhorPalpiteNegativoX
        }
    },

    minValue(derivadaStrVal, pontos){
        let menorValComp = 0;
        let pontoA = { x : pontos.pontoA };
        let pontoB = { x : pontos.pontoB };

        let mPrimeiroValor = Math.abs(math.eval(derivadaStrVal, pontoA));
        let mSegundoValor = Math.abs(math.eval(derivadaStrVal, pontoB));

        menorValComp = mPrimeiroValor < mSegundoValor ? mPrimeiroValor : mSegundoValor;

        let inicialXn = (pontos.pontoA + pontos.pontoB)/2;

        return {
            atualXn :  inicialXn,
            minimoVal : menorValComp
        };
    },

    interactions(equacaoStrVal, derivadaStrVal, pontos, erroDesejado, result){
        let equacaoVal = 0;
        let derivadaVal = 0;
        let erroAtualVal = 0;
        let pontoSeguinte = 0;

        do{
            let pontoXnVal = { x : pontos.atualXn };

            equacaoVal = math.eval(equacaoStrVal, pontoXnVal);
            derivadaVal = math.eval(derivadaStrVal, pontoXnVal);
            erroAtualVal = Math.abs(equacaoVal/pontos.minimoVal);
            pontoSeguinte = (pontos.atualXn - (equacaoVal/derivadaVal));

            result.push({
                valorDeXn : pontos.atualXn,
                equacaoXn : equacaoVal,
                derivadaXn : derivadaVal,
                erroAtual : erroAtualVal,
                valorNovoXn : pontoSeguinte             
            });

            pontos.atualXn = pontoSeguinte;
        }while((result[result.length-1].erroAtual > erroDesejado));       

        return result;
    }
}