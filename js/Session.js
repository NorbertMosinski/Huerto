/**
Session constructor.
*/
var Session = function()
{
	this.profiles = [];
	this.activeProfile;
}

/**
Checks if there is an active profile logged into this session.
@return true if yes, else false.
*/
Session.prototype.loggedIn = function()
{
	return (null != this.activeProfile)?true:false;
}

/**
Logins into an existing profile.
@param id: String representing the id of the profile.
@param pw: String representing the pw of the profile.
@return true of successful, else false.
*/
Session.prototype.login = function(id, pw)
{
	var profile = this.searchProfilesByAttributes(null, null, null, null, id, pw, null);
	if(profile.length != 1)
		return false;
	this.activeProfile = profile[0];
	return true; 
}

/**
Logs out from the current profile.
*/
Session.prototype.logout = function()
{
	this.activeProfile = null;
}

/**
Adds a profile to the active session, if an equal profile to the one passed doesn't exist yet.
@param profile: Profile to be added.
@return true if successful, else false.
*/
Session.prototype.addProfile = function(profile)
{
	if(null == profile)
		return false;
	for(var i = 0; i < this.profiles.length; i++)
		if(this.profiles[i].equals(profile))
			return false;
	this.profiles.push(profile);
	return true;
}

/**
Searches for a profile that exists and matches the passed profile,
containing(having defined) only the relevant fields for this search.
@param profile: Profile template for the search.
@return list containing references to the profiles that match the template.
*/
Session.prototype.searchProfiles = function(profile)
{
	var matches = [];
	for(var i = 0; i < this.profiles.length; i++)
		if(this.profiles[i].equalsByDefinedAttributes(profile))
			matches.push(this.profiles[i]);
	return matches;
}

/**
Searches for a profile that exists and matches the passed informations.
@param email: String, representing the email of the persons profile or undefined, if not relevant.
@param name: String, representing the name of the persons profile or undefined, if not relevant.
@param birthday: Date, representing the birthday of the persons profile or undefined, if not relevant.
@param biography: String, representing the biography of the persons profile or undefined, in not relevant.
@param loginId: String, representing the login ID of the persons profile or undefined, if not relevant.
@param loginPw: String, representing the password of the persons profile or undefined, if not relevant.
@param gender: String, representing the gender of the persons profile or undefined, if not relevant.
@return list containing references to the profiles that match the passed informations .
*/
Session.prototype.searchProfilesByAttributes = function(email, name, birthday, biography, loginId, loginPw, gender)
{
	return this.searchProfiles(new Profile(email, name, birthday, biography, loginId, loginPw, gender));
}