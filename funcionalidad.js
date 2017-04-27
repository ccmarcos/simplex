function newInput() {
    var c=1;
    var array = ["<=", "=", ">="];
    var num_variables_decision = document.getElementById("num_variables_decision").value;
    var num_restricciones = document.getElementById("num_restricciones").value;
    var inpt = document.createElement('input');
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
        document.f1.innerHTML += "</br>"
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
            selectList.id = "input_"+j+"_"+i;
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


        document.f1.innerHTML += "</br>"
      }
    }
}
