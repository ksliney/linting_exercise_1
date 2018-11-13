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
    .select("#chart14")
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  let xPositionScale = d3
    .scaleBand()
    .domain(["Stevie", "Nicholas", "Bubbletree", "Particle", "Jumpup", "Parlay", "Hio"])
    .range([0, width]);

  let yPositionScale = d3
  .scaleLinear()
  .domain([0, 12])
  .range([height, 0])


  const heightScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([height, 0]);

  const colorScale = d3
    .scaleOrdinal()
    .range(["blue", "red", "green", "purple", "pink"]);

  function ready(datapoints) {
    //console.log("Data is", datapoints);

    var names = datapoints.map(function(d) {
      return d.name;
    });

    svg
      .selectAll("rect")
      .data(datapoints)
      .enter()
      .append("rect")
      .attr("width", 50)
      .attr("height", function(d, i) {
        return height - yPositionScale(d.hamburgers);
      })
      .attr("fill", function(d, i) {
        return colorScale(d.animal);
      })
      .attr("x", function(d, i) {
        return xPositionScale(d.name);
      })
      .attr("y", function(d, i) {
        return yPositionScale(d.hamburgers);
      })
      .attr("opacity", 0.5);

      /* Set up axes */
     const xAxis = d3.axisBottom(xPositionScale)
      svg
        .append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

      const yAxis = d3.axisLeft(yPositionScale)
      svg
        .append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis)
      

    svg
      .append("text")
      .attr("x", 100)
      .attr("y", -10)
      .text("How many hamburgers do these pet animals eat?");
  }
})();
