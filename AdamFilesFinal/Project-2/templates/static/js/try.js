
// Import data from an external CSV file
d3.json("/all-data", function (draftData) {
//d3.csv("draft_data.csv").then(function(draftData) {

  // Format the data
  draftData.forEach(function(data) {
    data.year = Date.parse(data.year);
    data.pos = data.pos;
    
    {
      if (data.bonus == null)
           {return data.bonus = 0}
      else {
           data.bonus = data.bonus.replace('$', ' ');
           data.bonus = data.bonus.replace(',', '');
           data.bonus = data.bonus.replace(',', '');
           data.bonus = data.bonus.replace('.00', '');
           data.bonus = data.bonus.replace(/\s{2,}/g, '').trim();  
           data.bonus = parseInt(data.bonus); 
          }; }
  });
    
    console.log([draftData]);



// filter to team and bonus columns
var TeamBonus = draftData.map(({team,bonus}) => ({team,bonus}));

TeamBonus.map(function(reduce) {
  return {
    team: reduce.team,
    bonus: TeamBonus.filter(function(o) {
      return o.team === reduce.team;
    }).reduce(function(sum, o) {
      return sum + o.bonus;
    }, 0)
  };

})

console.log(TeamBonus);


// add team's total bonuses paid
var totals = TeamBonus.reduce(function(totals, bonus) {
  var name = bonus.team
  var price = +bonus.bonus
  totals[name] = (totals[name] || 0) + price
  return totals
}, {})

console.log(totals)


});






