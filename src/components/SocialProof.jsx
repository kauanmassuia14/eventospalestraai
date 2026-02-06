import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Presentation, Target, Trophy, Zap } from 'lucide-react';

const clients = [
    { name: 'CrewAI', logo: '/assets/logos/crewai-logo.png' },
    { name: 'HOPE', logo: '/assets/logos/hope-white.png' },
    { name: 'Lacoste', logo: '/assets/logos/lacoste-white.png' },
    { name: 'Microsoft', logo: '/assets/logos/microsoft.png' },
    { name: 'Dengo', logo: '/assets/logos/dengo-white.png' },
    { name: 'Ambev', logo: '/assets/logos/ambev.png' },
];

const SocialProof = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section className="py-20 bg-zinc-950 text-white border-t border-white/5 relative z-10" ref={ref}>
            <div className="container mx-auto max-w-7xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-medium mb-6">
                        Os maiores confiam na nossa <span className="italic font-serif text-primary">narrativa</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Empresas líderes escolhem a PalestraAI para transformar eventos em histórias que inspiram
                    </p>
                </motion.div>

                {/* Logos Grid */}
                {/* Infinite Marquee */}
                <div
                    className="relative w-full overflow-hidden mb-20"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                    }}
                >
                    <motion.div
                        className="flex gap-16 md:gap-24 w-max"
                        animate={{ x: "-25%" }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    >
                        {/* Duplicate list 4 times to ensure smooth loop and screen coverage */}
                        {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center h-16 w-32 md:w-40 flex-shrink-0"
                            >
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="h-full w-full object-contain"
                                    style={{ opacity: 1 }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerText = client.name;
                                        e.target.parentElement.className = "flex items-center justify-center font-bold text-xl text-gray-400";
                                    }}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Impact Numbers - Narrative Focused */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    {[
                        {
                            value: '500+',
                            label: 'Apresentações Roteirizadas',
                            icon: Presentation,
                            description: 'Cada slide conta uma história'
                        },
                        {
                            value: '98%',
                            label: 'Satisfação de Audiência',
                            icon: Target,
                            description: 'Conteúdo que ressoa'
                        },
                        {
                            value: '150+',
                            label: 'Palestrantes',
                            icon: Zap,
                            description: 'As vozes certas no palco'
                        },
                        {
                            value: '10k+',
                            label: 'Slides Criados',
                            icon: Trophy,
                            description: 'Design que impressiona'
                        },
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-white/10 hover:border-primary/50 transition-all group overflow-hidden"
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {/* Shine effect on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6 }}
                                />

                                <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <div className="text-5xl font-black text-white mb-2 group-hover:text-primary transition-colors">
                                    {item.value}
                                </div>
                                <div className="text-white font-bold text-sm mb-1">
                                    {item.label}
                                </div>
                                <div className="text-gray-500 text-xs">
                                    {item.description}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default SocialProof;
