
function main() {
    sqMain();
    triMain();
    polyMain();
}

function triMain() {

    var gl = initWebGLContext("c_triangles");
    
    var program = createProgramFromShaderScripts(gl, "vertex-shader-2d", "fragment-shader-2d");

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    var colorUniformLocation = gl.getUniformLocation(program, "u_color");

    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var size = 2;
    var type = gl.FLOAT;
    var stride = 0;
    var offset = 0;
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, size, type, false, stride, offset);
    
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    
    for(var ii = 0; ii < 20 ; ii++){
        var x = Math.floor(Math.random() * gl.canvas.width);
        var y = Math.floor(Math.random() * gl.canvas.height);
        var z = Math.floor(Math.random() * gl.canvas.height); 
        positions = [
            x, y, 
            x, z, 
            z, y 
        ];

        //gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
        
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

}

function sqMain() {
    var gl = initWebGLContext("c_squares");
    
    var program = createProgramFromShaderScripts(gl, "vertex-shader-2d", "fragment-shader-2d");

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    var colorUniformLocation = gl.getUniformLocation(program, "u_color");

    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var size = 2;
    var type = gl.FLOAT;
    var stride = 0;
    var offset = 0;
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, size, type, false, stride, offset);
    
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    
    for(var ii = 0; ii < 20 ; ii++){
        // Setting the color for the current triangle
        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

        var x = Math.floor(Math.random() * gl.canvas.width);
        var y = Math.floor(Math.random() * gl.canvas.height);
        var z = Math.floor(Math.random() * gl.canvas.height)*0.5; 
        positions = [
            x, y, 
            x + z, y, 
            x, z + y,
            x + z, y + z 
        ];

        //gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions.slice(0, 6)), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions.slice(2, 8)), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

}

function polyMain() {
    var gl = initWebGLContext("c_poly");
    
    var program = createProgramFromShaderScripts(gl, "vertex-shader-2d", "fragment-shader-2d");

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    var colorUniformLocation = gl.getUniformLocation(program, "u_color");

    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var size = 2;
    var type = gl.FLOAT;
    var stride = 0;
    var offset = 0;
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, size, type, false, stride, offset);
    
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    
    for(var ii = 0; ii < 20 ; ii++){
        // Setting the color for the current triangle
        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

        var x = Math.floor(Math.random() * gl.canvas.width);
        var y = Math.floor(Math.random() * gl.canvas.height);
        var size = Math.floor(Math.random() * gl.canvas.height)*0.4; 

        positions = [
            x, y, 
            x - size / 2.0, y + size * Math.sqrt(3)/2.0, 
            x + size / 2.0, y + size * Math.sqrt(3)/2.0, 
            
            x, y,  
            x + size / 2.0, y + size * Math.sqrt(3)/2.0, 
            x + size, y,

            x, y,  
            x + size, y, 
            x + size / 2.0, y - size * Math.sqrt(3)/2.0,

            x, y, 
            x + size / 2.0, y - size * Math.sqrt(3)/2.0, 
            x - size / 2.0, y - size * Math.sqrt(3)/2.0, 

            x, y, 
            x - size / 2.0, y - size * Math.sqrt(3)/2.0,
            x - size, y,  
        
            x, y, 
            x - size, y, 
            x - size / 2.0, y + size * Math.sqrt(3)/2.0 
        ];

        for(var j = 0; j < 6; j++) {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions.slice(6 * j, 6 * j + 6)), gl.STATIC_DRAW);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

    }
}

function setTriangle(gl, points, colorRGBA) {

}

