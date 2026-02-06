import { useRef, useState, useEffect } from 'react';
import { Search, Pen, Users, Palette, Play, CheckCircle, ArrowRight, X, ChevronRight, ChevronLeft } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const steps = [
    {
        number: '01',
        icon: Search,
        title: 'Discovery',
        subtitle: 'Entendemos seu público e objetivos',
        description: 'Mapeamos a cultura, desafios e aspirações da sua empresa. Cada evento começa com perguntas profundas.',
        color: '#0096d6',
        slides: [
            '/assets/slides/slide-1.png',
            '/assets/slides/slide-2.png',
            '/assets/slides/slide-3.png',
            '/assets/slides/slide-4.png'
        ]
    },
    {
        number: '02',
        icon: Pen,
        title: 'Story Architecture',
        subtitle: 'Desenhamos a jornada narrativa',
        description: 'Construímos o arco dramático do evento: abertura impactante, desenvolvimento envolvente, fechamento inspirador.',
        color: '#00d4ff',
        slides: [
            '/assets/slides/slide-5.png',
            '/assets/slides/slide-6.png',
            '/assets/slides/slide-7.png',
            '/assets/slides/slide-8.png'
        ]
    },
    {
        number: '03',
        icon: Users,
        title: 'Casting',
        subtitle: 'Selecionamos os protagonistas',
        description: 'Encontramos palestrantes que não apenas conhecem o tema, mas sabem emocionar e engajar.',
        color: '#0096d6',
        slides: [
            '/assets/slides/slide-9.png',
            '/assets/slides/slide-10.png',
            '/assets/slides/slide-11.png',
            '/assets/slides/slide-12.png'
        ]
    },
    {
        number: '04',
        icon: Palette,
        title: 'Visual Identity',
        subtitle: 'Criamos a estética do evento',
        description: 'Desenvolvemos apresentações, materiais e cenografia que respiram a identidade da sua marca.',
        color: '#00d4ff',
        slides: [
            '/assets/slides/slide-13.png',
            '/assets/slides/slide-14.png',
            '/assets/slides/slide-15.png',
            '/assets/slides/slide-16.png'
        ]
    },
    {
        number: '05',
        icon: Play,
        title: 'Showtime',
        subtitle: 'Entregamos a experiência',
        description: 'No dia do evento, tudo flui. Cada detalhe foi pensado, cada segundo foi ensaiado.',
        color: '#0096d6',
        slides: [
            '/assets/slides/slide-17.png',
            '/assets/slides/slide-18.png',
            '/assets/slides/slide-19.png',
            '/assets/slides/slide-20.png'
        ]
    },
];

