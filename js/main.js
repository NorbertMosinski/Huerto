/**
TODO:
-main.handlePublishEvent image reference
-main.handleRegisterEvent else case
*/
//flags
var pubSearchFlag = false;
var profSearchFlag = false;
//Session, actual session
var session;
//container home
var container;
//Initial Articles
var articles = [];
var personalArticles = [];
var publicArticles = [];
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
	"img/others/6.jpg",
	"img/others/7.jpg",
	"img/flowers/flor1.jpg",
	"img/flowers/flor2.jpg",
	"img/flowers/flor3.jpg",
	"img/flowers/flor4.jpg",
	"img/flowers/flor5.jpg",
	"img/flowers/flor6.jpg",
	"img/flowers/flor7.jpg",

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
	document.getElementById("goBackForgottenPass").addEventListener('click', function () {
		changeMainScreenTo("login");
	});
}

/**
Initializes variables.
*/
function variables() {
	container = document.getElementById('content');
	previousPage = "home";
	session = new Session();
	session.addProfile(new Profile("admin@gmail.com", "Administrator", new Date(01, 01, 2000), "Descripción", "admin", "0000", "Male", "img/others/3.jpg"));
	session.addProfile(new Profile("Annie@gmail.com", "Annie C", new Date(01, 01, 2000), "Descripción", "Annie", "0000", "Female", "img/others/2.jpg"));
	session.addProfile(new Profile("Sara@gmail.com", "Sara R", new Date(01, 01, 2000), "Descripción", "Sara", "0000", "Female", "img/others/4.jpg"));
	session.addProfile(new Profile("Valen@gmail.com", "Valen L", new Date(01, 01, 2000), "Descripción", "Valen", "0000", "Female", "img/others/8.jpg"));
	session.addProfile(new Profile("Arleys@gmail.com", "Arleys F", new Date(01, 01, 2000), "Descripción", "Arleys", "0000", "Female", "img/others/4.jpg"));
	articles = createArticles();
}

/**
 * Function to create random articles
 */
function createArticles() {
	var newArticles = [];
	var category;
	for (var i = 0; i < 50; i++) {
		var ownerNumber = Math.floor((Math.random() * 5) + 0);
		category = randomCategory();
		newArticles[i] = new Article(articleId + "_" + category + "_" + session.profiles[ownerNumber].email, "articulo" + i, ramdomArticleImg(), lorem, session.profiles[ownerNumber], category
		);
		articleId += 1
		switch (category) {
			case "Advice":
				session.profiles[ownerNumber].publications.push(newArticles[i]);
				break;
			case "Achievement":
				session.profiles[ownerNumber].comments.push(newArticles[i]);
				break;
			case "Challenge":
				session.profiles[ownerNumber].challenges.push(newArticles[i]);
				break;
		}
	}
	return newArticles;
}

function loadPersonalData() {
	publicArticles = [];
	var likes = Math.floor((Math.random() * 1000) + 0);

	document.getElementById("mainProfilePic").src = session.activeProfile.image;
	document.getElementById("mainProfileDescription").textContent = session.activeProfile.biography;
	document.getElementById("mainProfileName").textContent = session.activeProfile.name;
	document.getElementById("mainProfileUserName").textContent = session.activeProfile.email;
	document.getElementById("mainprofileLikes").textContent = likes + " Likes";

	document.getElementById("iconsPublicProfile").classList.remove("show");
	document.getElementById("iconsPublicProfile").classList.add("hide");
	document.getElementById("iconsPrivateProfile").classList.remove("hide");
	document.getElementById("iconsPrivateProfile").classList.add("show");

	document.getElementById("profileManagementPic").src = session.activeProfile.image;
	document.getElementById("profileManagementName").placeholder = session.activeProfile.name;
	document.getElementById("profileManagementDescription").placeholder = session.activeProfile.biography;
	document.getElementById("profileManagementEmail").placeholder = session.activeProfile.email;
}

/**
 * Function to load the personal articles
 */
