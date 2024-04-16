//written by CJ Moshy
class Pair {
    /**
    * @param {number} x the x coordinate
    * @param {number} y the y coordinate
    */
    constructor(x, y) {
        this.first = x
        this.second = y
    }

    // I know these are all redundant because JS just lets us tap into any member variable. However this is best practice in OOP

    /**
    * @function getPair standard getter
    * @returns {Pair} current instance of the object
    */
    getPair() {
        return this
    }

    /**
    * @function getFirst standard getter
    * @returns {number} the x coord
    */
    getFirst() {
        return this.first
    }

    /**
    * @function getSecond standard getter
    * @returns {number} the y coord
    */
    getSecond() {
        return this.second
    }

    /**
    * @function setFirst standard setter
    * @returns {number} the y coord
    */
    setFirst(x) {
        this.first = x
    }

    /**
    * @function setSecond standard setter
    * @returns {number} the y coord
    */
    setSecond(y) {
        this.second = y
    }
}