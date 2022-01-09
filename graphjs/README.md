# graphjs
Plot graphs using D3.js. See references for more information.

JS has the duality between DOM and virtual DOM: the things
that are visible and the model we created in code. D3.js deals
with this through `data` and `join` functions.

# Usage Examples
Plot a simple graph with 4 nodes and 4 edges:
```js
let G = D3Graph.from_edges([
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 0],
    [2, 3],
    [3, 3]
]);
G.plot();
```

Erdos renyi graph, see https://en.wikipedia.org/wiki/Erd%C5%91s%E2%80%93R%C3%A9nyi_model#Properties_of_G(n,_p):
```js
c = 1;
n = 10;
p = c * Math.log(n) / n;
G = D3Graph.random_graph(n, p);
G.plot()
```

# References
- https://d3gt.com/index.html
- https://github.com/mrpandey/d3graphTheory
- https://bl.ocks.org/mbostock/4062045

- https://observablehq.com/@d3/force-directed-tree
- https://observablehq.com/@d3/force-directed-lattice
- https://github.com/d3/d3-force

- https://devdocs.io/d3~4/d3-selection#selection_data
- https://d3-wiki.readthedocs.io/zh_CN/master/Selections/#data

How to relate data and DOM with d3 `join`:
- https://observablehq.com/@d3/selection-join