// cobweb.js

// Convenience function for getting elements by ID.
function get(name) {
    return document.getElementById(name);
}

// Convenience function for getting text from a text box
function getText(name){
    var elt=get(name);
    
}

// Generate the requested cobweb diagram.
function generate() {
    // get parameters by ID
    var vars=['xmin','xmax','ymin','ymax']
    far(var v in vars){
        eval('var '+v+'=getText("'+v+'");');
    }

    // parse function
    var func=parseFunction(get('func'));

    var canvas=get('canvas');
}
