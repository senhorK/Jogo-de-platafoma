LoadImage = function(src) {
  var img = document.createElement("img");
  img.src = src;
  return img;
}


var sheet = LoadImage("/tilemap_packed-1.png")














class App {
  
  constructor(){
    this.scale = 1.3;
  }
  
  
  Canvas(obj){
    
    this.canvas = document.querySelector("canvas");
    this.ctx    = this.canvas.getContext("2d");/// document.createElement("canvas").getContext("2d")
    
    this.class_canvas = "canvas1";
    this.ctx.canvas.className =  this.class_canvas;
    this.lar = obj.w;
    this.alt = obj.h;
    
    
    
   /* this.ctx.canvas.style.cssText = `
         position: absolute;
         width: ${this.lar*this.scale}px;
         height ${this.alt*this.scale}px
         imageRendering: pixelated;
         z-index: 0;
    `*/
    
    
    this.ctx.canvas.width  = this.lar;
    this.ctx.canvas.height = this.alt;
    this.canvas.style.width = this.lar*this.scale+"px";
    this.canvas.style.height = this.alt*this.scale+"px";
   
    if(obj.center){this.ctx.canvas.style.cssText += `left: 50%; top: 50%; transform: translate(-50% , -50%);`}
    //document.body.appendChild(this.ctx.canvas);
  }
  
  drawRect(x,y,w,h,c, obj){
    
    if(obj != undefined){
       this.ctx.fillStyle = obj.c;
       this.ctx.fillRect(obj.x, obj.y, obj.w, obj.h)
    }
    else {
      this.ctx.fillStyle = c;
      this.ctx.fillRect(x,y,w,h)
    }
  }
  
  
  drawStroke(x,y,w,h,c){
    this.ctx.strokeStyle = c;
    this.ctx.strokeRect(x,y,w,h)
  }
  
  drawArc(x,y,r,c){
    
    this.ctx.beginPath()
    this.ctx.fillStyle = c;
    this.ctx.arc(x, y, r, 0, Math.PI * 2)
    this.ctx.fill()
  }
  
  Colid(my, other) {
    return my.x + my.w > other.x &&
      my.x <= other.x + other.w &&
      my.y + my.h > other.y &&
      my.y <= other.y + other.h;
  }
  
  getColid(my, others = []) {
    var touchingModel = null;
    others.forEach(otherModel => {
  
      if (touchingModel) {
        return;
      }
  
      if (this.Colid(my, otherModel)) {
        touchingModel = { ...otherModel };
      }
    });
  
    return touchingModel;
  }

}


















