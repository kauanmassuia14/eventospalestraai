import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Twitter, Mail, MapPin, Phone, FileText } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10 relative z-50">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="text-2xl font-black tracking-tighter block mb-6">
                            palestra<span className="text-primary">ai</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Transformamos eventos corporativos em experiências memoráveis.
                            Criação, gestão e produção de ponta a ponta.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Linkedin, Facebook, Twitter].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Empresa</h4>
                        <ul className="space-y-4">
                            {['Sobre Nós', 'Nossa Equipe', 'Carreiras', 'Imprensa'].map((item, index) => (
                                <li key={index}>
                                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Serviços</h4>
                        <ul className="space-y-4">
                            {['Tema e Conceito', 'Storytelling do Evento', 'Roteiro de Palestras', 'Apresentações de Palco'].map((item, index) => (
                                <li key={index}>
                                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contato</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>R JESUINO ARRUDA 676, CJ 84</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FileText className="w-5 h-5 text-primary shrink-0" />
                                <span>CNPJ: 53.148.415/0001-73</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href="mailto:contato@palestraai.com" className="hover:text-white transition-colors">
                                    contato@palestraai.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>11953235930</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {currentYear} PalestraAI. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
                        <Link to="/termos" className="hover:text-white transition-colors">Termos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
