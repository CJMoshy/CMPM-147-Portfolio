//written by CJ Moshy
/**
* @function getRandom pseudo-random number generator
* @param {number} min lowerbounds
* @param {number} max upperbounds
* @returns {number} random number inbetween lower and upperbounds
*/
function getRandom(min, max) {
    return Math.random() * (max - min + 1) + min
}

/**
* @function getDiffInterpolation takes two points and returns a point in between them
* @param {Pair} p1 the first point
* @param {Pair} p2 the second point
* @returns {Pair} the interpolated point between the two (linear interpolation)
*/
function getDiffInterpolation(p1, p2) {

    let noiseModifier = 0.25
    let result = new Pair()

    result.setFirst((((p2.getFirst() - p1.getFirst()) / 2) + p1.getFirst()) + getRandom(-noiseModifier, noiseModifier))
    result.setSecond((((p2.getSecond() - p1.getSecond()) / 2) + p1.getSecond()) + getRandom(-noiseModifier, noiseModifier))

    return result
}

