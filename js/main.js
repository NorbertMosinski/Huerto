/**
TODO:
-main.handlePublishEvent image reference
-main.handleRegisterEvent else case
*/

//Session, actual session
var session;
//container home
var container;
//Initial Articles
var articles = [];
//image picked
var imgFile = null;
//position
var globalTop;

//imagenes de articulos
const articleImgs = [
	"img/background/share.PNG",
	"img/background/shareAchievement.PNG",
	"img/background/shareAdvice.PNG"
];

//categories
const categories = [
	'Challenge',
	'Advice',
	'Achievement'
]


//String, previous page id
var previousPage;

window.onload = function () {
	init();
}

/**
First initialization.
*/
function init() {
	events();
	variables();
	loadDynamicContent(articles);
}

/**
Initializes variables.
*/
function variables() {
	container = document.getElementById('content');

	session = new Session();
	session.addProfile(new Profile("admin@gmail.com", "Administrator", new Date(01, 01, 2000), "", "admin", "0000", "Male"));

	articles = createArticles();
}

/**
 * Function to create random articles
 */
function createArticles() {
	var newArticles = [];
	for (var i = 0; i < 5; i++) {
		newArticles[i] = new Article(
			"articulo" + i, ramdomArticleImg(), "Articulo de prueba", session.profiles[0], randomCategory()
		)
	}
	return newArticles;
}
/**
 * Function to load dinamicaly the content of the home page
 */
function loadDynamicContent(articlesToPrint) {
	//position
	var top = 22;

	//creating the callenge content
	var divChallange = document.createElement('div');
	divChallange.classList.add("challenge");

	var topChallengeButton = document.createElement('button');
	topChallengeButton.classList.add('challengeContent');

	var challengeImg = document.createElement('img');
	challengeImg.src = ramdomArticleImg();

	var likeChallenge = document.createElement('button');
	likeChallenge.classList.add('like');

	var saveChallenge = document.createElement('button');
	saveChallenge.classList.add('save');

	var joinChallenge = document.createElement('button');
	joinChallenge.textContent = "Unirme al reto";
	joinChallenge.classList.add('joinChallenge');

	var separator = document.createElement('label');
	separator.classList.add('separator');

	divChallange.appendChild(topChallengeButton);
	divChallange.appendChild(challengeImg);
	divChallange.appendChild(likeChallenge);
	divChallange.appendChild(saveChallenge);
	divChallange.appendChild(joinChallenge);
	container.appendChild(divChallange);


	articlesToPrint.forEach((art) => {
		top += 54;
		createContent(top, art.image, art.category);
	});
	globalTop = top;
}

/**
 * Function to create contente dinamically
 * @param {int} position: position tu put the elements in the html file
 * @param {string} articleImage: path of the article image 
 * @param {string} articleCategory: category of the article
 * @param {Article} publicationArticle: article send from publications section 
 */
function createContent(position, articleImage, articleCategory, publicationArticle) {
	//variables
	var div = document.createElement('div');
	var img = document.createElement('img');
	var topButton = document.createElement('button');
	var like = document.createElement('button');
	var save = document.createElement('button');
	var reader = new FileReader();
	var pos = position;

	//modifying the style
	div.classList.add('sharesContent');
	like.classList.add('like');
	save.classList.add('save');
	topButton.style.top = position + "%";

	//checking for the flag
	if (publicationArticle) {
		reader.onloadend = function () {
			img.src = reader.result;
		}

		if (publicationArticle.image) {
			reader.readAsDataURL(publicationArticle.image);
		} else {
			img.src = "";
		}

		switch (publicationArticle.category) {
			case 'Challenge':
				topButton.classList.add('contentButtonChallenge');
				break;

			case 'Advice':
				topButton.classList.add('contentButtonAdvice');

				break;

			case 'Achievement':
				topButton.classList.add('contentButtonAchievement');
				break;
			default:
				console.log("Category unkown");
				break;
		}
	} else {
		switch (articleCategory) {
			case 'Challenge':
				topButton.classList.add('contentButtonChallenge');
				break;

			case 'Advice':
				topButton.classList.add('contentButtonAdvice');

				break;

			case 'Achievement':
				topButton.classList.add('contentButtonAchievement');
				break;
			default:
				console.log("Category unkown");
				break;
		}
		img.src = articleImage
	}
	div.appendChild(topButton);
	div.appendChild(img);
	div.appendChild(like);
	div.appendChild(save);
	container.appendChild(div);

}
/**
 * function to refresh de main content
 */
function refreshHomeContent() {
	articles = [];
	articles = createArticles();
	container.innerHTML = "";
	loadDynamicContent(articles);
}

/**
 * Select ramdom image for articles in home page
 */
function ramdomArticleImg() {
	var randomImg = Math.floor((Math.random() * articleImgs.length) + 0);
	return articleImgs[randomImg];
}
/**
 * Function that gives a random category
 */
