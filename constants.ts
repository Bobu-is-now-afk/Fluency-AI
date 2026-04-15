
import { CoachingContext, LanguageConfig } from './types';

export const COACHING_CONTEXTS: CoachingContext[] = [
  { id: 'interview', label: 'Job Interview', description: 'Focus on confidence and concise answers.', icon: 'Briefcase' },
  { id: 'casual', label: 'Casual Chat', description: 'Natural flow and friendliness.', icon: 'Coffee' },
  { id: 'speech', label: 'Public Speech', description: 'Clarity, pace, and dramatic effect.', icon: 'Mic' },
];

export const LEVEL_DESCRIPTIONS = {
  beginner: { label: 'Beginner', sub: 'CEFR A1-A2 / JLPT N5-N4', words: '40-60' },
  intermediate: { label: 'Intermediate', sub: 'CEFR B1-B2 / JLPT N3', words: '90-110' },
  advanced: { label: 'Advanced', sub: 'CEFR C1-C2 / JLPT N2-N1', words: '140-180' },
};

// --- SPANISH (ES) ---
const ES_INTERVIEW = {
  beginner: [
    "Hola, me llamo Alex. Quiero trabajar aquí porque me gusta la tecnología. Soy muy trabajador y aprendo rápido. En mi último trabajo ayudé a muchos clientes cada día. Estoy feliz de estar aquí.",
    "Me interesa este trabajo porque quiero mejorar mis habilidades. Soy bueno trabajando en equipo y siempre llego a tiempo. Me gusta resolver problemas y ayudar a mi jefe. Gracias por esta oportunidad.",
    "Mi mayor fortaleza es que soy muy paciente. Cuando un cliente no está contento, lo escucho y trato de ayudarlo. Creo que esto es importante para este puesto. Estoy emocionado de aprender más.",
    "Normalmente trabajo de nueve a cinco, pero soy flexible. Si el equipo necesita ayuda los fines de semana, puedo venir. Quiero ser un miembro útil de la oficina. Soy una persona positiva.",
    "En mi tiempo libre, me gusta aprender cosas nuevas. Recientemente terminé un curso básico de computación. Quiero usar lo que aprendí para ayudar a su empresa. Estoy listo para empezar."
  ],
  intermediate: [
    "He trabajado en servicio al cliente durante tres años. En mi puesto anterior, era responsable de gestionar las consultas de los clientes y resolver problemas técnicos. Disfruto interactuando con la gente.",
    "Uno de mis mayores logros fue liderar un pequeño proyecto para mejorar el sistema de archivos de nuestra oficina. Antes estaba un poco desorganizado, así que coordiné al equipo para digitalizar nuestros registros.",
    "Cuando enfrento una situación difícil en el trabajo, trato de mantener la calma y analizar el problema lógicamente. Por ejemplo, si tenemos una afluencia repentina de clientes, priorizo las tareas más urgentes.",
    "Me atrae particularmente este puesto debido a la reputación de su empresa por la innovación en el sector tecnológico. He estado siguiendo sus recientes lanzamientos de productos y estoy impresionado.",
    "En cinco años, espero estar en un puesto senior donde pueda asesorar a nuevos empleados. Creo que el aprendizaje continuo es la clave del éxito en cualquier carrera. Estoy tomando un curso en línea."
  ],
  advanced: [
    "A lo largo de mi trayectoria como líder de proyecto, he demostrado capacidad para navegar desafíos organizativos complejos manteniendo el enfoque en los objetivos estratégicos de la empresa. Excelo en entornos de pensamiento crítico.",
    "Defino el éxito profesional no solo por el cumplimiento de los KPI, sino por el valor sostenible que creamos para las partes interesadas y la comunidad en general. Lideré una iniciativa de transformación digital.",
    "Al gestionar conflictos de alto riesgo dentro de un departamento, utilizo un enfoque no adversarial basado en la negociación de intereses. Recuerdo un desacuerdo significativo entre nuestros equipos de ingeniería.",
    "Me intriga particularmente la posición única que ocupa su empresa en la intersección de fintech y banca ética. Mi investigación reciente en finanzas descentralizadas me ha llevado a creer que la industria está en un punto crítico.",
    "Mi filosofía sobre el capital humano es que somos más efectivos cuando alineamos las pasiones individuales con el propósito organizacional. Tengo un historial comprobado de reducción de la rotación de personal."
  ]
};
const ES_CASUAL = {
  beginner: [
    "¡Hola! Hoy hace un día muy bonito. Me gusta el sol y el cielo azul. Normalmente voy a caminar al parque después de comer. Me hace sentir feliz y saludable.",
    "Me encanta comer comida italiana. Mi plato favorito es la pizza con mucho queso. A veces voy a un pequeño restaurante cerca de mi casa con mis amigos. Hablamos y reímos por mucho tiempo.",
    "Tengo un gato pequeño llamado Luna. Es muy linda y duerme mucho. Cada mañana me despierta para comer. Me gusta jugar con ella después del trabajo. ¿Tienes mascotas?",
    "Estoy aprendiendo a tocar la guitarra. Es un poco difícil, pero me gusta la música. Practico durante veinte minutos cada noche. Mis dedos me duelen a veces, pero estoy mejorando.",
    "El fin de semana pasado fui a la playa. El agua estaba un poco fría, pero la arena estaba caliente. Leí un libro y escuché las olas. Fue muy relajante. Creo que todos necesitan vacaciones."
  ],
  intermediate: [
    "Recientemente empecé un pequeño huerto en mi balcón y ha sido una experiencia muy gratificante. Estoy cultivando tomates, albahaca y algunos chiles. Es muy satisfactorio cocinar con tus propios ingredientes.",
    "Siempre he sido un gran fan de las películas antiguas, especialmente esos clásicos en blanco y negro de la década de 1940. Hay una elegancia en el diálogo y la moda que no se ve tanto en el cine moderno.",
    "Viajar a Japón el año pasado fue un verdadero punto culminante para mí. El contraste entre las concurridas calles de Tokio y los templos tranquilos de Kioto fue absolutamente fascinante.",
    "Me gusta mucho la fotografía como pasatiempo, aunque todavía soy muy principiante. Me gusta ir a 'caminatas fotográficas' por mi vecindario los sábados por la mañana cuando la luz es suave.",
    "Últimamente he estado tratando de reducir mi uso de plástico para ser un poco más respetuoso con el medio ambiente. Fue un poco difícil al principio encontrar alternativas, pero se siente bien."
  ],
  advanced: [
    "He descubierto que a medida que nuestras vidas se vuelven más digitales, el valor de los pasatiempos analógicos ha crecido exponencialmente. Recientemente comencé con la encuadernación de libros a mano.",
    "El concepto de 're-silvestración urbana' es algo que me apasiona bastante últimamente. Es la idea de permitir que la naturaleza reclame pequeños rincones de nuestras ciudades, fomentando la biodiversidad.",
    "He estado reflexionando mucho sobre el papel evolutivo de las bibliotecas públicas en el siglo veintiuno. Han pasado de ser meros depósitos de libros físicos a convertirse en centros comunitarios vitales.",
    "Hay un fenómeno psicológico fascinante conocido como el 'efecto perspectiva', que describe el cambio cognitivo experimentado por los astronautas cuando ven la Tierra desde el espacio.",
    "Recientemente he estado explorando la intersección histórica de la gastronomía y la geopolítica. Es notable cómo el comercio de especias literalmente mapeó nuestro mundo y cómo ciertos ingredientes revolucionaron culturas."
  ]
};
const ES_SPEECH = {
  beginner: [
    "Bienvenidos a todos. Hoy quiero hablar de la amabilidad. Es algo muy simple. Podemos sonreír o ayudar a un amigo. Las pequeñas cosas pueden cambiar un día entero.",
    "Buenos días. Creo que leer es muy importante. Los libros pueden llevarnos a nuevos lugares y enseñarnos cosas nuevas. Trato de leer durante diez minutos cada día. Espero que encuentren un libro que amen.",
    "Hola amigos. Quiero hablar de nuestro planeta. Debemos cuidar los árboles y el agua. Podemos usar menos plástico y caminar más. Juntos podemos mantener la Tierra limpia para nuestros hijos.",
    "Hola a todos. Hoy se trata del trabajo en equipo. Cuando trabajamos juntos, somos más fuertes. Estoy feliz de trabajar con todos ustedes. Hagamos nuestro mejor esfuerzo hoy y apoyémonos.",
    "Bienvenidos. Quiero decir gracias a mi familia y amigos. Siempre me ayudan y me hacen reír. Tengo suerte de tenerlos en mi vida. Espero que todos aquí tengan a alguien especial con quien hablar."
  ],
  intermediate: [
    "La importancia del aprendizaje permanente no puede ser subestimada en nuestro mundo cambiante. Muchos piensan que la educación termina al salir de la escuela, pero nuestro cerebro puede crecer siempre.",
    "A menudo subestimamos el poder de una sola persona para tener un impacto positivo en su comunidad. Es fácil mirar los problemas globales y sentirse abrumado, pero el cambio real comienza localmente.",
    "Mantener un equilibrio saludable entre el trabajo y la vida personal es esencial para el éxito a largo plazo y el bienestar personal. En nuestra sociedad hiperconectada, es difícil 'desconectarse'.",
    "Hablar en público a menudo se cita como uno de los mayores temores de las personas, pero también es una de las habilidades más valiosas. La capacidad de articular sus ideas claramente puede abrir puertas.",
    "La innovación no se trata solo de tecnología innovadora; es una mentalidad que busca mejores formas de resolver los problemas cotidianos. Requiere la voluntad de experimentar, fallar y volver a intentar."
  ],
  advanced: [
    "Mientras navegamos las complejidades del siglo veintiuno, el concepto de citizenship global ha pasado de ser un ideal filosófico a un imperativo práctico. Nuestros sistemas están profundamente entrelazados.",
    "El rápido avance de la inteligencia artificial generativa representa uno de los puntos de inflexión tecnológica más significativos en la historia humana. Debemos enfrentar las profundas implicaciones éticas.",
    "La diversidad lingüística no es solo una cuestión de patrimonio cultural; es un repositorio de marcos cognitivos únicos y conocimiento ecológico esencial para nuestra supervivencia colectiva.",
    "La transición a una economía circular no es una iniciativa ambiental opcional; es un cambio estructural fundamental requerido para garantizar la seguridad de los recursos a largo plazo.",
    "Actualmente estamos presenciando una crisis global de confianza en nuestras instituciones fundamentales, impulsada en gran medida por la fragmentación de nuestros ecosistemas de información."
  ]
};

