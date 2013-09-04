var resources = {
    files: {}, ///<list of files to be loaded
    /**
     * @brief adds a file to be loaded
     * @param {string} id used to identify the file
     * @param {string} path path used to locate and load the file
     */
    add: function(id, path) {
        this.done = false;
        this.files[id] = {};
        this.files[id]['loaded'] = false;
        this.files[id]['path'] = path;
    },
    /**
     * @brief loads all files at once and runs the callback function
     * @param {function} callback function to be run after all loading is complete
     */
    loadAll: function(callback) {
        for (var id in this.files) {
            this.getJSON(this.files[id]['path'], id, callback);
        }
    },
    /**
     * @brief returns the file associated with the id
     * @param {type} id retrieves file with associated id
     * @throws {exception} if file is not loaded yet
     * @returns {string} file attached to id
     */
    retrieve: function(id) {
        if (!this.files[id]['loaded'])
            throw "cannot resources.retrieve(" + id + ") without doing resources.loadAll() first";
        return this.files[id]['value'];
    },
    /**
     * @brief utility function used to unify debug output for resource load
     * @param {string} name resource name
     */
    onload: function(name) {
        console.log("loaded " + name);
    },
    /**
     * @brief preforms an AJAX call
     * @param {string} url URL path to load from
     * @param {string} id resource id being loaded
     * @param {function} callback function to call when all files have been loaded
     */
    getJSON: function(url, id, callback) {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                resources.onload(resources.files[id]['path']);
                resources.files[id]['value'] = xmlhttp.responseText;
                resources.files[id]['loaded'] = true;
                if (resources.doneLoading()) {
                    callback();
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    },
    /**
     * @brief checks if all files have been loaded
     * @returns {Boolean}
     */
    doneLoading: function() {
        for (var d in this.files) {
            if (!this.files[d]['loaded'])
                return false;
        }
        return true;
    }
};