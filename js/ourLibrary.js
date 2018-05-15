/**
Shows all containers on the main screen u want to switch to.
@param p_id_new: String. All containers beginning with this string will be shown, all others hidden.
*/
function changeMainScreenTo(id_new)
{
	var sections = document.getElementsByTagName("section");
	for(var i = 0; i < sections.length; i++)
	{
		if(sections[i].id == id_new)
		{
			sections[i].classList.remove("hide");
			sections[i].classList.add("show");
		}
		else
		{
			sections[i].classList.remove("show");
			sections[i].classList.add("hide");	
		}
	}
}

/**
@return the id of the section that is currently displayed.
*/
function getActualSectionId()
{
	/*
	var sections = document.getElementsByTagName("section");
	for(var i = 0; i < sections.length; i++)
		if(sections.id.classList)
			*/
}
/**
Encodes a string to base 64 format.
@param input: String to encode.
@return String input coded in base 64 format or null, if input was null.
*/
function encode64(input)
{
	if(null == input)
		return null;
	return window.btoa(input);
}

/**
Decodes a string in base 64 format.
@param input: String to decode.
@return String input decoded or null, if input was null.
*/
function decode64(input)
{
	if(null == input)
		return null;
	return window.atob(input);
}