















class Mundo {
  constructor() {
    this.map = map1.map;
    this.li = map1.li;
    this.co = map1.co;
    this.size = 18;
    
    this.sw = sheet.width/this.size;
    this.sizeW = this.li*this.size;
    this.sizeH = this.co*this.size;
    
    this.nSolid = map1.nSolid;
    this.colid = [];
    
    
    
    for(var i = 0; i< this.map.length; i++){
        var px = Math.floor(i% this.li) * this.size;   
        var py = Math.floor(i/ this.li) * this.size;   

        if(!this.nSolid.includes(this.map[i])){
           this.colid.push({
             x: px,
             y: py,
             w: this.size,
             h: this.size
           })
        }
    }
  }
  
  
  
  draw(){
    //app.drawRect(0,0, this.size, this.size, "#278")
    
    for(var i = 0; i< this.map.length; i++){
        var id = this.map[i];
        var sx = Math.floor(id% this.sw) * this.size;   
        var sy = Math.floor(id/ this.sw) * this.size;   

        
        var px = Math.floor(i% this.li) * this.size;   
        var py = Math.floor(i/ this.li) * this.size;   

        if(this.map[i] != -1){
          app.ctx.drawImage(
            sheet,
            
            sx,sy,
            this.size,this.size,
            px,py,
            this.size,this.size
                          
              )
        }
    }
  }
}






class Play {
  constructor() {
    this.x     = 35;
    this.y     = 32;
    this.w     = 15;
    this.h     = 15;
    this.c     = "#f0f"
    this.vx    = 3;
    this.vboot = 0;
    this.inAr  = true;
    this.jump  =false;
    this.vy = 0;
    this.gravity = 1;
    this.isLeft = false;
  }
  
  update(){

    const nexDow ={
      x: this.x,
      y: this.y + 5,
      w: this.w,
      h: this.h
    }
    
    const colidSuface = app.getColid(nexDow, game.mundo.colid);     
    const suface      = colidSuface && colidSuface.y >= this.y ? colidSuface : null;        

    if(!suface){
      this.inAr = true;
      this.jump = false;
      this.y += 5;
    }
    else{
      this.jump = true;
      this.y = suface.y - this.h;
    } 
    
    
    

    
    


    if(contro.key.left){
       this.isLeft = true;
       const nexL = {
             x: this.x - this.vx,
             y: this.y,
             w: this.w,
             h: this.h
             }
    
    const colidL = app.getColid(nexL, game.mundo.colid);
    if(!colidL){
       this.x -= this.vx;
     }
  }
  
  if(contro.key.right){
    this.isLeft = false;
    const nexR = {
       x: this.x + this.vx,
       y: this.y,
       w: this.w,
       h: this.h
    }
    
    const colidR = app.getColid(nexR, game.mundo.colid);
    if(!colidR){
      this.x += this.vx;
    }
  }
    
    
    
    if (contro.key.fire && this.jump) {
      this.vboot = -250;
    }
    
    
    
    
    
    if (this.vboot < 0) {
      const vy = 9;
      const up = this.y -= vy;
    
      const colidUp = {
        x: this.x,
        y: up,
        w: this.w,
        h: this.h
      }
    
      const sufaceUp = app.getColid(colidUp, game.mundo.colid);
      if (!sufaceUp) {
        this.y = up;
        this.vboot = this.vboot + vy;
      }
      else this.vboot = 0;
    }

    
   
   

     if (this.x < cam.left()) {
       cam.x = this.x - (cam.w * cam.min);
     }
     if (this.x + this.w > cam.rigth()) {
       cam.x = this.x + this.w - (cam.w * cam.max);
     }
     
     if (this.y < cam.top()) {
       cam.y = this.y - (cam.h * cam.min);
     }
     if (this.y + this.h > cam.botton()) {
       cam.y = this.y + this.h - (cam.h * cam.max);
     }
     
     
     if(cam.x <= 0) cam.x = 0;
     if(cam.y <= 0) cam.y = 0;
     if(cam.x + cam.w >= game.mundo.sizeW) cam.x = game.mundo.sizeW - cam.w;
     if(cam.y + cam.h >= game.mundo.sizeH) cam.y = game.mundo.sizeH - cam.h;

  }
  
  draw(){
    var m = -1.5;
    if(!this.isLeft) m = 2.3;
   
    app.drawRect(this.x +m, this.y, this.w, this.h, this.c);
  }
}









var lar = window.innerWidth;
var alt = window.innerWidth;
var app = new App();
var cam = new CAM();
    
    
var contro = new Controle();
    contro.Joystick(10,80, 100);
    //contro.Btn(10,80,150)
    contro.button(80, 80, 50)

class Game {
  constructor() {
    
    app.Canvas({w: lar, h: alt, css: true, center: false});
    
    this.newGame();
  }
  
  newGame(){
    this.mundo = new Mundo();
    this.play  = new Play();
  }
  
  draw(){
    app.drawRect(0,0,app.lar, app.alt, "#111")
    app.ctx.save();
    app.ctx.translate(-cam.x,-cam.y);
    
    this.mundo.draw();
    this.play.draw();
    
    //cam.bug();
    app.ctx.restore();
  }
  
  update(){
    this.play.update();
  }
  
  
  loop(){
    game.draw()
    game.update()
    
    window.requestAnimationFrame(game.loop)
  }
}

var game = new Game(); 

window.onload = ()=>{

  
  game.loop();
}










