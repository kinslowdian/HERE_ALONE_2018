// DEV ONLY REMOVE CALLS ON FINAL BUILD

function hack_levelLoad()
{
	game.level = 0;

	level_new();	

	// TODO APPLY THIS WHEN CAM IN PLACE
	// LAST
	// resize_init(true);
}

function level_new()
{
	// let disp = document.querySelector(".ha-display-inner");

	// TODO
	// ADD HTML
	displayList.viewer.innerHTML = system.data.html_levels[game.level];

	level_build();
}

function level_build()
{
	displayList.layerSections = document.querySelector(".layer-sections");
	displayList.layerItems = document.querySelector(".layer-items");

	section_init();
}