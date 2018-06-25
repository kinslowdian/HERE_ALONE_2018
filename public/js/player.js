function player_init()
{
	game.player = {};
	game.player.htmlBuild = html_lib.lib_sadly;
	game.player.htmlBuildWrapper = html_lib.lip_player_wrapper;

	player_buildWrapper();
}

function player_buildWrapper()
{
	game.player.layer = document.querySelector(".player-area");
	game.player.layer.innerHTML = game.player.htmlBuildWrapper;

	player_buildCharacter(); 
}

function player_buildCharacter()
{
	let div = document.querySelector(".player-base");

	div.innerHTML = game.player.htmlBuild;

	player_refresh(true);
}

function player_refresh(full)
{
	displayList.player = displayList_add(".player");
	displayList.playerInner = displayList_add(".player-inner");
	displayList.playerBase = displayList_add(".player-base");

	displayList.sadly = displayList_add(".sadly");

	game.player.sadly = new Sadly(displayList.sadly);

	if(full)
	{
		player_object_init();
	}
}

function player_object_init()
{
	// IN TEST CODE game.player.main = player

	game.player.main = new Player(displayList.player, displayList.playerInner, displayList.playerBase, levelKit.unitW, levelKit.unitH, 0, 0);
	// game.player.main.playerAddThought(displayList.playerThought);
	game.player.main.playerDirection("F");

	game.player.main.attachCharacter(game.player.sadly);

	

	CAM.connectPlayer(game.player.main);
}