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
        let G = new Graph();
        for (let node of nodes) {
            G.add_node(node);
        }
        return G;
    }

    static from_edges(edges) {
        let G = new Graph();
        for (let [u, v] of edges) {
            G.add_edge(u, v);
        }
        return G;
    }

    static complete_graph(n) {
        let G = new Graph();
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                G.add_edge(i, j);
            }
        }
        return G;
    }

    static random_graph(n, p) {
        let G = new Graph();
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
function plot_graph_d3_static(nodes, edges, svg, radius=5) {
    // clear all elements in svg
    svg.selectAll("*").remove();

    d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(edges))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .stop();

    svg
        .append("g")
        .attr("stroke", "black")
        .attr("fill", "white")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", radius)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    svg
        .append("g")
        .attr("stroke", "black")
        .selectAll("line")
        .data(edges)
        .join("line")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
}

function plot_graph_d3(nodes, edges, svg, radius=5) {
    // clear all elements in svg
    svg.selectAll("*").remove();

    const simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(edges))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const _nodes = svg
        .append("g")
        .attr("stroke", "black")
        .attr("fill", "white")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", radius)
        .call(drag_d3(simulation));

    const _edges = svg
        .append("g")
        .attr("stroke", "black")
        .selectAll("line")
        .data(edges)
        .join("line");

    simulation.on("tick", () => {
        _nodes
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        _edges
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    });
}

function drag_d3(simulation) {
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
