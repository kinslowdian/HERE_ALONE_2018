
function player_init()
{
	game.player = {};
	game.player.htmlBuild = html_lib.lib_sadly;
	game.player.htmlBuildWrapper = html_lib.lip_player_wrapper;
}

function player_new()
{

}

function player_wrapper_create()
{

}

function player_buildWrapper()
{
	game.player.layer = document.querySelector(".player-area");
	game.player.layer.innerHTML = game.player.htmlBuildWrapper;

	player_buildCharacter(); 
}

function player_buildCharacter()
{

}

function player_refresh()
{
	displayList.sadly = document.querySelector(".sadly");

	game.player.sadly = new Sadly(displayList.sadly);
}