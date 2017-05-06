var matriz = new Array();
var eliminarPosArtifi = new Array();
var posicionArtif = new Array();
var matriz2 = new Array();

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
  var hacerUno;

  contador_seleccion = dimMatriz(num_restricciones);
  crearMatriz(num_restricciones);
  inicializaMatriz(num_restricciones,num_variables_decision,contador_seleccion);
  restriccionesMatriz(num_restricciones,num_variables_decision,contador_seleccion);
  agregandoHolExArti(num_restricciones,posicionExcHolgAr);
  calculaWprima(num_variables_decision,contador_seleccion);

  primeraFase(num_restricciones,num_variables_decision,contador_seleccion,matriz);

  //----------------Segunda Fase-----------------------------

  inicializaMatriz2(num_restricciones,num_variables_decision,contador_seleccion);

  for(var i=0; i<parseInt(num_restricciones);i++){
    var aux=0;
    var k=0;
    for(var j=0; j<parseInt(num_variables_decision)+parseInt(contador_seleccion)+2;j++){
        if(eliminarPosArtifi[aux]!=j)
          matriz2[i+1][k++]=matriz[i+1][j];
        else aux++;
      }

}

  matriz2[0][0]=1; //valor de z

  for(var j=0; j<parseInt(num_variables_decision);j++)
      matriz2[0][j+1]=-1*parseInt(document.getElementById("objetivo"+j).value);

 segundaFase(num_restricciones,num_variables_decision,contador_seleccion,matriz2);

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
  for(var i=0; i<parseInt(restric)+1;i++){
      matriz[i]= new Array();
      matriz2[i] = new Array();
    }
}

function inicializaMatriz(restric, varDecision, contaSelect){
  for(var i=0; i<parseInt(restric)+1;i++)
    for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2;j++)
      matriz[i][j]=0;
}

function inicializaMatriz2(restric, varDecision, contaSelect){
  for(var i=0; i<parseInt(restric)+1;i++)
      for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2-eliminarPosArtifi.length;j++){
          matriz2[i][j]=0;
    }
}

function imprimeMatriz2(restric, varDecision, contaSelect){
  for(var i=0; i<parseInt(restric)+1; i++){
      for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2-eliminarPosArtifi.length; j++){
      prueba.innerHTML+=matriz2[i][j];
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
      eliminarPosArtifi.push(posHEA);
      matriz[0][posHEA]=-1;
      posicionArtif.push(i+1);

    }
    else {
      posHEA+=1;
      matriz[i+1][posHEA]=-1;
      posHEA+=1;
      matriz[i+1][posHEA]=1;
      eliminarPosArtifi.push(posHEA);
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

function imprimirTabla2(restric,varDecision,contaSelect) {
  var table = document.createElement('table');
    table.id = "miTabla";
  for(var i=0; i<parseInt(restric)+1;i++){
    var tr = document.createElement('tr');
    for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2-eliminarPosArtifi.length;j++){

      var td = document.createElement('td');

      var text = document.createTextNode(matriz2[i][j]);

      td.appendChild(text);
      tr.appendChild(td);

      table.appendChild(tr);
    }

    document.body.appendChild(table);
  }
}

function primeraFase(restric,varDecision,contaSelect,matrix){
  var bandera=1;
  while(bandera!=0){
      var mayor=0;
      var menor=1000000000;
      var entraMin;
      var saleMin;
       bandera=0;
       imprimirTabla(restric,varDecision,contaSelect);
      for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect); j++){
          if(matrix[0][j+1]>0 && matrix[0][j+1]>mayor){
              mayor = matrix[0][j+1];
              entraMin = j+1;
              bandera=1;
            }
      }

      for(var i=0; i<restric; i++){
          if(matrix[i+1][entraMin]>0){
              if((matrix[i+1][parseInt(varDecision)+parseInt(contaSelect)+1]/matrix[i+1][entraMin])<menor){
                menor = matrix[i+1][parseInt(varDecision)+parseInt(contaSelect)+1]/matrix[i+1][entraMin];
                saleMin = i+1;
                }
          }
      }

      hacerUno = matrix[saleMin][entraMin];
      for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2; j++)
          matrix[saleMin][j]/=hacerUno;

      for(var i=0; i<parseInt(restric)+1; i++){
        var vector = new Array();
          if(matrix[i][entraMin]!=0 && i!=saleMin){//si el numero es positivo lo vamos a restar(linea 285)
            var aux = matrix[i][entraMin];
            for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2; j++){
            vector.push(matrix[saleMin][j]*aux);
            matrix[i][j]-=vector[j];
          }
        }
      }
  }
}

function segundaFase(restric,varDecision,contaSelect,matrix){
  var maxmin = document.getElementById("maxORmin").value;
  var bandera=1;
  if (maxmin == "max")
         maxmin = 0;
     else maxmin = 1;

  while(bandera!=0){
      var mayor=0;
      var menor=1000000000;
      var myMap = new Map();
      var entra;
      var sale;
       bandera=0;

      imprimirTabla2(restric,varDecision,contaSelect);
      if(maxmin==0){
        for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)-eliminarPosArtifi.length; j++){//entra en para Maximizacion
            if(matrix[0][j+1]<0 && matrix[0][j+1]<menor){
                menor = matrix[0][j+1];
                entra = j+1;
               bandera=1;
              }
            }
      }else{
        for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)-eliminarPosArtifi.length; j++){//entra en para Minimizacion
            if(matrix[0][j+1]>0 && matrix[0][j+1]>mayor){
                mayor = matrix[0][j+1];
                entra = j+1;
                bandera=1;
              }
            }
        }

      for(var i=0; i<restric; i++){
          if(matrix[i+1][entra]>0){
            myMap.set(matrix[i+1][parseInt(varDecision)+parseInt(contaSelect)+1-eliminarPosArtifi.length]/matrix[i+1][entra],i+1);
          }
      }

    sale=myMap.values().next().value;
    hacerUno = matrix[sale][entra];

      for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2-eliminarPosArtifi.length; j++)
          matrix[sale][j]/=hacerUno;

      for(var i=0; i<parseInt(restric)+1; i++){
        var vector = new Array();
          if(matrix[i][entra]!=0 && i!=sale){
            var aux = matrix[i][entra];
            for(var j=0; j<parseInt(varDecision)+parseInt(contaSelect)+2-eliminarPosArtifi.length; j++){
            vector.push(matrix[sale][j]*aux);
            matrix[i][j]-=vector[j];
          }
        }
      }
  }
}
