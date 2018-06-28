// DEV ONLY REMOVE CALLS ON FINAL BUILD

// DEBUG
var trace = function(msg){ console.log(msg); };

var devDelay;


function hack_levelLoad()
{
	game.level = 0;
	game.sectionStart = 0;

	fader_init();

	level_new();
	level_build(true);

	resize_init(true);

	// devDelay = setTimeout(hack_shift, 1 * 1000);
}

function hack_shift()
{
	section_request(0);
}


function intro_init()
{
	displayList.libAudio = displayList_add(".lib-audio");

	displayList.intro = displayList_add(".ha-intro");
	displayList.introBtn = displayList_add(".ha-intro-btn");
	displayList.introBtnMain = displayList_add(".ha-intro-btn p");

	displayList.mute = displayList_add(".mute");
}

function intro_ready()
{
	displayList.introBtn.classList.remove("ha-intro-btn-default");

	if(system.touchDevice)
	{
		displayList.introBtnMain.addEventListener("touchend", intro_event, false);
	}

	else
	{
		displayList.introBtnMain.addEventListener("click", intro_event, false);
	}
}

function intro_event(event)
{
	if(system.touchDevice)
	{
		displayList.introBtnMain.removeEventListener("touchend", intro_event, false);
		
		soundTest_fail();
	}

	else
	{
		displayList.introBtnMain.removeEventListener("click", intro_event, false);
		
		intro_soundTest();
	}

	intro_remove();

	hack_levelLoad();
}

function intro_remove()
{
	displayList.intro.remove();
}












