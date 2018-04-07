function section_init()
{
	levelKit.sectionsARR = new Array();
	levelKit.sectionFocus = null;

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

function section_request(num)
{
	if(num != levelKit.sectionFocus)
	{
		levelKit.sectionFocus = num;
		
		CAM.viewerFind(levelKit.sectionsARR[levelKit.sectionFocus]);
	}
}

function camera_init()
{
	CAM = new Camera(displayList.camera);

	CAM.updateResizeCamera();
	CAM.connectViewer(displayList.viewer);
	// CAM.connectViewerOther(displayList.layer0);
}

// ON END OF CAMERA TRANSITIONS
function camera_newFocus()
{
	let sectionOBJ = levelKit.sectionsARR[levelKit.sectionFocus];

	trace("camera_newFocus();")

	CAM.viewerUpdateValues();

	// TODO WHEN READY
	// player.playerWalk(false);

	// if(sectionOBJ.isAnItem && !itemsARR[sectionOBJ.item_ref].itemFound)
	// {
	// 	player.playerThink(true);
	// }

	// if(itemEvent)
	// {
	// 	// DO NOTHING
	// }

	// else
	// {
	// 	ui_required();
	// }
}