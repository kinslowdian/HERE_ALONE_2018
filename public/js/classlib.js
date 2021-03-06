class Camera
{
	constructor(main, callBack)
	{
		this.htmlAttach = main;
		this.viewerAdvanced = false;
		this.callBack = callBack;
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

	attachMainTween()
	{
		this.viewer.classList.add("tween-viewer");
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
		this.viewer.addEventListener("transitionend", this.viewerTransitionEvent.bind(this), false);

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
			this.viewer.removeEventListener("transitionend", this.viewerTransitionEvent.bind(this), false);

			// event.target.removeEventListener("transitionend", this.viewerTransitionEvent.bind(this), false);

			// LINK BACK VALUES
			// camera_newFocus();
		
			this.callBack();
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
		this.exit = props.exit;
		this.go = props.go;
		this.start = props.start;

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
		if(this.bg === "none")
		{
			this.htmlBuild = '<div class="section ' + this.classBuild + '"></div>';
		}

		else
		{
			this.htmlBuild = '<div class="section ' + this.classBuild + '"><p>' + this.num + '</p></div>';
		}
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

		this.sadlyAttached = false;

		// this.playerWalk(false);
	}

	attachMainTween()
	{
		this.htmlAttach.classList.add("tween-player");
	}

	attachCharacter(obj)
	{
		this.sadly = obj;

		this.sadlyAttached = true;

		trace(obj);
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
		if(this.sadlyAttached)
		{
			this.sadly.walk(allow);
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
		this.body_head 	= this.htmlAttach.querySelector(".sadly-head");
		this.body_jawT 	= this.htmlAttach.querySelector(".sadly-jawT");
		this.body_jawB 	= this.htmlAttach.querySelector(".sadly-jawB");
		this.body_eye 	= this.htmlAttach.querySelector(".sadly-pupil");
		
		this.body_top 	= this.htmlAttach.querySelector(".sadly-top");
		this.body_arm 	= this.htmlAttach.querySelector(".sadly-arm");
		this.body_leg0 	= this.htmlAttach.querySelector(".sadly-leg0");
		this.body_leg1 	= this.htmlAttach.querySelector(".sadly-leg1");

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

	walk(allow)
	{
		if(allow)
		{
			this.body_top.classList.add("tween-walk-body");
			this.body_arm.classList.add("tween-walk-arm");
			this.body_leg0.classList.add("tween-walk-leg-0");
			this.body_leg1.classList.add("tween-walk-leg-1");		
		}

		else
		{
			this.body_top.classList.remove("tween-walk-body");
			this.body_arm.classList.remove("tween-walk-arm");
			this.body_leg0.classList.remove("tween-walk-leg-0");
			this.body_leg1.classList.remove("tween-walk-leg-1");	
		}
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

class SoundFX
{
	constructor(main, muteOption)
	{
		this.main = main;
		this.mute = muteOption;
	}

	create(params)
	{
		this.instanceClass 	= params.instanceClass;
		this.loop 			= params.loop || false;
		this.playCount 		= 0;
		this.playMax 		= params.playMax || 1;
		this.infinite		= params.infinite || false;
		this.randomPlay		= params.randomPlay || false;
		this.onEndFunct		= params.onEndFunct || false;
		this.delayTimer		= false;
		this.playing		= false;
		this.vol 			= params.vol || 1;

		this.main.volume = this.vol;

		this.main.addEventListener("ended", this.event_sound.bind(this), false);

		trace(this.main);

		this.muteApply();
	}

	muteApply()
	{

		if(this.mute)
		{
			this.main.volume = 0;
			this.main.muted = true;
		}

		else
		{
			this.main.volume = this.vol;
			this.main.muted = false;
		}
	}

	setRandDelay(params)
	{
		this.soundDelayHI = params.hi;
		this.soundDelayLO = params.lo;
	}

	// ENTRY
	soundBegin()
	{
		if(this.randomPlay)
		{
			this.soundRandPlay();
		}

		else
		{
			this.soundPlay();
		}
	}

	// DEFAULT
	soundPlay()
	{
		if(!this.playing)
		{
			this.playing = true;

			this.main.currentTime = 0;
			this.main.play();
		}
	}

	soundStop()
	{
		this.main.pause();
		
		if(this.delayTimer)
		{
			clearTimeout(this.delayTimer);
		}
	}

	soundMute(apply)
	{
		this.mute = apply;

		this.muteApply();
	}

	// RANDOM
	soundRandPlay()
	{
		this.soundDelay = Math.round(Math.random() * (this.soundDelayHI - this.soundDelayLO) + this.soundDelayLO);

		this.delayTimer = setTimeout(this.soundPlay.bind(this), this.soundDelay * 1000);
	}

	soundKill()
	{
		this.main.removeEventListener("ended", this.event_sound.bind(this), false);
	}

	event_sound(event)
	{
		if(event.type === "ended")
		{
			
			this.playing = false;

			if(this.infinite)
			{
				this.soundBegin();
			}

			else
			{
				if(this.loop)
				{
					this.playCount ++;

					if(this.playCount < this.playMax)
					{
						this.soundBegin();
					}

					else
					{
						this.loop = false;
					}
				}
			}

			if(this.onEndFunct)
			{
				this.onEndFunct();
			}
		}
	}
}