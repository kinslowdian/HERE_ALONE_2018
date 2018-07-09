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

	displayList.introSadly = displayList_add(".ha-intro-top .sadly");
	displayList.introSadlyBody = displayList_add(".ha-intro-top .sadly-top");
	displayList.introSadlyLeg0 = displayList_add(".ha-intro-top .sadly-leg0");
	displayList.introSadlyLeg1 = displayList_add(".ha-intro-top .sadly-leg1");
	displayList.introSadlyJawT = displayList_add(".ha-intro-top .sadly-jawT");
	displayList.introSadlyJawB = displayList_add(".ha-intro-top .sadly-jawB");

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
	let delay;

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

	// intro_remove();	

	displayList.introSadlyJawT.classList.add("setting-jaw-2");
	displayList.introSadlyJawB.classList.add("setting-jaw-2");
	displayList.introSadlyBody.classList.add("tween-walk-body");
	displayList.introSadlyLeg0.classList.add("tween-walk-leg-0");
	displayList.introSadlyLeg1.classList.add("tween-walk-leg-1");

	delay = setTimeout(intro_remove, 3 * 1000);

	hack_levelLoad();
}

function intro_remove()
{
	displayList.intro.remove();

	delete displayList.introSadly;
	delete displayList.introSadlyJawT;
	delete displayList.introSadlyJawB;
}












