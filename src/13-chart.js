/* global d3 */
(function() {
  d3.csv("eating-data.csv")
    .then(ready)
    .catch(function(err) {
      console.log("Failed with", err);
    });

var margin = { top: 30, left: 50, right: 30, bottom: 30 }

var height = 600 - margin.top - margin.bottom
var width = 700 - margin.left - margin.right

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
    .range([0, width]);

  const colorScale = d3.scaleOrdinal().range(["blue", "red", "green"]);

  function ready(datapoints) {
    console.log("Data is", datapoints);

    const xPositionScale = d3
      .scaleLinear()
      .domain([0, 15])
      .range([0, width]);

    var names = datapoints.map(function(d) {
      return d.name;
    });

    var yScale = d3
      .scaleBand()
      .domain(["Stevie", "Nicholas", "Bubbletree", "Particle", "Jumpup", "Parlay", "Hio"])
      .range([height, 0]);

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

        /* Set up axes */
    const xAxis = d3.axisBottom(xPositionScale).ticks(10);
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)

    const yAxis = d3.axisLeft(yScale).ticks(7)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)


    svg
      .append("g")
      .attr("class", "axis y-axis")
      .call(yAxis);
  }
})();
