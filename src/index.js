import vert from 'foo.vertex.glsl'
import frag from 'foo.fragment.glsl'
import { cube, color } from './cube'
import * as mat4 from './mat4'
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

function getGLContext(canvasId) {
    const canvas = document.getElementById(canvasId)
    canvas.width = canvas.style.width = CANVAS_WIDTH
    canvas.height = canvas.style.height = CANVAS_HEIGHT
    
    const gl = canvas.getContext('webgl2')
    if (!gl) {
        return null
    }
    return gl
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) {
        return shader
    }

    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
}

function createProgram(gl, vertexSource, fragmentSource) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if(success) {
        return program
    }

    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
}

function main() {
    const gl = getGLContext('app-canvas')
    const program = createProgram(gl, vert, frag)

    const positions = [
        0, 0,
        0, 0.5,
        0.7, 0
    ]
    const positionAttrLocation = gl.getAttribLocation(program, 'position')
    const colorAttrLocation = gl.getAttribLocation(program, 'color')
    const projMatrixLocation = gl.getUniformLocation(program, 'projection')
    const localMatrixLocation = gl.getUniformLocation(program, 'local')

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    // Load position data
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube), gl.STATIC_DRAW)

    gl.enableVertexAttribArray(positionAttrLocation)
    gl.vertexAttribPointer(
        positionAttrLocation,
        3, // size
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
    )

    // Load color data
    const colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(colorAttrLocation)
    gl.vertexAttribPointer(
        colorAttrLocation,
        3,
        gl.FLOAT,
        false,
        0,
        0
    )

    gl.frontFace(gl.CW)
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    const projMatrix = mat4.orthographic(-4, 4, -3, 3, -3, 3)

    let spin = 0
    const drawScene = function() {
        gl.viewport(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        gl.useProgram(program)

        spin += 0.01
        //let matrix = mat4.scale(0.4, 0.4, 0.4)
        let matrix = mat4.zRotate(spin/2, matrix)
        matrix = mat4.xRotate(spin*2, matrix)
        matrix = mat4.yRotate(spin, matrix)

        gl.uniformMatrix4fv(projMatrixLocation, false, projMatrix)
        gl.uniformMatrix4fv(localMatrixLocation, false, matrix)
        gl.drawArrays(
            gl.TRIANGLES, // primitiveType
            0, // first
            36, // count
        )
        requestAnimationFrame(drawScene)
    }

    requestAnimationFrame(drawScene)
}


main()