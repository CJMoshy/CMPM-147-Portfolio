class perlinMountain {

    constructor(_lowerbound = 0) {
        this.arr = []
        this.lb = _lowerbound
        this.padding = 10
    }

    reset() {
        this.arr = []
    }

    /**
    * @function generatePerlinMountains generate a mountain range using perlin noise
    * 
    */
    generatePerlinMountains() {

        // Set the noise level and scale.
        let noiseLevel = getRandom(-150, -60);
        let noiseScale = 0.02 

        let x = (-(WIDTH / 2)) - this.padding

        while(x < WIDTH/2 + (this.padding*2)){
            // Scale the input coordinate.
            let nx = noiseScale * x;
            // Compute the noise value.
            let y = noiseLevel * noise(nx)
            this.arr.push(new Pair(x, y))
            x += 15
        }
    }

    /**
     * @function render render the mountains
     */
    render() {
        fill(139, 115, 85)
        beginShape()
        vertex(-(WIDTH / 2) - 10, this.lb)
        for(let i = 0; i < this.arr.length - 1; i++){
            vertex(this.arr[i].getFirst(), this.arr[i].getSecond())
        }
        vertex((WIDTH/2), this.lb)
        endShape(CLOSE)
    }



}



