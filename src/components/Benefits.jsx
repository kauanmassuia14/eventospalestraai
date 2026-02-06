import { useRef, useState } from 'react';
import { Mic, Lightbulb, Palette, Sparkles, X, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
    {
        icon: Mic,
        title: 'Onboarding de Palestrantes',
        tagline: 'As vozes certas para a sua mensagem',
        description: 'Não buscamos apenas grandes nomes. Encontramos as pessoas certas que vão entregar a mensagem certa, no tom certo, para a sua audiência específica.',
        features: [
            { label: 'Mapeamento de Perfil', detail: 'Analisamos o DNA do seu público para encontrar match perfeito' },
            { label: 'Mentoria de Conteúdo', detail: 'Trabalhamos o roteiro com cada palestrante antes do palco' },
            { label: 'Ensaio & Refinamento', detail: 'Garantimos que a entrega seja tão boa quanto a ideia' }
        ],
        stats: { value: '150+', label: 'Palestrantes' }
    },
    {
        icon: Lightbulb,
        title: 'Narrativa & Conceito',
        tagline: 'Eventos que contam histórias',
        description: 'Cada evento tem um arco narrativo. Começamos com o "porquê", desenvolvemos o "como" e encerramos com o "e agora?". Nada é aleatório.',
        features: [
            { label: 'Story Design', detail: 'Criamos a jornada emocional do seu evento' },
            { label: 'Tematização', detail: 'Desenvolvemos conceitos visuais e verbais únicos' },
            { label: 'Emotional Pacing', detail: 'Dosamos energia, reflexão e inspiração' }
        ],
        stats: { value: '98%', label: 'Engajamento Médio' }
    },
    {
        icon: Palette,
        title: 'Design Visual',
        tagline: 'Apresentações que impressionam',
        description: 'Slides não são apenas suporte. São peças de comunicação visual que amplificam a mensagem. Design editorial, motion graphics e identidade única.',
        features: [
            { label: 'Slides Customizados', detail: 'Zero templates genéricos, 100% marca' },
            { label: 'Motion Graphics', detail: 'Animações que prendem a atenção' },
            { label: 'Brand Consistency', detail: 'Tudo respira a identidade visual da empresa' }
        ],
        stats: { value: '10k+', label: 'Slides Criados' }
    },

];

