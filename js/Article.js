/**
Article constructor.
@param title: String, representing the title of this article.
@param image: Reference, holding the image of this article.
@param description: String, representing the description of this article.
@param owner: Profile, representing the owner of this article.
@param category: Represents the group of the publication.
*/
var Article = function (id, title, image, description, owner, category) {
	this.title = title;
	this.image = image;
	this.description = description;
	this.owner = owner;
	//subarticles for this article (comments)
	this.articles = [];
	this.likes = 0;
	this.category = category;
	this.id = id;
}

/**
Adds an article (comment) to this article.
@param article: Article to be added.
*/
Article.prototype.addArticle = function (article) {
	articles.push(article);
}

/**
Likes this article.
*/
Article.prototype.like = function () {
	likes++;
}
