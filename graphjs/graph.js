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

    debug_print() {
        console.log(this._adj);
        console.log(this._node);
    }
}