const Benefits = () => {
    const container = useRef();
    const cardsRef = useRef([]);
    const [expandedCard, setExpandedCard] = useState(null);

    useGSAP(() => {
        // Entrance Animation
        gsap.from(".benefit-card", {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%"
            }
        });

        // Header Entrance
        gsap.from(".benefits-header", {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: { trigger: container.current, start: "top 80%" }
        });

    }, { scope: container });

    // Handle Expansion Animation
    useGSAP(() => {
        if (expandedCard !== null) {
            // Modal Entrance
            const tl = gsap.timeline();
            tl.set(".expanded-modal", { display: "flex" });
            tl.fromTo(".expanded-modal-overlay", { opacity: 0 }, { opacity: 1, duration: 0.3 });
            tl.fromTo(".expanded-card",
                { scale: 0.8, y: 50, opacity: 0, rotationX: 10 },
                { scale: 1, y: 0, opacity: 1, rotationX: 0, duration: 0.5, ease: "back.out(1.2)" }
            );
            // Stagger features
            tl.fromTo(".feature-item",
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
                "-=0.3"
            );

            // Particles
            gsap.to(".particle", {
                x: "random(-200, 200)",
                y: "random(-200, 200)",
                opacity: "random(0.2, 1)",
                scale: "random(0.5, 1.5)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: { amount: 2, from: "random" }
            });

        } else {
            // Modal Exit (manual handling since we don't have AnimatePresence)
            if (document.querySelector('.expanded-modal')) {
                const tl = gsap.timeline({ onComplete: () => gsap.set(".expanded-modal", { display: "none" }) });
                tl.to(".expanded-card", { scale: 0.9, y: 20, opacity: 0, duration: 0.3 });
                tl.to(".expanded-modal-overlay", { opacity: 0, duration: 0.2 }, "-=0.2");
            }
        }
    }, { dependencies: [expandedCard], scope: container });

    // 3D Hover Tilt
    const handleMouseMove = (e, index) => {
        const card = cardsRef.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 150, 214, 0.25)",
            duration: 0.4,
            ease: "power2.out"
        });

        // Icon pop
        gsap.to(card.querySelector('.service-icon'), { scale: 1.1, rotate: 10, duration: 0.4 });
    };

    const handleMouseLeave = (e, index) => {
        const card = cardsRef.current[index];
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            boxShadow: "none",
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
        });
        gsap.to(card.querySelector('.service-icon'), { scale: 1, rotate: 0, duration: 0.4 });
    };

    return (
        <section id="servicos" className="py-32 bg-black relative overflow-hidden perspective-1000" ref={container}>
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container mx-auto max-w-7xl px-4 relative z-10">
                <div className="mb-20 text-center benefits-header">
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Nossos Serviços</span>
                    <h2 className="text-5xl md:text-7xl font-medium text-white max-w-4xl mx-auto leading-tight mb-6">
                        Onde a <span className="italic font-serif text-primary">narrativa</span> encontra o palco
                    </h2>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        Três pilares que transformam eventos em experiências inesquecíveis
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className="benefit-card relative perspective-1000 group cursor-pointer"
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={(e) => handleMouseLeave(e, index)}
                                onClick={() => setExpandedCard(index)}
                            >
                                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full transform-style-3d transition-colors hover:border-primary/50">
                                    {/* Icon */}
                                    <div className="service-icon w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/10">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-primary text-sm font-medium mb-4 uppercase tracking-wider">{service.tagline}</p>
                                    <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>

                                    {/* Stat Badge */}
                                    <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                        <TrendingUp className="w-4 h-4 text-primary" />
                                        <span className="text-white font-bold">{service.stats.value}</span>
                                        <span className="text-gray-500 text-sm">{service.stats.label}</span>
                                    </div>

                                    {/* Click to expand hint */}
                                    <div className="mt-8 text-xs text-gray-500 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <Sparkles className="w-3 h-3" />
                                        <span>Clique para explorar a fundo</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* EXPANDED MODAL */}
            <div className="expanded-modal fixed inset-0 z-50 items-center justify-center p-4 hidden">
                <div className="expanded-modal-overlay absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setExpandedCard(null)} />

                {expandedCard !== null && (
                    <div className="expanded-card relative bg-zinc-900 border border-primary/30 rounded-3xl p-10 max-w-3xl w-full shadow-[0_0_50px_rgba(0,150,214,0.15)] overflow-hidden">
                        {/* Particles Container */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="particle absolute w-2 h-2 bg-primary rounded-full blur-[1px]" style={{ left: '50%', top: '50%' }}></div>
                            ))}
                        </div>

                        <button
                            onClick={() => setExpandedCard(null)}
                            className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors border border-white/10 z-20"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
                            <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                {(() => {
                                    const Icon = services[expandedCard].icon;
                                    return <Icon className="w-12 h-12 text-primary" />;
                                })()}
                            </div>

                            <div>
                                <h3 className="text-4xl font-bold text-white mb-2">{services[expandedCard].title}</h3>
                                <p className="text-primary text-lg font-medium tracking-wide uppercase mb-6">{services[expandedCard].tagline}</p>
                                <p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-2 border-primary/30 pl-4">
                                    {services[expandedCard].description}
                                </p>

                                <div className="space-y-4">
                                    {services[expandedCard].features.map((feature, idx) => (
                                        <div key={idx} className="feature-item bg-white/5 rounded-xl p-4 border border-white/5 hover:border-primary/20 transition-colors flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                            <div>
                                                <h4 className="text-white font-bold mb-1">{feature.label}</h4>
                                                <p className="text-gray-400 text-sm">{feature.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Benefits;
