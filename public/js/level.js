//// LEVEL BUILD & CHANGE

function level_new()
{
	displayList.viewer.innerHTML = system.data.html_levels[game.level];
	displayList.viewer_bg.innerHTML = system.data.html_levels_bg[game.level];
	displayList.fx_ambience.innerHTML = system.data.html_levels_fg[game.level];
}

function level_build(auto)
{
	displayList.layerSections = document.querySelector(".layer-sections");
	displayList.layerItems = document.querySelector(".layer-items");

	levelKit.levelChange = false;

	section_init();
	item_init();
	camera_init();
	ui_init();
	player_init();
	control_init();

	section_request(game.sectionStart);

	if(auto)
	{
		exitFrame = setTimeout(level_transitionsAdd, 60);
	}
}

function level_transitionsAdd()
{
	game.player.main.attachMainTween();
	CAM.attachMainTween();

	level_controlAdd();
}

function level_controlAdd()
{
	camera_newFocus();
	control_on(true);

	level_start();
}

function level_start()
{
	// FADE ETC... START

	sound_level_A();
}

function level_change()
{
	if(levelKit.edge_apply !== "none")
	{
		displayList.fx_edge.classList.add(levelKit.edge_apply);
	}

	level_new();
	level_build(false);
}

function level_ready()
{
	level_transitionsAdd();
}

//// FADER

function fader_init()
{
	fader = {};
	fader.htmlAttach = {};
	fader.htmlAttach.outer = document.querySelector(".fader-wrapper");
	fader.htmlAttach.inner = document.querySelector(".fader");
}

function fader_request(actionS, actionE)
{
	fader.actionS = actionS;
	fader.actionE = actionE;

	fader.htmlAttach.outer.classList.remove("fader-off");

	fader.htmlAttach.inner.addEventListener("transitionend", fader_event, false);

	fader.htmlAttach.inner.classList.remove("fader-default");
}

function fader_event(event)
{
	let delay;

	fader.htmlAttach.inner.removeEventListener("transitionend", fader_event, false);

	fader.actionS();

	delay = setTimeout(fader_reverse, 0.2 * 1000);
}

function fader_reverse()
{
	fader.htmlAttach.inner.addEventListener("transitionend", fader_end, false);

	fader.htmlAttach.inner.classList.add("fader-default");
}

function fader_end(event)
{
	fader.htmlAttach.inner.removeEventListener("transitionend", fader_end, false);

	fader.htmlAttach.outer.classList.add("fader-off");

	fader.actionE();
}

//// SECTION

function section_init()
{
	levelKit.sectionsARR = new Array();
	levelKit.sectionFocus = null;
	levelKit.level_type = system.data.json.LEVELS[game.level].level_type;
	levelKit.edge_apply = system.data.json.LEVELS[game.level].edge_apply;

	displayList.sectionsELM = {};

	for(let i  = 0; i < system.data.json.LEVELS[game.level].sections.length; i++)
	{
		displayList.sectionsELM["section" + i] = {};

		let s = new Section(levelKit.unitW, levelKit.unitH, system.data.json.LEVELS[game.level].sections[i]);

		levelKit.sectionsARR.push(s);
	}

	if(levelKit.edge_apply !== "none")
	{
		displayList.fx_edge.classList.add(levelKit.edge_apply);
	}

	trace(levelKit.sectionsARR);

	// TODO ADD BELOW AFTER TEST
	// TODO BUILD CAMERA INTO HTML ADD SECTIONS LAYER AND ITEMS LAYER
	section_add();
}

function section_add()
{
	let htmlSectionBasic = "";
	let htmlSectionItem = "";

	for(let i in levelKit.sectionsARR)
	{
		if(levelKit.sectionsARR[i].isAnItem)
		{
			htmlSectionItem += levelKit.sectionsARR[i].htmlBuild;
		}

		else
		{
			htmlSectionBasic += levelKit.sectionsARR[i].htmlBuild;
		}
	}

	displayList.layerSections.innerHTML = htmlSectionBasic;
	displayList.layerItems.innerHTML = htmlSectionItem;

	section_display();
}

function section_display()
{
	for(let i in levelKit.sectionsARR)
	{
		displayList["section" + levelKit.sectionsARR[i].num] = document.querySelector("." + levelKit.sectionsARR[i].classBuild);
		levelKit.sectionsARR[i].list(displayList["section" + levelKit.sectionsARR[i].num]);
	}
}

function section_request(num)
{
	if(num != levelKit.sectionFocus)
	{
		levelKit.sectionFocus = num;
		
		CAM.viewerFind(levelKit.sectionsARR[levelKit.sectionFocus]);
	}
}

//// ITEM

// TODO
function item_init()
{
	levelKit.itemsARR = new Array();
	levelKit.itemEvent = false;
}

//// CAMERA CREATE & FOCUS

function camera_init()
{
	CAM = new Camera(displayList.camera, camera_newFocus);

	CAM.updateResizeCamera();
	CAM.connectViewer(displayList.viewer);
	// CAM.connectViewerOther(displayList.viewer_fg);
}

// ON END OF CAMERA TRANSITIONS
function camera_newFocus()
{
	let sectionOBJ = levelKit.sectionsARR[levelKit.sectionFocus];

	if(sectionOBJ.exit)
	{
		levelKit.levelChange = true;
	}

	// trace("camera_newFocus();")

	CAM.viewerUpdateValues();

	game.player.main.playerWalk(false);

	// TODO WHEN READY
	// if(sectionOBJ.isAnItem && !itemsARR[sectionOBJ.item_ref].itemFound)
	// {
	// 	game.player.main.playerThink(true);
	// }

	if(levelKit.itemEvent)
	{
		// DO NOTHING
	}

	else if(levelKit.levelChange)
	{
		game.level = sectionOBJ.go;
		game.sectionStart = sectionOBJ.start;

		sound_purge();

		fader_request(level_change, level_ready);
	}

	else
	{
		ui_required();
	}
}