function randomCategory() {
	var randomCategory = Math.floor((Math.random() * (categories.length - 1)) + 1);
	return categories[randomCategory]
}

function cleanFields(fieldsToClean) {
	fieldsToClean.forEach((field) => {
		try {
			field.value = "";

		} catch (e) {
			console.log("algo ocurrio con la limpieza");
		}
	});
}
/**
Adds event listeners to document objects.
*/
function events() {
	var tmp = document.getElementsByTagName('button');

	//buttons
	for (var i = 0; i < tmp.length; i++) {
		tmp[i].addEventListener("click", function () {
			handleButtonEvents(this);
		});
	}


	//input File, file picker
	var inputFile = document.getElementById('imgPicker');
	inputFile.onchange = function () {
		imgFile = inputFile.files[0];
	}

}

/**
Handles the events fired by a button.
*/
function handleButtonEvents(e) {
	var id = e.id;

	switch (id) {
		case "goBackFromTerms":
			refreshHomeContent();
			changeMainScreenTo(previousPage);
			break;
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
		case "registerTerms":
			previousPage = "register";
			changeMainScreenTo("terms");
			break;
		case "registerLogin":
			changeMainScreenTo('login');
			break;
		case "profileManagementLogout":
			document.getElementById("loginUser").value = "";
			document.getElementById("loginPassword").value = "";
			session.activeProfile = null;
			alert("your session has finished");
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
			handleProfileManagementSaveEvent();
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
			previousPage = id.substring(0, id.length - 4);
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
			changeMainScreenTo("terms")
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
function handleRegisterEvent() {
	var email = document.getElementById("registryEmail");
	var name = document.getElementById("registryName");
	var birthday = document.getElementById("registryDate");
	var bio = document.getElementById("registryBio");
	var id = document.getElementById("registryUsername");
	var pw = document.getElementById("registryPassword");
	var pwConf = document.getElementById("registryConfirmPass");
	var fields = [];

	fields.push(email, name, birthday, bio, id, pw, pwConf);
	var profile = new Profile(email.value, name.value, birthday.value, bio.value, id.value, pw.value, null);

	if (!(pw === pwConf)) {
		alert("Passwords are different");
		return;
	}

	if (session.addProfile(profile)) {
		changeMainScreenTo("login");
	} else {
		console.log("Profile already exists!")
		alert("Can not create profile. Profile already exists!");
	}

	cleanFields(fields);

}

/**
Handles the login event.
*/
function handleLoginEvent() {
	id = document.getElementById("loginUser").value;
	pw = document.getElementById("loginPassword").value;
	if (session.login(id, pw)) {
		alert("Welcome");
		changeMainScreenTo("home");
	}
	else
		alert("Username or password wrong");
}

/**
Handles publication event.
*/
function handlePublishEvent() {
	if (imgFile) {
		var title = document.getElementById("publicationTitle");
		var image = imgFile;
		var description = document.getElementById("publicationContent");
		var pubTypeRef = document.getElementById("publicationType");
		var owner = session.activeProfile;
		var publicationCategory;
		var newArticlePublication;

		var fields = [];
		fields.push(title, description, document.getElementById('imgPicker'));

		if (pubTypeRef.options[pubTypeRef.selectedIndex].value == "Reto") {
			publicationCategory = "Challenge";
			newArticlePublication = new Article(title.value, image, description.value, owner, publicationCategory);
			owner.challenges.push(newArticlePublication);
		}
		else {
			publicationCategory = "Advice";
			newArticlePublication = new Article(title.value, image, description.value, owner, publicationCategory);
			owner.publications.push(newArticlePublication);
		}

		var newPos = globalTop + 54;
		globalTop = newPos;

		createContent(newPos, null, null, newArticlePublication);

		changeMainScreenTo("home");

		cleanFields(fields);

	} else {
		alert("Must select a picture");
	}

}

/**
Handles the profile management save event.
*/
function handleProfileManagementSaveEvent() {
	var name = document.getElementById("profileManagementName").value;
	var bio = document.getElementById("profileManagementDescription").value;
	var email = document.getElementById("profileManagementEmail").value;
	var genderTypeRef = document.getElementById("profileManagementGender");
	var gender = (genderTypeRef.options[genderTypeRef.selectedIndex].value == "Mujer") ? "Female" : "Male";

	name = (name == "") ? null : name;
	bio = (bio == "") ? null : bio;
	email = (email == "") ? null : email;

	if (email != null) {
		var searchRes = session.searchProfilesByAttributes(email);
		if (searchRes.length == 0 || searchRes[0].equals(session.activeProfile)) {
			session.activeProfile.updateData(email, name, null, bio, null, null, gender);
			changeMainScreenTo("mainProfile");
		}
		else
			alert("An account with this email already exists!");
	}
	else
		changeMainScreenTo("mainProfile");
}