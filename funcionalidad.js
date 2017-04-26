function newInput() {
    var num_variables_decision = document.getElementById("num_variables_decision").value;
    var inpt = document.createElement('input');
    document.f1.innerHTML += "<strong>Z=</strong>";

    if (num_variables_decision) {
        for (var i = 0; i < num_variables_decision; i++) {
          var inpt = document.createElement('input');
          inpt.type = "text";
          inpt.name = "input_" + i;
          inpt.id = "input_" + i;
          document.f1.appendChild(inpt);
          if(i!=num_variables_decision-1)
            document.f1.innerHTML += "<strong>X"+(i+1)+"+ </strong>";
          else document.f1.innerHTML += "<strong>X"+(i+1)+"</strong>";
        }
    }
}
