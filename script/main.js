const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

function validEmail()
{
var mail = document.getElementById('main').value; 
var email = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

  if (mail.match(email))
  {
	 document.getElementById('audio').play(); 
      alert("You have successfully logged in! " + " Your email: " + mail);
  }
  else
  {
	  document.getElementById('audio1').play();   
      alert("Invalid Email! " + "Please enter real email. " + "Like: name@example.ru ");
  }
}
function playAudio(){
	document.getElementById("audio").play();

}

var e = document.getElementById('jCaes');

e.onmouseover = function() {
  document.getElementById('popup').style.display = 'block';
}

e.onmouseout = function() {
  document.getElementById('popup').style.display = 'none';
}   

function openNav() {
	document.getElementById("myNav").style.width = "100%";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
	document.getElementById("myNav").style.width = "0%";
  }
  