// --- FRENCH (FR) ---
const FR_INTERVIEW = {
  beginner: [
    "Bonjour. Je m'appelle Alex. Je veux travailler ici parce que j'aime la technologie. Je suis travailleur et j'apprends vite. Dans mon dernier emploi, j'ai aidé beaucoup de clients chaque jour.",
    "Je suis intéressé par ce travail parce que je veux développer mes compétences. Je suis doué pour travailler avec les gens et j'arrive toujours à l'heure. J'aime résoudre des problèmes.",
    "Ma plus grande force est que je suis très patient. Quand un client est mécontent, je l'écoute et j'essaie de l'aider. Je pense que c'est important pour ce rôle. Je suis ravi d'en savoir plus.",
    "Je travaille habituellement de neuf à cinq, mais je suis flexible. Si l'équipe a besoin d'aide le week-end, je peux venir. Je veux être un membre utile du bureau. Je suis une personne positive.",
    "Pendant mon temps libre, j'aime apprendre de nouvelles choses. J'ai récemment terminé un cours d'informatique de base. Je veux utiliser ce que j'ai appris pour aider votre entreprise."
  ],
  intermediate: [
    "Je travaille dans le service client depuis trois ans. Dans mon rôle précédent, j'étais responsable de la gestion des demandes des clients et de la résolution de problèmes techniques.",
    "L'une de mes plus grandes réalisations a été de diriger un petit projet visant à améliorer le système de classement de notre bureau. C'était un peu désorganisé auparavant, j'ai donc coordonné l'équipe.",
    "Lorsque je suis confronté à une situation difficile au travail, j'essaie de rester calme et d'analyser le problème logiquement. Par exemple, si nous avons un afflux soudain de clients, je priorise.",
    "Je suis particulièrement attiré par ce poste en raison de la réputation de votre entreprise en matière d'innovation dans le secteur technologique. J'ai suivi vos récents lancements de produits.",
    "Dans cinq ans, j'espère occuper un poste de direction où je pourrai encadrer de nouveaux employés. Je crois que l'apprentissage continu est la clé du succès dans toute carrière."
  ],
  advanced: [
    "Tout au long de mon mandat en tant que chef de projet, j'ai constamment démontré une capacité à naviguer dans des défis organisationnels complexes tout en restant concentré sur les objectifs.",
    "Je définis le succès professionnel non seulement par l'atteinte des KPI, mais par la valeur durable que nous créons pour les parties prenantes et la communauté dans son ensemble. J'ai mené une initiative.",
    "Lors de la gestion de conflits à enjeux élevés au sein d'un département, j'utilise une approche non conflictuelle basée sur la négociation des intérêts. Je me souviens d'un désaccord important.",
    "Je suis particulièrement intrigué par la position unique de votre entreprise à l'intersection de la fintech et de la banque éthique. Mes recherches récentes sur la finance décentralisée m'ont convaincu.",
    "Ma philosophie sur le capital humain est que nous sommes plus efficaces lorsque nous alignons les passions individuelles avec l'objectif organisationnel. J'ai prouvé ma capacité à réduire le roulement."
  ]
};
const FR_CASUAL = {
  beginner: [
    "Salut ! C'est une très belle journée. J'aime le soleil et le ciel bleu. D'habitude, je vais me promener au parc après le déjeuner. Ça me rend heureux et en bonne santé.",
    "J'adore manger de la cuisine italienne. Mon plat préféré est la pizza avec beaucoup de fromage. Parfois, je vais dans un petit restaurant près de chez moi avec mes amis. Nous parlons longtemps.",
    "J'ai un petit chat nommé Luna. Elle est très mignonne et elle dort beaucoup. Chaque matin, elle me réveille pour manger. J'aime jouer avec elle après le travail. As-tu des animaux ?",
    "J'apprends à jouer de la guitare. C'est un peu difficile, mais j'aime la musique. Je m'entraîne vingt minutes chaque soir. Mes doigts me font mal parfois, mais je m'améliore.",
    "Le week-end dernier, je suis allé à la plage. L'eau était un peu froide, mas le sable était chaud. J'ai lu un livre et écouté les vagues. C'était très relaxant. Tout le monde a besoin de vacances."
  ],
  intermediate: [
    "J'ai récemment commencé un petit jardin potager sur mon balcon et c'est une expérience très enrichissante. Je cultive des tomates, du basilic et quelques piments. C'est satisfaisant de cuisiner soi-même.",
    "J'ai toujours été un grand fan de vieux films, surtout ces classiques en noir et blanc des années 1940. Il y a une élégance dans le dialogue et la mode que l'on ne voit plus autant aujourd'hui.",
    "Voyager au Japon l'année dernière a été un véritable moment fort pour moi. Le contraste entre les rues animées de Tokyo et les temples calmes de Kyoto était absolument fascinant.",
    "Je m'intéresse beaucoup à la photographie en tant que passe-temps, même si je suis encore débutant. J'aime faire des 'promenades photo' dans mon quartier le samedi matin quand la lumière est douce.",
    "Dernièrement, j'ai essayé de réduire ma consommation de plastique pour être un peu plus respectueux de l'environnement. C'était un défi au début de trouver des alternatives, mais ça fait du bien."
  ],
  advanced: [
    "J'ai découvert qu'à mesure que nos vies se numérisent, la valeur des passe-temps analogiques augmente. J'ai commencé la reliure de livres, un métier qui demande une précision méditative.",
    "Le concept de 'réensauvagement urbain' est quelque chose qui me passionne beaucoup ces derniers temps. C'est l'idée de permettre à la nature de reconquérir de petits coins de nos villes.",
    "J'ai beaucoup réfléchi à l'évolution du rôle des bibliothèques publiques au XXIe siècle. Elles sont passées de simples dépôts de livres physiques à des centres communautaires vitaux.",
    "Il existe un phénomène psychologique fascinant connu sous le nom d'effet de vue d'ensemble', qui décrit le changement cognitif ressenti par les astronautes lorsqu'ils voient la Terre depuis l'espace.",
    "J'ai récemment exploré l'intersection historique de la gastronomie et de la géopolitique. Il est remarquable de voir comment le commerce des épices a littéralement cartographié notre monde."
  ]
};
const FR_SPEECH = {
  beginner: [
    "Bienvenue à tous. Aujourd'hui, je veux parler de la gentillesse. C'est très simple. On peut sourire à quelqu'un ou aider un ami. Les petites choses peuvent changer une journée.",
    "Bonjour. Je crois que la lecture est très importante. Les livres peuvent nous emmener dans de nouveaux endroits et nous apprendre de nouvelles choses. J'essaie de lire dix minutes par jour.",
    "Bonjour les amis. Je veux parler de notre planète. Nous devons prendre soin des arbres et de l'eau. Nous pouvons utiliser moins de plastique et marcher plus. Ensemble, gardons la Terre propre.",
    "Salut tout le monde. Aujourd'hui, c'est le travail d'équipe. Quand nous travaillons ensemble, nous sommes plus forts. Je suis heureux de travailler avec vous tous. Faisons de notre mieux aujourd'hui.",
    "Bienvenue. Je veux dire merci à ma famille et à mes amis. Vous m'aidez toujours et me faites rire. J'ai de la chance de vous avoir dans ma vie. J'espère que chacun a quelqu'un à qui parler."
  ],
  intermediate: [
    "L'importance de l'apprentissage tout au long de la vie est capitale dans notre monde en mutation. On pense souvent que l'éducation s'arrête après l'école, mais notre cerveau continue de grandir.",
    "Nous sous-estimons souvent le pouvoir d'une seule personne à avoir un impact positif sur sa communauté. Il est facile de regarder les problèmes mondiaux et de se sentir dépassé, mais le changement commence.",
    "Maintenir un sain équilibre entre vie professionnelle et vie privée est essentiel pour le succès à long terme et le bien-être personnel. Dans notre société hyper-connectée, il est difficile de débrancher.",
    "Parler en public est souvent cité comme l'une des plus grandes peurs, mais c'est aussi l'une des compétences les plus précieuses. La capacité d'articuler vos idées clairement peut ouvrir des portes.",
    "L'innovation n'est pas seulement une question de technologie révolutionnaire ; c'est un état d'esprit qui cherche de meilleures façons de résoudre les problèmes quotidiens. Cela demande de l'audace."
  ],
  advanced: [
    "Alors que nous naviguons dans les complexités du XXIe siècle, le concept de citoyenneté mondiale est passé d'un idéal philosophique à un impératif pratique. Nos systèmes sont liés.",
    "L'avancement rapide de l'intelligence artificielle générative représente l'un des points d'inflexion technologique les plus significatifs de l'histoire humaine. Nous devons face aux implications éthiques.",
    "La diversité linguistique n'est pas seulement une question de patrimoine culturel ; c'est un réservoir de cadres cognitifs uniques et de connaissances écologiques essentiels à notre survie collective.",
    "La transition vers une économie circulaire n'est pas une initiative environnementale facultative ; c'est un changement structurel fondamental requis pour assurer la sécurité des ressources à long terme.",
    "Nous assistons actuellement à une crise mondiale de confiance dans nos institutions fondamentales, alimentée en grande partie par la fragmentation de nos écosystèmes d'information."
  ]
};

// --- CHINESE MANDARIN (ZH_CN) ---
const ZH_CN_INTERVIEW = {
  beginner: [
    "你好。我叫亚历克斯。我想在这里工作，因为我喜欢技术。我工作很努力，学得很快。在上一份工作中，我每天都帮助很多客户。很高兴今天能来到这里。",
    "我对这份工作很感兴趣，因为我想提高我的技能。我擅长团队合作，总是准时到达。我喜欢解决问题并帮助我的经理。谢谢你给我这个面试机会。",
    "我最大的优点是非常有耐心。当客户不满意时，我会倾听他们的意见并努力提供帮助。我认为这对于这个职位非常重要。我很期待了解更多关于贵公司的信息。",
    "我通常从九点工作到五点，但我很灵活。如果团队在周末需要帮助，我可以加班。我想成为办公室里的一名有用成员。我是一个积极的人，喜欢与他人合作。",
    "在空闲时间，我喜欢学习新事物。我最近完成了一个基础计算机课程。我想利用我学到的知识来帮助贵公司。我已经准备好尽快开始工作了。谢谢。"
  ],
  intermediate: [
    "我已经从事客户服务工作三年了。在我之前的职位中，我负责处理客户咨询和解决技术问题。我非常喜欢与人交流并为他们解决问题。",
    "我最大的成就之一是领导了一个改进办公室归档系统的小项目。以前有点混乱，所以我组织团队将记录数字化。这每周为我们节省了大约五个小时的工作时间。",
    "当我在工作中遇到困难时，我会努力保持冷静并逻辑地分析问题。例如，如果客户突然激增，我会优先处理最紧急的任务。我认为即使在压力下也要保持积极的态度。",
    "我特别被这个职位吸引，因为贵公司在科技领域的创新声誉。我一直关注你们最近的产品发布，你们对用户体验的承诺给我留下了深刻印象。",
    "在五年内，我希望担任高级职位，在那里我可以指导新员工。我相信持续学习是任何职业成功的关键。我目前正在参加项目管理的在线课程。"
  ],
  advanced: [
    "在担任项目负责人期间，我始终证明了自己在应对复杂组织挑战的同时，能够专注于核心业务目标。我擅长需要战略思维和综合多方数据进行决策的环境。",
    "我定义职业成功不仅在于KPI的达成，还在于我们为利益相关者和整个社区创造的可持续价值。在我之前的执行职位中，我带头开展了一项数字化转型计划。",
    "在处理部门内的高风险冲突时，我采用基于利益谈判的非对抗性方法。我记得我们的工程团队和营销团队之间关于产品路线图的一次重大分歧。",
    "我对贵公司在金融科技和道德银行交叉领域的独特地位特别感兴趣。我最近对去中心化金融的研究使我相信，该行业正处于一个关键的转折点。",
    "我的人力资本哲学是，当我们将个人激情与组织目标结合起来时，我们的效率最高。我拥有通过实施个性化发展轨道来降低员工流失率的成功记录。"
  ]
};
const ZH_CN_CASUAL = {
  beginner: [
    "嗨！今天天气非常好。我喜欢阳光和蓝天。通常，我午饭后会去公园散步。这让我感到快乐和健康。天气好的时候你喜欢做什么？",
    "我喜欢吃意大利菜。我最喜欢的菜是加了很多奶酪的披萨。有时，我会和朋友去我家附近的一家小餐馆。我们聊了很久，笑得很开心。这是我最喜欢的度过周末的方式。",
    "我有一只名叫露娜的小猫。她非常可爱，睡得很多。每天早上，她都会叫醒我吃东西。我喜欢下班后和她玩。你有宠物吗？动物让生活变得更有趣。",
    "我正在学习弹吉他。虽然有点难，但我喜欢音乐。我每晚练习二十分钟。有时我的手指会疼，但我正在进步。我想为我的家人弹一首歌。",
    "上周末我去了海滩。水有点凉，但沙子很暖和。我读了一本书，听了海浪声。非常放松。我觉得每个人有时都需要度假。"
  ],
  intermediate: [
    "我最近在阳台上开始了一个小菜园，这是一次非常有意义的经历。我目前种了西红柿、罗勒和一些辣椒。用自己种的食材做饭真的很有成就感。",
    "我一直是老电影的忠实粉丝，尤其是20世纪40年代的那些经典黑白电影。对话和时尚中有一种优雅，这在现代电影中并不多见。昨晚我重温了一部老悬疑片。",
    "去年去日本旅行对我来说是一个真正的亮点。东京繁忙的街道和京都安静的寺庙之间的对比绝对令人着迷。我花了很多时间到处走走，尝试不同的街头小吃。",
    "我非常喜欢摄影，虽然我还是个初学者。我喜欢在周六早上光线还很柔和的时候在我的社区进行“摄影散步”。我发现通过镜头看世界会让我更注意细节。",
    "最近，我一直在努力减少塑料的使用，以更加环保。起初寻找洗发水和食物储存的替代品有点挑战，但知道自己在做出微小的改变感觉很好。"
  ],
  advanced: [
    "我发现，随着我们的生活变得越来越数字化，触觉式的、模拟爱好的价值对我来说成倍增长。最近我开始学习手工装订书籍，这是一种需要极度精准和耐心的工艺。",
    "“城市再野化”的概念是我最近非常热衷的事情。这个想法是让自然重新夺回城市的小角落，即使在工业化程度最高的的环境中也能培育生物多样性。",
    "我一直在思考公共图书馆在21世纪不断演变的角色。它们已经从单纯的纸质书籍存储库转变为提供平等获取技术和信息的至关重要的社区中心。",
    "有一种迷人的心理现象被称为“概观效应”，它描述了宇航员从太空看到地球时所经历的认知转变。虽然我可能永远不会离开大气层，但我发现高海拔徒步旅行提供了一种陆地上的等效体验。",
    "我最近一直在探索美食与地缘政治的历史交汇点。香料贸易如何从字面上绘制了我们的世界地图，以及某些食材（如土豆或辣椒）在引入后如何彻底改变了整个文化，这真是令人叹为观止。"
  ]
};
const ZH_CN_SPEECH = {
  beginner: [
    "欢迎大家。今天我想谈谈善良。善良非常简单。我们可以向人微笑或帮助朋友。小事可以改变一整天。如果我们都善良，世界会变得更好。谢谢。",
    "早上好。我相信阅读非常重要。书可以带我们去新的地方，教我们新的东西。我试着每天读十分钟书。我希望你们也能找到一本自己喜欢的书。",
    "朋友们好。我想谈谈我们的星球。我们必须照顾树木和水。我们可以减少塑料的使用，多走路。让我们一起为我们的孩子保持地球清洁。谢谢。",
    "大家好。今天的主题是团队合作。当我们共同努力时，我们会更强大。我很高兴能与大家一起工作。让我们今天尽力而为，互相支持。谢谢你们是一个如此出色的团队。",
    "欢迎。我想对我的家人和朋友说声谢谢。你们总是帮助我，让我开怀大笑。我很幸运生命中有你们。我希望这里的每个人都有一个可以倾诉的特别的人。谢谢。"
  ],
  intermediate: [
    "在这个快速变化的世界里，终身学习的重要性不言而喻。很多人认为离开学校后教育就结束了，但事实是，我们的大脑在整个生命过程中都能不断成长。掌握一项新技能能让我们的思维保持敏锐。",
    "我们经常低估一个人对社区产生积极影响的力量。看着全球性问题很容易感到不知所措，但真正的改变通常始于地方层面。在当地收容所做志愿者是一个很好的开始。",
    "保持健康的工作与生活平衡对于长期成功和个人福祉至关重要。在我们这个过度连接的社会中，真正“断开连接”并休息变得越来越困难。我们经常因为加班而受到表扬，但这往往会导致职业倦怠。",
    "公众演讲经常被列为人们最大的恐惧之一，但它也是我们能拥有的最有价值的技能之一。清晰且有说服力地表达你的想法的能力可以在你的个人和职业生活中打开大门。",
    "创新不仅仅是突破性的技术；它是一种寻找解决日常问题的更好方法的思维方式。它需要愿意实验、失败并再次尝试。许多成功的发明都始于一个简单的“如果……会怎样？”"
  ],
  advanced: [
    "当我们应对21世纪的复杂性时，全球公民的概念已从哲学理想转变为实际需要。我们的环境、经济和数字系统如此深度交织，孤立主义已不再是可行的策略。",
    "生成式人工智能的快速进步代表了人类历史上最重要的技术转折点之一。虽然生产力提高的潜力巨大，但我们也必须面对关于认知劳动和诚信的深刻伦理影响。",
    "语言多样性不仅是文化遗产的问题；它还是对于我们集体生存至关重要的独特认知框架和生态知识的宝库。每一种灭绝的语言都代表着一种感知世界的特定方式的消失。",
    "向循环经济转型不是一个可选的环保倡议；它是确保长期资源安全和经济稳定所需的根本性结构转变。我们目前的线性提取模式与地球的物理极限根本不相容。",
    "我们目前正目睹一场全球性的对基本机构的信任危机，这在很大程度上是由我们信息生态系统的碎片化和数字极化的兴起驱动的。重建社会凝聚力需要不仅仅是更好的内容审核。"
  ]
};

