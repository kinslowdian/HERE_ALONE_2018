
function player_init()
{
	game.player = {};
	game.player.htmlBuild = html_lib.lib_sadly;
}

function player_plugIn()
{
	game.player.wrapper = ""; // document.querySelector(".player");
	game.player.wrapper.innerHTML = game.player.htmlBuild;
}

function player_refresh()
{
	displayList.sadly = document.querySelector(".sadly");

	game.player.sadly = new Sadly(displayList.sadly);
}