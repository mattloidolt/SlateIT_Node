// contains main calls that are commonly used by many of the other js files

var url = 'http://localhost/'

function get(uri, callback) {
    $.ajax(url + 'request?' + uri, {
        type: 'GET',
        dataType: 'json',
        success: function(data) { if ( callback ) callback(data); },
        error  : function()     { if ( callback ) callback(null); }
    });
}

function put(type, data, callback) {
    $.ajax(url + 'save?Type=' + type, {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function() { if ( callback ) callback(true); },
        error  : function() { if ( callback ) callback(false); }
    });
}