var matriz = new Array();
var posicionArtif=new Array();

function newInput() {
    var c=1;
    var array = ["<=", ">=", "="];
    var inpt = document.createElement('input');
    var num_variables_decision = document.getElementById("num_variables_decision").value;
    var num_restricciones = document.getElementById("num_restricciones").value;
    var selectList = document.createElement('select');
    document.f1.innerHTML += "<strong>Z=</strong>";

    if (num_variables_decision) {
        for (var i = 0; i < num_variables_decision; i++) {
          inpt.type = "text";
          inpt.name = "objetivo" + i;
          inpt.id = "objetivo" + i;
          document.f1.appendChild(inpt);
          if(i!=num_variables_decision-1)
            document.f1.innerHTML += "<strong>X"+(i+1)+"+ </strong>";
          else document.f1.innerHTML += "<strong>X"+(i+1)+"</strong>";
        }
        document.f1.innerHTML += "</br>";
    }

    if(num_restricciones){
      for(var i = 0; i< num_restricciones; i++){
        for(var j=0; j< parseInt(num_variables_decision)+1; j++){
          inpt.type = "text";
          inpt.name = "input_"+j+"_"+i;
          inpt.id = "input_"+j+"_"+i;
          document.f1.appendChild(inpt);
          if(j<num_variables_decision-1)
            document.f1.innerHTML += "<strong>X"+(j+1)+"+</strong>";
            else if(j<num_variables_decision){
              document.f1.innerHTML +="<strong>X"+(j+1)+"</strong>";
            selectList.id = "input_"+i;
            document.f1.appendChild(selectList);
            }

          if(j == num_variables_decision  && c==1){
            for (var k = 0; k < array.length; k++) {
                    var option = document.createElement("option");
                    option.value = array[k];
                    option.text = array[k];
                    selectList.appendChild(option);
                }
                c=0;
        }
        document.f1.appendChild(inpt);
        }
        document.f1.innerHTML += "</br>";
      }
    }
    document.f1.innerHTML+="<div>"+"<input type='button' value='solve' onclick='ecuacion()' id='solve'>"+"</div>";
}

function ecuacion(){
  var prueba = document.getElementById("prueba");
  var num_variables_decision = document.getElementById("num_variables_decision").value;
  var num_restricciones = document.getElementById("num_restricciones").value;
  var contador_seleccion;
  var posicionExcHolgAr=parseInt(num_variables_decision);
  var entra;
  var sale;

  var entraMin;
  var saleMin;

  var hacerUno;


  contador_seleccion = dimMatriz(num_restricciones);
  crearMatriz(num_restricciones);
  inicializaMatriz(num_restricciones,num_variables_decision,contador_seleccion);
  restriccionesMatriz(num_restricciones,num_variables_decision,contador_seleccion);
  agregandoHolExArti(num_restricciones,posicionExcHolgAr);
  calculaWprima(num_variables_decision,contador_seleccion);
  //entra=posEntra(num_variables_decision,contador_seleccion);
  //sale=posSale(num_restricciones,num_variables_decision,contador_seleccion,entra)

  //---------------------------- aqui empezamos a iterar sobre la matriz-----------


//var bandera=true;
//while(){
for(var k=0; k<100;k++){
  var mayor=0;
  var menor=1000000000;
  for(var j=0; j<parseInt(num_variables_decision)+parseInt(contador_seleccion)+2; j++){
    if(j<parseInt(num_variables_decision)+parseInt(contador_seleccion)){
      if(matriz[0][j+1]>0 && matriz[0][j+1]>mayor){
          mayor = matriz[0][j+1];
          entraMin = j+1;
        }else break;
    }
  }
  for(var i=0; i<num_restricciones; i++){
      if(matriz[i+1][entraMin]!=0 || matriz[i+1]>0 ){
          if((matriz[i+1][parseInt(num_variables_decision)+parseInt(contador_seleccion)+1]/matriz[i+1][entraMin])<menor){
            menor = matriz[i+1][parseInt(num_variables_decision)+parseInt(contador_seleccion)+1]/matriz[i+1][entraMin];
            saleMin = i+1;
            }
      }
  }

  hacerUno = matriz[saleMin][entraMin];
  for(var j=0; j<parseInt(num_variables_decision)+parseInt(contador_seleccion)+2; j++){
      matriz[saleMin][j]/=hacerUno;
      /*var num=parseInt(matriz[saleMin][j])/hacerUno;
      var redondeado = num.toFixed(2);
      matriz[saleMin][j]=redondeado;*/
  }

  for(var i=0; i<parseInt(num_restricciones)+1; i++){
    var vector = new Array();
      if(matriz[i][entraMin]>0 && i!=saleMin){
        var aux = matriz[i][entraMin];
        for(var j=0; j<parseInt(num_variables_decision)+parseInt(contador_seleccion)+2; j++){
        vector.push(matriz[saleMin][j]*aux);
        matriz[i][j]-=vector[j];
      }
    }else if(matriz[i][entraMin]<0 && i!=saleMin){
      var aux = matriz[i][entraMin];
      for(var j=0; j<parseInt(num_variables_decision)+parseInt(contador_seleccion)+2; j++){
      vector.push(matriz[saleMin][j]*aux);
      matriz[i][j]+=vector[j];
    }
    }
  }
}

  //for(var i=0; i< parseInt(num_variables_decision)+parseInt(contador_seleccion)+2; i++)
  //  prueba.innerHTML+=horizontal[i];
  //prueba.innerHTML+=posicionExcHolgAr;
  //imprimeMatriz(num_restricciones,num_variables_decision,contador_seleccion);
  prueba.innerHTML+="entra " + entraMin;
  prueba.innerHTML+="sale " + saleMin;
  imprimirTabla(num_restricciones,num_variables_decision,contador_seleccion);
}

