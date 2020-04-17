

// set the dimensions and margins of the graph
var width = 460
var height = 460

// append the svg object to the body of the page
var svg = d3
  .select("#adamVis")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

// Import data from an external CSV file
d3.json("/all-data", function (draftData) {
//d3.csv("draft_data.csv").then(function(draftData) {
  console.log([data]);

  // Format the data
  draftData.forEach(function(data) {
    data.year = Date.parse(data.year);
    data.pos = data.pos;
    data.team = data.team;
    {
        if (data.bonus == null)
             {return 0}

        else {
             data.bonus = data.bonus.replace('$', ' ');
             data.bonus = data.bonus.replace(',', '');
             data.bonus = data.bonus.replace(',', '');
             data.bonus = data.bonus.replace('.00', '');
             data.bonus = data.bonus.replace(/\s{2,}/g, '').trim();
             data.bonus = parseInt(data.bonus); }; }
    });

    var TeamBonus = []
    for (x in draftData)
      TeamBonus.push(sample[x].team);
  console.log(TeamBonus);





}); 




