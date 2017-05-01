var matriz = new Array();
function newInput() {
    var c=1;
    var array = ["<=", "=", ">="];
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
  var seleccion;
  var contador_seleccion=0;
  var posicionExcHolgAr=parseInt(num_variables_decision);
  var posicionArtif=new Array();
  var horizontal = new Array();
  var suma;

  for(var i=0; i<num_restricciones; i++){
    seleccion = document.getElementById("input_"+i).value;
    if(seleccion == "<=" || seleccion=="=")
      contador_seleccion+=1;
    else contador_seleccion+=2;
  }

  crearMatriz(num_restricciones);
  inicializaMatriz(num_restricciones,num_variables_decision,contador_seleccion);

  for(var i=0; i<num_restricciones; i++){
    for(var j=0; j< parseInt(num_variables_decision)+1; j++){
        if(j==num_variables_decision)
          matriz[i+1][parseInt(num_variables_decision)+parseInt(contador_seleccion)+1]=document.getElementById("input_"+j+"_"+i).value;
        else matriz[i+1][j+1]=document.getElementById("input_"+j+"_"+i).value;
    }
  }

  posicionArtif.push(0);
  for(var i=0; i<num_restricciones; i++){
    seleccion = document.getElementById("input_"+i).value;
    if(seleccion == "<="){
      posicionExcHolgAr+=1;
      matriz[i+1][posicionExcHolgAr]=1;
    }
    else if(seleccion=="="){
      posicionExcHolgAr+=1;
      matriz[i+1][posicionExcHolgAr]=1;
      matriz[0][posicionExcHolgAr]=-1;
      posicionArtif.push(i+1);
    }
    else {
      posicionExcHolgAr+=1;
      matriz[i+1][posicionExcHolgAr]=-1;
      posicionExcHolgAr+=1;
      matriz[i+1][posicionExcHolgAr]=1;
      matriz[0][posicionExcHolgAr]=-1;
      posicionArtif.push(i+1);
    }
  }
  matriz[0][0]=1;

  for(var i=0; i< parseInt(num_variables_decision)+parseInt(contador_seleccion)+2; i++){
    suma=0;
    for(var j=0; j<posicionArtif.length; j++){
      suma+=parseInt(matriz[posicionArtif[j]][i]);
    }
  //  horizontal.push(suma);
    matriz[0][i]=suma;
  }

  //for(var i=0; i< parseInt(num_variables_decision)+parseInt(contador_seleccion)+2; i++)
  //  prueba.innerHTML+=horizontal[i];
  //prueba.innerHTML+=posicionExcHolgAr;
  imprimeMatriz(num_restricciones,num_variables_decision,contador_seleccion);
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
