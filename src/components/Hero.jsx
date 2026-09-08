import React, { useEffect, useRef } from 'react'

const Hero = () => {

    // Whenever you want more control over a video you attach it to a ref.
    // the useeffect below check if any element has the videoref attached to it if so then playback is changed.
    const videoRef = useRef();
    
    useEffect(() => {
        if(videoRef.current) videoRef.current.playbackRate = 2;
    }, []);

  return (
    <section id='hero'>
        <div>
            <h1>MacBook Pro</h1>
            <img src="/title.png" alt="MacBook Title" />

            <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline></video>

            <button>Buy</button>

            <p>From $1599 or $133/mo for 12 months</p>
        </div>
    </section>
  )
}

export default Hero