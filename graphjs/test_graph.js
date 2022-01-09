// G = new Graph();

// G.add_edge("A", "B");
// G.add_edge("A", "C");
// G.add_edge("B", "D");

// links = G.edges().map(edge => ({ source: edge[0], target: edge[1] }));
// nodes = G.nodes().map(node => ({ id : node }));

// // var n = 100,
// //     nodes = d3.range(n).map(function(i) { return {index: i}; }),
// //     links = d3.range(n).map(function(i) { return {source: i, target: (i + 3) % n}; });

// height = 600;
// width = 600;

// radius = 5;
// const svg = d3.select("body")
//     .append("svg")
//     .attr("viewBox", [-width / 2, -height / 2, width, height])
//     .attr("height", height)
//     .attr("width", width);

// plot_graph_d3(nodes, links, svg, radius);


// function foo() {
//     let links = G.edges().map(edge => ({ source: edge[0], target: edge[1] }));
//     let nodes = G.nodes().map(node => ({ id: node }));
//     plot_graph_d3(nodes, links, svg, radius);
// }

G = D3Graph.random_graph(10, 0.5);

G.plot();