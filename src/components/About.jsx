import React, { useRef, useState, useEffect } from 'react';
import { X, Users, Target, Zap, TrendingUp, Award, Globe, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const companyCards = [
    {
        id: 'mission',
        icon: Target,
        title: 'Nossa Missão',
        tagline: 'Por que existimos',
        preview: 'Elevar a comunicação corporativa a um ativo estratégico',
        fullContent: {
            headline: 'Apresentações que definem o futuro da empresa',
            body: 'Transformamos momentos decisivos em marcos culturais. Nossa missão é garantir que a visão da liderança seja não apenas compreendida, mas internalizada por toda a organização através de narrativas de alto impacto.',
            stats: [
                { label: 'Alinhamento', value: 'Estratégico' },
                { label: 'Cultura', value: 'Fortalecida' },
                { label: 'Liderança', value: 'Inspiradora' }
            ]
        },
        gradient: 'from-blue-600 to-cyan-600'
    },
    {
        id: 'team',
        icon: Users,
        title: 'Nosso Time',
        tagline: 'Quem somos',
        preview: 'Roteiristas, designers e especialistas em oratória',
        fullContent: {
            headline: 'Experts em contar histórias no mundo corporativo',
            body: 'Nossa equipe reúne roteiristas, designers visuais e treinadores de public speaking. Não trazemos apenas técnica, trazemos a alma da narrativa para o design dos seus slides e a performance dos seus líderes.',
            stats: [
                { label: 'Expertise', value: 'Corporativa' },
                { label: 'Design', value: 'High-End' },
                { label: 'Oratória', value: 'Executiva' }
            ]
        },
        gradient: 'from-purple-600 to-pink-600'
    },
    {
        id: 'approach',
        icon: Zap,
        title: 'Nossa Abordagem',
        tagline: 'Onde atuamos',
        preview: 'Eventos internos, convenções e treinamentos',
        fullContent: {
            headline: 'Transformando comunicação interna em cultura',
            body: 'Especializados em eventos corporativos internos, convenções de vendas e treinamentos. Pegamos a mensagem estratégica da empresa e a traduzimos em uma linguagem envolvente, visualmente impactante e humanizada.',
            stats: [
                { label: 'Foco', value: 'Interno' },
                { label: 'Formato', value: 'Premium' },
                { label: 'Entrega', value: 'End-to-End' }
            ]
        },
        gradient: 'from-orange-600 to-red-600'
    },
    {
        id: 'narrative',
        icon: TrendingUp,
        title: 'Narrativa & Palco',
        tagline: 'Onde a magia acontece',
        preview: 'Diagnóstico estratégico e design visual',
        fullContent: {
            headline: 'Do diagnóstico à ovação',
            body: 'Realizamos um diagnóstico profundo do momento da sua empresa para criar a narrativa perfeita. Aliamos isso a um design visual de slides cinematográfico que amplia a mensagem de cada executivo no palco.',
            stats: [
                { label: 'Diagnóstico', value: 'Preciso' },
                { label: 'Slides', value: 'Visuais' },
                { label: 'Impacto', value: 'Perene' }
            ]
        },
        gradient: 'from-green-600 to-teal-600'
    }
];

const About = () => {
    const container = useRef();
    const [activeCard, setActiveCard] = useState(null);
    const activeData = companyCards.find(c => c.id === activeCard);

    // 3D Tilt Logic
    const handleMouseMove = (e, index) => {
        if (activeCard) return; // Disable tilt when expanded

        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15; // Max -15 to 15 deg
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out"
        });

        // Parallax internals
        gsap.to(card.querySelector('.card-content'), {
            x: (x - centerX) * 0.1,
            y: (y - centerY) * 0.1,
            duration: 0.4
        });

        gsap.to(card.querySelector('.card-glow'), {
            opacity: 1,
            x: x,
            y: y,
            duration: 0.1
        });
    };

    const handleMouseLeave = (e) => {
        if (activeCard) return;
        const card = e.currentTarget;

        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        });

        gsap.to(card.querySelector('.card-content'), { x: 0, y: 0, duration: 0.5 });
        gsap.to(card.querySelector('.card-glow'), { opacity: 0, duration: 0.5 });
    };

    useGSAP(() => {
        // Floating Monoliths - Idle Animation
        companyCards.forEach((_, i) => {
            if (activeCard) return; // Stop idle when active

            gsap.to(`.monolith-${i}`, {
                y: "random(-10, 10)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.2
            });
        });

        // Entrance Animation
        gsap.from(".monolith-card", {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%"
            }
        });

        // Header
        gsap.from(".about-header", {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: { trigger: container.current, start: "top 80%" }
        });

    }, { scope: container, dependencies: [activeCard] });

    // Handle Expansion
    useGSAP(() => {
        if (activeCard) {
            // Explode / Enter fullscreen
            const tl = gsap.timeline();

            tl.set(".fullscreen-modal", { opacity: 1, pointerEvents: "all" });

            tl.fromTo(".fullscreen-modal",
                { clipPath: "circle(0% at 50% 50%)" },
                { clipPath: "circle(150% at 50% 50%)", duration: 0.8, ease: "power4.inOut" }
            );

            tl.from(".modal-layer-back", { scale: 0.8, opacity: 0, duration: 0.5 }, "-=0.4");
            tl.from(".modal-layer-mid", { y: 50, opacity: 0, duration: 0.5 }, "-=0.3");
            tl.from(".modal-layer-front", { z: 100, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.4");

        } else {
            // Close
            gsap.to(".fullscreen-modal", {
                clipPath: "circle(0% at 50% 50%)",
                duration: 0.5,
                ease: "power4.in",
                onComplete: () => gsap.set(".fullscreen-modal", { opacity: 0, pointerEvents: "none" })
            });
        }
    }, { scope: container, dependencies: [activeCard] });

    return (
        <section id="empresa" className="py-32 bg-black relative overflow-hidden" ref={container}>
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    perspective: '1000px',
                    transform: 'rotateX(20deg)'
                }} />
            </div>

            <div className="container mx-auto max-w-7xl px-4 relative z-10">
                <div className="text-center mb-20 about-header">
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Sobre Nós</span>
                    <h2 className="text-5xl md:text-7xl font-medium text-white leading-tight mb-6">
                        Conheça a <span className="italic font-serif text-primary">PalestraAI</span>
                    </h2>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        Clique nos monólitos flutuantes para decodificar nossa essência
                    </p>
                </div>

                {/* Levitating Monoliths Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {companyCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.id}
                                className={`monolith-${index} monolith-card relative group h-[400px] cursor-pointer perspective-1000`}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => setActiveCard(card.id)}
                            >
                                <div className="absolute inset-0 bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden transform-style-3d bg-opacity-80 backdrop-blur-sm">
                                    {/* Mouse Tracker Glow */}
                                    <div className="card-glow absolute w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 mix-blend-screen" />

                                    {/* Neon Edge */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-primary/50 rounded-2xl`}></div>

                                    <div className="card-content relative z-10 h-full p-8 flex flex-col justify-between transform-style-3d">

                                        <div className="transform-style-3d translate-z-10">
                                            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                                <Icon className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{card.title}</h3>
                                            <div className="w-12 h-1 bg-primary/50 rounded-full mb-4 group-hover:w-full transition-all duration-500"></div>
                                        </div>

                                        <div className="transform-style-3d translate-z-5">
                                            <p className="text-gray-400 text-sm mb-4 uppercase tracking-wider">{card.tagline}</p>
                                            <p className="text-gray-200 text-lg leading-snug">{card.preview}</p>
                                        </div>

                                        <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                            Decodificar <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Grid Texture Overlay */}
                                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* FULLSCREEN EXPLODED VIEW MODAL */}
            {activeData && (
                <div className="fullscreen-modal fixed inset-0 z-50 flex items-center justify-center pointer-events-none opacity-0">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setActiveCard(null)}></div>

                    <div className="relative w-full max-w-6xl h-full md:h-[90vh] flex flex-col items-center justify-center p-4">

                        {/* Layer Back - Decor */}
                        <div className="modal-layer-back absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
                            <div className="w-[800px] h-[800px] border border-white/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
                            <div className="w-[600px] h-[600px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                        </div>

                        {/* Layer Mid - Content Card */}
                        <div className="modal-layer-mid relative bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-20 max-w-4xl w-full text-center shadow-2xl overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

                            <div className="relative z-10">
                                <div className="inline-flex p-4 rounded-2xl bg-white/5 mb-8 border border-white/10">
                                    {React.createElement(activeData.icon, { className: 'w-12 h-12 text-primary' })}
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black text-white mb-2">{activeData.title}</h2>
                                <p className="text-primary text-xl tracking-widest uppercase mb-8">{activeData.fullContent.headline}</p>

                                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

                                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                                    {activeData.fullContent.body}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {activeData.fullContent.stats.map((stat, idx) => (
                                        <div key={idx} className="bg-black/40 rounded-xl p-6 border border-white/5 hover:border-primary/30 transition-colors">
                                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Layer Front - Floating Decor / Close */}
                        <div className="modal-layer-front absolute top-8 right-8 z-50">
                            <button
                                onClick={() => setActiveCard(null)}
                                className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/10 group"
                            >
                                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default About;
