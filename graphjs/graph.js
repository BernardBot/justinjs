/*
A graph is a collection of nodes and edges.
This class represents a graph as an adjacency object and a node object.

We use object operators:
- in
- delete

Free from: https://networkx.org/documentation/stable/_modules/networkx/classes/graph.html#Graph
*/
class Graph {
    constructor() {
        this._adj = {};
        this._node = {};
    }

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
// - seperate style from graph
// - add labels to nodes
class D3Graph extends Graph {
    constructor() {
        super();

        const width = 600;
        const height = 600;

        this.svg = d3
            .select("body")
            .append("svg")
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("height", height)
            .attr("width", width);
        
        this.simulation = d3
            .forceSimulation()
            .force("link", d3.forceLink().id(d => d.id))
            .force("charge", d3.forceManyBody())
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

        this.svg
            .selectAll(".nodes")
            .data(nodes)
            .join("circle")
            .attr("class", "nodes")
            .attr("r", 5);

        this.svg
            .selectAll(".edges")
            .data(edges)
            .join("line")
            .attr("class", "edges")
            .attr("stroke", "black");

        this.simulation.nodes(nodes);
        this.simulation.force("link").links(edges);
        this.simulation.restart();
    }
}
