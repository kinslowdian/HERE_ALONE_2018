var displayList;

var system;
var CAM;
var levelKit;
var game;
var sadly;
var html_lib;
var control;
var ui;
var exitFrame; //CODE DELAY
var fader;

function pageLoad_init()
{
	trace("pageLoad_init();");
	
	system = {};
	system.touchDevice = false;
	system.soundFeature = false;
	system.soundMuted = false;
	system.soundList = false;

	window.addEventListener("touchstart", () => {system.touchDevice = true;}, false);

	if(system.touchDevice)
	{
		project_ios_fix_init();
	}

	hereAlone_init();
}

function project_ios_fix_init()
{
	window.removeEventListener("touchstart", () => {system.touchDevice = true;}, false);

	document.addEventListener("gesturestart", project_ios_fix_event, false);
	document.addEventListener("touchcancel", project_ios_fix_event, false);
}

function project_ios_fix_event(event)
{
	event.preventDefault();
}

function hereAlone_init()
{
	html_lib_read();

	// system = {};
	system.data = {};
	system.data.json  = null;
	system.data.html_levels = null;
	system.resizeTimeout;

	displayList = {};
	displayList.camera = document.querySelector(".camera");
	displayList.viewer = document.querySelector(".camera .viewer");
	displayList.viewer_bg = document.querySelector(".viewer-bg");
	displayList.fx_ambience = document.querySelector(".fx-ambience");
	displayList.fx_edge = document.querySelector(".fx-edge");

	displayList.linAudio = document.querySelector(".lib-audio");

	levelKit = {};
	levelKit.unitW = 55;
	levelKit.unitH = 125;

	game = {};

	// LOAD DATA 0
	hereAlone_data0_find();

	// INTRO REGISTER (dev.js)
	intro_init();
}

function displayList_register(name, selector)
{
	displayList[name] = document.querySelector(selector);
}

// DATA

function hereAlone_data0_find()
{
	load_ext_data('public/data/setup.json', hereAlone_data0_read, true);	
}

function hereAlone_data0_read(data)
{
	system.data.json = JSON.parse(data);

	// LOAD DATA 1
	hereAlone_data1_find();
}

function hereAlone_data1_find()
{
	load_ext_data("public/data/levels.html", hereAlone_data1_read, false);
}

function hereAlone_data1_read(data)
{
	let data_raw = data;
	let data_purge = data_raw.split('<!-- READ -->');
	
	system.data.html_levels = data_purge[1].split('<div class="data-split"></div>');

	// LOAD DATA 2
	hereAlone_data2_find();
}

function hereAlone_data2_find()
{
	load_ext_data("public/data/levels_bg.html", hereAlone_data2_read, false);	
}

function hereAlone_data2_read(data)
{
	let data_raw = data;
	let data_purge = data_raw.split('<!-- READ -->');
	
	system.data.html_levels_bg = data_purge[1].split('<div class="data-split"></div>');

	// LOAD DATA 3
	hereAlone_data3_find()
}

function hereAlone_data3_find()
{
	load_ext_data("public/data/levels_fg.html", hereAlone_data3_read, false);	
}

function hereAlone_data3_read(data)
{
	let data_raw = data;
	let data_purge = data_raw.split('<!-- READ -->');
	
	system.data.html_levels_fg = data_purge[1].split('<div class="data-split"></div>');

	trace(system.data.html_levels_fg);

	// READY TO START IN dev.js
	// hack_levelLoad();
	// DELAYED NOW UNTIL INTRO CLICKED

	// ALOW INTRO REMOVE IN dev.js
	intro_ready();
}

function html_lib_read()
{
	let lib_source = document.querySelector(".ha-lib");

	html_lib = {};
	// LIST
	html_lib.lib_sadly = document.querySelector(".ha-lib-sadly").innerHTML;
	html_lib.lip_player_wrapper = document.querySelector(".ha-lib-player-wrapper").innerHTML;

	trace(html_lib);

	// ON END
	lib_source.remove();
}


//// GENREAL STAGE

function resize_init(run)
{
	if(run)
	{
		window.addEventListener("resize", resize_throttler, false);
	}

	else
	{
		window.removeEventListener("resize", resize_throttler, false);
	}
}

function resize_throttler()
{
	if(!system.resizeTimeout)
	{
		system.resizeTimeout = setTimeout(resize_call, 66);
	}
}

function resize_call()
{
	system.resizeTimeout = null;
	resize_apply();
}

function resize_apply()
{
	CAM.updateResizeCamera();
	CAM.viewerFind(levelKit.sectionsARR[levelKit.sectionFocus]);
}

//// SOUND

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







