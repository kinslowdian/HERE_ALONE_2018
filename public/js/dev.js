// DEV ONLY REMOVE CALLS ON FINAL BUILD

// DEBUG
var trace = function(msg){ console.log(msg); };

var devDelay;
var exitFrame; //CODE DELAY

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

function level_new()
{
	displayList.viewer.innerHTML = system.data.html_levels[game.level];
	displayList.viewer_bg.innerHTML = system.data.html_levels_bg[game.level];
	displayList.fx_ambience.innerHTML = system.data.html_levels_fg[game.level];
}

function level_build(auto)
{
	displayList.layerSections = document.querySelector(".layer-sections");
	displayList.layerItems = document.querySelector(".layer-items");

	levelKit.levelChange = false;

	section_init();
	item_init();
	camera_init();
	ui_init();
	player_init();
	control_init();

	section_request(game.sectionStart);

	if(auto)
	{
		exitFrame = setTimeout(level_transitionsAdd, 60);
	}
}

function level_transitionsAdd()
{
	game.player.main.attachMainTween();
	CAM.attachMainTween();

	level_controlAdd();
}

function level_controlAdd()
{
	camera_newFocus();
	control_on(true);

	level_start();
}

function level_start()
{
	// FADE ETC... START

	sound_level_A();
}

function level_change()
{
	if(levelKit.edge_apply !== "none")
	{
		displayList.fx_edge.classList.add(levelKit.edge_apply);
	}

	level_new();
	level_build(false);
}

function level_ready()
{
	level_transitionsAdd();
}

var fader;

function fader_init()
{
	fader = {};
	fader.htmlAttach = {};
	fader.htmlAttach.outer = document.querySelector(".fader-wrapper");
	fader.htmlAttach.inner = document.querySelector(".fader");
}

function fader_request(actionS, actionE)
{
	fader.actionS = actionS;
	fader.actionE = actionE;

	fader.htmlAttach.outer.classList.remove("fader-off");

	fader.htmlAttach.inner.addEventListener("transitionend", fader_event, false);

	fader.htmlAttach.inner.classList.remove("fader-default");
}

function fader_event(event)
{
	let delay;

	fader.htmlAttach.inner.removeEventListener("transitionend", fader_event, false);

	fader.actionS();

	delay = setTimeout(fader_reverse, 0.2 * 1000);
}

function fader_reverse()
{
	fader.htmlAttach.inner.addEventListener("transitionend", fader_end, false);

	fader.htmlAttach.inner.classList.add("fader-default");
}

function fader_end(event)
{
	fader.htmlAttach.inner.removeEventListener("transitionend", fader_end, false);

	fader.htmlAttach.outer.classList.add("fader-off");

	fader.actionE();
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

function soundTest_pass()
{
	system.soundFeature = true;

	displayList.mute.addEventListener("click", sound_mute, false);
}

function soundTest_fail()
{
	system.soundFeature = false;

	displayList.libAudio.remove();

	displayList.mute.remove();
}

function sound_level_A()
{
	trace("sound_level_A(); " + system.soundFeature);

	if(system.soundFeature)
	{
		system.soundList = {};

		for(var i in system.data.json.LEVELS[game.level].sound)
		{
			sound_build(system.data.json.LEVELS[game.level].sound[i]);
		}

		sound_level_stage_B();
	}
}

function sound_level_stage_B()
{
	for(var j in system.data.json.LEVELS[game.level].sound_custom)
	{
		let target_instanceClass 	= system.data.json.LEVELS[game.level].sound_custom[j].instanceClass;
		let target_callFunct 		= system.data.json.LEVELS[game.level].sound_custom[j].funct;
		let target_callParams 		= system.data.json.LEVELS[game.level].sound_custom[j].params || false;

		if(target_callParams)
		{
			system.soundList[target_instanceClass][target_callFunct](target_callParams);
		}

		else
		{
			system.soundList[target_instanceClass][target_callFunct]();
		}
	}

	sound_level_stage_C();
}

function sound_level_stage_C()
{
	for(var i in system.soundList)
	{
		system.soundList[i].soundBegin();
	}
}

function sound_build(params)
{
	system.soundList[params.instanceClass] = new SoundFX(document.querySelector("." + params.instanceClass), system.soundMuted);
	system.soundList[params.instanceClass].create(params);
}

function sound_mute(event)
{
	if(system.soundMuted)
	{
		system.soundMuted = false;
	}

	else
	{
		system.soundMuted = true;
	}

	if(system.soundList)
	{
		for(var i in system.soundList)
		{
			system.soundList[i].soundMute(system.soundMuted);
		}
	}
}

function sound_purge()
{
	for(var i in system.soundList)
	{
		system.soundList[i].soundStop();
		system.soundList[i].soundKill();
	}

	// SOUND FLUSH
	system.soundList = {};
	system.soundList = false;
}








