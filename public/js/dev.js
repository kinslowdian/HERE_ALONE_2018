// DEV ONLY REMOVE CALLS ON FINAL BUILD

function hack_levelLoad()
{
	let disp = document.querySelector(".ha-display-inner");

	disp.innerHTML = system.data.html_levels[0];
}