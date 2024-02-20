Anglo = function(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;

    return degrees(Math.atan2(dy, dx));
};




degrees = function(a) {
    return a * (180 / Math.PI);
};























class Controle {
  constructor() {
    this.dbug = false;
    this.T     = null;
    this.L     = null;
    this.boo   = null;
    this.subX  = 0;
    this.subY  = 0;
    this.dis   = 0;
    this.angle = 0;
    this.Raio  = 10;
    this.pos   = {x: 0, y: 0};
    this.key   = {left: false, right: false, top: false, dow: false, fire: false};
    this.p1 = this.Cria("p");
    this.p1.style.cssText = `position: absolute;`
  }
  
  bug(){
    if(this.dbug){
       this.p1.innerHTML = `
                    subXb ${this.subX} <br>
                    subY  ${this.subY} <br>
                    left  ${this.key.left} <br>
                    right ${this.key.right} <br>
                    top    ${this.key.top} <br>
                    dow ${this.key.dow} <br>
                    fire ${this.key.fire} <br>
                   
                    `
    }
  }
  
  
  Cria(e,id,clas){
    var ele =  document.createElement(e);
        ele.id = id;
        ele.className = clas;
        document.body.appendChild(ele);
        return ele;
    
  }
  
  
  button(x,y,r){
    this.button1 = this.Cria("div", "button1", "buttonOf");
    this.button1.style.cssText = `left: ${x}%; top:${y}%; width: ${r}px; height: ${r}px;`
    
    this.lsbutton = [button1];
    this.EventButton();
  }
  
  EventButton(){
     this.lsbutton.forEach((e) =>{
        e.addEventListener("touchstart", ()=>{
          this.key.fire = true;
          e.className = "buttonOn";
          this.bug();
        });
        
        e.addEventListener("touchend", ()=>{
          this.key.fire = false;
          e.className = "buttonOf";
          this.bug();
        });
     })
  }
  
  
  
  
  Btn(x,y,r){
    this.Aria2    = this.Cria("div","Aria2", "btnOf");
    this.btnRight = this.Cria("div", "btnRight", "btnOf");
    this.btnLeft  = this.Cria("div", "btnLeft", "btnOf");
    this.btnTop   = this.Cria("div", "btnTop", "btnOf");
    this.btnDow   = this.Cria("div", "btnDow", "btnOf");
    
  
    

    
    

    this.Aria2.style.cssText =`left: ${x}%; top: ${y}%; width: ${r}px; height: ${r}px;`;
    
    this.Aria2.appendChild(this.btnRight);
    this.Aria2.appendChild(this.btnLeft);
    this.Aria2.appendChild(this.btnTop);
    this.Aria2.appendChild(this.btnDow);
    this.btn =[btnRight,btnLeft, btnTop, btnDow];
    this.EventBtn();
    //document.addEventListener("pointerdown")
  }
  
  
  EventBtn() {
    this.btn.forEach((e) => {
      e.addEventListener("touchstart", () => {
        e.className = "btnOn";
  
        switch (e.id) {
          case "btnLeft":
            this.key.left = true;
            this.keyright = false;
            this.key.top = false;
            this.key.dow = false;
            break;
          case "btnRight":
            this.key.left = false;
            this.key.right = true;
            this.key.top = false;
            this.key.dow = false;
            break;
          case "btnTop":
            this.key.left = false;
            this.keyright = false;
            this.key.top = true;
            this.key.dow = false;
            break;
  
          case "btnDow":
            this.key.left = false;
            this.keyright = false;
            this.key.top = false;
            this.key.dow = true;
            break;
          case "btnF":
            this.key.fire = true;
            break;
        }
  
  
        navigator.vibrate([50]);
        this.bug();
      });
  
      e.addEventListener("touchend", () => {
        e.className = "btnOf";
  
        this.key.left = false;
        this.key.right = false;
        this.key.top = false;
        this.key.dow = false;
        this.key.fire = false;
  
  
        this.bug();
      });
  
  
  
    })
  }
  
  
  
  
  
  
  
  
  
  
  Joystick(x,y,r){
    this.Aria1 = document.createElement("div");
    this.joy   = document.createElement("div");
    
    this.Aria1.id = "Aria1";
    this.joy.id   = "joy";
    
    this.Aria1.style.cssText = `left: ${x}%; top: ${y}%; width: ${r}px; height: ${r}px`
    
    
    
    
    this.Aria1.appendChild(this.joy);
    document.body.appendChild(this.Aria1);
    this.EventJoy();
  }
  
  
  reset(){
    this.joy.style.cssText = `left: 0; top: 0;`;
    this.subX = 0;
    this.subY = 0;
    this.dis = 0;
    this.angle = 0;
    this.Raio = 20;
    this.pos = { x: 0, y: 0 };
    this.key.left = false;  //{ left: false, right: false, top: false, dow: false};
    this.key.right = false;
    this.key.top = false;
    this.key.dow = false;
    
  }
  
  
  
  EventJoy(){
    this.Aria1.addEventListener("pointermove", (e)=>{
       
       var R1 = document.body.getBoundingClientRect();
       var R2 = this.Aria1.getBoundingClientRect();
       
       this.T = R2.y - R1.y;
       this.L = R2.x - R1.x;
       
       var center = {x: R2.width /2,y: R2.height /2}
       this.pos = {
         x: e.pageX - this.L,
         y: e.pageY - this.T
       }
       
       
       this.subX = this.pos.x - center.x;
       this.subY = this.pos.y - center.y;
       this.dis = Math.sqrt((this.subX * this.subX) + (this.subY * this.subY));
       this.angle = Anglo(this.pos, center);
       
       if (this.dis > this.Raio) {
         this.dis = this.Raio;
         this.angle = this.angle * (Math.PI / 180);
         this.pos.x = center.x - this.dis * Math.cos(this.angle);
         this.pos.y = center.y - this.dis * Math.sin(this.angle);
       
       }
       
       if (this.subX > 0) {
        this.key.left = false;
        this.key.right = true;
      } else {
        this.key.left = true;
        this.key.right = false;
      }
      if (this.subY > 0) {
        this.key.top = false;
        this.key.dow = true;
      } else {
        this.key.top = true;
        this.key.dow = false;
      }
      
       
       
       
       
      var x = this.pos.x - center.x;
      var y = this.pos.y - center.y;
      joy.style.left = x+"px";
      joy.style.top  = y+"px";
      
      this.bug();
    });
    
    this.Aria1.addEventListener("pointerup", (e)=>{
      this.reset();
      this.bug();
    });
    
  }
  
}



//var contro = new Controle();
    //contro.Joystick(10, 75,100);
    //contro.Btn(10,10, 100);
    //contro.button(50,80,50);






















