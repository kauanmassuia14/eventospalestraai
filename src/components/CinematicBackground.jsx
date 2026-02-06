import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const CinematicBackground = () => {
    const container = useRef();

    useGSAP(() => {
        // Animate Smoke Layers
        // We use extremely slow timelines to simulate "drifting" atmospheric fog

        gsap.to(".fog-layer-1", {
            rotation: 360,
            duration: 120,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".fog-layer-2", {
            rotation: -360,
            duration: 150,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".fog-layer-3", {
            xPercent: -20,
            yPercent: -20,
            duration: 40,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Pulse opacity for a "breathing" effect
        gsap.to(".fog-container", {
            opacity: 0.6,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: container });

    return (
        <div ref={container} className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black">

            {/* 1. Base Gradient - Deep Atmospheric Colors */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-[#0a0a1a] to-black" />

            {/* 2. Smoke/Fog Layers */}
            <div className="fog-container absolute inset-0 opacity-40 mix-blend-screen">
                {/* Blue/Cyan Mist */}
                <div
                    className="fog-layer-1 absolute -top-[50%] -left-[50%] w-[200%] h-[200%]"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(0, 150, 214, 0.15) 0%, transparent 60%)',
                        filter: 'blur(80px)',
                    }}
                />

                {/* Purple/Magenta Haze */}
                <div
                    className="fog-layer-2 absolute -top-[20%] -right-[20%] w-[150%] h-[150%]"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(120, 0, 255, 0.1) 0%, transparent 50%)',
                        filter: 'blur(100px)',
                    }}
                />

                {/* White/Grey Smoke drifting */}
                <div
                    className="fog-layer-3 absolute top-[20%] left-[20%] w-[100%] h-[100%]"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
            </div>

            {/* 3. Film Grain Overlay */}
            {/* SVG Noise Filter for authentic grain texture */}
            <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none">
                <svg className='isolate' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
                    <filter id='noiseFilter'>
                        <feTurbulence
                            type='fractalNoise'
                            baseFrequency='0.85'
                            numOctaves='3'
                            stitchTiles='stitch'
                        />
                    </filter>
                    <rect width='100%' height='100%' filter='url(#noiseFilter)' />
                </svg>
            </div>

            {/* 4. Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

        </div>
    );
};

export default CinematicBackground;
