CAM =function(){
   this.x = 0;
   this.y =  0;
   this.w =  Math.floor(lar/app.scale);
   this.h =  Math.floor(alt/app.scale);
   this.min =  .25;
   this.max = .75;
   
   
   
   this.left = function(){
     return this.x + (this.w * this.min);
   }
   
   this.rigth = function(){
     return this.x + (this.w * this.max);
   }
   
   
   this.top = function() {
     return this.y + (this.h * this.min);
   }
   
   this.botton = function() {
     return this.y + (this.h * this.max);
   }
   
   
   
   this.bug = function(){
     app.drawStroke(this.x + (this.min * this.w), this.y + (this.min * this.h),this.w/2,this.h/2,"#000")
   }
 
   
   

}
