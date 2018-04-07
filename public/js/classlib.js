class Camera
{
	constructor(main)
	{
		this.htmlAttach = main;
		this.viewerAdvanced = false;
	}

	updateResizeCamera()
	{
		this.w = this.htmlAttach.offsetWidth;
		this.h = this.htmlAttach.offsetHeight;
		
		this.x = 0;
		this.y = 0;
	}

	connectViewer(div)
	{
		this.viewer = div;
		this.viewW = this.viewer.offsetWidth;
		this.viewH = this.viewer.offsetHeight;
		
		this.viewer.x = 0;
		this.viewer.y = 0;
	}
	
	connectViewerOther(div)
	{
		this.viewerAdvanced = true;
		this.viewerOther = div;
	}
	
	connectPlayer(obj)
	{
		this.player = obj;
	}

	viewerFind(target)
	{
		let vf = {};

		vf.cx = -(target.x) + ((this.w * 0.5) - (target.w * 0.5));
		vf.cy = -(target.y) + ((this.h * 0.5) - (target.h * 0.5));

		this.viewerShift(vf.cx, vf.cy);
	}

	viewerShift(x, y)
	{
		this.viewer.x = x;
		this.viewer.y = y;
		
		if(this.viewer.x != this.x || this.viewer.y != this.y)
		{
			this.viewerTransition();
			this.player.playerMoveTo(sectionsARR[sectionFocus]);
		}
	}

	viewerTransition()
	{
		this.viewer.addEventListener("transitionend", this.viewerTransitionEvent, false);

		this.viewer.setAttribute("style", "transform: translate(" + this.viewer.x + "px, " + this.viewer.y + "px);");
		
		if(this.viewerAdvanced)
		{
			this.viewerOther.setAttribute("style", "transform: translate(" + -(this.viewer.x * 0.25) + "px, " + -(this.viewer.y * 0.25) + "px);");
		}
	}

	// OUT OF SCOPE HIGH BUG CHANCE WITH JS ISSUES
	viewerTransitionEvent(event)
	{
		let caller = event.target.attributes["data-instance"].value;

		if(caller === "viewer")
		{
			event.target.removeEventListener("transitionend", this.viewerTransitionEvent, false);

			// LINK BACK VALUES
			camera_newFocus();
		}
	}

	viewerUpdateValues()
	{
		this.x = this.viewer.x;
		this.y = this.viewer.y;	
	}
}

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
		this.htmlAttach.setAttribute("style", "width: " + this.w + "px; height: " + this.h + "px; left: " + this.x + "px; top: " + this.y + "px; background: " + this.bg + ";");
	}

	attachItem(obj)
	{
		this.itemObj = obj;
	}
}


