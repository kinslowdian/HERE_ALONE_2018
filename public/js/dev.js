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
	displayList.libAudio = list$(".lib-audio");

	displayList.intro = list$(".ha-intro");
	displayList.introBtn = list$(".ha-intro-btn");
	displayList.introBtnMain = list$(".ha-intro-btn p");

	displayList.introSadly = list$(".ha-intro-top .sadly");
	displayList.introSadlyBody = list$(".ha-intro-top .sadly-top");
	displayList.introSadlyLeg0 = list$(".ha-intro-top .sadly-leg0");
	displayList.introSadlyLeg1 = list$(".ha-intro-top .sadly-leg1");
	displayList.introSadlyJawT = list$(".ha-intro-top .sadly-jawT");
	displayList.introSadlyJawB = list$(".ha-intro-top .sadly-jawB");

	displayList.mute = list$(".mute");
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

	// delay = setTimeout(intro_remove, 2 * 1000);
	delay = setTimeout(intro_out, 2 * 1000);

	control_info_animate_init();

	// TODO DELAYED
	// hack_levelLoad();
}

function intro_out()
{
	displayList.intro.addEventListener("transitionend", intro_remove, false);
	// displayList.intro.style.opacity = 0;
	displayList.intro.classList.add("title-screens-out");
}

function intro_remove(event)
{
	displayList.intro.removeEventListener("transitionend", intro_remove, false);

	displayList.intro.remove();

	delete displayList.intro;
	delete displayList.introSadly;
	delete displayList.introSadlyJawT;
	delete displayList.introSadlyJawB;
}

function control_info_animate_init()
{
	let delay;

	displayList.controlInfo = list$(".ha-controls");
	displayList.controlInfo1 = list$(".ha-controls-icon-1");
	displayList.controlInfo2 = list$(".ha-controls-icon-2");

	system.tempTimer = false;
	system.controlInfoCount = 0;
	control_info_animateA();
}

function control_info_animate_out()
{
	displayList.controlInfo.addEventListener("transitionend", control_info_animate_remove, false);
	// displayList.controlInfo.style.opacity = 0;
	displayList.controlInfo.classList.add("title-screens-out");
}

function control_info_animate_remove(event)
{
	displayList.controlInfo.removeEventListener("transitionend", control_info_animate_remove, false);
	
	displayList.controlInfo.remove();

	clearTimeout(system.tempTimer);

	delete system.tempTimer;
	delete system.controlInfoCount;

	delete displayList.controlInfo;
	delete displayList.controlInfo1;
	delete displayList.controlInfo2;
}

function control_info_animateA()
{
	trace("control_info_animateA();");
	
	system.tempTimer = setTimeout(control_info_animateB, 600);
}

// C1 OFF AND DELAY FOR C2 ON
function control_info_animateB()
{
	trace("control_info_animateB();");
	
	if(system.controlInfoCount > 3)
	{
		hack_levelLoad();

		// control_info_animate_remove();
		
		control_info_animate_out();
	}

	else
	{
		displayList.controlInfo1.style.opacity = 0;

		system.tempTimer = setTimeout(control_info_animateC, 600);
	}
}

// C2 ON AND DELAY FOR C2 OFF
function control_info_animateC()
{
	trace("control_info_animateC();");

	displayList.controlInfo2.style.opacity = 1;

	system.tempTimer = setTimeout(control_info_animateD, 600);
}

// C2 OFF AND DELAY FOR C1 ON
function control_info_animateD()
{
	trace("control_info_animateE();");

	displayList.controlInfo2.style.opacity = 0;

	system.tempTimer = setTimeout(control_info_animateE, 600);
}

// C1 ON AND RESET
function control_info_animateE()
{
	system.controlInfoCount++;

	displayList.controlInfo1.style.opacity = 1;

	control_info_animateA();
}












