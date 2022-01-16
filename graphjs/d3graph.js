// TODO
// - Do I want dragging AND adding/remove nodes?
// - seperate style from graph
//      edges: stroke
//      nodes: r, fill
//      labels: font-size, stroke
// - add labels to nodes
// - parameterize all the things
//      svg
//      simulation
// - add text layout simulation
class D3Graph extends Graph {
    constructor() {
        super();
        
        this.width = 600;
        this.height = 600;
        
        this.node_radius = 7;
        
        // TODO: add event handlers to SVG
        this.svg = d3
        .select("body")
        .append("svg")
        .attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height])
        .attr("height", this.height)
        .attr("width", this.width);
        
        // https://github.com/d3/d3-force#links
        this.force_link = d3
        .forceLink()
        .id(d => d.id) // default is '.index'
        .strength(0.2)
        .distance(100);
        
        // https://github.com/d3/d3-force#many-body
        this.force_charge = d3
        .forceManyBody()
        .strength(-300)
        .distanceMax(this.width / 2);
        
        // https://github.com/d3/d3-force#centering
        this.force_center = d3
        .forceCenter(0, 0);
        
        // https://github.com/d3/d3-force#simulation
        this.simulation = d3
        .forceSimulation()
        .force("link", this.force_link)
        .force("charge", this.force_charge)
        .force("center", this.force_center)
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", () => {
            this.svg
            .selectAll(".nodes")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
            
            this.svg
            .selectAll(".edges")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        });
    }
    
    nodes() {
        let nodes = [];
        for (let node in this._node) {
            nodes.push({ id: node });
        }
        return nodes;
    }
    
    edges() {
        let edges = [];
        for (let u in this._adj) {
            for (let v in this._adj[u]) {
                edges.push({ source: u, target: v });
            }
        }
        return edges;
    }
    
    plot() {
        let nodes = this.nodes();
        let edges = this.edges();
        
        // order of updating matters!
        this.svg
        .selectAll(".edges")
        .data(edges)
        .join("line")
        .attr("class", "edges")
        .attr("stroke", "blue");
        
        this.svg
        .selectAll(".nodes")
        .data(nodes)
        .join("circle")
        .attr("class", "nodes")
        .attr("r", this.node_radius)
        .attr("fill", "red")
        .call(drag(this.simulation))
        .append("title") // order call/append matters!
        .text(d => d.id);
        
        this.simulation.nodes(nodes);
        this.simulation.force("link").links(edges);
        this.simulation.restart();
    }
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
