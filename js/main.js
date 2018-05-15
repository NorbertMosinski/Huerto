/**
TODO:
-main.handlePublishEvent image reference
-main.handleRegisterEvent else case
*/

//Session, actual session
var session;
//String, previous page id
var previousPage;

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
		case "articleProfile":
		case "publicationProfile":
			changeMainScreenTo("privateProfile");
			break;
		case "homeSearch":
		case "articleSearch":
		case "publicationSearch":
			changeMainScreenTo("search");
			break;
		case "searchHome":
		case "articleHome":
		case "publicationHome":
		case "publicationBack":
		case "searchBack":
			changeMainScreenTo("home");
			break;
		case "homeInfo":
		case "searchInfo":
		case "articleInfo":
		case "publicationInfo":
			previousPage = id.substring(0, id.length-4);
			changeMainScreenTo("information");
			break;
		case "goBackFromInfo":
			changeMainScreenTo(previousPage);
			break;
		case "searchShare":
		case "homeShare":
		case "articleShare":
			changeMainScreenTo("publication");
			break;
		case "publicationPublishBtn":
			handlePublishEvent();
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

/**
Handles publication event.
*/
function handlePublishEvent()
{
	var title = document.getElementById("publicationTitle").value;
	var image = null;
	var description = document.getElementById("publicationContent").value;
	var pubTypeRef = document.getElementById("publicationType");
	var owner = session.activeProfile;
	var article = new Article(title, image, description, owner);

	if(pubTypeRef.options[pubTypeRef.selectedIndex].value == "Reto")
		owner.challenges.push(article);
	else
		owner.publications.push(article);
	changeMainScreenTo("home");
}