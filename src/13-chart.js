/* global d3 */
(function() {
  d3.csv("eating-data.csv")
    .then(ready)
    .catch(function(err) {
      console.log("Failed with", err);
    });

var margin = { top: 30, left: 30, right: 30, bottom: 30 }

var height = 700 - margin.top - margin.bottom
var width = 600 - margin.left - margin.right

  var svg = d3
    .select("#chart13")
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


  const widthScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, 500]);

  const colorScale = d3.scaleOrdinal().range(["blue", "red", "green"]);

  function ready(datapoints) {
    console.log("Data is", datapoints);

    const xPositionScale = d3
      .scaleLinear()
      .domain([0, 15])
      .range([0, 550]);

    var names = datapoints.map(function(d) {
      return d.name;
    });

    var yScale = d3
      .scaleBand()
      .domain(names)
      .range([600, 0]);

    svg
      .selectAll("rect")
      .data(datapoints)
      .enter()
      .append("rect")
      .attr("width", function(d) {
        return widthScale(d.hamburgers);
      })
      .attr("height", 50)
      .attr("fill", function(d) {
        return colorScale(d.animal);
      })
      .attr("y", function(d, i) {
        return yScale(d.name);
      })
      .attr("opacity", 0.5);

    var xAxis = d3.axisBottom(xPositionScale).ticks(10);

    svg
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + 600 + ")")
      .call(xAxis)
      .lower();

    svg
      .append("text")
      .attr("x", 200)
      .attr("y", 650)
      .text("hamburgers consumed");

    var yAxis = d3.axisLeft(names).ticks(7);

    svg
      .append("g")
      .attr("class", "axis y-axis")
      .call(yAxis);
  }
})();
