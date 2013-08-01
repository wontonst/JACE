var resources = {
    files: {},
    add: function(id, path) {
        this.done = false;
        this.files[id] = {};
        this.files[id]['loaded'] = false;
        this.files[id]['path'] = path;
    },
    loadAll: function(callback) {
        for (var id in this.files) {
            this.getJSON(this.files[id]['path'], id, callback);
        }
    },
    retrieve: function(id) {
        return this.files[id]['value'];
    },
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
                console.log("loaded " + resources.files[id]['path']);
                resources.files[id]['value'] = xmlhttp.responseText;
                resources.files[id]['loaded'] = true;
                if(resources.doneLoading()){
                    callback();
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    },
    doneLoading: function() {
        for (var d in this.files) {
            if (!this.files[d]['loaded'])
                return false;
        }
        return true;
    }
};