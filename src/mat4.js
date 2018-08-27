const translation = function(tx, ty, tz) {
    return [
        1,  0,  0,  0,
        0,  1,  0,  0,
        0,  0,  1,  0,
        tx, ty, tz, 1,
    ]
}

const xRotation = function(angle) {
    var c = Math.cos(angle)
    var s = Math.sin(angle)

    return [
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1,
    ]
}

const yRotation = function(angle) {
    var c = Math.cos(angle)
    var s = Math.sin(angle)

    return [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1,
    ]
}

const zRotation = function(angle) {
    var c = Math.cos(angle)
    var s = Math.sin(angle)

    return [
        c, s, 0, 0,
        -s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]
}

const scaling = function(sx, sy, sz) {
    return [
        sx, 0,  0,  0,
        0, sy,  0,  0,
        0,  0, sz,  0,
        0,  0,  0,  1,
    ]
}

export const translate = function(tx, ty, tz, matrix) {
    if(typeof matrix === 'undefined') {
        matrix = identity()
    }
    return multiply(matrix, translation(tx, ty, tz));
}
 
export const xRotate = function(angle, matrix) {
    if(typeof matrix === 'undefined') {
        matrix = identity()
    }
    return multiply(matrix, xRotation(angle));
}

export const yRotate = function(angle, matrix) {
    if(typeof matrix === 'undefined') {
        matrix = identity()
    }
    return multiply(matrix, yRotation(angle));
}

export const zRotate = function(angle, matrix) {
    if(typeof matrix === 'undefined') {
        matrix = identity()
    }
    return multiply(matrix, zRotation(angle));
}

export const scale = function(scaleX, scaleY, scaleZ, matrix) {
    if(typeof matrix === 'undefined') {
        matrix = identity()
    }
    return multiply(matrix, scaling(scaleX, scaleY, scaleZ));
}

export const multiply = function(a, b) {
    let a00 = a[0 * 4 + 0]
    let a01 = a[0 * 4 + 1]
    let a02 = a[0 * 4 + 2]
    let a03 = a[0 * 4 + 3]
    let a10 = a[1 * 4 + 0]
    let a11 = a[1 * 4 + 1]
    let a12 = a[1 * 4 + 2]
    let a13 = a[1 * 4 + 3]
    let a20 = a[2 * 4 + 0]
    let a21 = a[2 * 4 + 1]
    let a22 = a[2 * 4 + 2]
    let a23 = a[2 * 4 + 3]
    let a30 = a[3 * 4 + 0]
    let a31 = a[3 * 4 + 1]
    let a32 = a[3 * 4 + 2]
    let a33 = a[3 * 4 + 3]
    let b00 = b[0 * 4 + 0]
    let b01 = b[0 * 4 + 1]
    let b02 = b[0 * 4 + 2]
    let b03 = b[0 * 4 + 3]
    let b10 = b[1 * 4 + 0]
    let b11 = b[1 * 4 + 1]
    let b12 = b[1 * 4 + 2]
    let b13 = b[1 * 4 + 3]
    let b20 = b[2 * 4 + 0]
    let b21 = b[2 * 4 + 1]
    let b22 = b[2 * 4 + 2]
    let b23 = b[2 * 4 + 3]
    let b30 = b[3 * 4 + 0]
    let b31 = b[3 * 4 + 1]
    let b32 = b[3 * 4 + 2]
    let b33 = b[3 * 4 + 3]
    return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ]
}

export const identity = function() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]
}

export const orthographic = function(left, right, bottom, top, near, far) {
    return [
        2 / (right - left), 0, 0, 0,
        0, 2 / (top - bottom), 0, 0,
        0, 0, 2 / (near - far), 0,

        (left + right) / (left - right),
        (bottom + top) / (bottom - top),
        (near + far) / (near - far),
        1,
    ]
}

/**
 * 
 * @param {number} fov in radians
 * @param {number} aspect aspect ratio of the viewport
 * @param {number} near 
 * @param {number} far 
 * @returns {(number|Array)} Perspective projection matrix
 */
export const perspective = function(fov, aspect, near, far) {
    let f = Math.tan(Math.PI * 0.5 - 0.5 * fov)
    let rangeInv = 1.0 / (near - far)

    return [
        f / aspect, 0, 0,                    0,
        0,          f, 0,                    0,
        0,          0, (near+far)*rangeInv, -1,
        0,          0, 2*near*far*rangeInv,  0
    ]
}