// --- CANTONESE (ZH-HK) ---
const ZH_HK_INTERVIEW = {
  beginner: [
    "你好。我叫亞歷克斯。我想喺呢度工作，因為我好鍾意科技。我做嘢好勤力，學嘢亦都好快。喺上一份工作，我每日都幫咗好多客戶。好開心今日可以嚟到呢度。",
    "我對呢份工作好有興趣，因為我想提高我嘅技能。我擅長團隊合作，總係準時到。我鍾意解決問題同埋幫我嘅經理。多謝你畀呢個面試機會我。",
    "我最大嘅優點係非常有耐心。當客人唔滿意嘅時候，我會聽佢哋嘅意見並努力提供幫助。我認為呢樣嘢對呢個職位非常重要。我很期待了解更多關於貴公司嘅資訊。",
    "我通常由九點做到五點，但我好靈活。如果團隊喺週末需要幫手，我可以加班。我想成為辦公室裏面一個有用嘅成員。我係一個積極嘅人，鍾意同人合作。",
    "喺空餘時間，我鍾意學新嘢。我最近完成咗一個基礎電腦課程學。我想利用我學到嘅知識嚟幫貴公司。我已經準備好盡快開始工作喇。多謝。"
  ],
  intermediate: [
    "我已經做咗客戶服務三年喇。喺我之前嘅職位，我負責處理客戶嘅查詢同埋解決技術問題。我好鍾意同人溝通，幫佢哋解決難題。",
    "我最大嘅成就之一係領導咗一個改進辦公室歸檔系統嘅小項目。以前有啲混亂，所以我組織團隊將記錄數位化。呢樣嘢每週為我哋節省咗大約五個鐘嘅工作時間。",
    "當我喺工作中遇到困難嘅時候，我會努力保持冷靜並邏輯地分析問題。例如，如果客人突然激增，我會優先處理最緊急嘅任務。我認為即使喺壓力下都要保持積極嘅態度。",
    "我特別被呢個職位吸引，因為貴公司喺科技領域嘅創新聲譽。我一直關注你哋最近嘅產品發佈，你哋對用戶體驗嘅承諾畀我留低咗深刻印象。",
    "喺五年內，我希望擔任高級職位，喺嗰度我可以指導新員工。我相信持續學習係任何職業成功嘅關鍵。我目前正在參加項目管理嘅在線課程。"
  ],
  advanced: [
    "喺我擔任項目負責人期間，我一直證明到自己喺面對複雜組織挑戰嘅同時，亦能夠專注於核心業務目標。我擅長需要策略性思維同埋綜合多方面數據去作出決策嘅環境。",
    "我定義職業成功唔單止喺KPI嘅達成，仲喺我哋為利益相關者同埋整個社區創造嘅可持續價值。喺我之前嘅執行職位中，我帶頭開展咗一項數位化轉型計劃。",
    "喺處理部門內嘅高風險衝突時，我採用基於利益談判嘅非對抗性方法。我記得我哋嘅工程團隊同埋營銷團隊之間關於產品路線圖嘅一次重大分歧。",
    "我對貴公司喺金融科技同埋道德銀行交叉領域嘅獨特地位特別感興趣。我最近對去中心化金融嘅研究使我相信，呢個行業正處於一個關鍵嘅轉折點。",
    "我嘅人力資本哲學係相信每個人都有潛力，只要有合適嘅支持同埋機會。我致力於創造一個包容性嘅工作環境，等每個人都可以發揮所長。"
  ]
};

// --- RUSSIAN (RU) ---
const RU_INTERVIEW = {
  beginner: [
    "Здравствуйте. Меня зовут Алекс. Я хочу работать здесь, потому что мне нравятся технологии. Я очень трудолюбив и быстро учусь. На прошлой работе я каждый день помогал многим клиентам.",
    "Меня интересует эта работа, потому что я хочу развивать свои навыки. Я хорошо работаю в команде и всегда прихожу вовремя. Мне нравится решать проблемы и помогать руководителю. Спасибо за эту возможность.",
    "Моя самая сильная сторона — терпение. Когда клиент недоволен, я выслушиваю его и стараюсь помочь. Я считаю, что это важно для данной роли. С нетерпением жду возможности узнать больше о вашей компании.",
    "Обычно я работаю с девяти до пяти, но я гибкий. Если команде понадобится помощь в выходные, я могу выйти. Я хочу быть полезным сотрудником офиса. Я позитивный человек и люблю работать с другими.",
    "В свободное время я люблю учиться новому. Недавно я закончил базовый курс по компьютерам. Я хочу использовать полученные знания, чтобы помочь вашему бизнесу. Я готов приступить как можно скорее. Спасибо."
  ],
  intermediate: [
    "Я работаю в сфере обслуживания клиентов уже три года. На предыдущей должности я отвечал за обработку запросов клиентов и решение технических проблем. Мне нравится общаться с людьми.",
    "Одним из моих самых больших достижений было руководство небольшим проектом по улучшению системы архивации в нашем офисе. Раньше там был небольшой беспорядок, поэтому я скоординировал команду для оцифровки записей.",
    "Когда я сталкиваюсь с трудной ситуацией на работе, я стараюсь сохранять спокойствие и логически анализировать проблему. Например, если происходит внезапный наплыв клиентов, я расставляю приоритеты.",
    "Меня особенно привлекает эта вакансия из-за репутации вашей компании как инноватора в технологическом секторе. Я слежу за вашими последними выпусками продуктов и впечатлен вашим подходом.",
    "Через пять лет я надеюсь занять руководящую должность, где смогу наставлять новых сотрудников. Я верю, что непрерывное обучение — ключ к успеху в любой карьере. Сейчас я прохожу онлайн-курс по управлению проектами."
  ],
  advanced: [
    "На протяжении моего пребывания на посту руководителя проекта я последовательно демонстрировал способность решать сложные организационные задачи, сохраняя фокус на целях компании.",
    "Я определяю профессиональный успех не только достижением KPI, но и устойчивой ценностью, которую мы создаем для заинтересованных сторон и общества в целом. Я возглавил инициативу по цифровой трансформации.",
    "При управлении конфликтами с высокими ставками внутри отдела я использую неантагонистический подход, основанный на переговорах по интересам. Я помню значительное разногласие между нашими командами.",
    "Меня особенно интригует уникальное положение вашей компании на пересечении финтеха и этичного банкинга. Мои недавние исследования в области децентрализованных финансов убедили меня в критической точке отрасли.",
    "Моя философия человеческого капитала заключается в том, что мы наиболее эффективны, когда согласовываем индивидуальные увлечения с целями организации. У меня есть опыт снижения текучести кадров."
  ]
};
const RU_CASUAL = {
  beginner: [
    "Привет! Сегодня очень хороший день. Мне нравится солнце и голубое небо. Обычно я хожу на прогулку в парк после обеда. Это заставляет меня чувствовать себя счастливым и здоровым. Что вы любите делать в хорошую погоду?",
    "Я очень люблю итальянскую еду. Мое любимое блюдо — пицца с большим количеством сыра. Иногда я хожу в маленький ресторанчик рядом с домом со своими друзьями. Мы долго разговариваем и смеемся.",
    "У меня есть маленькая кошка по имени Луна. Она очень милая и много спит. Каждое утро она будит меня, чтобы поесть. Я люблю играть с ней после работы. У вас есть домашние животные?",
    "Я учусь играть на гитаре. Это немного сложно, но я люблю музыку. Я тренируюсь по двадцать минут каждый вечер. Мои пальцы иногда болят, но я становлюсь лучше.",
    "В прошлые выходные я был на пляже. Вода была немного холодной, но песок был теплым. Я читал книгу и слушал шум волн. Это было очень расслабляюще. Я думаю, каждому иногда нужен отпуск."
  ],
  intermediate: [
    "Я недавно завел небольшой огород на балконе, и это был очень полезный опыт. Сейчас я выращиваю помидоры, базилик и немного острого перца. Очень приятно готовить из своих продуктов.",
    "Я всегда был большим поклонником старых фильмов, особенно классики в черно-белом цвете 1940-х годов. В диалогах и моде есть элегантность, которую не так часто встретишь в современном кино.",
    "Поездка в Японию в прошлом году стала для меня настоящим событием. Контраст между оживленными улицами Токио и тихими храмами Киото был абсолютно завораживающим. Я много гулял и пробовал уличную еду.",
    "Мне очень нравится фотография как хобби, хотя я все еще новичок. Люблю ходить на «фотопрогулки» по своему району субботним утром, когда свет еще мягкий. Объектив камеры заставляет замечать детали.",
    "В последнее время я стараюсь сократить использование пластика, чтобы быть более экологичным. Сначала было сложно найти альтернативы для хранения продуктов, но осознание перемен приносит радость."
  ],
  advanced: [
    "Я обнаружил, что по мере того, как наша жизнь становится все более цифровой, ценность аналоговых хобби для меня выросла. Недавно я занялся ручным переплетом книг.",
    "Концепция «городского ревайлдинга» — это то, чем я в последнее время очень увлечен. Это идея позволить природе вернуть себе маленькие уголки наших городов, способствуя биоразнообразию.",
    "Я много размышлял об эволюции роли публичных библиотек в двадцать первом веке. Они превратились из простых хранилищ физических книг в жизненно важные общественные центры, обеспечивающие доступ к знаниям.",
    "Существует захватывающий психологический феномен, известный как «эффект обзора», описывающий когнитивный сдвиг, испытываемый астронавтами, когда они видят Землю из космоса. Горные походы дают похожий опыт.",
    "Недавно я изучал историческое пересечение гастрономии и геополитики. Примечательно, как торговля специями буквально нанесла на карту наш мир и как определенные ингредиенты изменили целые культуры."
  ]
};
const RU_SPEECH = {
  beginner: [
    "Добро пожаловать всем. Сегодня я хочу поговорить о доброте. Доброта — это очень просто. Мы можем улыбнуться человеку или помочь другу. Мелочи могут изменить весь день. Если мы все будем добрыми, мир станет лучше. Спасибо.",
    "Доброе утро. Я верю, что чтение очень важно. Книги могут перенести нас в новые места и научить новому. Я стараюсь читать по десять минут каждый день. Надеюсь, вы тоже найдете книгу, которую полюбите. Спасибо.",
    "Привет, друзья. Я хочу поговорить о нашей планете. Мы должны заботиться о деревьях и воде. Мы можем использовать меньше пластика и больше ходить пешком. Давайте вместе сохраним Землю чистой для наших детей. Спасибо.",
    "Всем привет. Сегодня речь пойдет о командной работе. Когда мы работаем вместе, мы становимся сильнее. Я рад работать со всеми вами. Давайте сегодня сделаем все возможное и поддержим друг друга. Спасибо.",
    "Добро пожаловать. Я хочу сказать спасибо моей семье и друзьям. Вы всегда помогаете мне и заставляете меня смеяться. Я счастлив, что вы есть в моей жизни. Надеюсь, у каждого здесь есть кто-то особенный. Спасибо."
  ],
  intermediate: [
    "Важность обучения на протяжении всей жизни невозможно переоценить в нашем быстро меняющемся мире. Многие думают, что образование заканчивается со школой, но наш мозг способен расти всегда.",
    "Мы часто недооцениваем силу одного человека в оказании положительного влияния на свое сообщество. Легко смотреть на глобальные проблемы и чувствовать себя подавленным, но реальные изменения начинаются на местах.",
    "Поддержание здорового баланса между работой и личной жизнью необходимо для долгосрочного успеха и личного благополучия. В нашем гиперподключенном обществе становится все труднее «отключиться».",
    "Публичные выступления часто называют одним из самых больших страхов людей, но это также один из самых ценных навыков. Способность четко излагать свои мысли может открыть многие двери.",
    "Инновации — это не только прорывные технологии; это образ мышления, который ищет лучшие способы решения повседневных проблем. Это требует готовности экспериментировать, терпеть неудачи и пробовать снова."
  ],
  advanced: [
    "Сталкиваясь со сложностями двадцать первого века, концепция глобального гражданства превратилась из философского идеала в практическую необходимость. Наши системы глубоко переплетены.",
    "Стремительный прогресс генеративного искусственного интеллекта представляет собой один из самых значимых технологических поворотных моментов в истории человечества. Мы должны столкнуться с этическими последствиями.",
    "Лингвистическое разнообразие — это не только вопрос культурного наследия; это хранилище уникальных когнитивных рамок и экологических знаний, необходимых для нашего коллективного выживания.",
    "Переход к экономике замкнутого цикла — это не факультативная экологическая инициатива; это фундаментальный структурный сдвиг, необходимый для обеспечения долгосрочной ресурсной безопасности.",
    "В настоящее время мы являемся свидетелями глобального кризиса доверия к нашим фундаментальным институтам, вызванного фрагментацией наших информационных экосистем и ростом цифровой поляризации."
  ]
};

