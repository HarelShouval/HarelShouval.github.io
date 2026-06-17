// put in buttons to make chice - problem probably with update
// it seems screen only updated in every draw loop
// Try to fix with v4

let student_array=[];
let students = [];
let students0 = [];
let interactions = [];
let frustrations = [];
let frustrations_av=[];
let frustrations_oligarch_av=[];
let frustrations_powerless_av=[];
let my_frustrations=[]; //Assume I am student #1 for now 0 in p5.js indexes
let h = [];
let shuffle_names=[]
var n = 60; // total number pf students
var n_o = 6; // number of Oligarchs
var power_ratio = 10; // The power ratio between powerful and powerless

var classroom_h=7; // these work only for n=60
var classroom_w=6;
var it=200;
var Energy=[];
var counter = 0;
var symmetric=1;
var par;


var plotx_buffer=40; // distance from left
var ploty_buffer=20; // distance between plots

var buttonUp;
var buttonDown;
var buttonStart;
var buttonReset;
var inputName;


var i_flip

var collect_choice=0;
var choice_array=[];

var test_if=0;
var press=0;

var x_pad=32;
var y_pad=130;

var start_loop=0;

var plot1_height=100;

var plot2_height= 260; //n*box_h; //500;

var plot3_height=170;

var plot_w=650;

var box_w = plot_w/it;
var box_h=4;

var My_name= " "

var my_number = 1;

let name_change=false;
let initialize=true;
let restart_flag=0;




//var box_h = round(plot2_height/n);

plot2start=plot1_height+ploty_buffer; // Should start after plot1 + buffer
plot3start=plot2start+plot2_height+ploty_buffer;

// total width of all plots
var plots_width=x_pad+plot_w+plotx_buffer;

// total height of all plots

var plots_height=plot1_height+plot2_height+plot3_height+2*ploty_buffer

class Student{   
  constructor (i,n,c,me){
    this.i=i; // student number in list
    this.Name=n; // students name
    this.Classroom=c; //+1 - UP, -1: DOWN
    //this.x=x;
    //this.y=y;
    //this.like=l; //Do I like this student: like=1, don'y like=-1
    this.x=i % classroom_w;
    this.y=floor(i/classroom_w);
    this.me=me; // 0 if not me, 1 if me
  }
  
 like() { //Do I like this student
    //this.like=interactions[0][this.i];
    return(interactions[my_number-1][this.i]);
  }
  
  show(){ //Show this student in appropriate classroom
      push()
      stroke(0,0,0);
      translate((this.Classroom+1)*160+plotx_buffer,0);
      textSize(10);
       if (this.like() >=0) //(interactions[0][this.i]>=0)
         {fill([255,180,150]);}
       else //this.like<0
        {fill([150,130,250]);} 
     
      if (this.me == 1) {fill([255,230,200]);}
    
      if (this.i<n_o)
          {strokeWeight(3);}
      else
        {strokeWeight(1);}
    
      rect((this.x)*46-10,(this.y)*20+7,46,17);
  
      strokeWeight(1) 
    
      fill([70,70,70]);
      text(this.Name,this.x*46-6,(this.y+1)*20);
    
       
      pop()
    
    //rect((this.x)*70-10,(this.y)*30+10,65,25);
    // fill([70,70,70]);
    // if (this.i==0) {fill(0,0,0);textStyle(BOLD);}
    // else {fill(50,50,50);strokeWeight(1);}
    // text(this.Name,this.x*70-6,(this.y+1)*30);
  }
  
  
}

let canv;

function setup() {
  
  noLoop();
  canv = createCanvas(plots_width,plots_height);
  
  background(220);
  
  //setTimeout(setup_loop,50);
  
  // Function for introduction and input name iterate until have input name
  
  inputName=createInput(My_name);

  
  par = createP('Enter your first name below.');
  par.position(5, 12);
  
  inputName.position(32,54);
  inputName.size(120,30);
  
 

   //setTimeout(setup_loop,50);
  

    inputName.changed(get_Name);


    Create_buttons();
  
    control_panel();
    
    intro_card();
  
    //Initialize_network();
  
  
  setTimeout(Run_iteration,100);
  
  //Run_iteration();
  
  buttonReset=createButton('  RESET  ');
  buttonReset.position(620*0.66,190*0.66+60); //buttonReset.position(620,240);
  buttonReset.size(100,40);
// } // end of name_change==true
}// end setup


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_Name()
  { My_name=inputName.value();
    name_change=true;
    inputName.changed(false);
    inputName.remove();
    par.remove();
    
  }


