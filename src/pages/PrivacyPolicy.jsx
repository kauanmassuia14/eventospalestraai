import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    return (
        <div className="pt-32 pb-20 bg-black min-h-screen text-white relative z-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Política de Privacidade e Cookies – PalestraAí</h1>

                    <div className="space-y-12 text-lg text-gray-300 leading-relaxed text-justify">
                        <p>
                            A PalestraAí valoriza a sua privacidade. Esta Política explica como coletamos, usamos e protegemos suas informações ao navegar em nosso site ou interagir com nossos formulários.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Informações que coletamos</h2>
                            <p className="mb-4">Coletamos informações pessoais que você nos fornece voluntariamente, como:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-6 ml-4">
                                <li>Nome e e-mail nos formulários de contato</li>
                                <li>Tema de sua palestra enviada para análise</li>
                                <li>Arquivos anexados que contenham apresentações ou materiais de apoio</li>
                            </ul>
                            <p className="mb-4">Também coletamos automaticamente dados por meio de cookies e ferramentas de análise (como Google Analytics e Meta Pixel), incluindo:</p>
                            <ul className="list-disc pl-6 space-y-2 ml-4">
                                <li>IP e localização aproximada</li>
                                <li>Tipo de dispositivo e navegador</li>
                                <li>Páginas acessadas e tempo de navegação</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Uso das informações</h2>
                            <p className="mb-4">Utilizamos suas informações para:</p>
                            <ul className="list-disc pl-6 space-y-2 ml-4">
                                <li>Gerar ideias e sugestões personalizadas com apoio de inteligência artificial</li>
                                <li>Entrar em contato com você, caso solicitado</li>
                                <li>Melhorar a experiência no site e entender o comportamento dos visitantes</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Compartilhamento de dados</h2>
                            <p>
                                Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto quando necessário para o funcionamento dos serviços (ex: plataformas de e-mail ou automação integradas ao site).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
                            <p className="mb-4">
                                Cookies são pequenos arquivos armazenados no seu navegador que ajudam a entender como você interage com o site. Utilizamos cookies para:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 ml-4">
                                <li>Medir o tráfego do site (Google Analytics)</li>
                                <li>Mostrar anúncios personalizados (Meta Pixel)</li>
                                <li>Melhorar a navegação e velocidade do site</li>
                            </ul>
                            <p className="mt-4">
                                Você pode desativar os cookies nas configurações do seu navegador a qualquer momento.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Seus direitos (LGPD)</h2>
                            <p className="mb-4">Nos termos da Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
                            <ul className="list-disc pl-6 space-y-2 ml-4">
                                <li>Acessar ou corrigir seus dados</li>
                                <li>Solicitar a exclusão dos seus dados</li>
                                <li>Revogar o consentimento para uso de dados</li>
                            </ul>
                        </section>

                        <div className="pt-8 border-t border-white/10">
                            <p>
                                Entre em contato: <a href="mailto:contato@palestraai.com" className="text-primary hover:underline">contato@palestraai.com</a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
