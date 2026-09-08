import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16.jsx";
import MacbookModel14 from "../models/Macbook-14.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

//helper function
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

// first utility function
const fadeMeshes = (group, opacity) => {
    if(!group) return;

    group.traverse((child) => {
        if(child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, { opacity, duration: ANIMATION_DURATION })
        }
    })
}

const moveGroup = (group, x) => {
    if(!group) return;

    gsap.to(group.position, { x, duration: ANIMATION_DURATION })
}

// Handle the transitions and change from macbook 14 and 16 from what users select. --> PresentationControls
const ModelSwitcher = ({ scale, isMobile }) => {
  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;

  // Along side the 2 props above we can refernce more props. 
  const smallMacbookRef = useRef();
  const largeMacbookRef = useRef();

  const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  //Using gsap hook and like useEffect() we can make it run whenever something in the dependency array chagnes. In this case is scale.
  useGSAP(() => {
    if(showLargeMacbook) {
        //animate the movement of a group from a large to a small macbook
        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
        moveGroup(largeMacbookRef.current, 0);

        //we can also fade out the small mac and fade in the large mac as it is moving
        fadeMeshes(smallMacbookRef.current, 0);
        fadeMeshes(largeMacbookRef.current, 1);
    } else {
        //animate the movement of a group from a large to a small macbook
        moveGroup(smallMacbookRef.current, 0);
        moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

        //we can also fade out the small mac and fade in the large mac as it is moving
        fadeMeshes(smallMacbookRef.current, 1);
        fadeMeshes(largeMacbookRef.current, 0);
    }
    
  }, [scale])

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity], // horizontal movement
    config: {mass:1, tension:0, friction:26} // tries to simulate real world physics when moving object around

  }

  return (
    <>
        <PresentationControls {...controlsConfig}>
            <group ref={largeMacbookRef}>
                <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
            </group>
        </PresentationControls>

        <PresentationControls {...controlsConfig}>
            <group ref={smallMacbookRef}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
            </group>
        </PresentationControls>
    </>
  )
}

export default ModelSwitcher