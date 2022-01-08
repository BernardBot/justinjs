var nodes = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 }
];

var links = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 1, target: 3 },
  { source: 1, target: 4 },
  { source: 2, target: 5 },
  { source: 3, target: 6 }
];

const w = 500;
const h = 500;
const rad = 10;

// Create HTML elements
const svg_warp = document.createElement("div");
svg_warp.id = "svg-wrap";
document.body.appendChild(svg_warp);

const clear_graph = document.createElement("button");
clear_graph.id = "clear-graph";
clear_graph.innerHTML = "Clear Graph";
document.body.appendChild(clear_graph);

// setup D3
var svg = d3
  .select("#svg-wrap")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var dragLine = svg
  .append("path")
  .attr("class", "dragLine hidden")
  .attr("d", "M0,0L0,0");

var edges = svg.append("g").selectAll(".edge");
var vertices = svg.append("g").selectAll(".vertex");

var force = d3
  .forceSimulation()
  .force(
    "charge",
    d3
      .forceManyBody()
      .strength(-300)
      .distanceMax((w + h) / 2)
  )
  .force(
    "link",
    d3
      .forceLink()
      .distance(80)
      .strength(0.9)
  )
  .force("x", d3.forceX(w / 2).strength(0.1))
  .force("y", d3.forceY(h / 2).strength(0.1))
  .on("tick", tick);

const colors = d3.schemeCategory10;

var mousedownNode = null;

d3.select("#clear-graph").on("click", clearGraph);

svg
  .on("mousedown", addNode)
  .on("mousemove", updateDragLine)
  .on("mouseup", hideDragLine)
  .on("contextmenu", function () {
    d3.event.preventDefault();
  })
  .on("mouseleave", hideDragLine);

restart();

//empties the graph
function clearGraph() {
  nodes.splice(0);
  links.splice(0);
  restart();
}

//update the simulation
function tick() {
  edges
    .attr("x1", function (d) {
      return d.source.x;
    })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });

  vertices
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    });
}

function addNode() {
  var e = d3.event;
  var coords = d3.mouse(e.currentTarget);
  var newNode = { x: coords[0], y: coords[1], id: nodes.length };
  nodes.push(newNode);
  restart();
}

function removeNode(d, i) {
  var e = d3.event;
  nodes.splice(nodes.indexOf(d), 1);
  var linksToRemove = links.filter(function (l) {
    return l.source === d || l.target === d;
  });
  linksToRemove.map(function (l) {
    links.splice(links.indexOf(l), 1);
  });
  e.preventDefault();
  restart();
}

function removeEdge(d, i) {
  links.splice(links.indexOf(d), 1);
  d3.event.preventDefault();
  restart();
}

function beginDragLine(d) {
  var e = d3.event;
  //to prevent call of addNode through svg
  e.stopPropagation();
  //to prevent dragging of svg in firefox
  e.preventDefault();
  mousedownNode = d;
  dragLine
    .classed("hidden", false)
    .attr(
      "d",
      "M" +
      mousedownNode.x +
      "," +
      mousedownNode.y +
      "L" +
      mousedownNode.x +
      "," +
      mousedownNode.y
    );
}

function updateDragLine() {
  if (!mousedownNode) return;
  var coords = d3.mouse(d3.event.currentTarget);
  dragLine.attr(
    "d",
    "M" +
    mousedownNode.x +
    "," +
    mousedownNode.y +
    "L" +
    coords[0] +
    "," +
    coords[1]
  );
}

function hideDragLine() {
  dragLine.classed("hidden", true);
  mousedownNode = null;
  restart();
}

//no need to call hideDragLine() and restart() in endDragLine
//mouseup on vertices propagates to svg which calls hideDragLine
function endDragLine(d) {
  if (!mousedownNode || mousedownNode === d) return;
  //return if link already exists
  for (let i = 0; i < links.length; i++) {
    var l = links[i];
    if (
      (l.source === mousedownNode && l.target === d) ||
      (l.source === d && l.target === mousedownNode)
    ) {
      return;
    }
  }
  var newLink = { source: mousedownNode, target: d };
  links.push(newLink);
}

//updates the graph by updating links, nodes and binding them with DOM
//interface is defined through several events
function restart() {
  force.nodes(nodes);
  force.force("link").links(links);

  edges = edges.data(links, function (d) {
    return "v" + d.source.id + "-v" + d.target.id;
  });
  edges.exit().remove();

  var ed = edges
    .enter()
    .append("line")
    .attr("class", "edge")
    .on("mousedown", function () {
      d3.event.stopPropagation();
    })
    .on("contextmenu", removeEdge);

  ed.append("title").text(function (d) {
    return "v" + d.source.id + "-v" + d.target.id;
  });

  edges = ed.merge(edges);

  //vertices are known by id
  vertices = vertices.data(nodes, function (d) {
    return d.id;
  });
  vertices.exit().remove();

  var ve = vertices
    .enter()
    .append("circle")
    .attr("r", rad)
    .attr("class", "vertex")
    .style("fill", function (d, i) {
      return colors[d.id % 10];
    })
    .on("mousedown", beginDragLine)
    .on("mouseup", endDragLine)
    .on("contextmenu", removeNode);

  ve.append("title").text(function (d) {
    return "v" + d.id;
  });

  vertices = ve.merge(vertices);

  force.alpha(0.6).restart();
}