function dimMatriz(restric){//calculando las dimenciones de la matriz
  var seleccion;
  var conta_select=0;
  for(var i=0; i<restric; i++){
    seleccion = document.getElementById("input_"+i).value;
    if(seleccion == "<=" || seleccion=="=")
      conta_select+=1;
    else conta_select+=2;
  }
  return conta_select;
}

function crearMatriz(restric){
  for(var i=0; i<parseInt(restric)+1;i++)
      matriz[i]= new Array();
}

function inicializaMatriz(restric, varDecision, contaSelect){
  for(var i=0; i<parseInt(restric)+1;i++)
    for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2;j++)
      matriz[i][j]=0;
}

function imprimeMatriz(restric, varDecision, contaSelect){
  for(var i=0; i<parseInt(restric)+1; i++){
    for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2; j++){
      prueba.innerHTML+=matriz[i][j];
    }
      prueba.innerHTML+="\n";
  }
}

function restriccionesMatriz(restric, varDecision, contaSelect){ //recuperacion de la informacion de las restricciones
  for(var i=0; i<restric; i++){
      for(var j=0; j< parseInt(varDecision)+1; j++){
          if(j==varDecision) //para poner los valores en el R.H
            matriz[i+1][parseInt(varDecision)+parseInt(contaSelect)+1]=document.getElementById("input_"+j+"_"+i).value;
          else matriz[i+1][j+1]=document.getElementById("input_"+j+"_"+i).value;
      }
    }
  }

function agregandoHolExArti(restric,posHEA){ //agregando las variables de holgura, exceso y artificiales a la matriz
  var seleccion;
  posicionArtif.push(0);
  for(var i=0; i<restric; i++){
    seleccion = document.getElementById("input_"+i).value;
    if(seleccion == "<="){
      posHEA+=1;
      matriz[i+1][posHEA]=1;
    }
    else if(seleccion=="="){
      posHEA+=1;
      matriz[i+1][posHEA]=1;
      matriz[0][posHEA]=-1;
      posicionArtif.push(i+1);
    }
    else {
      posHEA+=1;
      matriz[i+1][posHEA]=-1;
      posHEA+=1;
      matriz[i+1][posHEA]=1;
      matriz[0][posHEA]=-1;
      posicionArtif.push(i+1);
    }
  }
  matriz[0][0]=1;
}

function calculaWprima(varDecision,conta_select){ //calcula la primera fila del tableo inicial
  var suma;
  for(var i=0; i< parseInt(varDecision)+parseInt(conta_select)+2; i++){
    suma=0;
    for(var j=0; j<posicionArtif.length; j++){
      suma+=parseInt(matriz[posicionArtif[j]][i]);
    }
    matriz[0][i]=suma;
  }
}

function imprimirTabla(restric,varDecision,contaSelect) {
  var table = document.createElement('table');
    table.id = "miTabla";
  for(var i=0; i<parseInt(restric)+1;i++){
    var tr = document.createElement('tr');
    for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2;j++){

      var td = document.createElement('td');

      var text = document.createTextNode(matriz[i][j]);

      td.appendChild(text);
      tr.appendChild(td);

      table.appendChild(tr);
    }

    document.body.appendChild(table);
  }
}

/*
function posEntra(varDecision,conta_select){
  var mayor=0;
  var entraMin;
  for(var j=0; j<parseInt(varDecision)+parseInt(conta_select)+2; j++){
    if(matriz[0][j+1]>0 && j<parseInt(varDecision)+parseInt(conta_select) && matriz[0][j+1]>mayor){
        mayor = matriz[0][j+1];
        entraMin = j+1;
      }
  }
  return entraMin;
}

function posSale(restric,varDecision,conta_select,varEntra){
  var saleMin;
  var menor=1000000000;
  for(var i=0; i<restric; i++){
      if(matriz[i+1][varEntra]!=0 || matriz[i+1]>0 ){
          if((matriz[i+1][parseInt(varDecision)+parseInt(conta_select)+1]/matriz[i+1][varEntra])<menor){
            menor = matriz[i+1][parseInt(varDecision)+parseInt(conta_select)+1]/matriz[i+1][varEntra];
            saleMin = i+1;
            }
      }
  }
  return saleMin;
}
*/
