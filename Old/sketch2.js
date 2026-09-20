// Function for the second canvas (Instance Mode)
function sketch2(p) {
  p.setup = function() {
    // Create the canvas and parent it to the div with id "canvas2-container"
    let canvas2 = p.createCanvas(300, 200);
    canvas2.parent('canvas2-container');
    p.background(100); // Example background color

   
  };

  p.draw = function() {
    // Drawing code for the second canvas
    //p.rect(p.width / 2, p.height / 2, 50, 50); // Example: Draw a rectangle

    p.drawRect(p.mouseX,p.mouseY);
  };

  p.drawRect = function(x,y){
    p.fill(200,0,100)
    p.rect(x,y,20,80)
  }

  
  }


// Create a new p5 instance and run sketch2 within it, in the "canvas2-container" div
new p5(sketch2, 'canvas2-container');

