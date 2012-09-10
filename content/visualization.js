if ("undefined" == typeof(SurfTracker)) {
    var SurfTracker = {};
}

SurfTracker.Visualization = {
    /*
     * Visualize the graph.
     */
    visualize : function() {
        let adjList = window.arguments[0].adjList;

        // Convert adjacency list to JIT format.
        let graphJson = [];
        for (let from in adjList) {
            let node = {
                id: from,
                name: from,
                adjacencies: [],
            };

            for (let to in adjList[from]) {
                let link = {
                    nodeTo: to,
                    data: {
                        "$type": "arrow",
                        "$direction": [from, to],
                        weight: adjList[from][to],
                    },
                };

                node.adjacencies.push(link);
            }

            graphJson.push(node);
        }

        alert(JSON.stringify(graphJson, null, "\t"));

        // Now build the graph and show it.
        let rgraph = new $jit.RGraph({
            injectInto: "surftracker-visualization-container",
            Edge: {
                overridable: true,
            },
        });

        //rgraph.loadJSON(graphJson);
        rgraph.loadJSON(graphJson, 0);
        rgraph.refresh();
    },
}

window.addEventListener("load", function load(ev) {
    // Remove listener, no longer needed.
    window.removeEventListener("load", load, false);
    SurfTracker.Visualization.visualize(); 
}, false);