function intro_card()
{
  push();
    translate(plotx_buffer,plot1_height+ploty_buffer); //translate to plot 2
    fill(220);
    //rect(0,0,width-100,plot2_height+plot3_height-20); // box around both classrooms
    
 
    fill('Black');
    textSize(18);
    text("How to play the oligarchic classroom game:",15,20); //20,30);
    stroke('Black');
    line(15,21,310,21);
    
    textSize(12);
    text("Similar to the democratic - Enter your name first",20*2/3,70*2/3);//20,70);
    text("There are " + n +" students in total, and they need to be split into two classromms, UP and DOWN",20*2/3,100*2/3)
    fill('Black');
    text("There are " + n + " students, of those " +n_o + " are Powerful. Your probaility of being powerful is: " +(n_o/n),20*0.66,130*0.66);
    text("You are randomaly assigned to one of the groups - good luck",20*0.66,160*0.66);
    text("Indicate your choice by clicking the UP/DOWN buttons. The best choice is in Green, the worst in Red.",20*0.66,190*0.66);
    text("In the panel below you will see the class placemnts of all students, as they change.",20*0.66,220*0.66);
    text("People that you like are in the same color as you, people you dislike in a diffeerent color.",20*0.66,250*0.66);
    text("The lowest panel shows your frustration level (blue), and the average frustration level (red).",20*0.66,280*0.66);
  text("The frustration level of the powerless (green), and of the powerful (black).",20*0.66,310*0.66);
  
  fill(10,225,10);
  //stroke(0,210,10);
  stroke('Black');
  strokeWeight(3);
  textStyle(BOLD);
  textSize(18);
  text("Press the green start button to begin.",20*0.66,350*0.66);
  pop();
  
}

function restart_card()
{
  
  push();
    translate(plotx_buffer,plot1_height+ploty_buffer); //translate to plot 2
    fill(220);
    //rect(0,0,width-100,plot2_height+plot3_height-20); // box around both classrooms
    
 
    fill('Black');
    textSize(18);
    text('Observe', 20*0.66,25*0.66)
    line(20*0.66,28*0.66,110*0.66,28*0.66);
    
    textSize(12);
    text("Note that the powerful studnets are now near the top of the classrooms.",20*0.66,60*0.66);
    text("You have a slightly lighter color than your friends.",20*0.66,90*0.66);
 
 
    //text("Observe what happens when you make the recommended choice.",20*0.66,60*0.66);
 
    text("Obsereve the consequnces of a bad choice. Note that other students always make the best choice.",20*0.66,120*0.66);
  
    text("Observe the colors of the other students in your class. Are they similar to your color or different?",20*0.66,150*0.66);
  text('Students that have a similar color as you are those that you like',20*0.66, 180*0.66);
    textSize(14);
    text('What are your frustration levels compared to the powerless and powerful',20*0.66, 220*0.66);
    line(20*0.66,225*0.66,width*0.66,225*0.66);
    textSize(12);
    text("Run the simulations several times becuase each run is different.",20*0.66,260*0.66);
    text("Note that after the game is reset, there will be new students with different likes and dislikes.",20*0.66,300*0.66);
  
  textSize(18);
  textStyle(BOLD);
  fill(10,225,10);
  stroke('Black');
  strokeWeight(3);
  text("To start the game again press the Green start button",20*0.66,350*0.66);
  
  pop();

  
}
////////////*****************
/// Need to update this to conform with new setup

function reStart()
{ if (restart_flag==1){
  choice_array=[];
  createCanvas(plots_width,plots_height);
  start_loop=0;
  background(220);
  push();
  stroke(0,0,0);
  line(plotx_buffer,plot2_height+plot1_height+ploty_buffer,width,plot2_height+plot1_height+ploty_buffer);
  
  line(plotx_buffer-2,0,plotx_buffer-2,height);
  
  pop();
 
  

 
 counter=0;

    
   control_panel();     
    
  //Initialize_network();  
   
  restart_card();
  
  setTimeout(Run_iteration,200);
}
 
} // end reStart

/////////////////////////***************************

