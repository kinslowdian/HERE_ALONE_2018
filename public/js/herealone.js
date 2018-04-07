// DEBUG
var trace = function(msg){ console.log(msg); };

var system;
var CAM;
var displayList;
var levelKit;
var game;

function pageLoad_init()
{
	trace("pageLoad_init();");
	project_ios_fix_init();
	hereAlone_init();
}

function project_ios_fix_init()
{
	document.addEventListener("gesturestart", project_ios_fix_event, false);
	document.addEventListener("touchcancel", project_ios_fix_event, false);
}

function project_ios_fix_event(event)
{
	event.preventDefault();
}

function hereAlone_init()
{
	system = {};
	system.data = {};
	system.data.json  = null;
	system.data.html_levels = null;
	system.resizeTimeout;

	displayList = {};
	displayList.camera = document.querySelector(".camera");
	displayList.viewer = document.querySelector(".camera .viewer");
	displayList.viewer_bg = document.querySelector(".viewer-bg");

	levelKit = {};
	levelKit.unitW = 55;
	levelKit.unitH = 125;

	game = {};

	// LOAD DATA 0
	hereAlone_data0_find();
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

	trace(system.data.html_levels);

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

	trace(system.data.html_levels_bg);

	// READY TO START
	hack_levelLoad();
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







