var resources = {
    files: {},
    load: function(id, path) {
        this.done = false;
        this.files[id] = {};
        this.files[id][loaded] = false;
        this.files[id][path] = path;
        this.getJSON(path, id);
    },
    retrieve: function(id) {
        return this.files[id][value];
    },
    getJSON: function(url, id) {
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
                this.files[id][value] = xmlhttp.responseText;
                this.files[id][loaded] = true;
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    },
    done: function() {
        for (var d in this.files) {
            if (!this.files[d][loaded])
                return false;
        }
        return true;
    }
};