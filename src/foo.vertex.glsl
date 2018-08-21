#version 300 es

in vec4 position;
in vec4 color;

uniform mat4 local;
uniform mat4 projection;

out vec4 v_color;

void main() {
    gl_Position = projection * local * position;
    v_color = color;
}
