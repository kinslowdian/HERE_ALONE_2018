// DEV ONLY REMOVE CALLS ON FINAL BUILD

// DEBUG
var trace = function(msg){ console.log(msg); };

var devDelay;
var exitFrame; //CODE DELAY

function hack_levelLoad()
{
	game.level = 0;

	level_new();

	resize_init(true);

	// devDelay = setTimeout(hack_shift, 1 * 1000);
}

function hack_shift()
{
	section_request(0);
}

function level_new()
{
	displayList.viewer.innerHTML = system.data.html_levels[game.level];
	displayList.viewer_bg.innerHTML = system.data.html_levels_bg[game.level];
	displayList.viewer_fg.innerHTML = system.data.html_levels_fg[game.level];

	level_build();
}

function level_build()
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

	section_request(0);

	exitFrame = setTimeout(level_transitionsAdd, 60);
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
}

var fader;

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