function loadPersonalPub() {
	personalArticles = [];
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
/**
 * Function to print all the personal articles
 * @param {object} personalArticlesToPrint List of articles to print
 */
function printPersonalArticles(personalArticlesToPrint) {
	var container = document.getElementById("mainProfileContent");
	container.innerHTML = "";
	personalArticlesToPrint.forEach((article) => {
		var typeImg = typeof (article.image);
		var reader = new FileReader();

		var img = document.createElement("img");
		img.classList.add("resultArticle");
		if (typeImg === "string") {
			img.src = article.image;
		} else {
			reader.onloadend = function () {
				img.src = reader.result;
			}

			if (article.image) {
				reader.readAsDataURL(article.image);
			} else {
				img.src = "";
			}
		}
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
 * Function to load dinamically the content of the home page
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
	var contrastDiv = document.createElement("div");
	contrastDiv.classList.add("contrastOwner");
	var title = document.createElement("h1");
	var reader = new FileReader();
	var pubItems;
	var articleFound;

	//modifying the style
	img.classList.add("imgContentHome");
	div.classList.add('sharesContent');
	if (id) {
		div.id = id;
		pubItems = div.id.split("_");
	} else {
		pubItems = div.id.split("_");
	}
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
	title.classList.add("homeContrasTitle");
	div.addEventListener("click", function () {
		var pubSection = document.getElementById("publicationBody");
		var section = document.getElementById(div.parentNode.parentNode.id);
		section.classList.remove("show");
		section.classList.add("hide");
		pubSection.classList.remove("hide");
		pubSection.classList.add("show");
		printArticleSection(pubOwner[0], articleFound);

	})
	like.classList.add('like');
	save.classList.add('save');

	//checking for the flag
	if (publicationArticle) {
		title.textContent = publicationArticle.title;
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
		title.textContent = articleFound.title;
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
	contrastDiv.appendChild(title);
	div.appendChild(contrastDiv);
	container.appendChild(div);

}

/**
 * Function just to print de article body section
 * @param {object} articleOwner 
 * @param {object} articleFoundByUser 
 */
function printArticleSection(articleOwner, articleFoundByUser) {
	document.getElementById("ownerPub").innerHTML = "";
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

	var ownerPubImg = document.createElement("img");
	ownerPubImg.src = articleOwner.image;
	ownerPubImg.classList.add("ownerPubImg");
	document.getElementById("ownerPub").appendChild(ownerPubImg);
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
	var publicationResults = document.getElementById("searchPublicationsResults");
	var contentToSearch = document.getElementById("searchText").value;

	if (idButton === "searchProfilesOpt") {
		button = document.getElementById("searchArticlesOpt");
		button.style.background = "transparent";
		document.getElementById("searchProfilesOpt").style.background = "rgb(140, 170, 136)";
		publicationResults.classList.remove("show");
		publicationResults.classList.add("hide");
		profileResults.classList.remove("hide");
		profileResults.classList.add("show");
		goSearchContent(contentToSearch, profileResults);

	} else {
		button = document.getElementById("searchProfilesOpt");
		button.style.background = "transparent";
		document.getElementById("searchArticlesOpt").style.background = "rgb(140, 170, 136)";
		profileResults.classList.remove("show");
		profileResults.classList.add("hide");
		publicationResults.classList.remove("hide");
		publicationResults.classList.add("show");
		goSearchContent(contentToSearch, publicationResults);
	}
}
/**
 * function to search content in all app
 * @param {string} contentToSearchInData data capture from input text
 * @param {object} divToModify div to modify
 */
function goSearchContent(contentToSearchInData, divToModify) {
	var articlesFound = [];
	if (divToModify.id === "searchPublicationsResults") {
		if (!!contentToSearchInData) {
			articles.forEach((article) => {
				if (article.title.toLowerCase().includes(contentToSearchInData.toLowerCase())) {
					articlesFound.push(article);
				}
			});
			personalArticles.forEach((personalArticle) => {
				if (personalArticle.title.toLowerCase().includes(contentToSearchInData.toLowerCase())) {
					articlesFound.push(personalArticle);
				}
			});
			printSearchResults(articlesFound, divToModify.id);

		} else {
			printSearchResults(articles, divToModify.id);
		}
	} else {
		if (!!contentToSearchInData) {
			var profilesFound = [];
			session.profiles.forEach((profile) => {
				if (profile.name.toLowerCase().includes(contentToSearchInData.toLowerCase()) || profile.email.toLowerCase().includes(contentToSearchInData)) {
					profilesFound.push(profile);
				}
				printSearchResults(profilesFound, divToModify.id);
			});
		} else {
			printSearchResults(session.profiles, divToModify.id);
		}
	}

}

function printSearchResults(infoToPrint, divId) {
	document.getElementById(divId).innerHTML = "";
	if (divId === "searchPublicationsResults") {
		infoToPrint.forEach((element) => {
			var img = document.createElement("img");
			img.classList.add("resultArticle");
			img.id = element.id;
			img.src = element.image;
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
				document.getElementById("searchPublicationsResults").innerHTML = "";
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
			document.getElementById(divId).appendChild(img);
		});
	} else {
		infoToPrint.forEach((element) => {
			var divRestProfileContainer = document.createElement("div");
			var divRestImgContainer = document.createElement("div");
			var img = document.createElement("img");
			var h1 = document.createElement("h1");
			var label = document.createElement("label");

			divRestProfileContainer.classList.add("profileResultContainer");
			divRestImgContainer.classList.add("resultImgContainer");
			h1.classList.add("searchProfileName");
			h1.textContent = element.name;
			label.classList.add("searchUserName");
			label.textContent = element.email;
			img.classList.add("resultProfile");
			img.id = encode64(element.email);
			img.src = element.image;

			img.addEventListener('click', function () {

				var publicProfile = session.searchProfilesByAttributes(decode64(img.id));
				if (!!publicProfile) {
					previousPage = "search";
					var likes = Math.floor((Math.random() * 1000) + 0);
					publicProfile[0].publications.forEach((publication) => {
						publicArticles.push(publication);
					});
					publicProfile[0].challenges.forEach((challenge) => {
						publicArticles.push(challenge);
					});
					publicProfile[0].comments.forEach((advice) => {
						publicArticles.push(advice);
					});
					printPersonalArticles(publicArticles);


					document.getElementById("iconsPrivateProfile").classList.remove("show");
					document.getElementById("iconsPrivateProfile").classList.add("hide");
					document.getElementById("iconsPublicProfile").classList.remove("hide");
					document.getElementById("iconsPublicProfile").classList.add("show");

					document.getElementById("mainProfilePic").src = publicProfile[0].image;
					document.getElementById("mainProfileDescription").textContent = publicProfile[0].biography;
					document.getElementById("mainProfileName").textContent = publicProfile[0].name;
					document.getElementById("mainProfileUserName").textContent = publicProfile[0].email;
					document.getElementById("mainprofileLikes").textContent = likes + " Likes";

					document.getElementById("search").classList.remove("show");
					document.getElementById("search").classList.add("hide");
					document.getElementById("mainProfile").classList.remove("hide");
					document.getElementById("mainProfile").classList.add("show");
					document.getElementById("searchProfileResults").innerHTML = "";
				} else {
					"Error loading this profile data";
				}


			});
			divRestImgContainer.appendChild(img);
			divRestProfileContainer.appendChild(divRestImgContainer);
			divRestProfileContainer.appendChild(h1);
			divRestProfileContainer.appendChild(label);
			document.getElementById(divId).appendChild(divRestProfileContainer);
		});
	}
}
/**
 * Function to send mail just to retrieve de password
 */
function sendMail() {
	var user = document.getElementById("forgottenUser").value;
	var userEmail = document.getElementById("forgottenEmail").value;
	if (!!user) {
		alert("A mail is going to be send to the Email account registered for this Username");
		changeMainScreenTo("login");
	} else if (!!userEmail) {
		alert("A mail is going to be send to the Email account given");
		changeMainScreenTo("login");
	} else {
		alert("Please fill any field to recieve the email.");
	}
}
/**
Handles the events fired by a button.
*/
function handleButtonEvents(e) {
	var id = e.id;

	switch (id) {
		case "forgRegisterBtn":
			sendMail();
			break;
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
			personalArticles = [];
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
		case "mainProfileProfile":
		case "publicationBodyprofile":
			loadPersonalData();
			loadPersonalPub();
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
		case "publicationBodyBack":
			changeMainScreenTo("search");
			break;
		case "mainProfileBack":
			loadPersonalData();
			loadPersonalPub();
			changeMainScreenTo(previousPage);
			previousPage = "home";
			break;
		case "searchHome":
		case "articleHome":
		case "publicationHome":
		case "publicationBack":
		case "searchBack":
		case "mainProfileHome":
		case "profileManagementHome":
		case "publicationBodyHome":
		case "closeThanks":
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
	var profile = new Profile(email.value, name.value, birthday.value, bio.value, id.value, pw.value, "", "img/others/profileEmpty.jpg");
	if (!!email.value && !!name.value && !!birthday.value && bio.value && !!id.value && !!pw.value && !!pwConf.value) {
		if (!(pw.value === pwConf.value)) {
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
	} else {
		alert("All fields are required");
	}


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
			loadPersonalData();
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
	var title = document.getElementById("publicationTitle");
	var image = imgFile;
	var description = document.getElementById("publicationContent");
	var pubTypeRef = document.getElementById("publicationType");
	var owner = session.activeProfile;
	var publicationCategory;
	var newArticlePublication;

	var fields = [];
	fields.push(title, description, document.getElementById('imgPicker'));
	if (!!imgFile && !!title.value && !!description.value) {

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
		changeMainScreenTo("thanksPub");

		cleanFields(fields);

	} else {
		alert("Must complete all the information");
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