// @ts-check

const displaySizeInPix = [];

/** Generate a point as an array of coordinates 
 * @param {number} dimension - The dimension of the embedding space
 * @param {number[][]} [boundaries] - The boundaries of the space of the point, given as an array of 1-dimensional intervals. [HOWTO]
 * @returns {number[]} The generated point
*/
function generatePoint(dimension, boundaries) {
    if(!dimension || dimension < 1 || dimension > 3) {
        throw Error('Cannot generate a point with dimension ' + dimension);
    }

    var point = [];

    for(var ii = 0; ii < dimension; ii++) {
        var p = Math.random();
        
        if(boundaries && boundaries[ii]) {
            p = Math.floor(p * (boundaries[ii][1] - boundaries[ii][0]) + boundaries[ii][0]);
        }

        point.push(p);
    }

    return point;
}

/** Generates a rectangle as an array of coordinates
 * @param {Object} obj - The arguments
 * @param {number} obj.base - The base of the rectangle
 * @param {number} [obj.height] - The height of the rectangle
 * @param {number[]} [obj.corner] - The bottom left corner of the rectangle 
 * @param {number[][]} [obj.boundaries] - The boundaries of the space of the rectangle
 * @param {boolean} [obj.asTriangles=false] - Expand the generated vertex array to represent an array of triangles which reconstruct the figure
 * @returns {number[]} The rectangle vertices coordinates
*/
function getRectangle({base, height, corner, boundaries, asTriangles}) {

    if( (!base) || base <= 0 || (height && height <= 0)) throw Error('Rectangle size must be different from 0 or undefined');

    if(!height) height = base;

    var a = corner ? corner : generatePoint(2, boundaries);

    return asTriangles ?  [
        a[0], a[1], 
        a[0] + base, a[1],
        a[0], a[1] + height,

        a[0] + base, a[1],
        a[0], a[1] + height,
        a[0] + base, a[1] + height
    ] : [
        a[0], a[1], 
        a[0] + base, a[1],
        a[0], a[1] + height,
        a[0] + base, a[1] + height
    ];
}


/** Generates a triangle
 * @param {Object} obj - The arguments
 * @param {number} obj.a -  
 * @param {number} [obj.b] - 
 * @param {number} [obj.c] - 
 * @param {number[][]} [obj.boundaries] - 
 */
function getTriangle({a, b, c, boundaries}){

    if( (!a) || a <= 0 || (b && b <= 0) || (c && c <= 0)) throw Error('Triangle sizes must be greater than 0 or undefined');

    if(!b) b = a;
    if(!c) c = a;
}