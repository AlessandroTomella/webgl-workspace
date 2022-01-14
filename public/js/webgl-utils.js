'use-strict';


/** Initialize the webGL context for the given canvas 
 * @param {string} cId - the DOM id of the canvas
 * @returns {WebGLRenderingContext} A handle to the webGL context  
*/
function initWebGLContext(cId) {
    var canvas = document.querySelector("#" + cId);
    var gl = canvas.getContext("webgl");
    if (!gl) throw Error("Could not initialise webGL context");

    return gl;
}

/** Creates a webGL program from the given shader tags 
 * @param {WebGLRenderingContext} gl
*/
function createProgramFromShaderScripts(gl, vShaderScript, fShaderScript) {
    var vertexShaderSource = document.querySelector("#" + vShaderScript).textContent;
    var fragmentShaderSource = document.querySelector("#" + fShaderScript).textContent;
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    var program = createProgram(gl, vertexShader, fragmentShader);

    return program;
}

/** Creates a shader with given type and source code
 * @param {WebGLRenderingContext} gl - The webGL context
 * @param {number} type - The webgl shader type
 * @param {string} source - The shader source code
 * @returns {WebGLShader}
 */
function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

/** Create a program by linking the vertex and fragment shaders
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 * @returns {WebGLProgram}
 */
function createProgram(gl, vertexShader, fragmentShader) {

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

/**
* Resize a canvas to match the size its displayed.
* @param {HTMLCanvasElement} canvas The canvas to resize.
* @param {number} [multiplier] amount to multiply by.
*    Pass in window.devicePixelRatio for native pixels.
* @return {boolean} true if the canvas was resized.
*/
function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