function Initialize_network() 
{
     my_number=getRandomIntInclusive(1,60);
     //print('My number')
     //print(my_number)
  
     i_flip=floor(random(0,n)); 
     if (i_flip == my_number-1) {colect_choice=1;} else{collect_choice=0;}
  
     my_number=getRandomIntInclusive(1,60);

     shuffle_names=shuffle(KidsNames);
     shuffle_names[my_number-1]=My_name; //"Harel *"; //replace with players name
     //print('My Number: '+my_number);
     //print('My Name:' + shuffle_names[my_number-1]);
     
     //print(`My Name: ${shuffle_names[my_number - 1]}`);
    
  student_array=[];
  
  // create initial random student placement
  // place students into 2 catogories randomly
  for (var x = 0; x < n; x++) {
    students[x] = 2 * (random(0, 1) > 0.5) - 1;
    students0[x]=students[x];
    var me=0;
    if (x == (my_number-1)) {me=1;}
      
    student_array.push(new Student(x,shuffle_names[x],students0[x],me));
    //student_array.push(new Student(x,'AAA',students0[x]));
   // print(x + '  name: ' + shuffle_names[x]);
  }
  
 // print('student_array[my_number-1].Name :'+student_array[my_number-1].Name);
  
  // loop for generating interaction matrix

 for (let x = 0; x < n; x++) {
    interactions[x] = [];
       for (let y = 0; y < n; y++) {
             interactions[x][y]=0;
       }
 }
   
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
  
  if (power_ratio != 1)
   {
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < n_o; y++) {
          interactions[x][y]=power_ratio*interactions[x][y];
        } // for y
      } //for x
    }
  
}

function Display_class_names()
{ 

  push(); 
         
         translate(-3, plot2_height/2-100);
         strokeWeight(0);
         textSize(16);
         fill('Black');
         rotate(-PI/2);
        
         text('Frustration levels',-(plot1_height+plot2_height),-23);
  pop();
  
  for (var x = 0; x < n; x++) {
    student_array[x].show();
  }
  

 } // end  Display_class_names
 

//////////*********************

function Display_frustrations(){ // plot 3
 // begin display frustrations
  if (counter>0){ // only make plot 3 for counter >0
    
    // from here plot_3
    
    // plot_frustrations - replace with function
    // Average frustrations - red
    //push();
     //translate(0,plot1_height+plot2_height+ploty_buffer);
     
     
     textSize(14);
     fill('Blue');
     stroke('Blue')
     strokeWeight(0)
     
     text('My Frustrations', (width-205),0);
     fill('Red');
     stroke('Red');
     text('Average Frustrations',(width-205),20);
    
     fill('Green');
     stroke('Green')
     text('Average Frustrations Powerless',(width- 205),135);
    
     fill('Black');
     stroke('Black');
     text('Average Frustrations Oligarchs',(width-205),155);
     
     fill('Black');
    //pop();    
    
    
    
    stroke(255,0,0);
    strokeWeight(3);
    
    
    line(plotx_buffer+(counter)*box_w,plot3_height/3-(frustrations_av[counter-1]-frustrations_av[0])*plot3_height/(n*0.5),plotx_buffer+(counter+1)*box_w,plot3_height/3-(frustrations_av[counter]-frustrations_av[0])*plot3_height/(n*0.5));
 
 
  
    stroke(0,0,255);
    strokeWeight(3);
    
    line(plotx_buffer+(counter)*box_w,plot3_height/3-(my_frustrations[counter-1]-frustrations_av[0])*plot3_height/(n*0.5),plotx_buffer+(counter+1)*box_w,plot3_height/3-(my_frustrations[counter]-frustrations_av[0])*plot3_height/(n*0.5));
    
    stroke('Green');
    strokeWeight(3);
    line(plotx_buffer+(counter)*box_w,plot3_height/3-(frustrations_powerless_av[counter-1]-frustrations_powerless_av[0])*plot3_height/(n*0.5),plotx_buffer+(counter+1)*box_w,plot3_height/3-(frustrations_powerless_av[counter]-frustrations_powerless_av[0])*plot3_height/(n*0.5));
    
     stroke(0,0,0);
    strokeWeight(3);
    line(plotx_buffer+(counter)*box_w,plot3_height/3-(frustrations_oligarch_av[counter-1]-frustrations_oligarch_av[0])*plot3_height/(n*0.5),plotx_buffer+(counter+1)*box_w,plot3_height/3-(frustrations_oligarch_av[counter]-frustrations_oligarch_av[0])*plot3_height/(n*0.5));
    
    strokeWeight(1);
    
  //  pop();
    
} //if (counter>0)
    
  if (i_flip == my_number-1){ //I am student my_number - my decision
    push()
    stroke(0,128,0);
    strokeWeight(3);
    drawingContext.setLineDash([5, 15]);
    
    //line(x_pad+(counter)*box_w,y_pad/2,x_pad+(counter)*box_w,height);
    line(plotx_buffer+(counter+1)*box_w,-22,plotx_buffer+(counter+1)*box_w,height-10);
    pop()
  }
  
  
  
  push();
    //translate(0,plot1_height+plot2_height+ploty_buffer);
    stroke(256,256,256)
    textSize(14);
    fill('Blue');
  
   if (counter==0) {
    text(my_frustrations[0],19,plot3_height/3-(my_frustrations[0]-frustrations_av[0])*plot3_height/(n*0.5));
    //fill('Red');
  
     } // if (counter==0)
  
   if (counter==(it-1)) {
    // label range
     
      text(max(my_frustrations)+1,19,plot3_height/3-(max(my_frustrations)+1-frustrations_av[0])*plot3_height/(n*0.5));
     
      text(min(my_frustrations)-1,19,plot3_height/3-(min(my_frustrations)-1-frustrations_av[0])*plot3_height/(n*0.5));
    } // if (counter==it-1)
 
  pop();
  
  //End of Display_frustrations 
  
}


