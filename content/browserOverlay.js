if ("undefined" == typeof(SurfTracker)) {
    var SurfTracker = {};
}

SurfTracker.BrowserOverlay = {
    init : function() {
        this.active = true;
        this.toggleActive();
        this.loadFilters();

        // Capture page loads.
        if (gBrowser !== undefined) {
            let that = this;
            gBrowser.addEventListener("load", function(ev) {
                that.captureLoad(ev);
            }, true);
        }
    },

    openFiltersWindow : function(ev) {
        let that = this;

        let win = window.openDialog('chrome://surftracker/content/filters.xul', 'surftracker-filters', 'resizable=yes', {filters: this.filters});
        win.addEventListener("unload", function() {
            that.saveFilters();
        }, true);
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
     * Outdated... We are capturing page load.
     */
    /*
    captureClick : function(ev) {
        if (!this.active || ev.target.tagName !== "A") {
            return;
        }

        // FIGURE OUT HOW TO GET CURRENT LOCATION OF WINDOW
        alert(gBrowser.contentDocument.location.href+" --> "+ev.target.href);
    },
    */

    captureLoad : function(ev) {
        if (!this.active) {
            return;
        }

        //let loc = this._getLocation(gBrowser.contentDocument.location.href);
        //alert(loc.hostname);
    },

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
    _getLocation : function(href) {
        let l = gBrowser.contentDocument.createElement("a");
        l.href = href;
        return l;
    },
}

// Initialization on startup.
window.addEventListener("load", function load(ev) {
    // Remove listener, no longer needed.
    window.removeEventListener("load", load, false);
    SurfTracker.BrowserOverlay.init(); 
}, false);

