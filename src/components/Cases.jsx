import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

const cases = [
    {
        id: 1,
        client: 'Marcelo Apovian',
        title: 'A Maratona Invisível',
        category: 'Palestra & Storytelling',
        image: '/assets/cases/marcelo-apovian/cover.jpg',
        video: '/assets/videodepoi.mp4',
        description: '"Não é o corpo que adoece primeiro. É a alma." Com essa premissa, Marcelo nos procurou para construir uma palestra que questionasse a obsessão por performance. A Maratona Invisível não é sobre troféus — é sobre a corrida interior que ninguém vê, mas que define quem somos. Construímos uma narrativa que conecta sua trajetória no esporte de elite ao mundo corporativo, mostrando que a verdadeira chegada é aquela que acontece por dentro.',
        stats: ['Atleta Olímpico', 'Saúde Mental', 'Empreendedorismo']
    },
    {
        id: 2,
        client: 'Yduqs',
        title: 'Yduqs Day 2024',
        category: 'Convenção & Storytelling',
        image: '/assets/cases/yduqs/showroom.jpg',
        description: 'Construímos a narrativa e as apresentações do Yduqs Day 2024, transformando dados, métricas e resultados das empresas do grupo em uma história única e coerente. Estruturamos os conteúdos das diferentes áreas dentro de um mesmo fio narrativo, dando ritmo, sentido e impacto a informações que normalmente seriam apenas institucionais. O evento deixou de ser apenas mais uma edição anual para se tornar uma experiência clara, envolvente e memorável.',
        stats: ['Storytelling de Dados', 'Unificação de Narrativa', 'Impacto Institucional']
    },
    {
        id: 3,
        client: 'Friboi',
        title: 'Imersão Criativa',
        category: 'Cocriação & Workshop',
        image: '/assets/cases/friboi/cover.jpg',
        description: 'No evento da Friboi, uma imersão criativa com mais de 100 participantes mostrou como o storytelling pode transformar atributos técnicos em conexão emocional. Após uma palestra sobre princípios de histórias que engajam, os participantes criaram roteiros que despertavam confiança na marca sem citar valores diretamente. O resultado foi uma narrativa coletiva, apresentada como surpresa final, que revelou a verdadeira alma da Friboi.',
        stats: ['Workshop de Storytelling', 'Cocriação Estratégica', '100+ Líderes']
    },
    {
        id: 4,
        client: 'CooperVision',
        title: 'LATAM Storytelling',
        category: 'Convenção Internacional',
        image: '/assets/cases/coopervision/cover.jpg',
        description: 'Em Cartagena, conduzimos um projeto completo de storytelling para o evento da Coopervision LATAM, assumindo desde a criação do tema central até o roteiro das apresentações e ensaios. A proposta narrativa transformou o encontro em uma experiência inspiradora, alinhando todas as áreas — México, Colômbia, Brasil, Distribuidores — sob a metáfora de uma nova temporada, onde cada equipe assumia o protagonismo de sua própria história.',
        stats: ['Convenção Internacional', 'Alinhamento Cultural', 'Roteirização Completa']
    },
    {
        id: 5,
        client: 'LMA',
        title: 'A Aliança com o Futuro',
        category: 'Evento 360º',
        image: '/assets/cases/lma/cover.jpg',
        description: 'Fomos responsáveis por toda a criação e condução do evento da LMA, desde o conceito central até a apresentação final. Criamos o tema “A Aliança com o Futuro”, que uniu narrativa, roteiro original e identidade visual para transformar o evento em uma verdadeira jornada no tempo. Desenvolvemos a história, os roteiros, os conteúdos visuais e treinamos os apresentadores para garantir entrega emocional e coesa.',
        stats: ['Jornada no Tempo', 'Treinamento de Speakers', 'Experiência 360º']
    },
    {
        id: 6,
        client: 'Philip Morris',
        title: 'Convenção Cinematográfica',
        category: 'Experiência Audiovisual',
        image: '/assets/cases/philip-morris/cover.png',
        description: 'Em Cartagena, transformamos a tradicional convenção da Philip Morris em uma experiência cinematográfica viva. Criamos uma série com seis episódios, roteirizados e gravados durante o evento, com estrutura narrativa inspirada em grandes filmes: passado, desejo, antagonismo, protagonismo e clímax. A proposta foi substituir o modelo de “evento com PowerPoint” por uma imersão criativa, onde cada colaborador atuou como roteirista e personagem.',
        stats: ['Série Audiovisual', '160 Participantes', 'Mudança de Mindset']
    },
    {
        id: 7,
        client: 'Fillity',
        title: 'Inventando Moda',
        category: 'Imersão & Desfile',
        image: '/assets/cases/fillity/cover.jpg',
        description: 'No evento da Fillity, criamos uma experiência imersiva inspirada em séries como La Casa de Papel. O tema “Inventando Moda” trouxe à tona a importância de sair do lugar comum, resgatar a autenticidade e transformar o ato de criar em um estilo de vida. Com momentos emocionantes, música, humor e um desfile narrado como uma crônica viva, o evento celebrou a trajetória da Fillity e preparou o terreno para os próximos capítulos.',
        stats: ['Gamificação Imersiva', 'Desfile Narrativo', 'Protagonismo do Time']
    }
];