//////////////////////////////***************************

function Run_iteration()
{ // both for the class choice dynamics and for drawing it

  
  buttonReset.mousePressed(reStart);
  
  if (start_loop==0)
    {
      buttonStart.mousePressed(setStart);
          
      setTimeout(Run_iteration,150);
    }
  else if (( initialize==true)&& (name_change==false))
           {
            push();
            textSize(18)
            fill('Red')
            text('Enter your name in box above!',100*0.66,80*0.66);
            pop();
            setTimeout(Run_iteration,150); 
           }
  else if (initialize==true)  
    {
     Initialize_network();
     initialize=false;
     setTimeout(Run_iteration,150);
    }
 else 
 { 
  if (collect_choice==1){
        
           buttonUp.mousePressed(setUp); // 
    
           buttonDown.mousePressed(setDown);
           
           }
 else
 {

   i_flip=floor(random(0,n)) // choose random student to make decision
   
   
   
   if(i_flip == (my_number-1))
      {collect_choice=1;
      choice_array.push(counter);} 
     else 
      {collect_choice=0;}
  
  push();
    translate(plotx_buffer,plot1_height+ploty_buffer); //translate to plot 2
    fill(220);
    rect(0,0,width-100*0.66,plot2_height-5*0.66); // box around both classrooms
    
 
    fill('Black');
    textSize(18);
    text("DOWN CLASSROOM",120*0.66,30*0.66);
    text("UP CLASSROOM",620*0.66,30*0.66);
    fill(150); //fill(200)
    rect(25*0.66,40*0.66,450*0.66,plot2_height-70*0.66)
    rect(515*0.66,40*0.66,450*0.66,plot2_height-70*0.66)
    translate(0,50*0.66)
    Display_class_names();
  pop();
  

  
  Energy[counter]=0;
  frustrations_av[counter]=0;
  frustrations_oligarch_av[counter]=0;
  frustrations_powerless_av[counter]=0;
  
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
      if (i<n_o) 
        {frustrations_oligarch_av[counter]=frustrations_oligarch_av[counter]+frustrations[i];}
      else
        {frustrations_powerless_av[counter]=frustrations_powerless_av[counter]+frustrations[i];}
     } // for i
  
  Energy[counter]=Energy[counter]/n;
  my_frustrations[counter]=frustrations[my_number-1]; // 0->my_number-1
   
  // if (collect_choice==1)
  // {print('My Frustration change :'+(my_frustrations[counter]-my_frustrations[counter-1])+ ' at counter ' + counter);}
   
  frustrations_av[counter]=frustrations_av[counter]/n
  frustrations_oligarch_av[counter]=frustrations_oligarch_av[counter]/n_o
  frustrations_powerless_av[counter]=frustrations_powerless_av[counter]/(n-n_o)
  
  //if (counter >0){
  //  if(Energy[counter]>Energy[counter-1])
      //{print('OOPS Frustrations went up')}
  //  }
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
    {students[i_flip]= 2*(h[i_flip]>0)-1;
    student_array[i_flip].Classroom=students[i_flip];} // Set student class membership
    
  counter++;
  //print('Counter=:'+counter);
 } //end of else of if collect_choice
  
   if ((counter==it-1)|| (counter==it))
    {restart_flag=1;}
   else
     {restart_flag=0}
   
  if(counter < it){
    //stroke(255,0,0);
    let restart_flag=0;
    setTimeout(Run_iteration,50);
    }
    else {initialize=true;
         }
  } // start_loop
} // end of Run_iterations

