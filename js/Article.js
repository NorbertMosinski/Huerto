/**
Article constructor.
@param title: String, representing the title of this article.
@param image: Reference, holding the image of this article.
@param description: String, representing the description of this article.
@param owner: Profile, representing the owner of this article.
*/
var Article = function(title, image, description, owner)
{
	this.title = title;
	this.image = image;
	this.description = description;
	this.owner = owner;
	//subarticles for this article (comments)
	this.articles = [];
	this.likes = 0;
}

/**
Adds an article (comment) to this article.
@param article: Article to be added.
*/
Article.prototype.addArticle = function(article)
{
	articles.push(article);
}

/**
Likes this article.
*/
Article.prototype.like = function()
{
	likes++;
}