const ZH_HK_CASUAL = {
  beginner: [
    "我好鍾意喺週末去行山。香港有好多好靚嘅行山徑，例如龍脊。行山唔單止可以鍛煉身體，仲可以欣賞到好靚嘅風景。之後我通常會同朋友一齊去食一餐好豐富嘅點心。",
    "煮食係我嘅興趣。我最鍾意整嘅係傳統嘅廣東菜，好似蒸魚或者炒菜咁。我覺得親手為屋企人準備晚餐係一件好幸福嘅事。我仲好鍾意去街市買新鮮嘅食材，嗰度好熱鬧。",
    "我每日都會搭地鐵返工。雖然有時會好迫，但係地鐵真係好方便同埋準時。喺車上面，我鍾意聽音樂或者睇書。我覺得呢段時間係我每日唯一可以靜落嚟嘅時間。",
    "我好鍾意去旅行。舊年我去咗日本，嗰度嘅嘢食同埋文化都好吸引我。我特別鍾意食拉麵同埋壽司。我希望出年可以去歐洲，睇下嗰度嘅歷史建築同埋試下唔同嘅街頭小食。",
    "我平時鍾意去圖書館借書睇。嗰度好安靜，可以令我集中精神。我最近睇緊一本關於心理學嘅書，覺得好有趣。閱讀可以幫我放鬆心情，亦都可以學到好多新知識。"
  ],
  intermediate: [
    "我非常鍾意攝影，雖然我仲係一個初學者。我鍾意喺週六朝早光線仲係好柔和嘅時候喺我嘅社區進行“攝影散步”。我發現通過鏡頭睇世界會令我更注意細節，例如舊建築嘅紋理或者街頭嘅小故事。",
    "最近，我一直喺努力減少塑料嘅使用，以更加環保。起初尋找洗頭水同埋食物儲存嘅替代品有啲挑戰，但知道自己喺做出微小嘅改變感覺好好。我依家會帶自己嘅餐具同埋購物袋，希望可以為地球出一分力。",
    "我最近開始學習冥想，因為我覺得都市生活節奏太快，壓力好大。每日用十五分鐘靜坐，觀察自己嘅呼吸，可以幫我清空思緒。雖然一開始好難集中，但慢慢練習之後，我發現自己嘅情緒變得穩定咗好多。",
    "我好鍾意同朋友一齊去探索香港嘅隱世小店。有啲咖啡店匿喺舊工業大廈入面，裝修好有特色。我哋會喺嗰度坐一個下晝，傾下偈，分享下生活入面嘅趣事。呢種慢生活嘅節奏令我覺得好充實。",
    "我對本地文化好有興趣，所以有時會去參觀一啲歷史建築或者博物館。了解香港嘅過去令我對呢個城市有更深嘅歸屬感。我覺得保護呢啲文化遺產係非常重要嘅，因為佢哋代表咗我哋嘅根。"
  ],
  advanced: [
    "我發現，隨住我哋嘅生活變得越來越數字化，觸覺式嘅模擬嗜好對我嚟講變得更加重要。最近我開始咗手工裝訂書本，呢種工藝需要極高嘅精確度同埋耐性。將紙張、線同埋皮革轉化為一個可以承載思想嘅實體，令我感到好滿足。",
    "“城市再野化”嘅概念係我最近非常熱衷嘅嘢。呢個諗法係讓自然重新奪回城市嘅小角落，即使喺工業化程度最高嘅環境中都能培育生物多樣性。我正同本地社區團體合作，嘗試將一啲廢棄嘅空地轉化為小花園。",
    "我一直喺思考公共圖書館喺21世紀不斷演變嘅角色。佢哋已經從單純嘅紙質書籍存儲庫轉變為提供平等獲取技術同埋資訊嘅至關重要嘅社區中心。我參加咗一啲關於數字素養嘅講座，對嗰度多元化嘅受眾印象深刻。",
    "有一種迷人嘅心理現象被稱為“概觀效應”，佢描述咗宇航員從太空睇到地球時所經歷嘅認知轉變。雖然我可能永遠唔會離開大氣層，但我發現高海拔徒步旅行提供咗一種陸地上嘅等效體驗，令我重新思考人與自然嘅關係。",
    "我最近一直喺探索美食與地緣政治嘅歷史交匯點。香料貿易點樣從字面上繪製咗我哋嘅世界地圖，以及某些食材（如薯仔或辣椒）喺引入後點樣徹底改變咗整個文化，呢樣嘢真係令人嘆為觀止。烹飪其實係一種跨文明嘅對話。"
  ]
};
const ZH_HK_SPEECH = {
  beginner: [
    "歡迎大家。今日我想講下善良。善良其實好簡單，我哋可以對人微笑或者幫下朋友。小小嘅事可以改變成日。如果我哋每個人都善良啲，世界會變得更好。多謝。",
    "早晨。我相信閱讀非常重要。書可以帶我哋去新嘅地方，教我哋新嘅嘢。我試下每日讀十分鐘書。我希望你哋都能夠搵到一本自己鍾意嘅書。多謝。",
    "朋友們好。我想談談我哋嘅星球。我哋必須照顧樹木同埋水。我哋可以減少塑料嘅使用，多行路。等我哋一齊為我哋嘅細路保持地球清潔。多謝。",
    "大家好。今日嘅主題係團隊合作。當我哋共同努力嘅時候，我哋會更強大。我好高興能與大家一齊工作。等我哋今日盡力而為，互相支持。多謝你哋係一個咁出色嘅團隊。",
    "歡迎。我想對我嘅家人同埋朋友講聲多謝。你哋總係幫助我，令我開懷大笑。我好幸運生命中有你哋。我希望呢度嘅每個人都有一個可以傾訴嘅特別嘅人。多謝。"
  ],
  intermediate: [
    "喺呢個快速轉變嘅世界入面，終身學習嘅重要性係不言而喻。好多人以為離開咗學校教育就完結，但事實上，我哋嘅大腦喺成個生命過程入面都可以不斷成長。掌握一項新技能能令我哋嘅思維保持敏銳。",
    "我哋經常低估一個人對社區產生積極影響嘅力量。睇住全球性問題好容易感到不知所措，但真正嘅改變通常始於地方層面。喺當地收容所做義工係一個好好嘅開始。",
    "保持健康嘅工作與生活平衡對於長期成功同埋個人福祉至關重要。喺我哋呢個過度連接嘅社會中，真正“斷開連接”並休息變得越來越困難。我哋經常因為加班而受到表揚，但呢樣嘢往往會導致職業倦怠。",
    "公眾演講經常被列為人哋最大嘅恐懼之一，但佢亦都係我哋能擁有嘅最有價值嘅技能之一。清晰且有說服力地表達你嘅諗法嘅能力可以喺你嘅個人同埋職業生活中打開大門。",
    "創新唔單止係突破性嘅技術；佢係一種尋找解決日常問題嘅更好方法嘅思維方式。佢需要願意實驗、失敗並再次嘗試。好多成功嘅發明都始於一個簡單嘅“如果……會點樣？”"
  ],
  advanced: [
    "當我哋面對二十一世紀嘅複雜挑戰，全球公民呢個概念已經由哲學理想變成實際需要。我哋嘅環境、經濟同埋數字系統深度交織，孤立主義已經唔再係可行嘅策略。",
    "生成式人工智能嘅快速進步代表咗人類歷史上最重要嘅技術轉折點之一。雖然生產力提高嘅潛力巨大，但係我哋亦都必須面對關於認知勞動同埋誠信嘅深刻倫理影響。",
    "語言多樣性唔單止係文化遺產嘅問題；佢仲係對於我哋集體生存至關重要嘅獨特認知框架同埋生態知識嘅寶庫。每一種滅絕嘅語言都代表住一種感知世界嘅特定方式嘅消失。",
    "向循環經濟轉型唔係一個可選嘅環保倡議；佢係確保長期資源安全同埋經濟穩定所需嘅根本性結構轉變。我哋目前嘅線性提取模式與地球嘅物理極限根本不相容。",
    "我哋目前正目睹一場全球性嘅對基本機構嘅信任危機，呢樣嘢喺很大程度上係由我哋資訊生態系統嘅碎片化同埋數位極化嘅興起驅動嘅。重建社會凝聚力需要唔單止係更好嘅內容審核。"
  ]
};

// --- KOREAN (KO) ---
const KO_INTERVIEW = {
  beginner: [
    "안녕하세요. 제 이름은 알렉스입니다. 저는 기술을 좋아해서 이곳에서 일하고 싶습니다. 저는 매우 성실하고 습득력이 빠릅니다. 이전 직장에서도 매일 많은 고객들을 도왔습니다. 오늘 이 자리에 있게 되어 기쁩니다.",
    "제 기술을 발전시키고 싶어서 이 직무에 관심이 있습니다. 사람들과 소통하는 것을 잘하며 항상 시간을 엄수합니다. 문제를 해결하고 관리자를 돕는 것을 좋아합니다. 면접 기회를 주셔서 감사합니다.",
    "저의 가장 큰 장점은 매우 인내심이 강하다는 것입니다. 고객이 불만족할 때 그들의 이야기를 듣고 도움을 주려고 노력합니다. 이 역할에 있어 그것이 중요하다고 생각합니다. 회사에 대해 더 알고 싶습니다.",
    "보통 9시부터 5시까지 일하지만 유연하게 대처할 수 있습니다. 팀에 주말 도움이 필요하다면 출근할 수 있습니다. 사무실의 유용한 구성원이 되고 싶습니다. 저는 긍정적인 사람입니다.",
    "여가 시간에는 새로운 것을 배우는 것을 좋아합니다. 최근에 기초 컴퓨터 과정을 마쳤습니다. 배운 지식을 귀사에 도움이 되도록 사용하고 싶습니다. 가능한 한 빨리 시작하고 싶습니다. 감사합니다."
  ],
  intermediate: [
    "저는 고객 서비스 분야에서 3년 동안 일해 왔습니다. 이전 직책에서는 고객 문의 처리와 기술적 문제 해결을 담당했습니다. 사람들과 소통하고 해결책을 찾는 것을 즐깁니다.",
    "가장 큰 성과 중 하나는 사무실 파일링 시스템을 개선하기 위한 소규모 프로젝트를 주도한 것입니다. 이전에는 다소 무질서했지만, 팀을 조율하여 기록을 디지털화했습니다. 이를 통해 매주 약 5시간을 절약했습니다.",
    "업무 중 어려운 상황에 처했을 때 침착함을 유지하고 논리적으로 문제를 분석하려고 노력합니다. 예를 들어, 갑자기 고객이 몰릴 경우 가장 긴급한 작업의 우선순위를 정합니다. 압박감 속에서도 긍정적인 태도가 필수입니다.",
    "귀사의 혁신적인 평판에 특히 끌렸습니다. 최근의 제품 출시를 지켜봐 왔으며 사용자 경험에 대한 귀사의 노력이 인상적이었습니다. 유사한 도구를 사용해 본 경험이 있어 즉시 기여할 수 있다고 확신합니다.",
    "5년 후에는 신입 사원들을 지도할 수 있는 시니어 역할을 맡고 싶습니다. 지속적인 학습이 어떤 경력에서든 성공의 열쇠라고 믿습니다. 현재 프로젝트 관리에 관한 온라인 강의를 수강하고 있습니다."
  ],
  advanced: [
    "프로젝트 리더로서 재직하는 동안, 저는 핵심 비즈니스 목표를 유지하면서 복잡한 조직적 과제를 해결하는 능력을 지속적으로 입증해 왔습니다. 전략적 사고가 필요한 환경에 능숙합니다.",
    "저는 전문적인 성공을 단순히 KPI 달성뿐만 아니라 이해관계자와 지역사회 전체를 위해 창출하는 지속 가능한 가치로 정의합니다. 이전 임원 역할에서는 서버 통합을 통해 탄소 배출량을 30% 줄이는 디지털 전환을 주도했습니다.",
    "부서 내 이해관계가 얽힌 갈등을 관리할 때, 저는 이해관계 기반 협상에 뿌리를 둔 비적대적 접근 방식을 활용합니다. 엔지니어링 팀과 마케팅 팀 간의 제품 로드맵에 대한 큰 의견 차이를 워크숍을 통해 해결했습니다.",
    "핀테크와 윤리적 뱅킹의 교차점에 있는 귀사의 독특한 위치에 특히 흥미를 느낍니다. 탈중앙화 금융에 대한 최근 연구를 통해 업계가 중요한 전환점에 있다고 확신합니다. 저는 블록체인 아키텍처와 규제 통찰력을 갖추고 있습니다.",
    "인적 자본에 대한 저의 철학은 개인의 열정과 조직의 목적을 일치시켰을 때 가장 효과적이라는 것입니다. 개인화된 개발 트랙을 도입하여 이직률을 낮춘 실적이 있습니다. 하이브리드 자율성과 비동기적 협업에 관심이 많습니다."
  ]
};
const KO_CASUAL = {
  beginner: [
    "안녕하세요! 오늘 날씨가 정말 좋네요. 저는 햇빛과 파란 하늘을 좋아합니다. 보통 점심 식사 후에 공원을 산책하곤 합니다. 기분이 좋아지고 건강해지는 느낌이에요. 당신은 날씨가 좋을 때 무엇을 하나요?",
    "이탈리아 음식을 먹는 것을 정말 좋아합니다. 제가 가장 좋아하는 음식은 치즈가 듬뿍 들어간 피자입니다. 가끔 집 근처 작은 식당에 친구들과 갑니다. 오랫동안 이야기하고 웃으며 주말을 보냅니다.",
    "루나라는 이름의 작은 고양이를 키우고 있습니다. 정말 귀엽고 잠을 많이 자요. 매일 아침 그녀는 밥을 달라고 저를 깨웁니다. 퇴근 후에 그녀와 노는 것을 좋아합니다. 반려동물을 키우시나요?",
    "기타를 배우고 있습니다. 조금 어렵지만 음악을 좋아합니다. 매일 밤 20분 동안 연습합니다. 가끔 손가락이 아프기도 하지만 실력이 늘고 있어요. 크리스마스에 가족을 위해 연주하고 싶습니다.",
    "지난 주말에 바다에 갔습니다. 물은 조금 차가웠지만 모래는 따뜻했습니다. 책을 읽고 파도 소리를 들었습니다. 정말 편안했어요. 누구에게나 가끔은 휴식이 필요하다고 생각합니다."
  ],
  intermediate: [
    "최근에 발코니에서 작은 채소 정원을 시작했는데 정말 보람찬 경험이었어요. 지금은 토마토와 바질, 고추 몇 개를 키우고 있습니다. 직접 키운 재료로 요리하는 건 정말 뿌듯합니다.",
    "저는 항상 고전 영화, 특히 1940년대의 흑백 영화를 좋아했습니다. 대사와 패션에 현대 영화에서는 보기 힘든 우아함이 있어요. 어젯밤에 오래된 미스터리 영화를 다시 봤는데 새로운 디테일을 발견했습니다.",
    "작년 일본 여행은 저에게 정말 큰 하이라이트였습니다. 도쿄의 번화한 거리와 교토의 조용한 사원의 대조가 정말 매력적이었습니다. 많이 걸어 다니며 다양한 길거리 음식을 시도해 보았습니다.",
    "취미로 사진을 찍고 있는데 아직 초보자입니다. 토요일 아침 빛이 부드러울 때 동네를 '출사' 나가는 것을 좋아합니다. 카메라 렌즈를 통해 보면 평소 무시했던 작은 디테일들에 주의를 기울이게 됩니다.",
    "최근에 환경을 생각해서 플라스틱 사용을 줄이려고 노력하고 있습니다. 처음에는 대체품을 찾는 것이 조금 힘들었지만, 작은 변화를 만들고 있다는 생각에 기분이 좋습니다. 로컬 마켓도 자주 이용합니다."
  ],
  advanced: [
    "우리의 삶이 점점 디지털화됨에 따라 아날로그적인 취미의 가치가 저에게는 기하급수적으로 커졌습니다. 최근에는 명상적인 정밀함이 필요한 수제 제본을 시작했습니다.",
    "'어반 리와일딩(도시 재자연화)'이라는 개념에 최근 관심이 많습니다. 자연이 도시의 작은 구석을 되찾도록 허용하여 산업적인 환경에서도 생물 다양성을 키우는 아이디어입니다. 지역 커뮤니티 그룹과 함께 활동하고 있습니다.",
    "21세기 공공 도서관의 역할 변화에 대해 자주 생각합니다. 도서관은 단순한 책 보관소에서 기술과 정보에 대한 공평한 접근을 제공하는 필수적인 커뮤니티 허브로 변모했습니다. 디지털 리터러시 강의에 참여하며 깊은 인상을 받았습니다.",
    "'조망 효과(Overview Effect)'라는 흥미로운 심리 현상이 있습니다. 우주에서 지구를 보았을 때 우주비행사들이 경험하는 인지적 변화입니다. 제가 대기권을 나갈 일은 없겠지만, 고산 트레킹이 비슷한 경험을 제공한다고 느낍니다.",
    "최근에 미식과 지정학의 역사적 교차점에 대해 탐구하고 있습니다. 향료 무역이 어떻게 세계 지도를 그렸고, 감자나 고추 같은 식재료가 도입되어 문화 전체를 어떻게 바꾸었는지 놀랍습니다. 요리는 문명 간의 대화입니다."
  ]
};
const KO_SPEECH = {
  beginner: [
    "여러분 환영합니다. 오늘은 친절에 대해 이야기하고 싶습니다. 친절은 매우 간단합니다. 누군가에게 미소를 짓거나 친구를 돕는 일이죠. 작은 배려가 하루 전체를 바꿀 수 있습니다. 모두가 친절하다면 세상은 더 좋아질 것입니다. 감사합니다.",
    "좋은 아침입니다. 저는 독서가 매우 중요하다고 믿습니다. 책은 우리를 새로운 장소로 데려다주고 새로운 것을 가르쳐줍니다. 저는 매일 10분 동안 책을 읽으려고 노력합니다. 여러분도 좋아하는 책을 찾으시길 바랍니다. 감사합니다.",
    "친구들 안녕하세요. 우리 지구에 대해 이야기하고 싶습니다. 우리는 나무와 물을 아껴야 합니다. 플라스틱을 줄이고 더 많이 걸을 수 있습니다. 함께 우리 아이들을 위해 지구를 깨끗하게 유지합시다. 감사합니다.",
    "여러분 안녕하세요. 오늘의 주제는 팀워크입니다. 함께 일할 때 우리는 더 강해집니다. 여러분과 함께 일하게 되어 기쁩니다. 오늘 최선을 다하고 서로를 지원합시다. 멋진 팀이 되어주셔서 감사합니다. 좋은 하루 되세요.",
    "환영합니다. 가족과 친구들에게 고맙다는 말을 하고 싶습니다. 여러분은 항상 저를 도와주고 웃게 해줍니다. 여러분이 제 인생에 있어 행복합니다. 여기 계신 모든 분께 이야기할 수 있는 특별한 사람이 있기를 바랍니다. 감사합니다."
  ],
  intermediate: [
    "급변하는 세상에서 평생 학습의 중요성은 아무리 강조해도 지나치지 않습니다. 많은 이들이 학교를 졸업하면 교육이 끝난다고 생각하지만, 우리 뇌는 평생 성장할 수 있습니다. 새로운 기술 습득은 마음을 젊게 유지해 줍니다.",
    "한 사람이 지역 사회에 긍정적인 영향을 미칠 수 있는 힘을 우리는 종종 과소평가합니다. 글로벌 문제를 보며 압도당하기 쉽지만, 진정한 변화는 대개 지역 수준에서 시작됩니다. 지역 쉼터에서의 봉사는 변화를 만드는 좋은 방법입니다.",
    "일과 삶의 건강한 균형을 유지하는 것은 장기적인 성공과 개인의 행복에 필수적입니다. 초연결 사회에서 '전원을 끄고' 진정으로 쉬는 것은 점점 더 어려워지고 있습니다. 늦게까지 일하는 것이 미덕처럼 여겨지지만 이는 번아웃을 초래합니다.",
    "대중 연설은 종종 사람들의 가장 큰 두려움 중 하나로 꼽히지만, 그것은 우리가 가질 수 있는 가장 가치 있는 기술 중 하나이기도 합니다. 자신의 생각을 명확하고 설득력 있게 전달하는 능력은 개인과 직업 생활에서 문을 열어줍니다.",
    "혁신이란 획기적인 기술만을 의미하지 않습니다. 일상의 문제를 해결하기 위한 더 나은 방법을 찾는 마인드셋입니다. 실험하고 실패하며 다시 시도하려는 의지가 필요합니다. 많은 성공적인 발명은 단순한 질문에서 시작되었습니다."
  ],
  advanced: [
    "21세기의 복잡함을 헤쳐나가는 과정에서 세계 시민주의라는 개념은 철학적 이상에서 실천적 필수 과제로 변화했습니다. 우리의 환경과 경제는 깊이 얽혀 있으며 고립주의는 더 이상 실행 가능한 전략이 아닙니다.",
    "생성형 AI의 급격한 발전은 인류 역사상 가장 중요한 기술적 전환점 중 하나입니다. 생산성 향상의 잠재력은 막대하지만, 인지 노동과 정보의 진실성에 관한 깊은 윤리적 영향에도 직면해야 합니다. 인간의 직관을 지켜야 합니다.",
    "언어 다양성은 단순한 문화유산의 문제가 아닙니다. 그것은 우리 집단적 생존에 필수적인 고유한 인지적 틀과 생태학적 지식의 보물창고입니다. 사라지는 언어는 세상을 인식하는 특정한 방식의 상실을 의미합니다. 다국어주의를 지원해야 합니다.",
    "순환 경제로의 전환은 단순한 환경 이니셔티브가 아니라 장기적인 자원 보안과 경제적 안정을 확보하기 위해 필요한 근본적인 구조적 변화입니다. 지구의 물리적 한계와 선형 모델은 근본적으로 양립할 수 없습니다.",
    "우리는 현재 정보의 파편화와 디지털 분열로 인해 기본 제도에 대한 세계적인 신뢰 위기에 직면해 있습니다. 사회적 결속을 재구축하려면 투명성, 책임감, 그리고 공유된 사실 기반의 회복에 대한 새로운 약속이 필요합니다."
  ]
};

