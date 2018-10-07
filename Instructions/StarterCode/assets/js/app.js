// @TODO: YOUR CODE HERE!
// Create margins for chart
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Setup x
var xVal = function(d) {return d.poverty;},
    xScale = d3.scaleLinear().range([0, width]),
    xMap = function(d) {return xScale(xVal(d));},
    xAxis = d3.axisBottom(xScale).tickFormat(function(d){ return d.x;});
// Setup y
var yVal = function(d) {return d["healthcare (g)"];},
    yScale = d3.scaleLinear().range([height, 0]),
    xMap = function(d) {return yScale(yVal(d));},
    yAxis = d3.axisLeft(yScale).tickFormat(function(d){ return d.x;});
// Set fill with state name
var cVal = function(d) {return d.state;},
    color = d3.schemeCategory10;
// Add graph to body
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("+margin.left+","+margin.top+")");
// add tool tip to page
var tooltip = d3.select("div").append("#scatter")
    .attr("class", "tooltip")
    .style("opacity", 0);
// Load in csv file
d3.csv("assets/data/data.csv", function(error, healthData) {
    // Log error if one occurs
    if (error) return console.warn(error);

    // Print data
    console.log(healthData);

    healthData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data["poverty (g)"] = +data["poverty (g)"];
        console.log(data);
    });

    xScale.domain([d3.min(data, xVal)-1, d3.max(data, xVal)+1]);
    yScale.domain([d3.min(data, yVal)-1, d3.max(data, yVal)+1]);
// x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
       .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("In Poverty");
// y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Lacks Healthcare (g)");
// draw dots
    svg.selectAll(".dot")
       .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d["state"] + "<br/> (" + xValue(d) 
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });    

})