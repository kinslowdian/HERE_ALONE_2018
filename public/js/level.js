
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