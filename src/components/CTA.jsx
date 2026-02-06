import { useRef, useState } from 'react';
import { Send, CheckCircle, Sparkles, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CTA = () => {
    const container = useRef();
    const formRef = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Background Animation
    useGSAP(() => {
        gsap.to(".cta-bg-gradient", {
            backgroundPosition: "100% 100%",
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.from(".cta-content", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%"
            }
        });

    }, { scope: container });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Button Morph to Circle
        gsap.to(".submit-btn", {
            width: "50px",
            color: "transparent",
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(".submit-spinner", { opacity: 1, duration: 0.2 });
            }
        });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        gsap.to(".submit-spinner", { opacity: 0, duration: 0.2 });

        setIsSubmitting(false);
        setIsSuccess(true);

        // Success Animation inside Form
        gsap.to(".form-container", {
            scale: 0.95,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                gsap.set(".form-content", { display: "none" });
                gsap.set(".success-message", { display: "flex", opacity: 0 });
                gsap.to(".form-container", { scale: 1, opacity: 1, duration: 0.3 });
                gsap.to(".success-message", { opacity: 1, duration: 0.5 });
            }
        });

        setTimeout(() => {
            // Reset logic would go here, simplified for demo
        }, 5000);
    };

    // Input Focus Animation Hook
    const handleFocus = (e) => {
        const parent = e.target.parentElement;
        gsap.to(parent.querySelector('.input-line'), { width: '100%', duration: 0.3, ease: 'power2.out' });
        gsap.to(parent.querySelector('label'), { color: '#00D8FF', y: -2, duration: 0.3 }); // Primary color roughly
    };

    const handleBlur = (e) => {
        const parent = e.target.parentElement;
        if (!e.target.value) {
            gsap.to(parent.querySelector('.input-line'), { width: '0%', duration: 0.3, ease: 'power2.in' });
            gsap.to(parent.querySelector('label'), { color: '#9CA3AF', y: 0, duration: 0.3 });
        } else {
            // Keep line if has value, but maybe dim color
            gsap.to(parent.querySelector('label'), { color: '#ffffff', duration: 0.3 });
        }
    };

    return (
        <section
            id="contato"
            className="py-24 relative overflow-hidden bg-black"
            ref={container}
        >
            {/* Background Gradients - Animated via CSS/GSAP */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,150,214,0.15),transparent_60%)] cta-bg-gradient" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,150,214,0.1),transparent_60%)]" />

            <div className="container mx-auto max-w-6xl relative z-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text */}
                    <div className="cta-content">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                            <span className="text-sm font-medium text-gray-300">Agenda 2026 Aberta</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Vamos criar algo <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Extraordinário?</span>
                        </h2>

                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            Deixe os detalhes complexos conosco. Preencha o formulário e nossa equipe de concierge entrará em contato para agendar uma consultoria inicial.
                        </p>

                        <div className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                                <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <p className="text-white font-bold">Prefere e-mail?</p>
                                <a href="mailto:contato@palestraai.com" className="hover:text-primary transition-colors">contato@palestraai.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="cta-content form-container bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
                        {/* Shine Border Effect */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                        <div className="form-content">
                            <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput
                                        label="Nome"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                    <FormInput
                                        label="Empresa"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput
                                        label="E-mail Corporativo"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                    <FormInput
                                        label="Telefone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className="space-y-2 relative group-input">
                                    <label className="text-sm font-medium text-gray-400 block mb-1 transition-colors">Detalhes do Projeto</label>
                                    <div className="relative">
                                        <textarea
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:outline-none transition-all text-white placeholder-transparent resize-none z-10 relative"
                                            placeholder="Conte um pouco..."
                                        />
                                        <div className="input-line absolute bottom-0 left-0 h-[2px] bg-primary w-0 transition-all z-20"></div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn w-full bg-primary hover:bg-primary-dark text-white font-bold h-14 rounded-lg flex items-center justify-center gap-2 transition-all relative overflow-hidden"
                                    disabled={isSubmitting}
                                >
                                    <span className="flex items-center gap-2 z-10 whitespace-nowrap">
                                        Solicitar Proposta
                                        <Send className="w-4 h-4" />
                                    </span>
                                    {/* Spinner */}
                                    <div className="submit-spinner absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    </div>
                                </button>
                            </form>
                        </div>

                        {/* Success Message */}
                        <div className="success-message hidden flex-col items-center justify-center text-center py-12 absolute inset-0 bg-zinc-900/95 backdrop-blur-xl z-50">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                <CheckCircle className="w-10 h-10 text-green-500 animate-[bounce_1s_infinite]" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Solicitação Recebida!</h3>
                            <p className="text-gray-400 max-w-xs mx-auto">
                                Nossa equipe analisará seu projeto e entrará em contato em breve.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Helper Component for Inputs to reduce repetition
const FormInput = ({ label, type = "text", name, value, onChange, onFocus, onBlur }) => (
    <div className="space-y-2 relative group-input">
        <label className="text-sm font-medium text-gray-400 block mb-1 transition-colors">{label}</label>
        <div className="relative">
            <input
                type={type}
                name={name}
                required
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:outline-none transition-all text-white placeholder-transparent z-10 relative"
            />
            {/* Tech Runner Line */}
            <div className="input-line absolute bottom-0 left-0 h-[2px] bg-primary w-0 transition-all z-20"></div>
        </div>
    </div>
);

export default CTA;