// --- RUSSIAN (RU) ---
// --- ITALIAN CONTENT ---
const IT_INTERVIEW = {
  beginner: [
    "Buongiorno. Mi chiamo Alex. Voglio lavorare qui perché mi piace la tecnologia. Sono un grande lavoratore e imparo in fretta. Nel mio ultimo lavoro ho aiutato molti clienti ogni giorno. Sono felice di essere qui oggi e spero di unirmi presto al vostro team.",
    "Sono interessato a questo lavoro perché voglio far crescere le mie competenze. Sono bravo a lavorare con le persone e arrivo sempre in orario. Mi piace risolvere piccoli problemi e aiutare il mio responsabile. Grazie per questa opportunità.",
    "Il mio più grande pregio è la pazienza. Quando un cliente è insoddisatto, lo ascolto e cerco di aiutorlo. Penso che questo sia importante for questo ruolo. Non vedo l'ora di saperne di più sulla vostra azienda oggi. Grazie.",
    "Di solito lavoro dalle nove alle cinque, ma sono flessibile. Se il team ha bisogno di aiuto nei fine settimana, posso venire. Voglio essere un membro utile dell'ufficio. Sono una persona positiva e mi piace lavorare con gli altri.",
    "Nel mio tempo libero mi piace imparare cose nuove. Recentemente ho completato un corso base di informatica. Voglio usare quello che ho imparato per aiutare la vostra azienda. Sono pronto a iniziare il prima possibile. Grazie."
  ],
  intermediate: [
    "Lavoro nel servizio clienti da tre anni. Nel mio ruolo precedente, ero responsabile della gestione delle richieste dei clienti e della risoluzione di problemi tecnici. Mi piace molto interagire con le persone e trovare soluzioni ai loro problemi. Credo che le mie capacità comunicative mi rendano un forte candidato.",
    "Uno dei miei più grandi successi è stato guidare un piccolo progeto for migliorare il sistema di archiviazione dell'ufficio. Prima era disorganizzato, così ho coordinato il team for digitalizzare i nostri documenti. Questo ci ha fatto risparmiare circa cinque ore di lavoro ogni settimana.",
    "Quando affronto una situazione difficile al lavoro, cerco di mantenere la calma e analizzare il problema in modo logico. Ad esempio, se abbiamo un improvviso aumento di clienti, do la priorità ai compiti più urgenti. Penso che sia essenziale mantenere un ateggiaggio positivo anche sotto pressione.",
    "Sono particolarmente attratto da questo ruolo per la reputazione di innovazione della vostra azienda nel settore tecnologico. Ho seguito i vostri recenti lanci di prodotti e sono rimasto colpito dal vostro impegno per l'esperienza utente. Ho esperienza con strumenti simili.",
    "Tra cinque anni, spero di ricoprire un ruolo senior in cui poter fare da mentore ai nuovi dipendenti. Credo che l'apprendimento continuo sia la chiave del successo in ogni carriera. Attualmente sto seguendo un corso online di gestione dei progetti."
  ],
  advanced: [
    "Durante il mio mandato come capoprogetto, ho costantemente dimostrato la capacità di navigare in sfide organizzative complesse mantenendo l'attenzione sugli obiettivi aziendali principali. Eccello in ambienti che richiedono pensiero strategico e capacità di sintetizzare dati da molteplici fonti.",
    "Definisco il successo professionale non solo dal raggiungimento dei KPI, ma dal valore sostenibile che creiamo for gli stakeholder e la comunità in generale. Nel mio precedente ruolo esecutivo, ho guidato un'iniziativa di trasformazione digitale che ha aumentato la trasparenza operativa.",
    "Nel gestire conflitti ad alta posta in gioco all'interno di un dipartimento, utilizzo un approccio non conflittuale basato sulla negoziazione degli interessi. Ricordo un disaccordo tra i team di ingegneria e marketing riguardante la roadmap del prodotro. Facilitando workshop mirati, ho aiutato le parti a identificare obiettivi comuni.",
    "Sono particolarmente incuriosito dalla posizione unica che la vostra azienda occupa all'intersezione tra fintech e banca etica. Le mie recenti ricerche sulla finanza decentralizzata mi hanno portato a credere che il settore sia a un punto di svolta.",
    "La mia filosofia sul capitale umano è che siamo più efficaci quando allineiamo le passioni individuali con lo scopo organizzativo. Ho una comprovata esperienza nel ridurre il turnover implementando percorsi di sviluppo personalizzati."
  ]
};

const IT_CASUAL = {
  beginner: [
    "Ciao! Oggi è una bellissima giornata. Mi piace il sole e il cielo azzurro. Di solito vado a fare una passeggiata al parco dopo pranzo. Mi fa sentire felice e in salute. Cosa ti piace fare quando il tempo è bello?",
    "Amo mangiare cibo italiano. Il mio piatro preferito è la pizza con molto formaggio. A volte vado in un piccolo ristorante vicino a casa mia con i miei amici. Parliamo e ridiamo for molto tempo. È il mio modo preferito di passare il weekend.",
    "Ho un gatto piccolo di nome Luna. È molto carina e dorme molto. Ogni mattina mi sveglia for mangiare. Mi piace giocare con lei dopo il lavoro. Hai animali domestici? Gli animali rendono la vita molto più divertente.",
    "Sto imparando a suonare la chitarra. È un po' difficile, ma mi piace la musica. Mi esercito per venti minuti ogni sera. Le mie dita fanno male a volte, ma sto migliorando. Voglio suonare una canzone per la mia famiglia.",
    "Lo scorso fine settimana sono andato in spiaggia. L'acqua era un po' fredda, ma la sabbia era calda. Ho letto un libro e ascoltato le onde. È stato molto rilassante. Penso che tutti abbiano bisogno di una vacanza a volte."
  ],
  intermediate: [
    "Recentemente ho iniziato un piccolo orto sul mio balcone ed è stata un'esperienza molto gratificante. Al momento sto coltivando pomodori, basilico e alcuni peperoncini. C'è qualcosa di veramente soddisfacente nel cucinare un pasto con ingredienti coltivati da te.",
    "Sono sempre stato un grande fan dei vecchi film, specialmente i classici in bianco e nero degli anni '40. C'è un'eleganza nei dialoghi e nella moda che non si vede spesso nel cinema moderno. Ieri sera ho rivisto un vecchio film giallo.",
    "Viaggiare in Giappone l'anno scorso è stato un momento indimenticabile for me. Il contrasto tra le strade trafficate di Tokyo e i templi silenziosi di Kyoto è assolutamente affascinante. Ho passato molto tempo a camminare e provare diversi cibi di strada.",
    "Mi piace molto la fotografia come hobby, anche se sono ancora un principiante. Mi piace fare 'passeggiate fotografiche' nel mio quartiere il sabato mattina quando la luce è ancora morbida. Trovo che guardare attraverso l'obiettivo mi faccia prestare più attenzione ai dettagli.",
    "Ultimamente ho cercato di ridurre l'uso della plastica per essere un po' più rispettoso dell'ambiente. È stato un po' difficile all'inizio trovare alternative per cose come lo shampoo e la conservazione del cibo, ma è bello sapere che sto facendo una piccola differenza."
  ],
  advanced: [
    "Ho scoperto che man mano che le nostre vite diventano sempre più digitalizzate, il valore degli hobby analogici e tattili è cresciuto esponenzialmente for me. Recentemente ho iniziato a rilegare libri a mano, un mestiere che richiede una precisione quasi meditativa. C'è un profondo senso di soddisfazione nel trasformare materiali grezzi in oggetri funzionali.",
    "Il concetto di 'rewilding urbano' è qualcosa che mi appassiona molto ultimamente. È l'idea di permettere alla natura di reclamare piccoli angoli delle nostre cità, favorendo la biodiversità anche negli ambienti più industriali. Collaboro con un gruppo locale che ha trasformato un vecchio parcheggio in un prato fiorito.",
    "Ho rifletuto molto sull'evoluzione del ruolo delle biblioteche pubbliche nel ventunesimo secolo. Sono passate dall'essere semplici depositi di libri fisici a diventare centri comunitari vitali che forniscono un accesso equo alla tecnologia e all'informazione.",
    "C'è un affascinante fenomeno psicologico noto come 'effetto della veduta d'insieme', che descrive il cambiamento cognitivo vissuto dagli astronauti quando vedono la Terra dallo spazio. Anche se non lascerò mai l'atmosfera, il trekking d'alta quota offre un'equivalente.",
    "Recentemente ho esplorato l'intersezione storica tra gastronomia e geopolitica. È straordinario come il commercio delle spezie abbia letteralmente mappato il nostro mondo e come certi ingredienti abbiano completamente rivoluzionato intere culture."
  ]
};

