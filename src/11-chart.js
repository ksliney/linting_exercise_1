/* global d3 */
(function() {
  d3.csv("eating-data.csv")
    .then(ready)
    .catch(function(err) {
      console.log("Failed with", err);
    });

  var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  };

  var width = 400 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var svg = d3
    .select("#chart11")
    .append("svg")
    .attr("height", height + 40)
    .attr("width", width + 40)
    .append("g")
    .attr("transform", "translate(25, 25)");

  // Build your scales here
  const xPositionScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([0, 350]);

  const pointScale = d3
    .scalePoint()
    .domain(["", "cat", "cow", "dog", ""])
    .range([300, 0]);

  function ready(datapoints) {
    console.log("Data is", datapoints);

    svg
      .selectAll("circle")
      .data(datapoints)
      .enter()
      .append("circle")
      .attr("r", 8)
      .attr("cx", function(d) {
        return xPositionScale(d.hamburgers);
      })
      .attr("cy", function(d) {
        return pointScale(d.animal);
      })
      .attr("fill", "pink");

    var yAxis = d3.axisLeft(pointScale).ticks(5);

    svg
      .append("g")
      .attr("class", "axis y-axis")
      .call(yAxis);

    var xAxis = d3.axisBottom(xPositionScale).ticks(4);

    svg
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(10," + 300 + ")")
      .call(xAxis)
      .lower();

    svg
      .append("text")
      .attr("x", 100)
      .attr("y", 340)
      .text("hamburgers consumed");
  }
})();
