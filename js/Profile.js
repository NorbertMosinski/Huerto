/**
Profile constructor.
@param email: String, representing the email of the persons profile.
@param name: String, representing the name of the persons profile.
@param birthday: Date, representing the surname of the persons profile.
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
}

/**
Checks if two profiles are equal comparing just the attributes that are defined in the passed profile.
@param profile: Profile to be compared to this one.
@return true if profiles are equal considering the checked attributes, else false.
*/
Profile.prototype.equalsByDefinedAttributes = function(profile)
{
	if(null != profile.email && !(this.email === profile.email))
		return false;
	if(null != profile.name && !(this.name === profile.name))
		return false;
	if(null != profile.birthday && !(this.birthday.equals(profile.birthday)))
		return false;
	if(null != profile.biography && !(this.biography === profile.biography))
		return false;
	if(null != profile.loginId && !(this.loginId === profile.loginId))
		return false;
	if(null != profile.loginPw && !(this.loginPw === profile.loginPw))
		return false;
	return true;
}

/**
Checks if two profiles are equal. Two profiles are equal, if they match the same email and id.
@param profile: Profile to be compared to this profile.
@return true if equal, else false.
*/
Profile.prototype.equals = function(profile)
{
	if(!(this.email === profile.email))
		return false;
	if(!(this.loginId === profile.loginId))
		return false;
	return true;
}