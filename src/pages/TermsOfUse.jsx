import { motion } from 'framer-motion';

const TermsOfUse = () => {
    return (
        <div className="pt-32 pb-20 bg-black min-h-screen text-white relative z-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Termos de Uso – PalestraAí</h1>

                    <div className="space-y-12 text-lg text-gray-300 leading-relaxed text-justify">
                        <p>Ao acessar este site, você concorda com os seguintes termos:</p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Uso do conteúdo</h2>
                            <p>
                                Todo o conteúdo deste site — textos, imagens, exemplos de palestras, vídeos e sugestões geradas — é protegido por direitos autorais. Você não pode copiar, distribuir ou reproduzir sem autorização.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Responsabilidade sobre os materiais enviados</h2>
                            <p>
                                O conteúdo enviado por você (tema, arquivos, apresentações) será usado apenas para gerar sugestões e não será divulgado publicamente. Você continua sendo o único titular dos direitos do seu material.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Limites do serviço</h2>
                            <p>
                                As ideias geradas por nossa inteligência artificial são sugestões iniciais. Não garantimos resultados específicos, e o conteúdo final depende da interpretação e uso por parte do usuário.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Alterações</h2>
                            <p>
                                A PalestraAí pode atualizar estes termos a qualquer momento. Recomendamos que você consulte esta página periodicamente.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-white/10">
                            <p>
                                Se você tiver dúvidas, entre em contato com a gente em: <a href="mailto:contato@palestraai.com" className="text-primary hover:underline">contato@palestraai.com</a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfUse;
