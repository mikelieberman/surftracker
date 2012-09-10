if ("undefined" == typeof(SurfTracker)) {
    var SurfTracker = {};
}

SurfTracker.BrowserOverlay = {
    init : function() {
        this.active = true;
        this.toggleActive();
        this.loadFilters();

        // Capture clicks for links.
        if (gBrowser !== undefined) {
            let that = this;
            gBrowser.addEventListener("click", function(ev) {
                that.captureClick(ev);
            }, true);
        }
    },

    /*
     * Load up filters array from persistent attribute.
     */
    loadFilters : function() {
        let jsonFilters = document.getElementById("surftracker-button").getAttribute("_jsonfilters");
        this.filters = (jsonFilters !== "") ? JSON.parse(jsonFilters) : [];
    },

    /*
     * Save filters array to persistent attribute.
     */
    saveFilters : function() {
        let jsonFilters = JSON.stringify(this.filters);
        document.getElementById("surftracker-button").setAttribute("_jsonfilters", jsonFilters);
    },

    /*
     * Capture clicks on links so we can make the jump.
     */
    captureClick : function(ev) {
        if (this.active && ev.target.hasAttribute("href")) {
            let curUrl = this._getUrl(gBrowser.contentDocument.location.href);
            let nextUrl = this._getUrl(ev.target.getAttribute("href"));

            if (curUrl !== nextUrl) {
                SurfTracker.SurfGraph.addLink(curUrl, nextUrl);
            }
        }
    },

    /*
     * Capture page loads and update the surf graph.
     */
    /*
    captureLoad : function(ev) {
        if (!this.active) {
            return;
        }

        let prevUrl = this.prevHref !== null ? this._getUrl(prevHref) : null;
        let curUrl = this._getUrl(gBrowser.contentDocument.location.href);

        SurfTracker.SurfGraph.addLink(prevUrl, curUrl);

        this.prevHref = curHref;
    },
    */

    /*
     * Enable/disable surf tracking.
     */
    toggleActive : function() {
        this.active = !this.active;
        let button = document.getElementById("surftracker-button");
        button.image = this.active ? "chrome://surftracker/skin/active.png" : "chrome://surftracker/skin/inactive.png";
    },

    /*
     * Parse URL using a trick.
     */
    _getUrl : function(href) {
        let l = gBrowser.contentDocument.createElement("a");
        l.href = href;
        return l.hostname+l.pathname;
    },

    openFiltersWindow : function(ev) {
        let that = this;

        let win = window.openDialog("chrome://surftracker/content/filters.xul", "surftracker-filters", "resizable=yes", {filters: this.filters});
        win.addEventListener("unload", function() {
            that.saveFilters();
        }, true);
    },

    openVisualizeWindow : function(ev) {
        window.openDialog("chrome://surftracker/content/visualization.html", "surftracker-visualization", "resizable=yes", {adjList: SurfTracker.SurfGraph.adjList});
    },
}

// Initialization on startup.
window.addEventListener("load", function load(ev) {
    // Remove listener, no longer needed.
    window.removeEventListener("load", load, false);
    SurfTracker.BrowserOverlay.init(); 
}, false);

