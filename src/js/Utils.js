export class CalcFactory {
  constructor(){    
    this.make = this.make.bind(this);
    this.n1 = null;
    this.n2 = null;
    this.op = null;
    this.opsig = null;
    this.make = this.make.bind(this);
  }
  make(score, level) {
    this.score = score;
    this.level = level;
    const gradSumProb = (20 - (this.score*10/10)) >= 0 ? (10 - (this.score*10/10)) : 5;
    const gradSubProb = 3 + (this.score*10/12);
    const gradMultProb = 0 + (this.score*10/10);
    const norm = gradSumProb + gradSubProb + gradMultProb;
    
    const sumProbs = [0.75, 0.5, 0.25, gradSumProb/norm];
    const subProbs = [0.25, 0.5, 0.25, gradSubProb/norm];
    const multProbs = [0.0, 0.0, 0.5 , gradMultProb/norm];
    const transAllowed = [false, true, true, true];
    const n1Max = [50, 100, 500, this.score*10 + 1];
    const n2Max = [50, 100, 500, this.score*10 + 1];

    /* define a operação */
    const prob = Math.random();    
    if(prob < sumProbs[this.level - 1]){
      this.opsig = "+";
      this.op = "Mais";
    }else if(prob < (sumProbs[this.level - 1] + subProbs[this.level - 1])){
      this.opsig = "-";
      this.op = "Menos"
    }else if(prob < (sumProbs[this.level - 1] + subProbs[this.level - 1] + multProbs[this.level - 1])){
      this.opsig = "x";
      this.op = "Vezes";
    }else{
      /* jamais deveria chegar nesse ponto, mas tenho que usar essa
       * verificação por segurança e lançar a exceção adequada */
      console.log("Problema na escolha de operação na Fábrica de contas: fora das probabilidades de escolha");
    }

    do{
      /* define os valores */
      if(this.opsig === "+"){
          this.n1 = Math.round(Math.random() * n1Max[this.level - 1]);
          this.n2 = Math.round(Math.random() * n2Max[this.level - 1]);
      }else if(this.opsig === "-"){
          do{
              this.n1 = Math.round(Math.random() * n1Max[this.level - 1]);
              this.n2 = Math.round(Math.random() * n2Max[this.level - 1]);
          /* impede resultados negativos */
          }while(this.n1 < this.n2);
      }else if(this.opsig === "x"){
          /* usa grandezas reduzidas (7% do valor) no caso de multiplicações */
          this.n1 = Math.round(Math.random() * n1Max[this.level - 1] * 0.08);
          this.n2 = Math.round(Math.random() * n2Max[this.level - 1] * 0.04);
      }

      var transported = false;      
      var n1Array = this.n1.toString().split("");
      var n2Array = this.n2.toString().split("");
      /* adiciona zeros no começo dos números até que tenham o mesmo tamanho */
      while(n1Array.length !== n2Array.length){
        if(n1Array.length > n2Array.length){
            n2Array.unshift("0");
        }
        if(n1Array.length < n2Array.length){
            n1Array.unshift("0");
        }
      }      
      for(var i = 0; i < n1Array.length; i++){
        switch(this.opsig){
          case "+":
            if((parseInt(n1Array[i], 10) + parseInt(n2Array[i], 10)) > 9){              
              transported = true;
            }
            break;
          case "-":
            if((parseInt(n1Array[i], 10) - parseInt(n2Array[i], 10)) < 0){              
              transported = true;
            }
            break;
          default:
            break;
        }
      }
    /* repete enquanto não for permitido transporte E houver transporte */
    }while(!transAllowed[this.level - 1] && transported);

    /* instanciar, atualizar na View e devolver Conta */    
    return {n1: parseInt(this.n1, 10), n2: parseInt(this.n2, 10), opsig: this.opsig, op: this.op};
  }
}