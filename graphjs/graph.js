/*
A graph is a collection of nodes and edges.
This class represents a graph as an adjacency object and a node object.

We use object operators:
- in
- delete

Free from: https://networkx.org/documentation/stable/_modules/networkx/classes/graph.html#Graph
Same idea by dendihandian (actually uses networkx): https://github.com/dendihandian/grafify
*/
class Graph {
    constructor() {
        this._adj = {};
        this._node = {};
    }
    
    // TODO: handle node attributes
    add_node(node) {
        if (node in this._node) {
            return;
        }
        this._adj[node] = {};
        this._node[node] = {};
    }
    
    remove_node(node) {
        if (!(node in this._node)) {
            return;
        }
        for (let u in this._adj[node]) {
            delete this._adj[u][node];
        }
        delete this._adj[node];
        delete this._node[node];
    }
    
    add_edge(u, v) {
        if (!(u in this._node)) {
            this.add_node(u);
        }
        if (!(v in this._node)) {
            this.add_node(v);
        }
        this._adj[u][v] = {};
        this._adj[v][u] = {};
    }
    
    remove_edge(u, v) {
        if (!(u in this._node) || !(v in this._node)) {
            return;
        }
        delete this._adj[u][v];
        if (u != v) {
            delete this._adj[v][u];
        }
    }
    
    nodes() {
        return Object.keys(this._node);
    }
    
    edges() {
        let edges = [];
        for (let u in this._adj) {
            for (let v in this._adj[u]) {
                edges.push([u, v]);
            }
        }   
        return edges;
    }
    
    static from_nodes(nodes) {
        let G = new this();
        for (let node of nodes) {
            G.add_node(node);
        }
        return G;
    }
    
    static from_edges(edges) {
        let G = new this();
        for (let [u, v] of edges) {
            G.add_edge(u, v);
        }
        return G;
    }
    
    static from_object(obj) {
        let G = new this();
        
        let objs = [obj];
        while (objs.length > 0) {
            obj = objs.pop();
            
            if (typeof obj == "object") {
                for (let u in obj) {
                    if (typeof obj[u] == "object") {
                        
                        for (let v in obj[u]) {
                            G.add_edge(u, v);
                        }
                        
                        objs.push(obj[u]);
                    } else {
                        G.add_edge(u, obj[u]);
                    }
                }
            } else {
                G.add_node(obj);
            }
        }
        
        return G;
    }
    
    static from_json(json) {
        return this.from_object(JSON.parse(json));
    }
    
    static complete_graph(n) {
        let G = new this();
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                G.add_edge(i, j);
            }
        }
        return G;
    }
    
    static random_graph(n, p) {
        let G = new this();
        for (let i = 0; i < n; i++) {
            G.add_node(i);
        }
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (Math.random() < p) {
                    G.add_edge(i, j);
                }
            }
        }
        return G;
    }
}

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
