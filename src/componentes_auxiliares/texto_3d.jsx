import { Text3D } from "@react-three/drei"

export default function Texto_3d( { texto, tamanho, cor, ...props} ) {

    return (
        <Text3D {...props} font="font3d/gt.json">
            {texto}
        </Text3D>
    )
}