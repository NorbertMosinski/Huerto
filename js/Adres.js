/**
Adres constructor.
@param street: String, representing the street name.
@param houseNr: integer, representing the house number.
@param city: String, representing the city name.
@param zipCode: integer, representing the zip code of the city.
@param country: String, representing the country name.
*/
var Adres = function(street, houseNr, city, zipCode, country)
{
	this.street = street;
	this.houseNr = houseNr;
	this.city = city;
	this.zipCode = zipCode;
	this.country = country;
}