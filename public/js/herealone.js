// DEBUG
var trace = function(msg){ console.log(msg); };

var system;
var levelKit;
var displayList;
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

	levelKit = {};
	levelKit.unitW = 55;
	levelKit.unitH = 125;

	game = {};

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

function section_init()
{
	levelKit.sectionsARR = new Array();

	displayList.sectionsELM = {};

	for(let i  = 0; i < system.data.json.LEVELS[game.level].sections.length; i++)
	{
		displayList.sectionsELM["section" + i] = {};

		let s = new Section(levelKit.unitW, levelKit.unitH, system.data.json.LEVELS[game.level].sections[i]);

		levelKit.sectionsARR.push(s);
	}

	trace(levelKit.sectionsARR);

	// TODO ADD BELOW AFTER TEST
	// TODO BUILD CAMERA INTO HTML ADD SECTIONS LAYER AND ITEMS LAYER
	section_add();
}

function section_add()
{
	let htmlSectionBasic = "";
	let htmlSectionItem = "";

	for(let i in levelKit.sectionsARR)
	{
		if(levelKit.sectionsARR[i].isAnItem)
		{
			htmlSectionItem += levelKit.sectionsARR[i].htmlBuild;
		}

		else
		{
			htmlSectionBasic += levelKit.sectionsARR[i].htmlBuild;
		}
	}

	displayList.layerSections.innerHTML = htmlSectionBasic;
	displayList.layerItems.innerHTML = htmlSectionItem;

	section_display();
}

function section_display()
{
	for(let i in levelKit.sectionsARR)
	{
		displayList["section" + levelKit.sectionsARR[i].num] = document.querySelector("." + levelKit.sectionsARR[i].classBuild);
		levelKit.sectionsARR[i].list(displayList["section" + levelKit.sectionsARR[i].num]);
	}
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
	CAM.viewerFind(sectionsARR[sectionFocus]);
}







