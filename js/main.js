window.onload = function()
{
	init();
}

/**
First initialization.
*/
init = function()
{
	variables();
	events();
}

/**
Initializes variables.
*/
variables = function()
{

}

/**
Adds event listeners to document objects.
*/
events = function()
{
	var tmp;
	
	//buttons
	tmp = document.getElementsByTagName('button');
	for(var i = 0; i < tmp.length; i++)
		tmp[i].addEventListener("click", function(){
			handleButtonEvents(this);
		});
}

/**
Handles the events fired by a button.
*/
handleButtonEvents = function(e)
{
	var id = e.id;

	switch(id)
	{
		case "loginInitSessionBtn":
			break;
		case "loginRegisterBtn":
			break;
		case "loginForgotPasswordBtn":
			break;
		case "loginFacebookBtn":
			break;
		case "loginGoogleBtn":
			break;
		default:
			console.log("Unknown event fired!");
			break;

	}
}