function plot_graph_d3(nodes, edges, width=600, height=600, radius=3.5) {
    const svg = d3.select("body")
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("height", height)
        .attr("width", width);
    
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(edges).id(d => d.id).distance(0).strength(1))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const _nodes = svg.append("g")
        .attr("stroke", "black")
        .attr("fill", "white")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", radius)
        .call(drag(simulation));

    _nodes.append("title")
        .text(d => d.id);

    const _edges = svg.append("g")
        .attr("stroke", "black")
        .selectAll("line")
        .data(edges)
        .join("line");

    simulation.on("tick", () => {
        _edges
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        
        _nodes
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });
}

function drag(simulation) {
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}
