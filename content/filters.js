if ("undefined" == typeof(SurfTracker)) {
    var SurfTracker = {};
}

SurfTracker.Filters = {
    keyPress : function(ev) {
        // Enter key.
        if (ev.keyCode === 13) {
            this.addFilter();
        }
    },

    init : function() {
        this.filters = window.arguments[0].filters;

        // Make a copy of filters in case we need to cancel.
        this.originalFilters = this.filters.slice(0);

        this.loadFilters();
    },

    addFilter : function() {
        let textBox = document.getElementById("surftracker-filter-textbox");

        let newFilter = textBox.value;
        if (newFilter === "") {
            return;
        }

        let listBox = document.getElementById("surftracker-filters-listbox");

        let i;
        for (i = 0; i < listBox.getRowCount(); i++) {
            let filter = listBox.getItemAtIndex(i).label;

            if (filter === newFilter) {
                alert("Filter already exists!");
                return;
            }
            else if (filter > newFilter) {
                break;
            }
        }

        listBox.insertItemAt(i, newFilter);

        textBox.value = "";

        this.saveFilters();
    },

    removeSelectedFilters : function() {
        let listBox = document.getElementById("surftracker-filters-listbox");

        while (listBox.selectedIndex >= 0) {
            listBox.removeItemAt(listBox.selectedIndex);
        }

        this.saveFilters();
    },

    /*
     * Load the filter list from shared filters variable.
     */
    loadFilters : function() {
        let listBox = document.getElementById("surftracker-filters-listbox");

        // Clear the list.
        while (listBox.getRowCount() > 0) {
            listBox.removeItemAt(0);
        }

        // Load it up.
        for (let i = 0; i < this.filters.length; i++) {
            listBox.appendItem(this.filters[i]);
        }
    },

    /*
     * Save the filters into the shared filters variable.
     */
    saveFilters : function() {
        let listBox = document.getElementById("surftracker-filters-listbox");

        // Set length so we don't change the reference.
        this.filters.length = 0;

        for (let i = 0; i < listBox.getRowCount(); i++) {
            this.filters.push(listBox.getItemAtIndex(i).label);
        }
    },

    /*
     * Cancel by restoring original filters and closing.
     */
    cancel : function() {
        this.filters.length = 0;
        this.filters.push.apply(this.filters, this.originalFilters);
        window.close();
    },
}


