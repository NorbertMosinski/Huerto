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
//articleId
var articleId;
//lorem
var lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum lectus odio. Quisque id magna sit amet risus fermentum luctus sed et ipsum. Etiam ut mi elit. Etiam nec fermentum odio. Phasellus egestas nulla sit amet purus pellentesque interdum. Suspendisse dictum est ipsum, nec pretium nibh egestas sed. Nulla nec vehicula arcu, condimentum semper justo. Cras ut facilisis ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In efficitur fermentum tellus, et ultricies libero auctor eu. Phasellus neque nisi, sollicitudin consequat leo sit amet, posuere feugiat augue. Aenean varius tortor nec nibh efficitur feugiat. Vestibulum ut turpis at dui hendrerit lobortis. Nullam est quam, cursus sed magna eu, convallis efficitur velit. Vestibulum rutrum vitae elit fermentum imperdiet. Sed tincidunt augue id arcu dignissim molestie.

Curabitur ut dolor tellus. Morbi mollis mauris augue, a fringilla eros rutrum euismod. Nulla laoreet nisl nisi, sed mollis odio suscipit at. Cras rhoncus, purus id egestas faucibus, elit risus lacinia nulla, nec pellentesque lectus libero quis ligula. Aliquam at enim fermentum, vulputate nisi a, lacinia dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque mollis massa vitae ex pulvinar fermentum. Proin dolor ipsum, vulputate et magna sed, gravida varius tellus. Ut porttitor iaculis purus vitae aliquam. Proin sapien purus, finibus non velit id, vestibulum eleifend sapien.

