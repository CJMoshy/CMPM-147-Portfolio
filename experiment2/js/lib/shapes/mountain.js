class Mountain{
    /**
     * @param {number} _size the ammount of points to generate initially
     * @param {number} _min the minimum y value for points to generate at. This also defines the bottom line of the mountains.
     * @param {number} _max the maximum y value for points to generate at
     * @param {number} _stepInterval the interval of step distance between the points 
     * @param {number} _interpolationLimit the ammount of interpolations to preform. default 6, going over ~12-15 starts to eat a lot of mem.
     * @param {Array} _colors an array with 3 indexs, specifying (RGB)
     */
    constructor(_size, _min, _max, _stepInterval, _interpolationLimit=6, _colors=[0,0,0]){
        this.size = _size
        this.min = _min
        this.max = _max
        this.stepInterval = _stepInterval
        this.colors = _colors
        this.vectors = []
        this.interpolationLimit = _interpolationLimit
        this.initPairs()
        for(let i = 0; i < _interpolationLimit; i++){
            this.interpolate()
        }
    }


    reset(){
        this.vectors = []
        this.initPairs()
        for(let i = 0; i < this.interpolationLimit; i++){
            this.interpolate()
        }
    }

    
    /**
     * @function
     * Generates an array of vertices based on specified size
     * @returns {null}
     */
    initPairs(){
        let constraint1 = 15
        let constraint2 =  -25
        let tmp = -(WIDTH/2) + constraint1
        for(let x = 0; x < this.size; x++){
            // console.log(`new point @ ${tmp}`)
            this.vectors.push(new Pair(tmp, getRandom(this.min + constraint2, this.max)))
            if(tmp + this.stepInterval < (WIDTH/2)){
                tmp += this.stepInterval
            } else break
        }
    }

    /**
     * @function
     * renders mountain shape from generated vertices
     * @returns {null}
     */
    render(){
        fill(this.colors[0],this.colors[1],this.colors[2])
        strokeWeight(3)
        beginShape()
        vertex(-(WIDTH/2), this.min)
        for(let i = 0; i < this.vectors.length; i++){
            vertex(this.vectors[i].getFirst(), this.vectors[i].getSecond())
        }
        vertex((WIDTH/2), this.min)
        endShape(CLOSE)
    }
    

    /**
    * @function
    * Walk throuh the list of vertices, each time arr[i] % 2 === true, get the current index and next index (if it exists)
    * then interpolate a point between them and insert that into arr. The less this function is called, the smoother the lines will be
    * this is essnetially adding noise in a very small +- window to the lines
    * @returns {null}
    */
    interpolate(){
        for(let i = 0; i < this.vectors.length; i++){
            if(i % 2 == 0 && i < this.vectors.length - 1){
                // console.log('here is the interpolation between ', this.vectors[i], ' and ', this.vectors[i+1],  getDiffInterpolation(this.vectors[i], this.vectors[i + 1]))
                this.vectors.splice(i + 1, 0, getDiffInterpolation(this.vectors[i], this.vectors[i + 1]))
            }
        }
    }
} 