const IT_SPEECH = {
  beginner: [
    "Benvenuti a tutti. Oggi vorrei parlare di gentilezza. La gentilezza è molto semplice. Possiamo sorridere a una persona o aiutare un amico. Le piccole cose possono cambiare un'intera giornata. Se siamo tunti gentili, il mondo sarà un posto migliore. Grazie.",
    "Buongiorno. Credo che leggere sia molto importante. I libri possono portarci in nuovi posti e insegnarci nuove cose. Cerco di leggere for dieci minuti ogni giorno. Spero che anche voi possiate trovare un libro che amate.",
    "Ciao amici. Voglio parlare del nostro pianeta. Dobbiamo prenderci cura degli alberi e dell'acqua. Possiamo usare meno plastica e camminare di più. Insieme, possiamo mantenere la Terra pulita for i nostri figli. Grazie.",
    "Ciao a tutti. Oggi il tema è il lavoro di squadra. Quando lavoriamo insieme, siamo più forti. Sono felice di lavorare con tutti voi. Facciamo del nostro meglio oggi e sosteniamoci a vicenda. Grazie per essere un team così fantastico.",
    "Benvenuti. Voglio dire grazie alla mia famiglia e ai miei amici. Mi aiutate sempre e mi fate ridere. Sono fortunato ad avervi nella mia vita. Spero che ognuno qui abbia qualcuno di speciale con cui parlare. Grazie."
  ],
  intermediate: [
    "L'importanza dell'apprendimento permanente non può essere sopravvalutata nel nostro mondo in rapida evoluzione. Molti pensano che l'istruzione finisca quando lasciamo la scuola, ma la verità è che il nostro cervello è capace di crescere for tunta la vita. Imparare una nuova abilità mantiene la mente sveglia.",
    "Spesso snotovalutiamo il potere di una singola persona di avere un impatro positivo sulla propria comunità. È facile guardare ai problemi globali e sentirsi sopraffanti, ma il vero cambiamento di solito inizia a livello locale. Fare volontariato è un ottimo modo for iniziare.",
    "Mantenere un sano equilibrio tra lavoro e vita privata è essenziale for il successo a lungo termine e il benessere personale. Nella nostra società iper-connessa, sta diventando sempre più difficile 'staccare' e riposare veramente. Veniamo spesso lodati for il lavoro straordinario, ma questo porta spesso al burnout.",
    "Parlare in pubblico è spesso citato come una delle più grandi paure delle persone, ma è anche una delle abilità più preziose che possiamo possedere. La capacità di articolare le proprie idee in modo chiaro e persuasivo può aprire porte sia nella vita personale che in quella professionale.",
    "L'innovazione non riguarda solo la tecnologia rivoluzionaria; è una mentalità che cerca modi migliori per risolvere i problemi quotidiani. Richiede la volontà di sperimentare, di fallire e di riprovare. Molte invenzioni di successo sono nate da un semplice 'e se?'"
  ],
  advanced: [
    "Mentre navighiamo nelle complessità del ventunesimo secolo, il concetto di citadinanza globale è passato da un ideale filosofico a un imperativo pratico. I nostri sistemi ambientali, economici e digitali sono così profondamente intrecciati che l'isolazionismo non è più una strategia praticabile for nessuna nazione.",
    "Il rapido progresso dell'intelligenza arificiale generativa rappresenta uno dei punti di flesso tecnologico più significativi nella storia umana. Sebbene il potenziale di guadagno in termini di produttività sia immenso, dobbiamo anche affrontare le profonde implicazioni etiche riguardanti il lavoro cognitivo.",
    "La diversità linguistica non è solo una questione di patrimonio culturale; è un deposito di quadri cognitivi unici e conoscenze ecologiche essenziale for la nostra sopravvivenza coletiva. Ogni lingua che si estingue rappresenta la perdita di un modo specifico di percepire il mondo.",
    "La transizione verso un'economia circolare non è un'iniziativa ambientale facoltativa; è un cambiamento strutturale fondamentale richiesto per garantire la sicurezza delle risorse a lungo termine e la stabilità economica. Il nostro attuale modello lineare è incompatibile con i limiti fisici del pianeta.",
    "Stiamo assistendo a una crisi globale di fiducia nelle nostre istituzioni fondamentali, guidata in gran parte dalla frammentazione dei nostri ecosistemi informativi e dall'ascesa della polarizzazione digitale. Ricostruire la coesione sociale richiede più di una semplice moderazione dei contenuti."
  ]
};

// --- ENGLISH CONTENT ---
const EN_INTERVIEW = {
  beginner: [
    "Hello. My name is Alex. I want to work here because I like technology. I am a very hard worker and I learn fast. In my last job, I helped many customers every day. I am happy to be here today and I hope to join your team soon.",
    "I am interested in this job because I want to grow my skills. I am good at working with people and I always arrive on time. I like solving small problems and helping my manager. Thank you for this opportunity to talk to you.",
    "My greatest strength is that I am very patient. When a customer is unhappy, I listen to them and try to help. I think this is important for this role. I am excited to learn more about your company today.",
    "I usually work from nine to five, but I am flexible. If the team needs help on weekends, I can come in. I want to be a helpful member of the office. I am a positive person and I enjoy working with others.",
    "In my free time, I like learning new things. I recently finished a basic computer course. I want to use what I learned to help your business. I am ready to start as soon as possible. Thank you."
  ],
  intermediate: [
    "I have been working in customer service for three years now. In my previous role, I was responsible for handling client inquiries and resolving technical issues. I really enjoy interacting with people and finding solutions to their problems. I believe my communication skills and my attention to detail make me a strong candidate for this position.",
    "One of my biggest achievements was leading a small project to improve our office filing system. It was a bit disorganized before, so I organized the team to digitize our records. This saved us about five hours of work every week. I pride myself on being proactive and looking for ways to make our workflows more efficient.",
    "When I face a difficult situation at work, I try to stay calm and analyze the problem logically. For example, if we have a sudden rush of customers, I prioritize the most urgent tasks first. I think it is essential to maintain a positive attitude even under pressure.",
    "I am particularly drawn to this role because of your company's reputation for innovation in the tech sector. I have been following your recent product launches and I am impressed by your commitment to user experience. I have experience using similar tools and I am confident I can hit the ground running.",
    "In five years, I hope to be in a senior role where I can mentor new employees. I believe that continuous learning is the key to success in any career. I am currently taking an online course in project management to prepare myself for more responsibility."
  ],
  advanced: [
    "Throughout my tenure as a project lead, I have consistently demonstrated an ability to navigate complex organizational challenges while maintaining a focus on core business objectives. I thrive in environments that require strategic thinking and the ability to synthesize data from multiple sources to inform decision-making.",
    "I define professional success not merely by the attainment of KPIs, but by the sustainable value we create for stakeholders and the community at large. In my previous executive role, I spearheaded a digital transformation initiative that increased operational transparency.",
    "When managing high-stakes conflict within a department, I utilize a non-adversarial approach rooted in interest-based negotiation. I recall a significant disagreement between our engineering and marketing teams regarding a product roadmap. By facilitating deep-dive workshops, I helped both parties identify shared goals.",
    "I am particularly intrigued by the unique position your company holds at the intersection of fintech and ethical banking. My recent research into decentralized finance has led me to believe that the industry is at a critical inflection point. I possess the technical fluency to navigate blockchain architectures.",
    "My philosophy on human capital is that we are most effective when we align individual passions with organizational purpose. I have a proven track record of reducing turnover by implementing personalized development tracks that go beyond traditional skill-building."
  ]
};

const EN_CASUAL = {
  beginner: [
    "Hi! Today is a very nice day. I like the sun and the blue sky. Usually, I go for a walk in the park after lunch. It makes me feel happy and healthy. What do you like to do when the weather is good?",
    "I love eating Italian food. My favorite dish is pizza with extra cheese. Sometimes, I go to a small restaurant near my house with my friends. We talk and laugh for a long time. It is my favorite way to spend the weekend.",
    "I have a small cat named Luna. She is very cute and she sleeps a lot. Every morning, she wakes me up for food. I like playing with her after work. Do you have any pets? Animals make life much more fun.",
    "I am learning to play the guitar. It is a bit difficult, but I like the music. I practice for twenty minutes every night. My fingers hurt sometimes, but I am getting better. I want to play a song for my family.",
    "Last weekend, I went to the beach. The water was a bit cold, but the sand was warm. I read a book and listened to the waves. It was very relaxing. I think everyone needs a holiday sometimes."
  ],
  intermediate: [
    "I recently started a small vegetable garden on my balcony, and it has been such a rewarding experience. I'm currently growing tomatoes, some basil, and a few chili peppers. There's something really satisfying about cooking a meal with ingredients that you've grown yourself.",
    "I've always been a big fan of old movies, especially those classic black-and-white films from the 1940s. There's an elegance to the dialogue and the fashion that you just don't see as much in modern cinema. Last night, I re-watched an old mystery film.",
    "Traveling to Japan last year was a real highlight for me. The contrast between the busy streets of Tokyo and the quiet temples in Kyoto was absolutely fascinating. I spent a lot of time just walking around and trying different street foods.",
    "I'm quite into photography as a hobby, though I'm still very much a beginner. I like to go on 'photo walks' around my neighborhood on Saturday mornings when the light is still soft. I find that looking through a camera lens makes me pay more attention to small details.",
    "Lately, I've been trying to reduce my use of plastic to be a bit more environmentally friendly. It was a bit challenging at first to find alternatives for things like shampoo and food storage, but it feels good to know I'm making a small difference."
  ],
  advanced: [
    "I’ve found that as our lives become increasingly digitized, the value of tactile, analog hobbies has grown exponentially for me. Recently, I’ve taken up bookbinding, a craft that requires an almost meditative level of precision and patience. There is a profound sense of satisfaction in taking raw materials and transforming them into functional objects.",
    "The concept of 'urban rewilding' is something I’ve become quite passionate about lately. It’s the idea of allowing nature to reclaim small pockets of our cities, fostering biodiversity in even the most industrial environments. I’ve been involved with a local community group that transformed a derelict parking lot into a meadow.",
    "I’ve been reflecting a lot on the evolving role of public libraries in the twenty-first century. They’ve transitioned from being mere repositories of physical books to becoming vital community hubs that provide equitable access to technology and information. I recently attended a lecture about digital literacy.",
    "There’s a fascinating psychological phenomenon known as the 'overview effect,' which describes the cognitive shift experienced by astronauts when they see the Earth from space. While I’ll likely never leave the atmosphere, I find that engaging with high-altitude trekking provides a terrestrial equivalent.",
    "I’ve recently been exploring the historical intersection of gastronomy and geopolitics. It’s remarkable how the spice trade literally mapped our world and how certain ingredients, like the humble potato or the chili pepper, have completely revolutionized entire cultures upon their introduction."
  ]
};

const EN_SPEECH = {
  beginner: [
    "Welcome everyone. Today, I want to talk about kindness. Kindness is very simple. We can smile at a person or help a friend. Small things can change a whole day. If we are all kind, the world will be a better place. Thank you.",
    "Good morning. I believe that reading is very important. Books can take us to new places and teach us new things. I try to read for ten minutes every day. I hope you can find a book you love too.",
    "Hello friends. I want to talk about our planet. We must take care of the trees and the water. We can use less plastic and walk more. Together, we can keep the Earth clean for our children.",
    "Hi everyone. Today is about teamwork. When we work together, we are stronger. I am happy to work with all of you. Let's do our best today and support each other. Thank you for being such a great team.",
    "Welcome. I want to say thank you to my family and friends. You always help me and make me laugh. I am lucky to have you in my life. I hope everyone here has someone special to talk to."
  ],
  intermediate: [
    "The importance of lifelong learning cannot be overstated in our rapidly changing world. Many people think that education ends when we leave school, but the truth is that our brains are capable of growing throughout our entire lives. Mastering a new skill keeps our minds sharp.",
    "We often underestimate the power of a single person to make a positive impact on their community. It's easy to look at global problems and feel overwhelmed, but real change usually starts on a local level. volunteering at a local shelter is a great way to start.",
    "Maintaining a healthy work-life balance is essential for long-term success and personal well-being. In our hyper-connected society, it's becoming increasingly difficult to 'switch off' and truly rest. we are often praised for working late, but this often leads to burnout.",
    "Public speaking is often cited as one of people's greatest fears, but it is also one of the most valuable skills we can possess. The ability to articulate your ideas clearly and persuasively can open doors in both your personal and professional life.",
    "Innovation is not just about groundbreaking technology; it's a mindset that looks for better ways to solve everyday problems. It requires a willingness to experiment, to fail, and to try again. Many successful inventions started with a simple 'what if?'"
  ],
  advanced: [
    "As we navigate the complexities of the twenty-first century, the concept of global citizenship has transitioned from a philosophical ideal to a practical imperative. Our environmental, economic, and digital systems are so deeply intertwined that isolationism is no longer a viable strategy for any nation.",
    "The rapid advancement of generative artificial intelligence represents one of the most significant technological inflection points in human history. While the potential for productivity gains is immense, we must also confront the profound ethical implications regarding cognitive labor and integrity.",
    "Linguistic diversity is not merely a matter of cultural heritage; it is a repository of unique cognitive frameworks and ecological knowledge that is essential for our collective survival. Every language that goes extinct represents the loss of a specific way of perceiving the world.",
    "The transition to a circular economy is not an optional environmental initiative; it is a fundamental structural shift required to ensure long-term resource security and economic stability. Our current linear model of extraction is fundamentally incompatible with the physical limits of our planet.",
    "We are currently witnessing a global crisis of trust in our fundamental institutions, driven largely by the fragmentation of our information ecosystems and the rise of digital polarization. Rebuilding social cohesion requires more than just better content moderation."
  ]
};

