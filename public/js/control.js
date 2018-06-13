function control_init()
{
	control = {};
	control.signal = "";
	control.running = false;
	control.typeKeys = true;
	control.typeTouch = true;
}

function control_on()
{
	if(!control.running)
	{
		control_listen(true);
	}
}

function control_off()
{
	if(control.running)
	{
		control_listen(false);
	}
}

function control_listen(run)
{
	if(run)
	{
		control.running = true;
		window.addEventListener("keydown", control_event, false);
	}

	else
	{
		control.running = false;
		window.removeEventListener("keydown", control_event, false);
	}
}

function control_event(event)
{
	let keyName = event.key.toUpperCase();
	
	switch(keyName)
	{
		case "ARROWUP":
		{
			ui_path("U", true);

			break;
		}

		case "ARROWDOWN":
		{
			ui_path("D", true);

			break;
		}

		case "ARROWLEFT":
		{
			ui_path("L", true);

			break;
		}

		case "ARROWRIGHT":
		{
			ui_path("R", true);

			break;
		}

		default:
		{

		}
	}
}

function ui_init()
{
	ui = {};
	
	ui.U = {};
	ui.D = {};
	ui.L = {};
	ui.R = {};
	
	ui.list = new Array();
	
	ui.U.htmlAttach = document.querySelector(".ui .ui-u");
	ui.D.htmlAttach = document.querySelector(".ui .ui-d");
	ui.L.htmlAttach = document.querySelector(".ui .ui-l");
	ui.R.htmlAttach = document.querySelector(".ui .ui-r");
	
	ui.list.push(ui.U);
	ui.list.push(ui.D);
	ui.list.push(ui.L);
	ui.list.push(ui.R);
	
	for(let i in ui.list)
	{
		ui.list[i].show = false;
		ui.list[i].hasEvent = false;
	}

	ui.HINT_U = {};
	ui.HINT_D = {};
	ui.HINT_L = {};
	ui.HINT_R = {};

	ui.hintList = new Array();

	ui.HINT_U.htmlAttach = document.querySelector(".ui-hint .ui-u");
	ui.HINT_D.htmlAttach = document.querySelector(".ui-hint .ui-d");
	ui.HINT_L.htmlAttach = document.querySelector(".ui-hint .ui-l");
	ui.HINT_R.htmlAttach = document.querySelector(".ui-hint .ui-r");

	ui.hintList.push(ui.HINT_U);
	ui.hintList.push(ui.HINT_D);
	ui.hintList.push(ui.HINT_L);
	ui.hintList.push(ui.HINT_R);

	for(let j in ui.hintList)
	{
		ui.hintList[j].show = false;
	}
}

function ui_required()
{
	let sectionTarget = levelKit.sectionsARR[levelKit.sectionFocus];

	if(sectionTarget.respond.U !== "none")
	{
		if(control.typeKeys)
		{
			hint_activate(ui.HINT_U);
		}

		if(control.typeTouch)
		{
			ui_activate(ui.U);
		}
	}

	if(sectionTarget.respond.D !== "none")
	{
		// TO DO 

		if(sectionTarget.respond.D === true && sectionTarget.isAnItem)
		{
			if(control.typeKeys)
			{
				hint_activate(ui.HINT_D);
			}

			if(control.typeTouch)
			{
				ui_activate(ui.D);
			}
		}

		else if(Number.isInteger(sectionTarget.respond.D))
		{
			if(control.typeKeys)
			{
				hint_activate(ui.HINT_D);
			}

			if(control.typeTouch)
			{
				ui_activate(ui.D);
			}			
		}
	}

	if(sectionTarget.respond.L !== "none")
	{
		if(control.typeKeys)
		{
			hint_activate(ui.HINT_L);
		}

		if(control.typeTouch)
		{
			ui_activate(ui.L);
		}
	}

	if(sectionTarget.respond.R !== "none")
	{
		if(control.typeKeys)
		{
			hint_activate(ui.HINT_R);
		}

		if(control.typeTouch)
		{
			ui_activate(ui.R);
		}
	}

	control_on();
}

