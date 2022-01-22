/*
An undirected graph is a collection of nodes and edges.
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

    add_node(node, attrs={}) {
        if (!(node in this._node)) {
            this._adj[node] = {};
        }
        this._node[node] = attrs;
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

    add_edge(u, v, attrs={}) {
        if (!(u in this._node)) {
            this.add_node(u);
        }
        if (!(v in this._node)) {
            this.add_node(v);
        }
        this._adj[u][v] = attrs;
        this._adj[v][u] = attrs;
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
        let nodes = [];
        for (let u in this._node) {
            nodes.push({ u : u, attrs : this._node[u] });
        }
        return nodes;
    }

    edges() {
        let edges = [];
        for (let u in this._adj) {
            for (let v in this._adj[u]) {
                edges.push({ u : u, v : v, attrs : this._adj[u][v] });
            }
        }
        return edges;
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
