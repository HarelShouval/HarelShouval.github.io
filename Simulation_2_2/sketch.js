// put in buttons to make chice - problem probably with update
// it seems screen only updated in every draw loop
// Try to fix with v4
let Student_array = []; //array storing all student objects/classes
let students=[];
let students0 = [];
let interactions = [];
let frustrations = [];
let frustrations_av=[];
let my_frustrations=[]; //Assume I am student #1 for now 0 in p5.js indexes
let h = [];
var n = 50; // total number pf students
var it=150;
Energy=[];
var counter = 0;
var symmetric=1;
var box_w=5;
var box_h=6;

var plotx_buffer=50; // distance from left
var ploty_buffer=30; // distance between plots

var buttonUp
var buttonDown
var buttonStart
var buttonReset

var i_flip

var collect_choice=0

var test_if=0;
var press=0;

var x_pad=50;
var y_pad=200;

var start_loop=0;

var plot1_height=150;

var plot2_height=n*box_h; //500;

var plot3_height=280;

var reStart_flag=1;

//var box_h = round(plot2_height/n);

plot2start=plot1_height+ploty_buffer; // Should start after plot1 + buffer
plot3start=plot2start+plot2_height+ploty_buffer;

// total width of all plots
var plots_width=x_pad+it*box_w+plotx_buffer;

// total height of all plots

var plots_height=plot1_height+plot2_height+plot3_height+2*ploty_buffer


function setup() {
  
  createCanvas(plots_width,plots_height);
  
  background(220);
  
  i_flip=floor(random(0,n)); 
  
  
  
  if (i_flip==0) {colect_choice=1;} else{collect_choice=0;}

    buttonUp=createButton('  UP  ');
    buttonUp.position(390,110);
    buttonUp.size(80,40)
    buttonDown=createButton(' Down');
    buttonDown.position(390,170);
    buttonDown.size(80,40)
  
    buttonStart=createButton('START')
    buttonStart.position(485,90);
    buttonStart.size(150,60);
  
    buttonDown.style('background-color', 'Gray');
    buttonUp.style('background-color', 'Gray');
    let col = color(0,255,0);
    buttonStart.style('background-color',col);
    
    control_panel();
    
      
    
  
  // create initial random student placement
  // place students into 2 catogories randomly
  for (var x = 0; x < n; x++) {
    students[x] = 2 * (random(0, 1) > 0.5) - 1;
    students0[x]=students[x];
  }
  // print(students)
  
  // loop for generating interaction matrix

  for (let x = 0; x < n; x++) {
    interactions[x] = []; // create nested array
    for (let y = 0; y < n; y++) {
      interactions[x][y] = 2 * (random(0, 1) > 0.5) - 1;
      if (x==y) {interactions[x][y]=0;}
      if (symmetric == 1)
        {if (x>y)
           {interactions[x][y]=interactions[y][x]}
        } // if
          
        } // for y
    } //for x
  
  //print(interactions)
  
  //push();
  //  control_panel() // initial control panel display
  //pop();
  
  setTimeout(Run_iteration,150);
  //setTimeout(Draw,150);
  buttonReset=createButton('  RESET  ');
  buttonReset.position(485,165);
  buttonReset.size(150,60);

}// end setup

function reStart()
{  createCanvas(plots_width,plots_height);
  start_loop=0;
  background(220);
   print('reStart')
   i_flip=floor(random(0,n)); 
  
  //buttonReset.style('background-color','Yellow');
  
  if (i_flip==0) {colect_choice=1;} else{collect_choice=0;}
 
   counter=0;

    control_panel();
    
      
    
  
  // create initial random student placement
  // place students into 2 catogories randomly
  for (var x = 0; x < n; x++) {
    students[x] = 2 * (random(0, 1) > 0.5) - 1;
    students0[x]=students[x];
  }
  // print(students)
  
  // loop for generating interaction matrix

  for (let x = 0; x < n; x++) {
    interactions[x] = []; // create nested array
    for (let y = 0; y < n; y++) {
      interactions[x][y] = 2 * (random(0, 1) > 0.5) - 1;
      if (x==y) {interactions[x][y]=0;}
      if (symmetric == 1)
        {if (x>y)
           {interactions[x][y]=interactions[y][x]}
        } // if
          
        } // for y
    } //for x
  
  //print(interactions)
  
  //push();
  //  control_panel() // initial control panel display
  //pop();
  
  setTimeout(Run_iteration,150);
  reStart_flag=1;
  
  //setTimeout(Draw,150);
  //rerun();
} // end rerun

