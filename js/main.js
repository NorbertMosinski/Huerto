/**
TODO:
-Profile.equalsByAttributes name comparison improve
-main.handleRegisterEvent else case
-ourLibrary.getSectionId 
-stack back button, go back from info button
-sEssion.searchProfileByAttributes set parameter to null if string = ""
*/

//actual session
var session;

window.onload = function()
{
	init();
}

/**
First initialization.
*/
function init()
{
	variables();
	events();
}

/**
Initializes variables.
*/
function variables()
{
	session = new Session();
}

/**
Adds event listeners to document objects.
*/
function events()
{
	var tmp = document.getElementsByTagName('button');
	
	//buttons
	for(var i = 0; i < tmp.length; i++)
		tmp[i].addEventListener("click", function(){
			handleButtonEvents(this);
		});
}

/**
Handles the events fired by a button.
*/
function handleButtonEvents(e)
{
	var id = e.id;

	switch(id)
	{
		case "loginInitSessionBtn":
			handleLoginEvent();
			break;
		case "loginRegisterBtn":
			changeMainScreenTo("register");
			break;
		case "loginForgotPasswordBtn":
			changeMainScreenTo("forgottenPassword");
			break;
		case "loginFacebookBtn":
			break;
		case "loginGoogleBtn":
			break;
		case "registerTerms":
			changeMainScreenTo("policy");
			break;
		case "goBackFromPolicy":
			changeMainScreenTo("register");
			break;
		case "registerLogin":
			changeMainScreenTo("login");
			break;
		case "loginForgottenPassword":
			changeMainScreenTo("forgottenPassword");
			break;
		case "registerBtn":
			handleRegisterEvent();
			break;
		case "homeProfile":
		case "searchProfile":
			changeMainScreenTo("privateProfile");
			break;
		case "homeSearch":
		case "searchSearch":
			changeMainScreenTo("search");
			break;
		case "searchHome":
		case "homeHome":
			changeMainScreenTo("home");
			break;
		case "homeInfo":
		case "searchInfo":
			changeMainScreenTo("information");
			break;
		case "goBackFromInfo":
			changeMainScreenTo("home");
			break;
		default:
			console.log("Unknown event fired!");
			console.log("event ID: " + id);
			break;

	}
}

/**
Handles the register event.
*/
function handleRegisterEvent()
{
	var email = document.getElementById("registryEmail").value;
	var name = document.getElementById("registryName").value;
	var birthday = document.getElementById("registryDate").value;
	var bio = document.getElementById("registryBio").value;
	var id = document.getElementById("registryUsername").value;
	var pw = document.getElementById("registryPassword").value;
	var pwConf = document.getElementById("registryConfirmPass").value;

	var profile = new Profile(email, name, birthday, bio, id, pw);

	if(!(pw === pwConf))
	{
		console.log("Passwords are different");
		return;
	}

	if(session.addProfile(profile))
		changeMainScreenTo("login");
	else
		console.log("Can not create profile. Profile already exists!");
}

/**
Handles the login event.
*/
function handleLoginEvent()
{
	id = document.getElementById("loginUser").value;
	pw = document.getElementById("loginPassword").value;
	if(session.login(id, pw))
		changeMainScreenTo("home");
	else
		console.log("This combination of id and password doesn't exist.");
}