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