function ui_path(direction, keyInput)
{
	let activated = false;

	let sectionTarget = levelKit.sectionsARR[levelKit.sectionFocus];

	switch(direction)
	{
		case "U":
		{
			if(sectionTarget.respond.U !== "none")
			{
				if(levelKit.sectionsARR[sectionTarget.respond.U] != undefined && levelKit.sectionsARR[sectionTarget.respond.U].ignore)
				{
					section_request(levelKit.sectionsARR[sectionTarget.respond.U].respond.U);
				}

				else
				{
					section_request(sectionTarget.respond.U);
				}

				activated = true;
			}

			break;
		}

		case "D":
		{
			if(sectionTarget.respond.D !== "none")
			{
				if(sectionTarget.respond.D === true)
				{
					// ITEM
					if(!sectionTarget.empty)
					{
						item_found();
						game.player.main.playerThink(false);
					}
				}

				else if(levelKit.sectionsARR[sectionTarget.respond.D] != undefined && levelKit.sectionsARR[sectionTarget.respond.D].ignore)
				{
					section_request(levelKit.sectionsARR[sectionTarget.respond.D].respond.D);
				}

				else
				{
					section_request(sectionTarget.respond.D);
				}

				activated = true;
			}

			break;
		}

		case "L":
		{
			if(levelKit.sectionsARR[sectionTarget.respond.L] != undefined && sectionTarget.respond.L !== "none")
			{
				if(levelKit.sectionsARR[sectionTarget.respond.L].ignore)
				{
					section_request(levelKit.sectionsARR[sectionTarget.respond.L].respond.L);
				}

				else
				{
					section_request(sectionTarget.respond.L);
				}

				activated = true;

				game.player.main.playerDirection('B');
			}

			break;
		}

		case "R":
		{
			if(sectionTarget.respond.R !== "none")
			{
				if(levelKit.sectionsARR[sectionTarget.respond.R] != undefined && levelKit.sectionsARR[sectionTarget.respond.R].ignore)
				{
					section_request(levelKit.sectionsARR[sectionTarget.respond.R].respond.R);
				}

				else
				{
					section_request(sectionTarget.respond.R);
				}

				activated = true;

				game.player.main.playerDirection('F');
			}

			break;
		}
	}


	if(keyInput)
	{
		if(activated)
		{
			ui_reset();
			hint_reset();
		}
	}

	if(activated)
	{
		if(!levelKit.itemEvent)
		{
			game.player.main.playerWalk(true);
		}
	}
}

function ui_activate(obj)
{
	obj.show = true;
	obj.hasEvent = true;
	obj.htmlAttach.classList.remove("ui-default");

	if(general.touchDevice)
	{
		obj.htmlAttach.addEventListener("touchstart", ui_event, false);
		obj.htmlAttach.addEventListener("touchend", ui_event, false);
	}

	else
	{
		obj.htmlAttach.addEventListener("click", ui_event, false);
	}
}

function ui_reset()
{
	for(let i in ui.list)
	{
		if(ui.list[i].show)
		{
			ui.list[i].show = false;
			ui.list[i].htmlAttach.classList.add("ui-default");	
		}
		
		
		if(ui.list[i].hasEvent)
		{
			if(general.touchDevice)
			{
				ui.list[i].htmlAttach.removeEventListener("touchstart", ui_event, false);
				ui.list[i].htmlAttach.removeEventListener("touchend", ui_event, false);
			}

			else
			{
				ui.list[i].htmlAttach.removeEventListener("click", ui_event, false);
			}
		}
	}

	control_off();	
}

function ui_event(event)
{
	let direction; 
	
	event.preventDefault();
	
	if(event.type === "touchstart")
	{
		event.target.classList.add("ui-touch");
	}
	
	else if(event.type === "click" || event.type === "touchend")
	{
		ui_reset();
		hint_reset();
		
		if(event.type === "touchend")
		{
			event.target.classList.remove("ui-touch");
		}
		
		direction = event.target.dataset.direction;
		
		ui_path(direction, false);	
	}
}

function hint_activate(obj)
{
	let arrow = obj.htmlAttach.querySelector(".gfx-arrow");

	obj.show = true;
	obj.htmlAttach.classList.remove("ui-default");

	arrow.classList.add("tween-ui-hint");
}

function hint_reset()
{
	for(let i in ui.hintList)
	{
		if(ui.hintList[i].show)
		{
			let arrow = ui.hintList[i].htmlAttach.querySelector(".gfx-arrow");

			ui.hintList[i].show = false;
			ui.hintList[i].htmlAttach.classList.add("ui-default");

			arrow.classList.remove("tween-ui-hint");
		}
	}
}