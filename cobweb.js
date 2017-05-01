// cobweb.js

// helper function for debugging
function log(message) {
    console.log(message)
}

// Convenience function for getting elements by ID.
function get(name) {
    return document.getElementById(name);
}

// Convenience function for getting text from a text box
function getText(name){
    return elt=get(name).value;
}

// Parse a mathematical function into a JavaScript function
function parseFunction(func){
    eval("f=function(x){return "+func+";};");
    log("f="+f.toString());
    return f;
}

// Generate the requested cobweb diagram.
function generate() {
    //log("in generate()");
    
    // get parameters by ID
    var vars=['xmin','xmax','ymin','ymax','x1','iters']
    for(var i in vars){
        var v=vars[i];
        var cmd='var '+v+'=getText("'+v+'");'
        eval(cmd);
        eval("log(v+'="+String(eval(v))+"');");
    }

    // parse function
    var func=parseFunction(getText('func'));

    // get convas context to draw it
    var ctx=get('canvas').getContext('2d');

    // plot it
    
    log("generate(): plotting not implemented");
    
}
