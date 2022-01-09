// create svg element:

function foo(data) {
d3
.selectAll(".edges")
.data(data)
.join("div")
.attr("class", "edges")
.text(d => d);
}
// // Add the path using this helper function
// svg.append("circle")
//   .attr("cx", 100)
//   .attr("cy", 100)
//   .attr("r", 50)
//   .attr("stroke", "black")
//   .attr("fill", "yellow");

//   d3.select("body").selectAll("div")
//   .data([4, 8, 15, 16, 23, 42])
// .enter().append("div")
//   .text(function(d) { return d; });