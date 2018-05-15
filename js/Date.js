/**
Date constructor.
@param day: integer, representing the day of the date.
@param month: integer, representing the month of the date.
@param year: integer, representing the year of the date.
*/
var Date = function(day, month, year)
{
	this.day = day;
	this.month = month;
	this.year = year;
}

/**
Checks if the passed date is equal to this one.
@param date: Date object to be compared to this one.
@return true if both equal, else false.
*/
Date.prototype.equals = function(date)
{
	if(!(this.day == date.day))
		return false;
	if(!(this.month == date.month))
		return false;
	if(!(this.year == date.year))
		return false;
	return true;
}