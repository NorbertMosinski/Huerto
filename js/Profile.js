/**
Profile constructor.
@param name: String, representing the name of the persons profile.
@param surname: String, representing the surname of the persons profile.
@param adres: Adres, representing the adres of the persons profile.
@param birthday: Date, representing the surname of the persons profile.
@param loginId: String, representing the login ID of the persons profile.
@param password: String, representing the password of the persons profile.
*/
var Profile = function(name, surname, adres, birthday, loginId, loginPw)
{
	this.name = name;
	this.surname = surname;
	this.adres = adres;
	this.birthday = birthday;
	this.loginId = loginId;
	this.loginPw = loginPw;
}