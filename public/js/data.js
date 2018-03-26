function load_ext_data(file, callbackFunct, json)
{
	var xobj = new XMLHttpRequest();

	if(json)
	{
		xobj.overrideMimeType("application/json");	
	}
	
	xobj.open('GET', file, true);

	xobj.onreadystatechange = function()
	{
		if(xobj.readyState == 4 && xobj.status == "200")
		{
			callbackFunct(xobj.responseText);
		}
	};

	xobj.send(null);
}