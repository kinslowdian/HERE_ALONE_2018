class Section
{
	constructor(w, h, props)
	{
		this.htmlAttach = null

		this.w = w;
		this.h = h;	
		this.num = props.num_ref;
		this.x = props.x;
		this.y = props.y;
		this.bg = props.devVis; // REMOVE AT END
		this.isAnItem = props.isAnItem;
		this.htmlBuild = "";
		this.classBuild = 'section' + this.num;
		this.item_ref = props.item_ref;
		this.ignore = props.ignore;
		this.respond = props.respond;

		trace(props);

		if(this.item_ref !== "none")
		{
			this.empty = false;
		}

		else
		{
			this.empty = true;
		}

		this.build();
	}

	build()
	{
		this.htmlBuild = '<div class="section ' + this.classBuild + '"><p>' + this.num + '</p></div>';
	}

	list(htmlAttach)
	{
		this.htmlAttach = htmlAttach;

		this.placement();
	}

	placement()
	{
		this.htmlAttach.setAttribute("style", "width: " + this.w + "px; height: " + this.h + "px; transform: translate(" + this.x + "px, " + this.y + "px); background: " + this.bg + ";");
	}

	attachItem(obj)
	{
		this.itemObj = obj;
	}
}


