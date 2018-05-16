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
		case "profileManagementPolicy":
			previousPage = "profileManagement";
			changeMainScreenTo("policy");
			break;
		case "goBackFromPolicy":
			changeMainScreenTo(previousPage);
			break;
		case "registerLogin":
		case "profileManagementLogout":
			session.activeProfile = null;
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
			changeMainScreenTo("mainProfile");
			break;
		case "profileManagementBack":
			handleProfileManagementBackEvent();
			break;
		case "homeSearch":
		case "articleSearch":
		case "publicationSearch":
		case "mainProfileSearch":
		case "profileManagementSearch":
			changeMainScreenTo("search");
			break;
		case "searchHome":
		case "articleHome":
		case "publicationHome":
		case "publicationBack":
		case "searchBack":
		case "mainProfileBack":
		case "mainProfileHome":
		case "profileManagementHome":
			changeMainScreenTo("home");
			break;
		case "mainProfileManagement":
			changeMainScreenTo("profileManagement");
			break;
		case "homeInfo":
		case "searchInfo":
		case "articleInfo":
		case "publicationInfo":
		case "profileManagementInfo":
			previousPage = id.substring(0, id.length-4);
			changeMainScreenTo("information");
			break;
		case "goBackFromInfo":
			changeMainScreenTo(previousPage);
			break;
		case "searchShare":
		case "homeShare":
		case "articleShare":
		case "mainProfileShare":
		case "profileManagementShare":
			changeMainScreenTo("publication");
			break;
		case "publicationPublishBtn":
			handlePublishEvent();
			break;
		case "profileManagementTerms":
			previousPage = "profileManagement";
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

/**
Handles the profile management back event.
*/
function handleProfileManagementBackEvent()
{
	var name = document.getElementById("profileManagementName").value;
	var bio = document.getElementById("profileManagementDescription").value;
	var email = document.getElementById("profileManagementEmail").value;
	var genderTypeRef = document.getElementById("profileManagementGender");
	var gender = (genderTypeRef.options[genderTypeRef.selectedIndex].value == "Mujer")?"Female":"Male";

	name = (name == "")?null:name;
	bio = (bio == "")?null:bio;
	email = (email == "")?null:email;

	if(email != null)
	{
		var searchRes = session.searchProfilesByAttributes(email);
		if(searchRes.length == 0 || searchRes[0].equals(session.activeProfile))
		{
			session.activeProfile.updateData(email, name, null, bio, null, null, gender);
			changeMainScreenTo("mainProfile");
		}
		else
			console.log("An account with this email already exists!");
	}
	else
		changeMainScreenTo("mainProfile");
}