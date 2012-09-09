if ("undefined" == typeof(SurfTracker)) {
    var SurfTracker = {};
}

START HERE SAVE FILTERS INSIDE JAVASCRIPT INSTEAD OF HARD CODING INTO
PREFERENCES XUL

SurfTracker.Preferences = {
    keyPress : function(ev) {
        // Enter key.
        if (ev.keyCode === 13) {
            this.addFilter();
        }
    },

    addFilter : function() {
        let newFilterElem = document.getElementById("surftracker-filter-textbox");

        let newFilterText = newFilterElem.value;
        if (newFilterText === "") {
            return;
        }

        let filters = document.getElementById("surftracker-filters-listbox");

        let i;
        for (i = 0; i < filters.getRowCount(); i++) {
            let filterText = filters.getItemAtIndex(i).label;

            if (filterText === newFilterText) {
                alert("Filter already exists!");
                return;
            }
            else if (filterText > newFilterText) {
                break;
            }
        }

        filters.insertItemAt(i, newFilterText);

        newFilterElem.value = "";
        newFilterElem.blur();
    },

    removeFilters : function() {
        let filters = document.getElementById("surftracker-filters-listbox");
        while (filters.selectedIndex >= 0) {
            filters.removeItemAt(filters.selectedIndex);
        }
    },
}