Vivamus rutrum mi tortor, vel eleifend nunc faucibus vel. Ut porta nisi rhoncus tellus aliquam fringilla. Quisque scelerisque sapien nec ligula ultrices eleifend. Aenean cursus enim vitae tellus lacinia eleifend. Donec maximus velit dui, interdum fermentum massa laoreet quis. Proin sed dui nunc. Sed venenatis, ligula at porttitor fringilla, magna felis faucibus nulla, a bibendum mi orci blandit justo. Sed nec lacinia nibh.`
//imagenes de articulos
const articleImgs = [
	"img/flowers/flor1.jpg",
	"img/flowers/flor2.jpg",
	"img/flowers/flor3.jpg",
	"img/flowers/flor4.jpg",
	"img/flowers/flor5.jpg",
	"img/flowers/flor6.jpg",
	"img/flowers/flor7.jpg"
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
	if (!localStorage.getItem("idCounter")) {
		localStorage.setItem("idCounter", 0);
	}
	articleId = parseInt(localStorage.getItem("idCounter"));
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
	session.addProfile(new Profile("admin@gmail.com", "Administrator", new Date(01, 01, 2000), "", "admin", "0000", "Male", "/img/others/8.jpg"));

	articles = createArticles();
}

/**
 * Function to create random articles
 */
function createArticles() {
	var newArticles = [];
	var category;
	for (var i = 0; i < 15; i++) {
		category = randomCategory();
		newArticles[i] = new Article(articleId + "_" + category + "_" + session.profiles[0].email, "articulo" + i, ramdomArticleImg(), lorem, session.profiles[0], category
		);
		articleId += 1
		switch (category) {
			case "Advice":
				session.profiles[0].publications.push(newArticles[i]);
				break;
			case "Achievement":
				session.profiles[0].comments.push(newArticles[i]);
				break;
			case "Challenge":
				session.profiles[0].challenges.push(newArticles[i]);
				break;
		}
	}
	return newArticles;
}
function loadPersonalPub() {
	var personalArticles = [];
	session.activeProfile.publications.forEach((publication) => {
		personalArticles.push(publication);
	});
	session.activeProfile.challenges.forEach((challenge) => {
		personalArticles.push(challenge);
	});
	session.activeProfile.comments.forEach((advice) => {
		personalArticles.push(advice);
	});

	printPersonalArticles(personalArticles);

}
function printPersonalArticles(personalArticlesToPrint) {
	var container = document.getElementById("mainProfileContent");
	personalArticlesToPrint.forEach((article) => {
		var img = document.createElement("img");
		img.classList.add("resultArticle");
		img.src = article.image;
		img.id = article.id;
		img.addEventListener('click', function () {
			var pub = img.id;
			var pubItems = pub.split("_");
			var pubSection = document.getElementById("publicationBody");
			var section = document.getElementById(img.parentNode.parentNode.id);
			var articleFound;
			section.classList.remove("show");
			section.classList.add("hide");
			pubSection.classList.remove("hide");
			pubSection.classList.add("show");

			var pubOwner = session.searchProfilesByAttributes(pubItems[2]);
			switch (pubItems[1]) {
				case "Advice":
					pubOwner[0].publications.forEach((item) => {
						var artiParts = item.id.split("_");
						var idArti = artiParts[0];
						if (idArti === pubItems[0]) {
							articleFound = item;
						}
					})
					break;
				case "Achievement":
					pubOwner[0].comments.forEach((item) => {
						var artiParts = item.id.split("_");
						var idArti = artiParts[0];
						if (idArti === pubItems[0]) {
							articleFound = item;
						}
					})
					break;
				case "Challenge":
					pubOwner[0].challenges.forEach((item) => {
						var artiParts = item.id.split("_");
						var idArti = artiParts[0];
						if (idArti === pubItems[0]) {
							articleFound = item;
						}
					})
					break;
			}

			printArticleSection(pubOwner[0], articleFound);
		});

		container.appendChild(img);
	})

}
/**
 * Function to load dinamicaly the content of the home page
 */
function loadDynamicContent(articlesToPrint) {

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
		createContent(art.id, art.image, art.category);
	});
}

function createNewPersonalArticle(newPersonalArticle) {
	var container = document.getElementById("mainProfileContent");
	var img = document.createElement("img");
	var reader = new FileReader();
	img.classList.add("resultArticle");
	img.id = newPersonalArticle.id;
	reader.onloadend = function () {
		img.src = reader.result;
	}

	if (newPersonalArticle.image) {
		reader.readAsDataURL(newPersonalArticle.image);
	} else {
		img.src = "";
	}

	img.addEventListener('click', function () {
		var pub = img.id;
		var pubItems = pub.split("_");
		var pubSection = document.getElementById("publicationBody");
		var section = document.getElementById(img.parentNode.parentNode.id);
		var articleFound;
		section.classList.remove("show");
		section.classList.add("hide");
		pubSection.classList.remove("hide");
		pubSection.classList.add("show");

		var pubOwner = session.searchProfilesByAttributes(pubItems[2]);
		switch (pubItems[1]) {
			case "Advice":
				pubOwner[0].publications.forEach((item) => {
					var artiParts = item.id.split("_");
					var idArti = artiParts[0];
					if (idArti === pubItems[0]) {
						articleFound = item;
					}
				})
				break;
			case "Achievement":
				pubOwner[0].comments.forEach((item) => {
					var artiParts = item.id.split("_");
					var idArti = artiParts[0];
					if (idArti === pubItems[0]) {
						articleFound = item;
					}
				})
				break;
			case "Challenge":
				pubOwner[0].challenges.forEach((item) => {
					var artiParts = item.id.split("_");
					var idArti = artiParts[0];
					if (idArti === pubItems[0]) {
						articleFound = item;
					}
				})
				break;
		}

		printArticleSection(pubOwner[0], articleFound);
	});

	container.appendChild(img);
}
/**
 * Function to create contente dinamically
 * @param {string} id: article identifier
 * @param {string} articleImage: path of the article image 
 * @param {string} articleCategory: category of the article
 * @param {Article} publicationArticle: article send from publications section 
 */
function createContent(id, articleImage, articleCategory, publicationArticle) {
	//variables
	var div = document.createElement('div');
	var img = document.createElement('img');
	var topButton = document.createElement('button');
	var like = document.createElement('button');
	var save = document.createElement('button');
	var reader = new FileReader();

	//modifying the style
	img.classList.add("imgContentHome");
	div.classList.add('sharesContent');
	if (id) {
		div.id = id;
	} else {
		div.id = publicationArticle.id
	}
	div.addEventListener("click", function () {
		var pub = div.id;
		var pubItems = pub.split("_");
		var pubSection = document.getElementById("publicationBody");
		var section = document.getElementById(div.parentNode.parentNode.id);
		var articleFound;
		section.classList.remove("show");
		section.classList.add("hide");
		pubSection.classList.remove("hide");
		pubSection.classList.add("show");

		var pubOwner = session.searchProfilesByAttributes(pubItems[2]);
		switch (pubItems[1]) {
			case "Advice":
				pubOwner[0].publications.forEach((item) => {
					var artiParts = item.id.split("_");
					var idArti = artiParts[0];
					if (idArti === pubItems[0]) {
						articleFound = item;
					}
				})
				break;
			case "Achievement":
				pubOwner[0].comments.forEach((item) => {
					var artiParts = item.id.split("_");
					var idArti = artiParts[0];
					if (idArti === pubItems[0]) {
						articleFound = item;
					}
				})
				break;
			case "Challenge":
				pubOwner[0].challenges.forEach((item) => {
					var artiParts = item.id.split("_");
					var idArti = artiParts[0];
					if (idArti === pubItems[0]) {
						articleFound = item;
					}
				})
				break;
		}

		printArticleSection(pubOwner[0], articleFound);

	})
	like.classList.add('like');
	save.classList.add('save');

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
 * Function just to print de article body section
 * @param {object} articleOwner 
 * @param {object} articleFoundByUser 
 */
function printArticleSection(articleOwner, articleFoundByUser) {
	var type = typeof (articleFoundByUser.image);
	var img = document.getElementById("imgback");
	img.classList.add("imgback");
	if (type === 'string') {
		img.src = articleFoundByUser.image;
	} else {
		var reader = new FileReader();
		reader.onloadend = function () {
			img.src = reader.result;
		}

		if (articleFoundByUser.image) {
			reader.readAsDataURL(articleFoundByUser.image);
		} else {
			articleFoundByUser.image = "";
		}
	}
	var urlUser = 'url(.' + articleOwner.image + ')';

	document.getElementById("ownerPub").style.backgroundImage = urlUser;
	document.getElementById("pubTitle").textContent = articleFoundByUser.title;
	document.getElementById("pubDescription").textContent = articleFoundByUser.description;
	var buttonTypeOfPub = document.getElementById("pubBtnType");
	switch (articleFoundByUser.category) {
		case "Advice":
			buttonTypeOfPub.classList.add("pubAdviceType")
			break;
		case "Achievement":
			buttonTypeOfPub.classList.add("pubAchievementType")
			break;
		case "Challenge":
			buttonTypeOfPub.classList.add("pubChallengeType")
			break;
	}
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

function changeButton(idButton) {
	var button;
	var profileResults = document.getElementById("searchProfileResults");
	var publicationResults = document.getElementById("searchPublicationsResults")

	if (idButton === "searchProfilesOpt") {
		button = document.getElementById("searchArticlesOpt");
		button.style.background = "transparent";
		document.getElementById("searchProfilesOpt").style.background = "rgb(140, 170, 136)";
		publicationResults.classList.remove("show");
		publicationResults.classList.add("hide");
		profileResults.classList.remove("hide");
		profileResults.classList.add("show");

	} else {
		button = document.getElementById("searchProfilesOpt");
		button.style.background = "transparent";
		document.getElementById("searchArticlesOpt").style.background = "rgb(140, 170, 136)";
		profileResults.classList.remove("show");
		profileResults.classList.add("hide");
		publicationResults.classList.remove("hide");
		publicationResults.classList.add("show");

	}
}
/**
Handles the events fired by a button.
*/
function handleButtonEvents(e) {
	var id = e.id;

	switch (id) {
		case "searchProfilesOpt":
			changeButton(id);
			break;
		case "searchArticlesOpt":
			changeButton(id);
			break;
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
		case "publicationBodyprofile":
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
		case "publicationBodySearch":
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
		case "publicationBodyHome":
		case "publicationBodyBack":
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
		case "publicationBodyInfo":
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
		case "publicationBodyShare":
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
	idUser = document.getElementById("loginUser").value;
	pw = document.getElementById("loginPassword").value;
	if (idUser && pw) {
		if (session.login(idUser, pw)) {
			alert("Welcome");
			loadPersonalPub();
			changeMainScreenTo("home");
		}
		else
			alert("Username or password wrong");
	} else {
		alert("Should try typing your data");
	}

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
			newArticlePublication = new Article(articleId + "_" + publicationCategory + "_" + session.activeProfile.email, title.value, image, description.value, owner, publicationCategory);
			owner.challenges.push(newArticlePublication);
		}
		else {
			publicationCategory = "Advice";
			newArticlePublication = new Article(articleId + "_" + publicationCategory + "_" + session.activeProfile.email, title.value, image, description.value, owner, publicationCategory);
			owner.publications.push(newArticlePublication);
		}

		createContent(null, null, null, newArticlePublication);
		createNewPersonalArticle(newArticlePublication);
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