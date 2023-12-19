import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "./Box.jsx";
import { Container } from "./Container.jsx";
import { useEdit } from "./EditProvider.jsx";

import { useSelector } from "react-redux";
import { selectSolutionBoxes } from "../../../features/solution/solutionSlice.js";

export const ThreeScene = ({ container, children }) => {
    const { edit } = useEdit();

    const boxes = useSelector(selectSolutionBoxes);
    const inBoxes = boxes.filter((box) => box.isIn === true);

    const cameraPosition = Object.values(container).map((n) => n * 2);
    const axesLength = Math.max(...Object.values(container)) * 1.5;

    return (
        <div className="h-100 w-100 d-flex flex-row justify-content-center align-items-center">
            {children}
            <Canvas camera={{ fov: 75, position: cameraPosition }}>
                <Container size={container} />
                {inBoxes.map(
                    ({
                        _id,
                        order,
                        size,
                        position,
                        color,
                        type,
                        isIn,
                        rotation,
                    }) => {
                        return (
                            <Box
                                key={_id}
                                id={_id}
                                order={order}
                                size={size}
                                color={color}
                                type={type}
                                isIn={isIn}
                                position={position}
                                rotation={rotation}
                            />
                        );
                    }
                )}
                <OrbitControls />
                {edit ? <axesHelper args={[axesLength]} /> : null}
            </Canvas>
        </div>
    );
};