const Methodology = () => {
    const container = useRef();
    const [activeStep, setActiveStep] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const backgroundRef = useRef();
    const slideRef = useRef();
    const slideContentRef = useRef(); // Container for images

    // Reset slide on Close/Open
    useEffect(() => {
        if (activeStep !== null) setActiveSlide(0);
    }, [activeStep]);

    useGSAP(() => {
        // Animated Background
        gsap.to(backgroundRef.current, {
            backgroundPosition: '100% 100%',
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Floating Animations for Cards (only when not expanded)
        if (activeStep === null) {
            steps.forEach((_, i) => {
                const card = `.card-${i}`;

                // Random float
                gsap.to(card, {
                    y: "random(-20, 20)",
                    x: "random(-10, 10)",
                    rotation: "random(-5, 5)",
                    duration: "random(2, 4)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.2
                });

                // Entrance animation
                gsap.from(card, {
                    opacity: 0,
                    scale: 0,
                    duration: 1,
                    ease: "back.out(1.7)",
                    delay: i * 0.1,
                    overwrite: "auto"
                });
            });

            // Header Animation
            gsap.fromTo(".header-anim",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: container.current, start: "top 80%" } }
            );
        } else {
            // EXPANDED VIEW ANIMATIONS
            // Animate Entrance of the Modal
            gsap.from(".expanded-card", {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out"
            });

            gsap.from(".hero-icon", { y: 20, opacity: 0, delay: 0.2 });
            gsap.from(".hero-title", { y: 20, opacity: 0, delay: 0.3 });
            gsap.from(".hero-desc", { y: 20, opacity: 0, delay: 0.4 });
        }
    }, { scope: container, dependencies: [activeStep] });

    // --- CAROUSEL LOGIC ---
    const handleNextSlide = () => {
        if (activeStep === null) return;
        const totalSlides = steps[activeStep].slides.length;
        const nextSlide = (activeSlide + 1) % totalSlides;

        changeSlide(nextSlide, 'next');
    };

    const handlePrevSlide = () => {
        if (activeStep === null) return;
        const totalSlides = steps[activeStep].slides.length;
        const nextSlide = (activeSlide - 1 + totalSlides) % totalSlides;

        changeSlide(nextSlide, 'prev');
    };

    const changeSlide = (nextIndex, direction) => {
        const currentImage = slideContentRef.current.children[activeSlide];
        const nextImage = slideContentRef.current.children[nextIndex];

        // "Crazy" Tunnel Transition
        const tl = gsap.timeline();

        // 1. Current slide zooms into camera and fades out (Tunnel In)
        tl.to(currentImage, {
            scale: 2,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            filter: "blur(10px)"
        });

        // 2. Prepare next slide (start zoomed out/distant)
        gsap.set(nextImage, {
            scale: 0.2,
            opacity: 0,
            filter: "blur(20px)",
            zIndex: 10
        });

        // 3. Next slide zooms in from distance
        tl.to(nextImage, {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power4.out"
        }, "-=0.2"); // Overlap slightly

        setActiveSlide(nextIndex);
    };

    // Drag Logic
    const isDragging = useRef(false);
    const startX = useRef(0);

    const onPointerDown = (e) => {
        isDragging.current = true;
        startX.current = e.clientX;
    };

    const onPointerMove = (e) => {
        if (!isDragging.current) return;
        // Optional: slight tilt on drag
    };

    const onPointerUp = (e) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const diff = e.clientX - startX.current;
        if (Math.abs(diff) > 50) { // Threshold
            if (diff > 0) handlePrevSlide();
            else handleNextSlide();
        }
    };


    const handleCardClick = (index) => {
        setActiveStep(index);
    };

    const handleClose = () => {
        setActiveStep(null);
    };

    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden" ref={container}>
            {/* Animated Background - Removed gradient as requested */}

            <div className="container mx-auto max-w-6xl px-4 relative z-10">
                <div className="text-center mb-20 header-anim">
                    <span className="text-primary font-bold tracking-widest uppercase mb-12 block">Nossa Metodologia</span>
                </div>

                {/* Futuristic 3D GSAP Gallery */}
                <div className="relative h-[600px] w-full perspective-1000 mb-20 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">

                        {/* Scatter View - "Crazy" Floating Slides */}
                        {activeStep === null && (
                            <div className="absolute inset-0">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.number}
                                        className={`card-${index} absolute left-1/2 top-1/2 w-64 h-40 bg-zinc-900 border border-white/20 rounded-xl shadow-2xl cursor-pointer overflow-hidden group`}
                                        style={{
                                            zIndex: 10 + index,
                                            transform: `translate(-50%, -50%) translate(${(Math.random() - 0.5) * 800}px, ${(Math.random() - 0.5) * 400}px)`
                                        }}
                                        onClick={() => handleCardClick(index)}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black p-4 flex flex-col justify-between pointer-events-none">
                                            <div className="flex justify-between items-center">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20" style={{ backgroundColor: step.color }}>{step.number}</div>
                                                <div className="w-16 h-2 bg-white/20 rounded-full"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-white font-bold text-lg leading-tight">{step.title}</h4>
                                                <div className="w-full h-1 bg-white/10 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay pointer-events-none"></div>
                                    </div>
                                ))}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                                    <p className="text-white/50 text-sm tracking-[0.2em] font-light animate-pulse">CLIQUE PARA EXPANDIR</p>
                                </div>
                            </div>
                        )}

                        {/* Expanded View - "Hero" Slide with Carousel */}
                        {activeStep !== null && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                <div className="absolute inset-0 bg-black/98 backdrop-blur-xl" onClick={handleClose}></div>
                                <div
                                    className="relative z-50 w-[95vw] h-[85vh] max-w-[1920px] bg-zinc-900 rounded-3xl border border-white/20 shadow-2xl overflow-hidden expanded-card flex flex-col md:flex-row"
                                    onPointerDown={onPointerDown}
                                    onPointerMove={onPointerMove}
                                    onPointerUp={onPointerUp}
                                    onPointerLeave={onPointerUp} // Safety
                                >

                                    {/* Left Panel: Content */}
                                    <div className="relative z-20 w-full md:w-1/3 h-full p-8 md:p-12 flex flex-col justify-center bg-zinc-900/80 backdrop-blur-xl border-r border-white/10">
                                        <div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg border border-white/20 hero-icon"
                                            style={{ backgroundColor: steps[activeStep].color }}
                                        >
                                            <div className="text-white font-black text-2xl">{steps[activeStep].number}</div>
                                        </div>

                                        <h3 className="text-4xl font-bold text-white mb-6 hero-title">
                                            {steps[activeStep].title}
                                        </h3>

                                        <p className="text-lg text-gray-300 font-light hero-desc">
                                            {steps[activeStep].description}
                                        </p>

                                        {/* Pagination Indicators */}
                                        <div className="flex gap-2 mt-8">
                                            {steps[activeStep].slides.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeSlide ? 'w-8 bg-primary' : 'w-2 bg-white/20'}`}
                                                ></div>
                                            ))}
                                        </div>

                                        <p className="mt-4 text-xs text-white/30 uppercase tracking-widest flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4" /> Arraste para navegar
                                        </p>
                                    </div>

                                    {/* Right Panel: Interactive Visuals (Carousel) */}
                                    <div className="relative w-full md:w-2/3 h-full overflow-hidden bg-black header-anim group">
                                        {/* Navigation Buttons */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
                                            className="absolute top-1/2 right-4 md:right-10 z-30 cursor-pointer animate-pulse hover:animate-none opacity-50 hover:opacity-100 bg-black/50 hover:bg-black/80 p-3 rounded-full border border-white/20 backdrop-blur-md transition-all active:scale-90"
                                            aria-label="Next slide"
                                        >
                                            <ArrowRight className="w-8 h-8 text-white" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
                                            className="absolute top-1/2 left-4 md:left-10 z-30 cursor-pointer animate-pulse hover:animate-none opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-all bg-black/50 hover:bg-black/80 p-3 rounded-full border border-white/20 backdrop-blur-md active:scale-90"
                                            aria-label="Previous slide"
                                        >
                                            <div className="rotate-180"><ArrowRight className="w-8 h-8 text-white" /></div>
                                        </button>

                                        <div ref={slideContentRef} className="absolute inset-0 w-full h-full">
                                            {steps[activeStep].slides.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="absolute inset-0 w-full h-full"
                                                    style={{
                                                        backgroundImage: `url(${img})`,
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundColor: '#000',
                                                        backgroundPosition: 'center',
                                                        opacity: idx === activeSlide ? 1 : 0,
                                                        zIndex: idx === activeSlide ? 2 : 1
                                                    }}
                                                >

                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleClose}
                                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center backdrop-blur-md transition-colors border border-white/10 z-50 text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-gray-400 mb-6">Quer ver nossa metodologia em ação?</p>
                    <a
                        href="#cases"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold transition-colors"
                    >
                        Ver Projetos Realizados
                        <CheckCircle className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Methodology;
