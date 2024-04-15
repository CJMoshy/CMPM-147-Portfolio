class Cactus{
  /**
   * 
   * @param {number} x the x coord
   * @param {number} y the y coord
   * @param {number} width specified width of catcus
   * @param {number} height specified height of cactus
   * @param {number} size specified height of cactus
   */
  constructor(x, y, width, height, size){
    this.x = x
    this.y = y
    this.size = size
    this.width = width 
    this.height = height
    this.offset = 0; 
  }
    

  generate(){
    this.offset = random(-300, 300)
    this.x = this.x - this.offset
    if(this.x >= 360){
      this.x = 360;
    }
    if(this.x <= -360){
      this.x = -360;
    }
  }

    /**
     * @function show render the catcus
     * @returns {none}
     */
    
    show(){
      //have some setting for a random x values for these 
      fill(34, 139, 34)
      push()
      scale(this.size) 
      //left part of the cactus 
      this.leftX = 10;
      this.leftY = 20;
      this.rightX = 23;
      this.rightY = 10; 
      rect(this.x - this.leftX, this.y + this.leftY, this.width/2, this.height / 3, 10, 0, 0, 10);
      //middle part of the cactus 
      rect(this.x, this.y, this.width, this.height, 10, 10, 0, 0);
      //right part of the cactus 
      rect(this.x + this.rightX, this.y + this.rightY, this.width/2, this.height / 3, 0, 10, 10, 0);
      pop()
    }

  }