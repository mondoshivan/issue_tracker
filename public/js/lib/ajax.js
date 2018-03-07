let xmlHttp = null;
if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
}

function getData(resource, callback) {
    if (xmlHttp === null) {return;}
    let isAsync = true;
    xmlHttp.open("GET", resource, isAsync);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function() {
        let isReady = xmlHttp.readyState === 4;
        let isSuccess = xmlHttp.status === 200;
        if (isReady && isSuccess) {
            let data = JSON.parse(xmlHttp.responseText);
            callback(data);
        }
    };
    xmlHttp.send();
}

function getComment(projectNameAndId, callback) {
    if (xmlHttp === null) {return;}
    let isAsync = true;
    xmlHttp.open("GET", "data/comments/"+projectNameAndId+".xml", isAsync);
    xmlHttp.onreadystatechange = function() {
        let isReady = xmlHttp.readyState === 4;
        let isSuccess = xmlHttp.status === 200;
        if (isReady && isSuccess) {
            let data = xmlHttp.responseXML;
            callback(data);
        }
    };
    xmlHttp.send();
}

function postData(resource, params, callback) {
    if (xmlHttp === null) {return;}
    let isAsync = true;
    xmlHttp.open("POST", resource, isAsync);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlHttp.onreadystatechange = function() {
        let isReady = xmlHttp.readyState === 4;
        let isSuccess = xmlHttp.status === 200;
        if (isReady && isSuccess) {
            let data = xmlHttp.responseXML;
            callback(data);
        }
    };
    xmlHttp.send(Utils.urlParams(params));
}