function setUp(){students[i_flip]=1;student_array[i_flip].Classroom=1; collect_choice=0; 
                }

function setDown(){students[i_flip]=-1;student_array[i_flip].Classroom=-1; collect_choice=0;
//print('setDown '+student_array[i_flip].Classroom)
                  }

function setStart(){start_loop=1;}

function Create_buttons()
  {
    stroke(0,0,0);
    line(plotx_buffer,plot2_height+plot1_height+ploty_buffer,width,plot2_height+plot1_height+ploty_buffer);
    line(plotx_buffer-2,0,plotx_buffer-2,height);
    stroke(0,128,128);
  
    buttonUp=createButton('  UP  ');
    buttonUp.position(505*0.66,190*0.66+15);
    buttonUp.size(100*0.66,40*0.66);
    buttonDown = createButton(' Down');
    buttonDown.position(505*0.66,250*0.66+15);
    buttonDown.size(100*0.66,40*0.66)
  
    buttonStart=createButton('START')
    buttonStart.position(620*0.66,190*0.66);
    buttonStart.size(150*0.66,60*0.66);
  
    buttonDown.style('background-color', 'Gray');
    buttonUp.style('background-color', 'Gray');
    let col = color(70,240,70);
    buttonStart.style('background-color',col);
} // end Create_Buttos

function control_panel()
  {
    var col_R=color(220,20,20);
    var col_G=color(20,220,20);
    let col_Gray=color(235,235,235);
    
    push();
    translate(plotx_buffer,10);
    
    fill(220,230,220);
    stroke(130,120,120)
    rect(40*0.66,0,400*0.66-5,plot1_height);
    
    
    textSize(14);
    fill('Black');
    if (collect_choice==1)
      {push();
       {
       fill(200,20,40);
       push();
        //strokeWeight(2);
        textStyle(BOLD);
        text('Make A Decision!',65*0.66,30*0.66);
       pop();
       if (students[my_number-1]==1){text('You are in the UP class',65*0.66,65*0.66);}
       else {text('You are in the DOWN class',65*0.66,65*0.66);}
       
       if (h[my_number-1]==0){text('Class choice does not matter',65*0.66,100*0.66);}
       else if (h[my_number-1]>0) {text('Best Class Choice UP',65*0.66,100*0.66);
                         buttonDown.style('background-color',col_R);buttonUp.style('background-color', col_G)}
       else if (h[my_number-1]<0) {text('Best Class Choice DOWN',65*0.66,100*0.66);
                         buttonDown.style('background-color', col_G);buttonUp.style('background-color', col_R)}
       if ((my_number-1)<n_o){text('(You are an Oligarch)',65*0.66,135*0.66);}
                          else
                          {text('(You are not an Oligarch)',65*0.66,135*0.66);}  
         
       pop();
      // here more info + wait for answer
      } 
      }
    else if ((counter < (it-1))&& (counter >0))
      {push();
       stroke(0,0,0);
       fill(0,0,0);
       textStyle(BOLD);
       textSize(14);
       
       if (my_number<n_o) {
         text('Yay- you are an Oligarch',65*0.66,20);
       }
       else
         {text('You are not an Oligarch',65*0.66,20);}
       
       stroke(0,0,220);
       fill(0,0,220);
       
       
       text('Other students are making',65*0.66,50);
       text('decisions now',65*0.66,70);
       buttonDown.style('background-color', 'Gray');buttonUp.style('background-color', 'Gray');
       
       buttonReset.style('background-color',col_Gray);
      
       pop();
      }
   
  if (counter==(it-1))
    {textSize(18);
    push();
    textStyle(BOLD);
    text(' END of RUN.    ',150*0.66,50*0.66);
    pop();
    textSize(12);
    text('To run again press RESET then START.    ',70*0.66,90*0.66);
    let col_Y=color(235,235,10);
      
    buttonReset.style('background-color',col_Y);
    }
    
  
pop();
  
} // end Control_panel
  
//function draw() {
 
//   
//}