function Display_column(){ 

  //Draw Horizontal and vertical lines
  //push();
  //translate(0,plot1_height+ploty_buffer);
  
  
  
  stroke(0,0,0);
  line(plotx_buffer,plot2_height+2,width,plot2_height+2);
  
  line(plotx_buffer-2,0,plotx_buffer-2,height)
  stroke(0,128,128);
  
  push(); 
         
         translate(plotx_buffer, plot2_height/2-100);
         strokeWeight(0);
         textSize(24);
         fill('Black');
         rotate(-PI/2);
         text('Students', -150,-27);
         text('Frustration levels',-(30+plot1_height+plot2_height),-27);
  pop();
  
  
  // from here Display_class placement
  // plot class palcement - plot_2 replace with function
  
   width_x=width-plotx_buffer-x_pad; // actual width without buffers
  
   //push();
     //translate(0,plot1_height+ploty_buffer); //move to plot 2
     stroke(256,256,256)
     strokeWeight(0);
     textSize(24);
     fill('Black');
     text('Iterations',plotx_buffer+width_x/2,plot2_height+ploty_buffer);
     //text('Iterations',x_pad+width_x/2,ploty_buffer+plot1_height+plot2_height);
     //text('Iterations',x_pad+width_x/2,y_pad+box_h*n+30);
     
    
    stroke(100,100,100);
    strokeWeight(2);
     for (var x = 0; x < n; x++) { // loop over all students
      if (students[x] == 1){
        fill(0)}
      else {
        fill(255)}
        rect(x_pad+counter*((width_x)/it), x*box_h, (width_x)/it, box_h);
       
  
  //pop();
  
  // end Display_column
  
  
}
} 
  
function Display_frustrations(){ // plot 3
 // begin display frustrations
  if (counter>0){ // only make plot 3 for counter >0
    
    // from here plot_3
    
    // plot_frustrations - replace with function
    // Average frustrations - red
    //push();
     //translate(0,plot1_height+plot2_height+ploty_buffer);
     
     strokeWeight(1);
     textSize(22);
     fill('Blue');
     //text('My Frustrations', x_pad+width_x/2-250,plot1_height+plot2_height+ploty_buffer+100);
     text('My Frustrations', x_pad+width_x/2-250,100);
     fill('Red');
     text('Average Frustrations',x_pad+width_x/2+25,100);
     //text('Average Frustrations',x_pad+width_x/2+25,plot1_height+plot2_height+ploty_buffer+100);
     fill('Black');
    //pop();    
    
    
    
    stroke(255,0,0);
    strokeWeight(3);
    
    line(x_pad+(counter)*box_w,plot3_height/3-(frustrations_av[counter-1]-frustrations_av[0])*plot3_height/(n*0.5),x_pad+(counter+1)*box_w,plot3_height/3-(frustrations_av[counter]-frustrations_av[0])*plot3_height/(n*0.5));
 
  
    stroke(0,0,255);
    strokeWeight(3);
    
    line(plotx_buffer+(counter)*box_w,plot3_height/3-(my_frustrations[counter-1]-frustrations_av[0])*plot3_height/(n*0.5),plotx_buffer+(counter+1)*box_w,plot3_height/3-(my_frustrations[counter]-frustrations_av[0])*plot3_height/(n*0.5));
  //  pop();
    
} //if (counter>0)
    
  if (i_flip==0){ //I am student 0 - my decision
    push()
    stroke(0,128,0);
    strokeWeight(3);
    drawingContext.setLineDash([5, 15]);
    
    //line(x_pad+(counter)*box_w,y_pad/2,x_pad+(counter)*box_w,height);
    line(plotx_buffer+(counter+1)*box_w,-(plot2_height+10),plotx_buffer+(counter+1)*box_w,height-10);
    pop()
  }
  
  
  
  push();
    //translate(0,plot1_height+plot2_height+ploty_buffer);
    stroke(256,256,256)
    textSize(18);
    fill('Blue');
  
   if (counter==0) {
    text(my_frustrations[0],26,plot3_height/3-(my_frustrations[0]-frustrations_av[0])*plot3_height/(n*0.5));
    //fill('Red');
  
     } // if (counter==0)
  
   if (counter==(it-1)) {
    // label range
     
      text(max(my_frustrations)+1,26,plot3_height/3-(max(my_frustrations)+1-frustrations_av[0])*plot3_height/(n*0.5));
     
      text(min(my_frustrations)-1,26,plot3_height/3-(min(my_frustrations)-1-frustrations_av[0])*plot3_height/(n*0.5));
    } // if (counter==it-1)
 
  pop();
  
  //End of Display_frustrations 
  
}

