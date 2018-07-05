import vert from 'foo.vertex.glsl'
import frag from 'foo.fragment.glsl'
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

    const positionAttrLocation = gl.getAttribLocation(program, 'a_position')
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const positions = [
        0, 0,
        0, 0.5,
        0.7, 0
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    gl.enableVertexAttribArray(positionAttrLocation)
    gl.vertexAttribPointer(
        positionAttrLocation,
        2, // size
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
    )

    gl.viewport(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.bindVertexArray(vao)
    gl.drawArrays(
        gl.TRIANGLES, // primitiveType
        0, // first
        3, // count
    )
}

main()