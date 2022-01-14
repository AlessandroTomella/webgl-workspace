// @ts-check

var tVector = [0, 0];

function main() {

    var gl = initWebGLContext("c_trans");

    var program  = createProgramFromShaderScripts(gl, "v-shader", "f-shader");
    
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    var colorUniformLocation = gl.getUniformLocation(program, "u_color");
    var translationUniformLocation= gl.getUniformLocation(program, "u_translation");

    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    var positionBuffer= gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    
    var vertical = getRectangle({base: 10, height: 70, corner: [0, 0], asTriangles: true});
    var smallRung = getRectangle({base: 50, height: 10, corner: [0, 60], asTriangles: true});
    var topRung = getRectangle({base: 30, height: 10, corner: [0, 30], asTriangles: true});

    gl.uniform4f(colorUniformLocation, 0.5, 0.3, 0.1, 1);
    
    drawScene();

    function drawScene() {

        gl.uniform2f(translationUniformLocation, tVector[0], tVector[1]);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertical.concat(smallRung.concat(topRung))), gl.STATIC_DRAW);

        gl.drawArrays(gl.TRIANGLES, 0, 18);
    }
   
}