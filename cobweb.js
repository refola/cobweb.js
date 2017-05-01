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
    if(//*
        true ||//*/
        2*borderSize>h || 2*borderSize>w){ // disable border if it's going to cause a problem
        bordersize=0;
    }
    var fillColor='rgb(128,128,128)'; //'rgb(224,224,224)';
    var borderColor='rgb(0,255,0)';
    var drawColor='rgb(0,0,0)';

    // Blank out the canvas to a pristine state.
    this.resetCanvas=function(){
        ctx.fillStyle=borderColor;
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle=fillColor;
        ctx.fillRect(borderSize,borderSize,w-2*borderSize,h-2*borderSize);
        ctx.fillStyle=drawColor
        // TODO: axes?
    }

    // convert a mathematical x coordinate to a canvas x coordinate
    function mathToCanvasX(x){
        max=w-borderSize*2;
        portion=(x-xmin)/(xmax-xmin);
        return portion*max+borderSize;
    }
    // convert a mathematical y coordinate to a canvas y coordinate
    function mathToCanvasY(y){
        max=w-borderSize*2;
        portion=(y-ymin)/(ymax-ymin);
        return h-(portion*max+borderSize);
    }

    // Plot a line segment, using math function x and y coordinates (not canvas coordinates).
    this.plotLine=function(x1,y1,x2,y2){
        var cx1=mathToCanvasX(x1);
        var cy1=mathToCanvasY(y1);
        var cx2=mathToCanvasX(x2);
        var cy2=mathToCanvasY(y2);
        ctx.beginPath();
        ctx.moveTo(cx1,cy1);
        ctx.lineTo(cx2,cy2);
    }
    // Plot a function.
    this.plotFunction=function(f){
        x1=xmin;
        y1=f(x1);
        delta=(xmax-xmin)/(w-2*borderSize);
        for(var x2=xmin+delta;x2<=xmax;x2++){
            y2=f(x2);
            this.plotLine(x1,y1,x2,y2);
        }
        ctx.stroke();
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
