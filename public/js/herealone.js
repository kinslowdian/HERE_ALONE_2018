// DEBUG
var trace = function(msg){ console.log(msg); };

var system;

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

	// LOAD DATA 0
	hereAlone_data0_find();
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

	// READY TO START
	hack_levelLoad();
}







