

var colors   =  ["#ff0000","#feb30f","#0aa4f7","#000000","#ffffff"];

 

var weights  = [1,2,2,2,2];             


var nAgents = 500;

let border = 100;

let agent = [];

function setup() {

	createCanvas(windowWidth,windowHeight);
  colorMode(HSB, 360, 100, 100);
	rectMode(CENTER);
  strokeCap(SQUARE);

  background(0,0,0);
  
  for(let i=0;i < nAgents;i++)
  {
    agent.push(new Agent(width*0.40,height*0.50+ randomGaussian()*20));
		agent.push(new Agent(width*0.60,height*0.50+ randomGaussian()*20));

	9
  }
  
}

function draw() {
	

  if (frameCount > 5000)
  {
    noLoop();
  }
  
  for(let i=0;i < agent.length;i++)
  {
    agent[i].update();
  }
  
  
	stroke(0,0,100);
	
  noFill();
  strokeWeight(20);
  rect(width/2,height/2,700,500);
	
	strokeWeight(2);
	rect(width*0.60,height/2,1,500);
	
	strokeWeight(2);
	rect(width*0.40,height/2,1,500);

}



function myRandom(colors,weights)
{
    let sum = 0;
 
    for(let i=0;i < colors.length; i++)
    {
      sum += weights[i];
    }
 
    let rr = random(0,sum);
 
    for(let j=0;j < weights.length;j++)
    {
 
      if (weights[j] >= rr)
      {
        return colors[j];
      }
        rr -= weights[j];
    }

 }





class Agent {
  constructor(x0,y0)
  {
    if (random(0,1) > 0.5)
    {

      this.p     = createVector(x0,y0);
      this.direction = 1;
      this.color = generateColor(10);
			this.scale = 5;
			this.strokeWidth =5 + 5*sin(frameCount);
		}else
    {
      this.p     = createVector(x0,height*0.5 + randomGaussian()*30)
      this.direction = -1;
			this.color = generateColor(10);
			this.scale = 5;
			this.strokeWidth =5 + 5*sin(frameCount);
    }
      
    this.pOld  = createVector(this.p.x,this.p.y);
    
    this.step  = 1;
  }
  
  update() {
		
    this.p.x += this.direction*vector_field(this.p.x,this.p.y,this.scale).x*this.step;
    this.p.y += this.direction*vector_field(this.p.x,this.p.y,this.scale).y*this.step;

		if ((this.p.x >= width/2 + 350) || (this.p.x <= width/2 - 350) || 
				(this.p.y <= height/2 - 250) || (this.p.y >= height/2 + 250))
		{
			this.step=0;
		}
		
		if (this.p.y < border || this.p.y > (height - border))
		{
			this.direction *= -random(0.9,1.1)
		}
		
		
    strokeWeight(this.strokeWidth);
    stroke(this.color);
    line(this.pOld.x,this.pOld.y,this.p.x,this.p.y);
    
    this.pOld.set(this.p);
    
  }
    
}


function vector_field(x,y,myScale) {
  
  x = map(x,0,width,-myScale,myScale);
  y = map(y,0,height,-myScale,myScale);
  
  let k1 = 5;
  let k2 = 3;
  
  let u = sin(k1*y) + cos(k2*y) + map(noise(x,y),0,1,-1,1);
  let v = sin(k2*x) - cos(k1*x) + map(noise(x,y),0,1,-1,1);
 
  
  if (u <= 0) 
  {
      u = -u;
   }  
  
  return createVector(u,v);
}

function generateColor(scale) {
	let temp = myRandom(colors, weights);

	myColor = color(hue(temp) + randomGaussian() * scale,
		              saturation(temp) + randomGaussian() * scale,
		              brightness(temp) - scale, 
									random(1,100));

	return myColor;
}





function myRandom(colors,weights)
{ 
    let sum = 0;
 
    for(let i=0;i < colors.length; i++)
    {
      sum += weights[i];
    }
 
    let rr = random(0,sum);
 
    for(let j=0;j < weights.length;j++)
    {
 
      if (weights[j] >= rr)
      {
        return colors[j];
      }
        rr -= weights[j];
    }
 }





