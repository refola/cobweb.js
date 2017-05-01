// cobweb.js

// A graph for drawing mathy things.
function Graph(canvas,xmin,ymin,xmax,ymax){
    var vars=['canvas','xmin','ymin','xmax','ymax'];
    for(var i in vars){
        eval("var "+vars[i]+"="+vars[i]);
    }
    var ctx=canvas.getContext('2d');
    var h=canvas.height;
    var w=canvas.width;
    var borderSize=2;
    var fillColor='rgb(128,128,128)'; //'rgb(224,224,224)';
    var borderColor='rgb(0,255,0)';
    var drawColor='rgb(0,0,0)';

    // Blank out the canvas to a pristine state.
    this.resetCanvas=function(){
        ctx.fillStyle=borderColor;
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle=fillColor;
        ctx.fillRect(borderSize,borderSize,w-2*borderSize,h-2*borderSize);
        // TODO: axes?
    }

    // Plot a function.
    this.plotFunction=function(f){
        for(var i=borderSize;i<w-borderSize;i++){
            
        }
    }

    // Plot a line segment.
    this.plotLine=function(x1,y1,x2,y2){
        
    }
}

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

    // get convas and make graph
    var canvas=get('canvas');
    var graph=new Graph(canvas,xmin,ymin,xmax,ymax);
    graph.resetCanvas();
    
    // plot function
    graph.plotFunction(func);
    
    // plot y=x to 'reflect' the cobweb lines off of
    graph.plotFunction(function(x){return x});

    // plot cobweb
    for (var i=0;i<iters;i++){
        
    }
}
