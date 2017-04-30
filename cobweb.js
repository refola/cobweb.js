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
    log("parseFunction: not implemented")
}

// Generate the requested cobweb diagram.
function generate() {
    log("in generate()");
    
    // get parameters by ID
    var vars=['xmin','xmax','ymin','ymax','iters']
    for(var i in vars){
        var v=vars[i];
        var cmd='var '+v+'=getText("'+v+'");'
        log("Running: " +cmd);
        eval(cmd);
    }

    // parse function
    var func=parseFunction(get('func'));

    // get convas context to draw it
    var ctx=get('canvas').getContext('2d');

    // plot it
    log("genorate(): plotting not implemented");
}
