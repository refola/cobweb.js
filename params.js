// params.js
// Automatically load and save parameters via the URL

function getHashParams(){
    return JSON.parse(decodeURI(window.location.hash).slice(1));
}

function setHashParams(params){
    window.location.hash=JSON.stringify(params);
}

window.onhashchange=loadParams;

function loadParams(){
    try{
        log(JSON.stringify(getHashParams()));
    }catch(e){
        log("Error getting params from URL hash: "+e)
    }
    setHashParams({foo:"bar",baz:'quux'});
}

var formVars=['xmin','xmax','ymin','ymax','x1','iters','func'];

// retrieve the form inputs as a map object
function formToMap(){
    params={};    
    // get parameters by ID
    for(var i in formVars){
        var v=vars[i];
        eval('params.'+v+'=getValue("'+v+'");');
    }
}

// copy a map object's values to the form
function mapToForm(map){
    for(var i in map){
        eval('setValue("'+i+'","'+map[i]+'")');
    }
}
