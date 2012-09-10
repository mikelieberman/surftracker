if ("undefined" == typeof(SurfTracker)) {
    var SurfTracker = {};
}

SurfTracker.SurfGraph = {
    init : function() {
        this.clear();
    },

    /*
     * Add a link to the surf graph.
     */
    addLink : function(from, to) {
        // Add the source node if needed.
        if (!(from in this.adjList)) {
            this.adjList[from] = {};
        }

        // Add the dest node if needed.
        if (!(to in this.adjList)) {
            this.adjList[to] = {};
        }

        // Add the link and update weight.
        if (!(to in this.adjList[from])) {
            this.adjList[from][to] = 0;
        }
        this.adjList[from][to]++;
    },

    clear : function() {
        this.adjList = {};
    },

    print : function() {
        alert(JSON.stringify(this.adjList));
    },
}

// Initialization on startup.
window.addEventListener("load", function load(ev) {
    // Remove listener, no longer needed.
    window.removeEventListener("load", load, false);
    SurfTracker.SurfGraph.init(); 
}, false);

