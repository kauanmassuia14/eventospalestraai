import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
    const container = useRef();
    const videoRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();
    const [isLoaded, setIsLoaded] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Intro Sequence (Dolly Zoom)
        tl.fromTo(videoRef.current,
            { scale: 1.5, filter: "blur(10px)" },
            { scale: 1, filter: "blur(0px)", duration: 2.5, ease: "power2.inOut" }
        );

        // Text Reveal (Staggered 3D Rotate)
        // Since we don't have SplitText, we handle the staggered fade/slide manually for the block, 
        // or we could split the string in React. Let's do a block animation for simplicity but high polish.
        tl.fromTo(".hero-line",
            { y: 100, opacity: 0, rotateX: -45, transformOrigin: "0% 50% -100px" },
            { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.2, ease: "back.out(1.7)" },
            "-=1.5"
        );

        tl.fromTo(".hero-sub",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
            "-=0.5"
        );

        tl.fromTo(".hero-cta",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
            "-=0.2"
        );

        // Scroll ScrollTrigger Pinning
        ScrollTrigger.create({
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: true,
            // Parallax on scroll
            onUpdate: (self) => {
                gsap.to(contentRef.current, { y: -self.progress * 200, opacity: 1 - self.progress * 1.5, overwrite: true });
                gsap.to(videoRef.current, { filter: `blur(${self.progress * 10}px)`, scale: 1 + self.progress * 0.2, overwrite: true });
            }
        });

    }, { scope: container });

    // Mouse Parallax Logic
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20; // -10 to 10
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(contentRef.current, {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: "power2.out"
        });

        gsap.to(videoRef.current, {
            x: -xPos * 0.5,
            y: -yPos * 0.5,
            duration: 1,
            ease: "power2.out"
        });
    };

    return (
        <section
            ref={container}
            className="relative h-screen flex items-center justify-center overflow-hidden bg-black font-sans perspective-1000"
            onMouseMove={handleMouseMove}
        >
            {/* Video Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-150 blur-md"
                >
                    <source src="/assets/hero-background.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div ref={contentRef} className="container mx-auto px-4 relative z-20 text-center">
                <div className="max-w-6xl mx-auto perspective-1000">
                    {/* Main Headline - Split delicately */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.9] tracking-tight mb-8">
                        <div className="hero-line block overflow-hidden">Do Conceito ao Palco</div>
                        <div className="hero-line block overflow-hidden mt-2">
                            Criamos a <span className="italic font-serif text-primary">Experiência Completa</span>
                        </div>
                    </h1>

                    {/* Subheadline - Storytelling */}
                    <p className="hero-sub text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
                        Líderes de grandes empresas escolhem a PalestraAI para transformar convenções e treinamentos em histórias que inspiram, engajam e emocionam.
                    </p>

                    {/* CTA */}
                    <div className="hero-cta flex justify-center">
                        <a
                            href="#contato"
                            className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] group"
                        >
                            Começar uma história
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Simple */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-[fadeIn_2s_ease-out_2s_forwards]">
                <div className="w-[1px] h-20 bg-white/10 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scrollDown_1.5s_infinite]"></div>
                </div>
            </div>

            <style>{`
                @keyframes scrollDown {
                    0% { top: -50%; }
                    100% { top: 100%; }
                }
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </section>
    );
};

export default Hero;
