// c = 1;
// n = 10;
// p = c * Math.log(n) / n;
// G = D3Graph.random_graph(n, p);
// G.plot()

let G = D3Graph.from_edges([
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 0],
    [2, 3],
    [3, 3]
]);
G.plot();