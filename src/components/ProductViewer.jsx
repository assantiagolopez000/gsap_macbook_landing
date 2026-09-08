import React from 'react'
import useMacbookStore from '../store';
import clsx from 'clsx';
import {Canvas} from '@react-three/fiber';
import {Box, OrbitControls} from '@react-three/drei';
import MacbookModel14 from './models/Macbook-14';

const ProductViewer = () => {
    const { color, scale, setColor, setScale } = useMacbookStore();

  return (
    <section id='product-viewer'>
        <h2>Take a closer look.</h2>

        <div className="controls">
            <p className="info">MacbookPro {scale} in {color}</p>

            <div className="flex-center gap-5 mt-5">
                <div className="color-control">
                    <div
                        // clsx is a utility that joins class names together. and the color === and active is a conditional
                        // so if the store current color matches this swatchs color then the expresion evals to the string active
                        onClick={() => setColor('#adb5bd')}
                        className={clsx('bg-neutral-300', color === '#adb5bd' && 'active')}
                    />
                    
                    <div
                        onClick={() => setColor('#2e2c2e')}
                        className={clsx('bg-neutral-900', color === '#2e2c2e' && 'active')}
                    />
                    
                </div>

                <div className="size-control">
                    <div
                        onClick={() => setScale(0.06)}
                        className={clsx(scale===0.06 ? 'bg-white text-black' : 'bg-transparent text-white')}
                    >
                        <p>14"</p>
                    </div>
                    <div
                        onClick={() => setScale(0.08)}
                        className={clsx(scale===0.08 ? 'bg-white text-black' : 'bg-transparent text-white')}
                    >
                        <p>16"</p>
                    </div>
                    {/* <div><p>14"</p></div>
                    <div><p>16"</p></div> */}
                </div>
            </div>
        </div>

        {/* We will be using zustand with tailwind for react state. */}
        {/* Before we can use the model we must convert the .glb into a react component through the terminal */}
        <Canvas id='canvas' camera={{ position: [0,2,5], fov: 50, near: 0.1, far: 100}}>
            
            <ambientLight intensity={1} />
                        
            {/* Box coming from react-three drei */}
            {/* <Box position={[0,0,0]} scale={10 * scale} material-color={color}/> */}
            {/* Okay so insteading of adding a box we want to add our macbook model */}
            <MacbookModel14 scale={0.06} position={[0,0,0]}/>
            
            {/* Orbitcontrols allows us to interact with it */}
            <OrbitControls enableZoom={false} />
        </Canvas>
    </section>
  )
}

export default ProductViewer