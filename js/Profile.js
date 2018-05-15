/**
Profile constructor.
@param email: String, representing the email of the persons profile.
@param name: String, representing the name of the persons profile.
@param birthday: Date, representing the birthday of the persons profile.
@param biography: String, representing the biography of the persons profile.
@param loginId: String, representing the login ID of the persons profile.
@param password: String, representing the password of the persons profile.
NOTE: If you want to add more attributes later, add them at the end of the argument list!
*/
var Profile = function(email, name, birthday, biography, loginId, loginPw)
{
	this.email = email;
	this.name = name;
	this.birthday = birthday;
	this.biography = biography;
	this.loginId = loginId;
	this.loginPw = encode64(loginPw);
	//list of articles
	this.publications = [];
	//list of articles
	this.challenges = [];
	//list of articles
	this.comments = [];
}

/**
Checks if two profiles are equal comparing just the attributes that are defined (and not empty) in the passed profile.
@param profile: Profile to be compared to this one.
@return true if profiles are equal considering the checked attributes, else false.
*/
Profile.prototype.equalsByDefinedAttributes = function(profile)
{
	if(null != profile.email && profile.email != "" && this.email.toLowerCase() != profile.email.toLowerCase())
		return false;
	if(null != profile.name && profile.name != "" && this.name.toLowerCase() != profile.name.toLowerCase())
		return false;
	if(null != profile.birthday && !(this.birthday.equals(profile.birthday)))
		return false;
	if(null != profile.biography && profile.biography != "" && this.biography.toLowerCase() != profile.biography.toLowerCase())
		return false;
	if(null != profile.loginId && profile.loginId != "" && this.loginId !== profile.loginId)
		return false;
	if(null != profile.loginPw && profile.loginPw != "" && this.loginPw !== profile.loginPw)
		return false;
	return true;
}

/**
Checks if two profiles are equal. Two profiles are equal, if they match the same email OR login ID.
@param profile: Profile to be compared to this profile.
@return true if equal, else false.
*/
Profile.prototype.equals = function(profile)
{
	if(this.email.toLowerCase() === profile.email.toLowerCase() || this.loginId === profile.loginId)
		return true;
	return false;
}