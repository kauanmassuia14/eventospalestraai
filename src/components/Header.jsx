import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Nossa Empresa', href: '/#empresa' },
        { name: 'Cases', href: '/#cases' },
        { name: 'Serviços', href: '/#servicos' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass-dark' : 'py-6 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setIsMobileMenuOpen(false);
                        }}
                        className="relative z-50 text-2xl font-black tracking-tighter"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            palestra<span className="text-primary">ai</span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.href}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.5 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}

                        <motion.a
                            href="/#contato"
                            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Fale Conosco
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative z-50 text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex items-center justify-center md:hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <nav className="flex flex-col items-center gap-8 p-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    className="text-2xl font-bold text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/#contato"
                                className="mt-4 bg-primary text-white px-8 py-4 rounded-full font-bold text-xl"
                                onClick={() => setIsMobileMenuOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Fale Conosco
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