// --- JAPANESE CONTENT ---
const JA_INTERVIEW = {
  beginner: [
    "はじめまして。わたしの名前はアレックスです。テクノロジーが好きなので、ここで働きたいです。わたしは一生懸命働きます。前の仕事では、毎日たくさんのお客様を助けました。チームに参加できることを願っています。よろしくお願いします。",
    "スキルを伸ばしたいので、この仕事に興味があります。人と接するのが得意で、いつも時間を守ります。小さな問題を解決したり、マネージャーを助けたりするのが好きです。今日はお話しする機会をいただき、ありがとうございます。",
    "わたしの最大の長所は、とても忍耐強いことです。お客様が困っているとき、話をよく聞いて助けるようにしています。この役割にはそれが重要だと思います。今日、あなたの会社についてもっと知ることを楽しみにしています。",
    "普段は9時から5時まで働いていますが、柔軟に対応できます。週末にチームの助けが必要な場合は、出勤できます。オフィスの役に立つメンバーになりたいです。わたしは前向きな性格で、一緒に働くのが好きです。",
    "自由な時間には、新しいことを学ぶのが好きです。最近、基本的なコンピュータのコースを修了しました。学んだことをあなたのビジネスに役立てたいです。できるだけ早く始めたいと思っています。ありがとうございました。"
  ],
  intermediate: [
    "カスタマーサービスの分野で3年間働いてきました。前職では、顧客からの問い合わせ対応や技術的な問題の解決を担当していました。人と交流し、問題の解決策を見つけることがとても好きです。わたしのコミュニケーション能力と細部へのこだわりは、この職位に適していると信じています。",
    "最大の成果の一つは、オフィスのファイリングシステムを改善するための小さなプロジェクトを主導したことです。以前は少し整理されていませんでしたが、チームをまとめて記録をデジタル化しました。これにより、毎週約5時間の作業時間を節約できました。業務フローを効率化する方法を探すことに誇りを持っています。",
    "職場で困難な状況に直面したときは、冷静さを保ち、論理的に問題を分析するように努めています。例えば、急にお客様が増えた場合は、最も緊急なタスクを優先します。プレッシャーの中でもポジティブな態度を維持することが不可欠だと考えています。同僚からは信頼できると言われます。",
    "貴社の革新的な評判に特に惹かれています。最近の製品発表も拝見しており、ユーザーエクスペリエンスへの取り組みに感銘を受けました。同様のツールの使用経験があり、すぐにお役に立てると確信しています。データ入力の経験とテクノロジーへの情熱を活かし、チームをサポートしたいです。",
    "5年後には、新しい従業員を指導できるシニアロールに就いていたいと考えています。継続的な学習がどのようなキャリアにおいても成功の鍵であると信じています。現在は、より大きな責任に備えてプロジェクト管理のオンラインコースを受講しています。プロフェッショナルな成長をサポートしてくれる環境を探しています。"
  ],
  advanced: [
    "プロジェクトリードとしての在任期間を通じて、中核となるビジネス目標を注視しつつ、複雑な組織的課題を乗り越える能力を一貫して実証してきました。戦略的思考を必要とする環境や、意思決定に情報を提供するために複数のソースからデータを統合する能力が求められる環境で、わたしは力を発揮します。",
    "わたしはプロフェッショナルとしての成功を、単にKPIの達成だけでなく、ステークホルダーや地域社会全体のために創造する持続可能な価値によって定義しています。前職のエグゼクティブ・ロールでは、デジタルトランスフォーメーションを主導し、サーバーの統合を通じて二酸化炭素排出量を30％削減しました。",
    "部門内の利害関係が絡む対立を管理する際、わたしは利害関係に基づく交渉に根ざした非敵対的なアプローチを活用します。エンジニアリングチームとマーケティングチームの間で、製品ロードマップに関して大きな意見の相違があった際、ディープダイブ・ワークショップを促進することで結束した戦略を実現しました。",
    "フィンテックと倫理的銀行業務の交差点における貴社のユニークな立ち位置に、特に興味を抱いています。分散型金融に関する最近の研究により、業界は重要な転換点にあると確信しています。わたしはブロックチェーン・アーキテクチャをナビゲートする技術的な流暢さと、規制に関する洞察力を備えています。",
    "人的資本に関するわたしの哲学は、個人の情熱と組織の目的を一致させたときに、最も効果を発揮するというものです。従来のスキル構築を超えた、パーソナライズされた開発トラックを導入することで、離職率を低下させてきた実績があります。ハイブリッドな自律性と非同期的なコラボレーションに関心があります。"
  ]
};

const JA_CASUAL = {
  beginner: [
    "こんにちは！今日はとてもいい天気ですね。太陽と青い空が好きです。たいてい、昼食の後に公園を散歩します。とても幸せで健康的な気分になります。あなたは天気がいいとき、何をするのが好きですか？",
    "イタリア料理を食べるのが大好きです。一番好きな料理はピザです。ときどき、家の近くの小さなレストランに友達と行きます。長い時間、話したり笑ったりします。週末の過ごし方で一番好きです。あなたはピザが好きですか？",
    "ルナという名前の小さな猫を飼っています。とても可愛くて、たくさん寝ます。毎朝、彼女は食べ物のためにわたしを起こします。仕事の後に彼女と遊ぶのが好きです。あなたはペットを飼っていますか？",
    "ギターを習っています。少し難しいですが、音楽が好きです。毎晩20分間練習しています。ときどき指が痛くなりますが、上手になっています。クリスマスの日に家族のために曲を弾きたいです。",
    "先週末、海に行きました。水は少し冷たかったですが、砂は温かかったです。本を読んで、波の音を聞きました。とてもリラックスできました。誰にでもときどき休みが必要だと思います。"
  ],
  intermediate: [
    "最近、バルコニーで小さな野菜作りを始めましたが、とてもいい経験になっています。今はトマトとバジル、それに唐辛子を育てています。自分で育てた材料を使って料理を作るのは、本当に満足感があります。自然は急ぐことができないので、忍耐を学びました。",
    "昔の映画、特に1940年代のクラシックな白黒映画が大好きです。セリフやファッションに、現代の映画にはないエレガンスがあります。昨夜、古いミステリー映画を再視聴しましたが、何度見ても背景の新しいディテールに気づかされます。人間は変わらないですね。",
    "昨年の日本旅行は、わたしにとって本当に大きな出来事でした。東京の賑やかな街並みと、京都の静かなお寺のコントラストがとても魅力的でした。たくさん歩き回って、いろいろな屋台の食べ物を試しました。言葉が通じなくても、みんな親切で助かりました。",
    "趣味で写真を撮っていますが、まだ初心者です。土曜日の朝、光がまだ柔らかい時間に近所を「フォトウォーク」するのが好きです。カメラのレンズを通すと、レンガの質感や歩道に落ちる影など、普段無視してしまうような小さな細部に注意を向けることができます。",
    "最近、環境に配慮してプラスチックの使用を減らすようにしています。シャンプーや食品の保存方法など、最初は代替品を見つけるのが大変でしたが、小さな変化を作っていると思うと気分がいいです。地元のファーマーズマーケットでもよく買い物をするようになりました。"
  ],
  advanced: [
    "生活がデジタル化するにつれ、触覚的なアナログの趣味の価値が私の中で指数関数的に高まっています。最近、製本を始めましたが、これは瞑想的なレベルの精度と忍耐を必要とする工芸です。紙、糸、革という原材料を、思考を保持する機能的な物体に変えることに深い満足感を覚えます。",
    "「アーバン・リワイルディング」という概念に、最近とても情熱を感じています。これは自然が都市の小さな一角を取り戻すことを許し、工業的な環境でも生物多様性を育むという考えです。地元のコミュニティグループと一緒に、廃墟となった駐車場を野生の花が咲き誇る草原に変える活動をしています。",
    "21世紀における公共図書館の役割の進化について、よく考えています。図書館は単なる物理的な本の保管場所から、テクノロジーや情報への公平なアクセスを提供する不可欠なコミュニティハブへと変貌を遂げました。デジタル・リテラシーに関する講義に参加し、その多様な聴衆に感銘を受けました。",
    "「オーバービュー・エフェクト（概観効果）」という興味深い心理現象があります。宇宙から地球を見たときに宇宙飛行士が経験する認知的変化のことです。私が大気圏を出ることはないでしょうが、高地のトレッキングに従事することは、地球上での同等の経験を提供してくれると感じています。",
    "ガストロノミーと地政学の歴史的な交差点について、最近探求しています。香辛料貿易がいかに文字通り世界をマッピングし、ジャガイモや唐辛子のような特定の食材が導入によって文化全体を完全に変貌させたかは驚くべきことです。料理を作ることは、文明間の対話に参加することだと感じます。"
  ]
};

const JA_SPEECH = {
  beginner: [
    "皆さん、こんにちは。今日は「親切」についてお話ししたいと思います。親切はとてもシンプルです。誰かに微笑んだり、友達を助けたりすることです。小さなことが一日を変えることがあります。皆が親切なら、世界はもっと良くなります。ありがとうございました。",
    "おはようございます。私は読書がとても大切だと信じています。本は私たちを新しい場所に連れ、新しいことを教えてくれます。私は毎日10分間本を読むようにしています。皆さんも好きな本を見つけてほしいと思います。ありがとうございました。",
    "皆さん、こんにちは。今日は私たちの地球についてお話しします。私たちは木や水を大切にしなければなりません。プラスチックを減らし、もっと歩くことができます。一緒に、子供たちのために地球をきれいに保ちましょう。ありがとうございました。",
    "皆さん、こんにちは。今日はチームワークについてです。一緒に働くとき、私たちはより強くなります。皆さんと一緒に働けて嬉しいです。今日、全力でサポートし合いましょう。素晴らしいチームでいてくれてありがとう。良い一日を。",
    "ようこそ。家族や友達にありがとうと言いたいです。皆さんはいつも助けてくれて、笑わせてくれます。皆さんが人生にいてくれて幸せです。ここにいる全員に、話せる特別な人がいることを願っています。ありがとうございました。"
  ],
  intermediate: [
    "急速に変化する現代において、生涯学習の重要性はいくら強調してもしすぎることはありません。学校を出れば教育は終わると思われがちですが、実際には私たちの脳は一生を通じて成長し続けることができます。新しいスキルを習得することは、心を鋭く保ち、精神を若く保つことにつながります。",
    "一人の人間が地域社会にポジティブな影響を与える力を、私たちはしばしば過小評価してしまいます。地球規模の問題を見て圧倒されるのは簡単ですが、本当の変化はたいてい地域レベルから始まります。地元のシェルターでのボランティアは、変化を起こす素晴らしい方法の一つです。",
    "仕事と生活の健全なバランスを保つことは、長期的な成功と個人の幸福にとって不可欠です。超接続社会において、「スイッチを切って」真に休むことはますます難しくなっています。遅くまで働くことが賞賛されがちですが、これはしばしば燃え尽き症候群や生産性の低下を招きます。",
    "人前で話すことはしばしば最大の恐怖の一つに挙げられますが、それは私たちが持つことのできる最も価値のあるスキルの一つでもあります。自分の考えを明確かつ説得力を持って伝える能力は、個人的な生活とプロフェッショナルなキャリアの両方で扉を開いてくれます。",
    "イノベーションとは画期的なテクノロジーだけではありません。日常の問題を解決するためのより良い方法を探すマインドセットのことです。実験し、失敗し、textを繰り返す意欲が必要です。歴史上の多くの成功した発明は、「もし〜だったら？」という単純な問いから始まりました。"
  ],
  advanced: [
    "21世紀の複雑さを乗り越えていく中で、グローバル・シチズンシップという概念は、哲学的な理想から実用的な必須事項へと移行しました。私たちの環境、経済、デジタルシステムは深く絡み合っており、孤立主義はもはやどの国家にとっても実行可能な戦略ではありません。共有された運命を感じる必要があります。",
    "生成AIの急速な進歩は、人類史上最も重要な技術的転換点の一つです。生産性の向上や科学的発見の可能性は計り知れませんが、認知的労働や情報の誠実さに関する深い倫理的影響にも直面しなければなりません。AIの力を活用しつつ、人間の創造的な直感を守る必要があります。",
    "言語の多様性は単なる文化遺産の問題ではありません。それは、私たちの集団的生存に不可欠な、独自の認知的枠組みと生態学的知識の宝庫です。消滅する言語は、世界を認識し、世界と関わる特定の仕方の喪失を意味します。多言語主義を認識し、支援する道徳的義務があります。",
    "サーキュラー・エコノミーへの移行は、単なる環境イニシアチブではなく、長期的な資源の安全性と経済的安定を確保するために必要な根本的な構造転換です。地球の物理的限界と「推、生産、廃棄」という線形モデルは根本的に相容れません。持続可能な未来への道はそこにあります。",
    "私たちは現在、情報の断片化とデジタル分断によって、基本的な制度に対する世界的な信頼の危機に直面しています。社会的な結束を再構築するには、透明性、説明責任、 그리고 공유된 사실 기반의 회복에 대한 새로운 약속이 필요합니다. 디지털 시대가 커뮤니티를 분열시키기보다 강화하도록 해야 합니다."
  ]
};

// Main export structure
export const SAMPLE_ARTICLES: Record<string, Record<string, Record<string, string[]>>> = {
  en: { interview: EN_INTERVIEW, casual: EN_CASUAL, speech: EN_SPEECH },
  ja: { interview: JA_INTERVIEW, casual: JA_CASUAL, speech: JA_SPEECH },
  it: { interview: IT_INTERVIEW, casual: IT_CASUAL, speech: IT_SPEECH },
  es: { interview: ES_INTERVIEW, casual: ES_CASUAL, speech: ES_SPEECH },
  fr: { interview: FR_INTERVIEW, casual: FR_CASUAL, speech: FR_SPEECH },
  zh_CN: { interview: ZH_CN_INTERVIEW, casual: ZH_CN_CASUAL, speech: ZH_CN_SPEECH },
  'zh-HK': { interview: ZH_HK_INTERVIEW, casual: ZH_HK_CASUAL, speech: ZH_HK_SPEECH },
  ko: { interview: KO_INTERVIEW, casual: KO_CASUAL, speech: KO_SPEECH },
  ru: { interview: RU_INTERVIEW, casual: RU_CASUAL, speech: RU_SPEECH },
};

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'it', label: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'zh_CN', label: 'Chinese', native: '普通话', flag: '🇨🇳' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'zh-HK', label: 'Cantonese', native: '廣東話', flag: '🇭🇰' },
  { code: 'ko', label: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'ru', label: 'Russian', native: 'Русский', flag: '🇷🇺' },
];

export const UPDATE_LOG = [
  {
    version: "v3.0.0",
    title: "Diagnostic Audits & Export",
    type: "FEATURE",
    changes: [
      "Implemented Diagnostic Audit Export using html2canvas for professional reporting.",
      "Added Eye-Contact stability mini-charts to the final audit report.",
      "Introduced Authenticated Audit verification for professional records.",
      "Finalized full 45-article matrix for ES, FR, ZH, HK, KO, and RU."
    ]
  },
  {
    version: "v2.9.5",
    title: "Smoothed Biometrics",
    type: "PATCH",
    changes: [
      "Integrated 10-frame Moving Average Filter for MediaPipe telemetry.",
      "Stabilized Real-time HUD feedback by reducing eye-flicker jitter.",
      "Synchronized AI Examiner Status indicator with Gemini TTS playback."
    ]
  },
  {
    version: "v2.8.0",
    title: "Multimodal Biometrics",
    type: "FEATURE",
    changes: [
      "Integrated MediaPipe FaceMesh for real-time gaze and smile detection.",
      "Added HUD (Heads-Up Display) with parallax effects based on head orientation.",
      "Implemented 'Zen Overlay' for real-time emotional state visualization."
    ]
  },
  {
    version: "v2.5.0",
    title: "Standardized Exam Prep",
    type: "FEATURE",
    changes: [
      "Launched IELTS Simulator with standard Part 1 and Part 2 question pools.",
      "Implemented Gemini-powered TTS for realistic UK Examiner audio feedback.",
      "Added CEFR level mapping (A1-C2) for all spontaneous speech sessions."
    ]
  },
  {
    version: "v2.0.0",
    title: "Cloud Engine Migration",
    type: "INFRASTRUCTURE",
    changes: [
      "Migrated speech processing from local Whisper to Gemini 3 Flash/Pro.",
      "Enabled context-aware analysis for Interviews, Casual chats, and Speeches.",
      "Introduced strategic coaching tips with multi-language translation support."
    ]
  },
  {
    version: "v1.5.0",
    title: "Linguistic Expansion",
    type: "FEATURE",
    changes: [
      "Added support for Japanese, Italian, Spanish, and French.",
      "Implemented script-reading mode with Beginner, Intermediate, and Advanced levels.",
      "Added filler word detection (um, ah, like, eto, ano) for English and Japanese."
    ]
  },
  {
    version: "v1.0.0",
    title: "Alpha Release",
    type: "RELEASE",
    changes: [
      "Core audio recording engine with local blob processing.",
      "Initial transcription and WPM (Words Per Minute) calculation.",
      "Dashboard and history laboratory for session tracking."
    ]
  }
];

