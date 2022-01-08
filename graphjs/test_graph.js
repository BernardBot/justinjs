function test_simple_remove_node_one_edge() {
    let G = new Graph();
    G.add_node("A");
    G.add_node("B");

    G.add_edge("A", "B");

    G.remove_node("A");

    G.debug_print();
}

function complete_graph(n) {
    let G = new Graph();
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            G.add_edge(i, j);
        }
    }
    return G;
}

function random_graph(n, p) {
    let G = new Graph();
    for (let i = 0; i < n; i++) {
        G.add_node(i);
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i == j) {
                continue;
            }
            if (Math.random() < p) {
                G.add_edge(i, j);
            }
        }
    }
    return G;
}
