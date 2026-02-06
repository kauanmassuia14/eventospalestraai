import { useRef, useState, useEffect } from 'react';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(useGSAP, Draggable);

const testimonials = [
    {
        id: 1,
        quote: "A PalestraAI transformou nossa convenção anual em uma experiência inesquecível. O ROI superou todas as expectativas e nossa equipe nunca esteve tão engajada.",
        author: "Carlos Mendes",
        role: "Diretor de Marketing",
        company: "Ambev",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    {
        id: 2,
        quote: "Eles entenderam a nossa cultura como ninguém. Não foi apenas um evento, foi uma declaração de novos tempos para a Microsoft Brasil.",
        author: "Fernanda Souza",
        role: "Head de Inovação",
        company: "Microsoft",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
        id: 3,
        quote: "Precisão suíça na execução e criatividade brasileira no conteúdo. A combinação perfeita para marcas de luxo.",
        author: "Jean Pierre",
        role: "CEO Latam",
        company: "Lacoste",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
    },
    {
        id: 4,
        quote: "O nível de produção e a narrativa criada elevaram nossa marca a um patamar global. Simplesmente impecável.",
        author: "Roberto Justus",
        role: "Founder",
        company: "Nestlé",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80"
    },
    {
        id: 5,
        quote: "Nunca vi uma agência captar a essência de um CEO tão rápido. O suporte pré e pós-evento foi fundamental.",
        author: "Ana Clara",
        role: "VP de RH",
        company: "Itaú",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
    }
];

const Testimonials = () => {
    const container = useRef();
    const cardsRef = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Config
    const cardWidth = 400; // Approximate, for calculation
    const gap = 40;

    useGSAP(() => {
        // Holographic Grid Background Animation
        gsap.to(".holo-grid", {
            backgroundPosition: "0 100px",
            duration: 4,
            ease: "linear",
            repeat: -1
        });

        updateCarousel();

    }, { scope: container, dependencies: [currentIndex] });

    const updateCarousel = () => {
        const total = testimonials.length;

        testimonials.forEach((_, i) => {
            const card = cardsRef.current[i];
            // Calculate distance from current index, handling wrap-around for endless feeling (simplified logic for 5 items)
            // Actually, let's keep it simple: Active is Center.

            let dist = i - currentIndex;

            // Handle wrap around logic for "endless" feel visual
            if (dist > total / 2) dist -= total;
            if (dist < -total / 2) dist += total;

            const isActive = i === currentIndex;

            // 3D Transforms
            const xPos = dist * (isDragging ? 0 : 320); // Spacing
            const scale = isActive ? 1.1 : 0.8;
            const opacity = isActive ? 1 : 0.3;
            const zIndex = isActive ? 100 : 10 - Math.abs(dist);
            const rotateY = dist * -25; // Rotate towards center
            const filter = isActive ? "blur(0px) brightness(1.2)" : "blur(4px) brightness(0.5)";

            gsap.to(card, {
                x: xPos,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                rotationY: rotateY,
                filter: filter,
                duration: 0.6,
                ease: "power3.out",
                transformOrigin: "center center"
            });

            // Hologram Glitch Effect on Active
            if (isActive) {
                gsap.fromTo(card.querySelector('.holo-overlay'),
                    { opacity: 0 },
                    { opacity: 0.2, duration: 0.1, repeat: 3, yoyo: true, ease: "steps(1)", delay: 0.6 }
                );
            }
        });
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Drag Logic (Simplified version using pointer events instead of full Draggable plugin for cleaner React state sync)
    const dragStartX = useRef(0);

    const onPointerDown = (e) => {
        setIsDragging(true);
        dragStartX.current = e.clientX;
    };

    const onPointerUp = (e) => {
        if (!isDragging) return;
        setIsDragging(false);
        const diff = e.clientX - dragStartX.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) prevSlide();
            else nextSlide();
        }
    };

    return (
        <section className="py-32 bg-black text-white relative overflow-hidden perspective-1000" ref={container}>
            {/* Holographic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black z-0"></div>
            <div className="absolute inset-0 holo-grid opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    perspective: '500px',
                    transform: 'rotateX(60deg) scale(2)'
                }}
            />

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none mix-blend-screen"></div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                <div className="mb-20 text-center">
                    <div className="inline-block p-4 rounded-full bg-primary/10 mb-6 border border-primary/20 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                        <Quote className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">O que dizem os líderes</h2>
                </div>

                {/* 3D Carousel Container */}
                <div
                    className="relative w-full max-w-5xl h-[500px] flex items-center justify-center perspective-1000"
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                >
                    {testimonials.map((item, index) => (
                        <div
                            key={item.id}
                            ref={el => cardsRef.current[index] = el}
                            className="absolute w-[350px] md:w-[600px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl cursor-pointer select-none group"
                            onClick={() => setCurrentIndex(index)}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Holographic Border / Shine */}
                            <div className="absolute inset-0 rounded-3xl border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_15px_rgba(6,182,212,0.3)]"></div>
                            <div className="holo-overlay absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/5 opacity-0 pointer-events-none rounded-3xl mix-blend-overlay"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-primary via-white to-transparent mb-6 shadow-lg">
                                    <img
                                        src={item.image}
                                        alt={item.author}
                                        className="w-full h-full rounded-full object-cover border-2 border-black"
                                    />
                                </div>

                                <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-8 text-gray-100 italic">
                                    "{item.quote}"
                                </blockquote>

                                <div>
                                    <cite className="text-white font-bold text-lg not-italic block tracking-wide">{item.author}</cite>
                                    <span className="text-primary text-sm font-medium tracking-widest uppercase mt-1 block">
                                        {item.role} — {item.company}
                                    </span>
                                </div>
                            </div>

                            {/* Scanline Effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20 rounded-3xl"></div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8 z-20">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-black" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                    >
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
