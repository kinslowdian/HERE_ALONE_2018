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
			this.player.playerMoveTo(levelKit.sectionsARR[levelKit.sectionFocus]);
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

class Player
{
	constructor(htmlAttach, htmlAttachInner, htmlAttachBase, w, h, x, y)
	{
		this.htmlAttach = htmlAttach;
		this.htmlAttachInner = htmlAttachInner;
		this.htmlAttachBase = htmlAttachBase;
		// this.htmlAttachLegL = htmlAttachLegL;
		// this.htmlAttachLegR = htmlAttachLegR;
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;

		this.playerWalk(false);
	}

	playerAddThought(htmlAttachThought)
	{
		this.thinking = false;
		this.htmlAttachThought = htmlAttachThought;
	}
	
	playerMoveTo(target)
	{
		let x = target.x + (target.w * 0.5);
		let y = target.y + (target.h * 0.5);
		
		this.htmlAttach.setAttribute("style", "transform: translate(calc(" + x + "px - " + (this.w * 0.5) + "px), calc(" + y + "px - " + (this.h * 0.5) + "px));");

		if(this.thinking)
		{
			this.playerThink(false);
		}
	}

	playerDirection(dir)
	{
		if(dir == "F")
		{
			this.htmlAttachInner.classList.remove("player-back");

			// TODO
			// this.htmlAttachThought.classList.remove("player-back");
		}

		else if(dir == "B")
		{
			this.htmlAttachInner.classList.add("player-back");

			// TODO
			// this.htmlAttachThought.classList.add("player-back");
		}
	}

	playerWalk(allow)
	{
		if(allow)
		{
			// TODO
			// this.htmlAttachBase.classList.add("player-walk");
			// this.htmlAttachLegL.classList.add("player-walk-legL");
			// this.htmlAttachLegR.classList.add("player-walk-legR");
		}

		else
		{
			// TODO
			// this.htmlAttachBase.classList.remove("player-walk");
			// this.htmlAttachLegL.classList.remove("player-walk-legL");
			// this.htmlAttachLegR.classList.remove("player-walk-legR");
		}
	}

	playerThink(allow)
	{
		if(allow)
		{
			// TODO
			// this.thinking = true;
			// this.htmlAttachThought.classList.add("thought-thinking");
		}

		else
		{
			// TODO
			// this.thinking = false;
			// this.htmlAttachThought.classList.remove("thought-thinking");
		}
	}
}

class Sadly
{
	constructor(div)
	{
		this.htmlAttach = div; 
		this.settings = {};

		this.attachTimeout = null;

		this.linkBody();
	}

	linkBody()
	{
		this.body_head = this.htmlAttach.querySelector(".sadly-head");
		this.body_jawT = this.htmlAttach.querySelector(".sadly-jawT");
		this.body_jawB = this.htmlAttach.querySelector(".sadly-jawB");
		this.body_eye = this.htmlAttach.querySelector(".sadly-pupil");
	
		this.body_head_css = false;
		this.body_jaw_css = false;
		this.body_eye_css = false;

		this.body_head_static = false;
		this.body_jaw_static = false;
	}

	createActions(num, classKit)
	{
		this.settings["action" + num] = {};
		this.settings["action" + num].headCSS = classKit.head;
		this.settings["action" + num].jawCSS = classKit.jaw;
		this.settings["action" + num].eyeCSS = classKit.eye;
	}

	applyAction_head(num)
	{
		if(this.body_head_static)
		{
			this.body_head.classList.remove(this.body_head_static);
		}

		if(this.body_head_css)
		{
			this.body_head.classList.remove(this.body_head_css);
		}

		this.body_head.classList.add(this.settings["action" + num].headCSS);
		this.body_head_css = this.settings["action" + num].headCSS;
	}

	applyAction_jaw(num)
	{
		if(this.body_jaw_static)
		{
			this.body_jawT.classList.remove(this.body_jaw_static);
			this.body_jawB.classList.remove(this.body_jaw_static);
		}

		if(this.body_jaw_css)
		{
			this.body_jawT.classList.remove(this.body_jaw_css);
			this.body_jawB.classList.remove(this.body_jaw_css);
		}

		this.body_jawT.classList.add(this.settings["action" + num].jawCSS);
		this.body_jawB.classList.add(this.settings["action" + num].jawCSS);
		this.body_jaw_css = this.settings["action" + num].jawCSS;
	}

	applyAction_eye(num)
	{
		if(this.body_eye_css)
		{
			this.body_eye.classList.remove(this.body_eye_css);
		}

		this.body_eye.classList.add(this.settings["action" + num].eyeCSS);
		this.body_eye_css = this.settings["action" + num].eyeCSS;
	}

	applyStatic_head(css)
	{
		this.body_head.classList.add(css);
		this.body_head_static = css;
	}

	applyStatic_jaw(css)
	{	
		this.body_jawT.classList.add(css);
		this.body_jawB.classList.add(css);

		this.body_jaw_static = css;
	}

	listAction(props)
	{
		this.attachTimeout = setTimeout(this.listActionEvent, props.secs * 1000, this, props);		
	}

	listActionCancel()
	{
		clearTimeout(this.attachTimeout);
	}

	listActionEvent(mc, props)
	{
		if(props.static)
		{
			mc[props.action](props.css);
		}

		else
		{
			mc[props.action](props.i);
		}

		if(props.funct)
		{
			props.funct.apply(this, props.functProps);
		}
	}

}