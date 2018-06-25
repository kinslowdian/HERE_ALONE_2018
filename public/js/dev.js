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
	displayList.libAudio = document.querySelector(".lib-audio");

	displayList.intro = document.querySelector(".ha-intro");
	displayList.introBtn = document.querySelector(".ha-intro-btn");

	displayList.mute = document.querySelector(".mute");
}

function intro_ready()
{
	displayList.introBtn.classList.remove("ha-intro-btn-default");

	if(system.touchDevice)
	{
		displayList.introBtn.addEventListener("touchend", intro_event, false);
	}

	else
	{
		displayList.introBtn.addEventListener("click", intro_event, false);
	}
}

function intro_event(event)
{
	if(system.touchDevice)
	{
		displayList.introBtn.removeEventListener("touchend", intro_event, false);
		
		soundTest_fail();
	}

	else
	{
		displayList.introBtn.removeEventListener("click", intro_event, false);
		
		intro_soundTest();
	}

	intro_remove();

	hack_levelLoad();
}

function intro_remove()
{
	displayList.intro.remove();
}

function intro_soundTest()
{
	let testAudio = document.querySelector(".sfx_soundTest");
	let promise = testAudio.play();

	if(promise !== undefined)
	{
		promise.then(_ => { soundTest_pass(); }).catch(error => { soundTest_fail(); });
	}	
}