const Cases = () => {
    const [selectedId, setSelectedId] = useState(null);
    const containerRef = useRef(null);

    return (
        <section id="cases" className="py-32 bg-zinc-950 overflow-hidden relative">
            <div className="container mx-auto px-4 mb-12 flex items-end justify-between">
                <div>
                    <h2 className="text-5xl md:text-7xl font-medium text-white mb-4 tracking-tight">Showroom</h2>
                    <p className="text-gray-400 text-lg max-w-xl">
                        Explore nossa galeria de experiências. Cada projeto é uma história de transformação.
                    </p>
                </div>
                <div className="hidden md:block text-gray-500 text-sm">
                    Arraste para explorar <ArrowUpRight className="inline w-4 h-4" />
                </div>
            </div>

            {/* Carousel Container */}
            <div ref={containerRef} className="pl-4 md:pl-0">
                <motion.div
                    className="flex gap-6 cursor-grab active:cursor-grabbing pb-20 px-4 md:px-20"
                    drag="x"
                    dragConstraints={{ right: 0, left: -2000 }}
                >
                    {cases.map((item) => (
                        <motion.div
                            layoutId={`card-container-${item.id}`}
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            className="relative min-w-[280px] md:min-w-[400px] h-[500px] rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-black/50"
                            whileHover={{ scale: 1.02, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            {item.video ? (
                                <video
                                    src={item.video}
                                    className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700"
                                    muted
                                    loop
                                    playsInline
                                    onMouseOver={event => event.target.play()}
                                    onMouseOut={event => event.target.pause()}
                                />
                            ) : (
                                <motion.img
                                    layoutId={`card-image-${item.id}`}
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700"
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
                                <motion.div layoutId={`card-content-${item.id}`}>
                                    <span className="text-white/60 text-sm font-bold tracking-widest uppercase mb-2 block">{item.client}</span>
                                    <h3 className="text-3xl md:text-4xl font-medium text-white leading-tight mb-2">{item.title}</h3>
                                    <div className="w-12 h-1 bg-white/30 rounded-full mt-4 group-hover:w-full group-hover:bg-white transition-all duration-500" />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Expanded Card Modal */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        {cases.map(item => (
                            item.id === selectedId && (
                                <motion.div
                                    layoutId={`card-container-${item.id}`}
                                    className="bg-zinc-900 w-full max-w-4xl rounded-[2rem] overflow-hidden overflow-y-auto max-h-[90vh] shadow-2xl relative"
                                    key={item.id}
                                >
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/50 hover:bg-black rounded-full text-white flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <div className="h-[300px] md:h-full relative">
                                            {item.video ? (
                                                <video
                                                    src={item.video}
                                                    className="w-full h-full object-cover"
                                                    controls
                                                    autoPlay
                                                    playsInline
                                                />
                                            ) : (
                                                <motion.img
                                                    layoutId={`card-image-${item.id}`}
                                                    src={item.image}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            {!item.video && <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />}
                                        </div>

                                        <div className="p-10 md:p-14 flex flex-col justify-center">
                                            <motion.div layoutId={`card-content-${item.id}`}>
                                                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6">
                                                    {item.category}
                                                </div>
                                                <h2 className="text-4xl md:text-5xl font-medium text-white mb-2">{item.title}</h2>
                                                <p className="text-2xl text-gray-500 mb-8">{item.client}</p>

                                                <p className="text-gray-300 leading-relaxed mb-10 text-lg">
                                                    {item.description}
                                                </p>

                                                <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-8">
                                                    {item.stats.map((stat, idx) => (
                                                        <div key={idx} className="flex items-center gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-white" />
                                                            <span className="text-white font-medium">{stat}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Cases;
