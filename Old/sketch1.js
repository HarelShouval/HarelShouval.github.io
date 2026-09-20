// Function for the first canvas (Instance Mode)
function sketch1(p) {
    p.setup = function() {
      // Create the canvas and parent it to the div with id "canvas1-container"
      let canvas1 = p.createCanvas(400, 300);
      canvas1.parent('canvas1-container');
      p.background(220); // Example background color
    };
  
    p.draw = function() {
      // Drawing code for the first canvas
      p.ellipse(p.mouseX, p.mouseY, 20, 20); // Example: Draw ellipses where the mouse moves
    };
  }
  
  // Create a new p5 instance and run sketch1 within it, in the "canvas1-container" div
  new p5(sketch1, 'canvas1-container');
  