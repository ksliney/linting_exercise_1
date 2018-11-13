/* global d3 */
(function() {
  d3.csv("eating-data.csv")
    .then(ready)
    .catch(function(err) {
      console.log("Failed with", err);
    });

  var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };

  var width = 400 - margin.left - margin.right;
  var height = 200 - margin.top - margin.bottom;

  var svg = d3
    .select("#chart12")
    .append("svg")
    .attr("height", height + 10)
    .attr("width", width + 10)
    .append("g")
    .attr("transform", "translate(25, 25)");

  // Build your scales here
  const xPositionScale = d3
    .scaleLinear()
    .domain([0, 15])
    .range([0, 325]);

  const colorScale = d3.scaleOrdinal().range(["blue", "red", "green"]);

  const radiusScale = d3
    .scaleSqrt()
    .domain([0, 15])
    .range([0, 50]);

  function ready(datapoints) {
    console.log("Data is", datapoints);

    svg
      .selectAll("circle")
      .data(datapoints)
      .enter()
      .append("circle")
      .attr("r", function(d) {
        return radiusScale(d.hotdogs);
      })
      .attr("cx", function(d) {
        return xPositionScale(d.hamburgers);
      })
      .attr("cy", 50)
      .attr("opacity", 0.25)
      .attr("fill", function(d) {
        return colorScale(d.animal);
      });

    var xAxis = d3.axisBottom(xPositionScale).ticks(10);

    svg
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(5," + 115 + ")")
      .call(xAxis)
      .lower();

    svg
      .append("text")
      .attr("x", 90)
      .attr("y", 150)
      .text("hamburgers consumed");
  }
})();
