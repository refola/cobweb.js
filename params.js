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
    params=JSON.parse(decodeURI(window.location.hash).slice(1));
    for(i in defaultParams){
        v=defaultParams[i];
        //log(i+"="+v);
    }
    return params;
}

// Set parameters to the URL's hash.
// Example: setHashParams({foo:"bar",baz:'quux'});
function setHashParams(params){
    window.location.hash=JSON.stringify(params);
}

window.onhashchange=loadParams;
window.onhashchange();

// Load parameters from URL hash
function loadParams(){
    var params=JSON.parse(JSON.stringify(defaultParams));
    //log("Default params are: "+JSON.stringify(params));
    try{
        var hashParams=getHashParams();
        for(i in params){
            //log("Processing param: "+i);
            if(hashParams[i]){
                params[i]=hashParams[i];
            }
        }
        log(JSON.stringify(params));
    }catch(e){
        log("Error getting params from URL hash: "+e)
    }
    mapToForm(params);
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
        setValue(i,map[i]);
        // TODO: This is about what needs to be called....
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

// Convenience function for setting text in a text box
function setValue(name, value){
    var elt=document.getElementById(name);
    if(elt!=null){
        elt.value=value;
        //log("Set "+name+" to "+value);
    }else{
        log("Can't set "+name+" to "+value+": null");
    }
}

function globToHash(){
	var params=JSON.parse(JSON.stringify(glob));
	delete params["graph"];
	setHashParams(params);
	log(window.location.hash);
}
