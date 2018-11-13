/* global d3 */
// var width = 400
// var height = 200

(function() {
  // Here is your data
  var countries = [
    {
      name: "Blahstia",
      continent: "North America",
      gdp: 40
    },
    {
      name: "Bleers",
      continent: "Europe",
      gdp: 12
    },
    {
      name: "Blolo",
      continent: "Antarctica",
      gdp: 35
    },
    {
      name: "Blurben",
      continent: "North America",
      gdp: 90
    }
  ];

  var width = 400;
  var height = 200;

  var svg = d3
    .select("#chart2")
    .attr("width", width)
    .attr("height", height);

  var widthScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 400]);

  var colorScale = d3
    .scaleOrdinal()
    .range(["#54278f", "#756bb1", "#9e9ac8", "#cbc9e2", "#f2f0f7"]);

  // Get the svg with the id of 'chart2'

  // Get the rectangles inside of it
  svg
    .selectAll("rect")
    .data(countries)
    .attr("width", function(d) {
      return widthScale(d.gdp);
    })
    .attr("height", 50)
    .attr("fill", function(d) {
      return colorScale(d.continent);
    });

  // every single rectangle:
  // grab all bars on page:
})();

// from much earlier homework delete later:
