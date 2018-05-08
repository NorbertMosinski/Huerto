/**
Shows all containers on the main screen u want to switch to.
@param p_id_new: String. All containers beginning with this string will be shown, all others hidden
*/
function changeMainScreenTo(p_id_new)
{

	for(var i in containers)
	{
		if(containers[i].id.substring(0, p_id_new.length) == p_id_new)
			containers[i].classList.remove("hidden");
		else
			containers[i].classList.add("hidden");	
	}

}