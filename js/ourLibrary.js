/**
Shows all containers on the main screen u want to switch to.
@param p_id_new: String. All containers beginning with this string will be shown, all others hidden.
*/
function changeMainScreenTo(id_new)
{
	var sections = document.getElementsByTagName("section");
	for(var i in sections)
	{
		if(sections[i].id == id_new)
			sections[i].classList.remove("hidden");
		else
			containers[i].classList.add("hidden");	
	}
}