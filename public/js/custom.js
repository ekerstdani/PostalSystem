function hideMessage() {
	document.getElementById("message").style.display = 'none';
}

function showOptions() {
	document.getElementById('userOptions').style.display = 'block';
}

function hideOptions() {
	document.getElementById('userOptions').style.display = 'none';
}

function populate(s1,s2){
  var s1 = document.getElementById(s1);
  var s2 = document.getElementById(s2);
  s2.innerHTML ="";
  if(s1.value =="New Zealand"){
     var optionArray =["Auckland","Hamilton","Rotorua","Palmerston North",
          "Wellington","Christchurch","Dunedin"];

  }
  if (s1.value != "New Zealand") {
     var optionArray = ["Region Not Needed"];

  }
  for(var option in optionArray){
     var newOption= document.createElement("option");
     newOption.innerHTML = optionArray[option];
     s2.options.add(newOption);
  }
}