// params.js
// Automatically load and save parameters via the URL

var defaultParams={
    xmin:0,ymin:0,
    xmax:1,ymax:1,
    x1:0.51,
    iters:100,
    func:'4*x*(1-x)'
}

// Get parameters from the URL's hash.
function getHashParams(){
    return JSON.parse(decodeURI(window.location.hash).slice(1));
}

// Set parameters to the URL's hash, without window.onhashchange activating.
// Example: setHashParams({foo:"bar",baz:'quux'});
function setHashParams(params){
    var oldFn=window.onhashchange;
    window.onhashchange=function(){};
    window.location.hash=JSON.stringify(params);
    window.onhashchange=oldFn;
}

window.onhashchange=loadParams;
window.onhashchange();
// Load parameters from URL hash
function loadParams(){
    var params=JSON.parse(JSON.stringify(defaultParams));
    try{
        var hashParams=getHashParams();
        for(i in params){
            if(hashParams[i]){ // TODO: Check if hashParams[i]==0 activates a potential bug.
                params[i]=hashParams[i];
            }
        }
    }catch(e){
        log("Error getting params from URL hash: "+e);
        log("Using defaults instead.");
    }
    log("Params are: "+JSON.stringify(params));
    mapToForm(params);
    generate();
}

var formVars=['xmin','xmax','ymin','ymax','x1','iters','func'];

// retrieve form inputs and save to glob
function formToGlob(){
    // get parameters by ID
    for(var i in formVars){
        var v=formVars[i];
        glob[v]=getValue(v);
        // convert to number if possible
        if(!isNaN((glob[v]))){ // NaN!=NaN and NaN!==NaN, so need isNaN()
            glob[v]=Number(glob[v]);
        }
    }
}

// copy a map object's values to the form
function mapToForm(map){
    for(var i in map){
        setValue(i,map[i]);
    }
}
// Convenience function for setting text in a text box
function setValue(name, value){
    var elt=document.getElementById(name);
    if(elt!=null){
        elt.value=value;
    }else{
        log("Can't set "+name+" to "+value+": null");
    }
}

// Convenience function for getting elements by ID.
function get(name) {
    return document.getElementById(name);
}

// Convenience function for getting text from a text box
function getValue(name){
    return get(name).value;
}

function globToHash(){
    var params={};
    for (var i in formVars){
        param=formVars[i];
        params[param]=glob[param];
    }
    setHashParams(params);
    log(window.location.hash);
}
