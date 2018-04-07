// DEV ONLY REMOVE CALLS ON FINAL BUILD

function hack_levelLoad()
{
	let disp = document.querySelector(".ha-display-inner");

	game.level = 0;

	disp.innerHTML = system.data.html_levels[game.level];

	section_init();

	// TODO APPLY THIS WHEN CAM IN PLACE
	// LAST
	// resize_init(true);
}