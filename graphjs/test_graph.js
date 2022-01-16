function test_graph_smoke() {
    let G = new Graph();

    G.add_node("a");
    G.remove_node("a");
    if (G.nodes().length != 0) {
        throw "nodes() failed";
    }
    
    G.add_edge("a", "b");
    G.remove_edge("a", "b");
    if (G.edges().length != 0) {
        throw "edges() failed";
    }
}

function test_graph_nodes() {
    let G = new Graph();
    G.add_node("a");
    G.add_node("b");
    G.add_node("c");
    if (G.nodes().length != 3) {
        throw "nodes() failed";
    }
}

function test_graph_edges() {
    let G = new Graph();
    G.add_edge("a", "b");
    G.add_edge("b", "c");
    G.add_edge("c", "d");
    // times two because of undirected
    if (G.edges().length != 6) {
        throw "edges() failed";
    }
}

function test_graph_complete_smoke() {
    let G = Graph.complete_graph(3);
    if (G.nodes().length != 3) {
        throw "complete_graph() failed";
    }
    if (G.edges().length != 3 * 3) {
        throw "complete_graph() failed";
    }
}

function test_remove_all_nodes() {
    let G = Graph.random_graph(10, 0.5);
    let nodes = G.nodes();
    for (let i = 0; i < nodes.length; i++) {
        G.remove_node(nodes[i].u);
    }
    if (G.nodes().length != 0) {
        throw "remove_all_nodes() failed";
    }
    if (G.edges().length != 0) {
        throw "remove_all_nodes() failed";
    }
}

for (let key in this) {
    if (key.startsWith("test_")) {
        this[key]();
        console.log("PASSED: " + key);
    }
}
