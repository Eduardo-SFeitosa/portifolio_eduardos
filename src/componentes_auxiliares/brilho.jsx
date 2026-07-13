import PropTypes from 'prop-types'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Color, AdditiveBlending, FrontSide, BackSide, DoubleSide } from 'three'

// Cria a classe UMA VEZ
const FakeGlowMaterialImpl = shaderMaterial(
  {
    falloffAmount: 0.1,
    glowInternalRadius: 6.0,
    glowColor: new Color('#00ff00'),
    glowSharpness: 1.0,
    opacity: 1.0,
  },

  /* glsl */ `
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * modelPosition;

      vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
      vPosition = modelPosition.xyz;
      vNormal = modelNormal.xyz;
    }
  `,

  /* glsl */ `
    uniform vec3 glowColor;
    uniform float falloffAmount;
    uniform float glowSharpness;
    uniform float glowInternalRadius;
    uniform float opacity;

    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {

      vec3 normal = normalize(vNormal);

      if(!gl_FrontFacing)
        normal *= -1.0;

      vec3 viewDirection = normalize(cameraPosition - vPosition);

      float fresnel = dot(viewDirection, normal);
      fresnel = pow(fresnel, glowInternalRadius + 0.1);

      float falloff = smoothstep(0.0, falloffAmount, fresnel);

      float fakeGlow = fresnel;
      fakeGlow += fresnel * glowSharpness;
      fakeGlow *= falloff;

      gl_FragColor = vec4(
        clamp(glowColor * fresnel, 0.0, 1.0),
        clamp(fakeGlow, 0.0, opacity)
      );

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
)

extend({ FakeGlowMaterialImpl })

export default function FakeGlowMaterial({
  falloff = 0.1,
  glowInternalRadius = 6,
  glowColor = '#00ff00',
  glowSharpness = 1,
  side = 'THREE.FrontSide',
  depthTest = false,
  opacity = 1,
}) {

  const sideMap = {
    'THREE.FrontSide': FrontSide,
    'THREE.BackSide': BackSide,
    'THREE.DoubleSide': DoubleSide,
  }

  return (
    <fakeGlowMaterialImpl
      falloffAmount={falloff}
      glowInternalRadius={glowInternalRadius}
      glowColor={new Color(glowColor)}
      glowSharpness={glowSharpness}
      opacity={opacity}
      side={sideMap[side]}
      transparent
      blending={AdditiveBlending}
      depthTest={depthTest}
    />
  )
}

FakeGlowMaterial.propTypes = {
  falloff: PropTypes.number,
  glowInternalRadius: PropTypes.number,
  glowColor: PropTypes.string,
  glowSharpness: PropTypes.number,
  side: PropTypes.oneOf([
    'THREE.FrontSide',
    'THREE.BackSide',
    'THREE.DoubleSide',
  ]),
}