function Run_iteration(){ // both for the class choice dynamics and for drawing it
//function Draw(){ //
  // This still might be a problem if the mousePressed also happens once per loop
  //var start_time=millis();
  //var end_time=0;
  
  //if (reStart_flag==1){buttonRestat.mousePressed(reStart);}
  buttonReset.mousePressed(reStart);
  
  if (start_loop==0)
    {
      buttonStart.mousePressed(setStart);
      setTimeout(Run_iteration,150);
    }
  else{
  if (collect_choice==1){
        
           buttonUp.mousePressed(setUp); // I guess this only checks once on each loop- does not work.
           
           buttonDown.mousePressed(setDown);
           
           }
 else{

   i_flip=floor(random(0,n)) // choose random student to make decision
   //print(i_flip);
   //print('i_flip='+i_flip);
   if(i_flip==0){collect_choice=1;}
  
  push();
    translate(0,plot1_height+ploty_buffer); //translate to plot 2
    Display_column();
  pop();
  

  
  Energy[counter]=0;
  frustrations_av[counter]=0;
  
   for (var i=0; i<n; i++) // calcualte fields, energy and frustrations for this iteration
     { h[i]=0;
      frustrations[i]=0;
       for (var j=0; j<n; j++)
       {
         h[i]=h[i]+interactions[i][j]*students[j];//field
         frustrations[i]=frustrations[i]+((interactions[i][j]*students[j]*students[i])<0);
       } //for j
      Energy[counter]=Energy[counter]-h[i]*students[i];
      frustrations_av[counter]=frustrations_av[counter]+frustrations[i];
     } // for i
  
  Energy[counter]=Energy[counter]/n;
  my_frustrations[counter]=frustrations[0];
  frustrations_av[counter]=frustrations_av[counter]/n
  
 
  
  if (counter >0){
    if(Energy[counter]>Energy[counter-1])
      {print('OOPS Frustrations went up')}
    }
  //print(Energy[counter])
  
  push();
   translate(0,plot1_height+plot2_height+2*ploty_buffer); // translate to plot 3
   Display_frustrations();
  //print('Display_frustrations');
  pop();
  
  // here the flip is made. For student 0, Me, need to request a choice
  // other students flip automatically and optimally
  
  
    push();
       control_panel()
    pop();
  
    
    if (h[i_flip] != 0)
    {students[i_flip]= 2*(h[i_flip]>0)-1;} // Set student class membership
    
  counter++;
  //print('Counter=:'+counter);
 } //end of else of if collect_choice

  if(counter < it){
    //stroke(255,0,0);
    setTimeout(Run_iteration,50);
    //setTimeout(Draw,50);
  }
  } // start_loop
}

function setUp(){students[i_flip]=1; collect_choice=0;}
function setDown(){students[i_flip]=-1; collect_choice=0;}
function setStart(){start_loop=1; print('setStart')}

function control_panel(){
    push();
    translate(plotx_buffer,10);
    fill('Yellow');
    rect(10,0,320,plot1_height);
    
    textSize(20);
    fill('Black');
    if (collect_choice==1)
      {text('Make Decision',20,25);
       if (students[0]==1){text('You are in the UP class',20,60);}
       else {text('You are in the DOWN class',20,60);}
       
       if (h[0]==0){text('Class choice does not matter',20,95);}
       else if (h[0]>0) {text('Best Class choice UP',20,95);buttonDown.style('background-color', 'Red');buttonUp.style('background-color', 'Green')}
       else {text('Best Class choice DOWN',20,95);buttonDown.style('background-color', 'Green');buttonUp.style('background-color', 'Red')}
       
      // here more info + wait for answer
      }
    else 
      {text('Other Students Make Decisions',20,25);
       buttonDown.style('background-color', 'Gray');buttonUp.style('background-color', 'Gray');
      }
  if (counter==it-1){text('END of RUN.    ',20,100);
                     text('to run again press reset then start.    ',20,130);
                    buttonReset.style('background-color','Yellow');}
  pop();
  
}
  
//function draw() {
 
//   for (var x = 0; x < n; x++) {
//     if (students[x] == 1){
//       fill(0)}
//     else {
//       fill(255)}
//       rect(0, x*(height/n), width/n, height/n);
//   }
  

 // fill(0);
 //  rect(0, 0, 50, 50);
 //  fill(255,0,0);
 //  rect(50, 0, 50, 50)
//}