export const IELTS_QUESTIONS = {
  part1: {
    "Hometown & Living": [
      "Tell me about the town or city where you live.",
      "What do you like most about the area where you live?",
      "Is your hometown a good place for young people to live?",
      "Do you prefer living in a house or an apartment?",
      "Is there anything you would like to change about your hometown?"
    ],
    "Education & Work": [
      "Do you prefer to study in the morning or in the evening?",
      "What was your favorite subject at school, and why?",
      "Do you think it's important to learn a second language?",
      "Do you prefer to study alone or with other people?",
      "What was your favorite subject when you were in primary school?"
    ],
    "Accommodation": [
      "Do you live in a house or an apartment?",
      "Tell me about the house/apartment you live in.",
      "What is your favorite room in your home? Why?",
      "How long have you lived there?",
      "Would you like to move to a different home in the future?"
    ],
    "Family": [
      "Do you have a large family or a small family?",
      "Can you tell me about your family?",
      "Who are you closest to in your family?",
      "What do you like to do together as a family?",
      "Do you prefer spending time with your family or your friends?"
    ],
    "Friends": [
      "Do you have many friends?",
      "What do you usually do with your friends?",
      "Do you prefer to have one close friend or many friends?",
      "How do you choose your friends?",
      "Is it important to have friends?"
    ],
    "Hobbies": [
      "Do you have any hobbies?",
      "What do you like to do in your free time?",
      "Did you have any hobbies when you were a child?",
      "Is it important to have a hobby?",
      "What hobby would you like to start in the future?"
    ],
    "Music": [
      "Do you like listening to music?",
      "What kind of music do you like?",
      "Did you learn to play a musical instrument when you were a child?",
      "Do you prefer listening to live music or recorded music?",
      "Is music important in your culture?"
    ],
    "Shopping": [
      "Do you like shopping?",
      "Who do you usually go shopping with?",
      "Do you prefer shopping in small shops or large shopping malls?",
      "What was the last thing you bought?",
      "Do you like shopping online?"
    ],
    "Weather": [
      "What is the weather like in your country?",
      "What is your favorite kind of weather?",
      "Does the weather affect your mood?",
      "Do you prefer hot weather or cold weather?",
      "What do you do when it rains?"
    ],
    "Food": [
      "What is your favorite food?",
      "Do you prefer eating at home or in a restaurant?",
      "What kind of food did you like when you were a child?",
      "Do you like cooking?",
      "Is there any food you don't like?"
    ],
    "Transport": [
      "How do you usually travel to work or study?",
      "What is the most popular form of transport in your country?",
      "Do you prefer traveling by car or by public transport?",
      "Is there anything you would like to improve about the transport system in your city?",
      "Do you like traveling by plane?"
    ],
    "Reading": [
      "Do you like reading?",
      "What kind of books do you like to read?",
      "Did you read much when you were a child?",
      "Do you prefer reading physical books or e-books?",
      "Is reading an important skill?"
    ],
    "Art": [
      "Are you good at art?",
      "Did you learn art at school when you were a child?",
      "What kind of art do you like?",
      "Is art popular in your country?",
      "Have you ever been to an art gallery?",
      "Do you think children can benefit from going to art galleries?"
    ],
    "Bicycles": [
      "Do you have a bike?",
      "How often do you use it?",
      "How old were you when you learned to ride a bike?",
      "Do many people in your country using bicycles?",
      "Do you think using bicycles should be encouraged?"
    ],
    "Birthdays": [
      "Do you usually celebrate your birthdays?",
      "How did you celebrate your last birthday?",
      "Which birthdays are the most important ones in your country?",
      "Do you think children should celebrate their birthdays with a party?"
    ],
    "Childhood": [
      "Did you enjoy your childhood?",
      "What is your first memory of your childhood?",
      "Did you have a lot of friends when you were a child?",
      "What did you enjoy doing as a child?",
      "Do you think it is better for children to grow up in the city or in the countryside?"
    ],
    "Clothes": [
      "Are clothes important to you?",
      "What kind of clothes do you usually wear?",
      "Do you ever wear the traditional clothes of your country?",
      "Where do you usually buy your clothes?",
      "Have you ever worn a uniform?",
      "Do most people in your country follow fashion?"
    ],
    "Computers": [
      "Do you often use a computer?",
      "How do you usually get online?",
      "Do you prefer desktops or laptops?",
      "What do you use your computer for?",
      "Do you think it is important to learn how to use a computer?"
    ],
    "Daily Routine": [
      "When do you usually get up in the morning?",
      "Do you usually have the same routine every day?",
      "What is your daily routine?",
      "Do you ever change your routine?",
      "Is your routine the same today as it was when you were a child?",
      "Do you think it is important to have a daily routine?"
    ],
    "Dictionaries": [
      "Do you often use a dictionary?",
      "What do you use dictionaries for?",
      "What kinds of dictionaries do you think are most useful?",
      "Do you think dictionaries are useful for learning a language?",
      "What kind of information you find in a dictionary?"
    ],
    "Dreams": [
      "Do you often have dreams when you sleep?",
      "Do you usually remember your dreams?",
      "Do you think dreams are important to remember?",
      "Do you ever have daydream?",
      "What kind of daydreams do you usually have?"
    ],
    "Drinks": [
      "What is your favourite drink?",
      "Is it common for people to drink tea and coffee in your country?",
      "Did you prefer different drinks as a child?",
      "Do you think it is important to drink lots of water?",
      "What is a traditional drink in your country for celebrating?"
    ],
    "Evenings": [
      "What do you often do in the evenings?",
      "Do you do the same thing every evening?",
      "Do you prefer to spend your evenings with family or friends?",
      "Do you ever work or study in the evenings?",
      "What is a popular activity for young people in your country in the evenings?",
      "Do you do the same thing in the evenings as you did when you were a child?"
    ],
    "Flowers": [
      "Do you like flowers?",
      "What’s your favourite flower?",
      "When was the last time you gave someone flowers?",
      "Do any flowers have a special meaning in your country?",
      "Why do you think women like flowers more than men?"
    ],
    "Going Out": [
      "Do you often go out in the evenings?",
      "What do you like to do when you go out?",
      "Do you prefer going out on your own or with friends?",
      "How often do you go out in a week?",
      "Where do most young people like to go out in your country?"
    ],
    "Happiness": [
      "Are you a happy person?",
      "What usually makes you happy or unhappy?",
      "Does the weather ever affect how you feel?",
      "What makes you smile?",
      "Do you think people in your country are generally happy people?"
    ],
    "Internet": [
      "Do you often use the internet?",
      "How much time do you spend online every day?",
      "What do you usually do on the internet?",
      "What are the advantages of using the internet?",
      "Do you think the internet is a good place to learn things?"
    ],
    "Pets": [
      "Do you have any pets?",
      "What kind of pets are popular in your country?",
      "Did you have a pet when you were a child?",
      "Is it important for children to have pets?",
      "What are the benefits of having a pet?"
    ],
    "Sport": [
      "Do you like sport?",
      "What is your favourite sport?",
      "Do you prefer watching sport or playing it?",
      "What sports are popular in your country?",
      "Do you think it is important for children to do sport?"
    ],
    "TV": [
      "Do you often watch TV?",
      "What kind of TV programmes do you like?",
      "Did you watch much TV when you were a child?",
      "Do you prefer watching TV or the internet?",
      "Do you think there is too much advertising on TV?"
    ]
  },
  part2: {
    "People & Influences": [
      {
        topic: "Describe a person who has strongly influenced your life.",
        points: ["Who this person is", "How you met them", "What kind of person they are", "And explain how they influenced you"]
      },
      {
        topic: "Describe a famous person you would like to meet.",
        points: ["Who they are", "What they are famous for", "What you would like to ask them", "And explain why you want to meet them"]
      },
      {
        topic: "Describe a member of your family you get on well with.",
        points: ["Who it is", "What relationship you have to that person", "What that person is like", "What you do together", "And explain why you get on so well"]
      },
      {
        topic: "Describe a person you know who is kind.",
        points: ["Who it is", "How you know this person", "What sort of person he/she is", "And explain why you think they are kind"]
      },
      {
        topic: "Describe an old person you know.",
        points: ["Who this person is", "How old he/she is", "What this person is like", "And explain why you like this person"]
      },
      {
        topic: "Describe someone you respect.",
        points: ["Who the person is", "How you know about this person", "What this person does", "What this person is like", "And explain why you respect this person"]
      }
    ],
    "Places & Travel": [
      {
        topic: "Describe a place you have visited that you would like to go back to.",
        points: ["Where the place is", "When you went there", "What you did there", "And explain why you would like to go back"]
      },
      {
        topic: "Describe a country you would like to visit in the future.",
        points: ["Which country it is", "How you know about it", "What you would do there", "And explain why you want to go there"]
      },
      {
        topic: "Describe a place that you find peaceful.",
        points: ["Where it is", "When you first went there", "What you do there", "And why you like it"]
      },
      {
        topic: "Describe a place you have recently visited.",
        points: ["Where you went", "Who you went with", "How you got there", "And explain why you enjoyed it"]
      },
      {
        topic: "Describe a place near water.",
        points: ["Where it is", "How you get there", "How often you do there", "What you can do there", "And explain why you like it"]
      },
      {
        topic: "Describe your favourite shop.",
        points: ["Where it is", "How often you go there", "What it sells", "And explain why you think it is a good shop"]
      },
      {
        topic: "Describe a place with animals.",
        points: ["Where it is", "How you heard of it", "What animals can be seen", "And explain why it might be an interesting place to visit"]
      }
    ],
    "Objects & Possessions": [
      {
        topic: "Describe an object that is very important to you.",
        points: ["What the object is", "How you got it", "What you use it for", "And explain why it is important to you"]
      },
      {
        topic: "Describe a gift you received that you really liked.",
        points: ["What the gift was", "Who gave it to you", "When you received it", "And explain why you liked it so much"]
      },
      {
        topic: "Describe a piece of art you like.",
        points: ["What the work of art is", "When you first saw it", "What you know about it", "And explain why you like it"]
      },
      {
        topic: "Describe a book you have recently read.",
        points: ["What kind of book it is", "What it is about", "What sort of people would enjoy it", "And explain why you liked it"]
      },
      {
        topic: "Describe a gift you recently gave to someone.",
        points: ["Who you gave it to", "What kind of person he/she is", "What the gift was", "What occasion the gift was for", "And explain why you chose that gift"]
      },
      {
        topic: "Describe a language you have learned.",
        points: ["What it is", "When you started learning", "How you learned it", "What was difficult about it", "And why you decided to learn that language"]
      },
      {
        topic: "Describe a good law.",
        points: ["What it is", "Who is affected by it", "And why you think it is good"]
      },
      {
        topic: "Describe a song you like.",
        points: ["What kind of song it is", "What the song is about", "When you first heard it", "And explain why you like it"]
      },
      {
        topic: "Describe a photograph you like.",
        points: ["What can be seen in the photo", "When it was taken", "Who took it", "And explain why you like it"]
      },
      {
        topic: "Describe a vocation you think is useful to society.",
        points: ["What it is", "What it involves", "What kind of people usually do this work", "And explain why you think it is useful to society"]
      }
    ],
    "Events & Experiences": [
      {
        topic: "Describe a memorable event in your life.",
        points: ["What the event was", "When it happened", "Who was there", "And explain why it was so memorable"]
      },
      {
        topic: "Describe a time when you helped someone.",
        points: ["Who you helped", "Why they needed help", "How you helped them", "And explain how you felt about helping them"]
      },
      {
        topic: "Describe a piece of advice you recently received.",
        points: ["When this happened", "Who gave you the advice", "What the advice was", "And explain how you felt about the advice"]
      },
      {
        topic: "Describe a time of the day you like.",
        points: ["What time of day it is", "What you do at that time", "Who you are usually with", "And explain why you like it"]
      },
      {
        topic: "Describe a time you were embarrassed.",
        points: ["When it was", "Who you were with", "What happened", "And how you coped afterwards"]
      },
      {
        topic: "Describe a journey that didn’t go as planned.",
        points: ["Where you were going", "How you were travelling", "Who you were with", "What went wrong", "And explain what you would do differently"]
      },
      {
        topic: "Describe some good news you recently received.",
        points: ["What the news was", "How you received the news", "Who gave it to you", "And explain why this was good news"]
      },
      {
        topic: "Describe your favourite time of day",
        points: ["When it is", "What you like to do", "And why it is different to other parts of the day"]
      },
      {
        topic: "Describe an unexpected event.",
        points: ["What it was", "When it happened", "Who was there", "Why it was unexpected", "And explain why you enjoyed it"]
      }
    ],
    "Activities & Hobbies": [
      {
        topic: "Describe an exercise you know.",
        points: ["What it is", "How it is done", "When you first tried it", "What kind of people it is suitable for", "And explain why you think it is a good exercise"]
      },
      {
        topic: "Describe an interesting hobby.",
        points: ["What it is", "What kind of people do it", "How it is done", "And explain why you think it is interesting"]
      },
      {
        topic: "Describe something you do to relax.",
        points: ["What it is", "Where you do it", "When you first did it", "And why you find it relaxing"]
      },
      {
        topic: "Describe a sports you would like to learn.",
        points: ["What it is", "What equipment is needed for it", "How you would learn it", "And explain why you would like to learn this sport"]
      }
    ],
    "Media & Technology": [
      {
        topic: "Describe a useful website.",
        points: ["What it is", "How often you visit it", "What kind of site it is", "What kind of information it offers", "And explain why you think it is useful"]
      }
    ]
  }
};

export const LANGUAGE_FILLERS: Record<string, string[]> = {
  'en': ['um', 'uh', 'like', 'you know', 'actually', 'basically', 'so', 'right'],
  'ja': ['えー', 'あの', 'その', 'えーと', 'まー'],
  'zh_CN': ['那个', '然后', '就是', '呃', '这个'],
};

export const API_BASE_URL = 'http://localhost:8000';
