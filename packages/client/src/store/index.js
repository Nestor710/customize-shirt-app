import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: 'rgb(80, 227, 194)',
    isLogoTexture: true,
    isFUllTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
    isTextureGradient: false,
    gradientColors: []
})

export default state;