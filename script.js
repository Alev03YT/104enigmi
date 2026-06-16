const quizzes = [
  {
    category: 'Fiammifero',
    title: 'Cosa accende per primo?',
    text: 'Un uomo accende un fiammifero. Davanti a lui ci sono una candela, una lampada a olio e un camino. Cosa accende per primo?',
    solution: 'Il fiammifero. Prima di accendere qualsiasi altra cosa deve accendere il fiammifero.',
    hook: 'Sembra facile, ma quasi tutti rispondono troppo in fretta.'
  },
  {
    category: 'Interruttori',
    title: 'Quale interruttore accende la lampadina?',
    text: 'Hai 3 interruttori. In un’altra stanza c’è una sola lampadina. Puoi entrare nella stanza una sola volta. Come fai a capire quale interruttore la accende?',
    solution: 'Accendi il primo interruttore per qualche minuto, poi spegnilo. Accendi il secondo ed entra. Se la lampadina è accesa è il secondo. Se è spenta ma calda è il primo. Se è spenta e fredda è il terzo.',
    hook: 'Questo enigma separa chi ragiona da chi va a caso.'
  },
  {
    category: 'Bicchieri',
    title: 'Quale bicchiere si riempie per primo?',
    text: 'Osserva i tubi collegati ai bicchieri. Alcuni passaggi sono bloccati. Quale bicchiere si riempie per primo?',
    solution: 'Si riempie il bicchiere che ha il primo percorso libero dall’alto. I tubi segnati come bloccati non lasciano passare l’acqua.',
    hook: 'Solo chi guarda bene i dettagli trova subito la risposta.'
  },
  {
    category: 'Logica',
    title: 'Il padre e il figlio',
    text: 'Un padre e un figlio hanno insieme 36 anni. Il padre ha 30 anni più del figlio. Quanti anni ha il figlio?',
    solution: 'Il figlio ha 3 anni e il padre 33. 33 + 3 = 36 e la differenza è 30.',
    hook: 'La risposta istintiva è spesso sbagliata.'
  },
  {
    category: 'Attenzione',
    title: 'Quanti mesi hanno 28 giorni?',
    text: 'Senza pensarci troppo: quanti mesi dell’anno hanno 28 giorni?',
    solution: 'Tutti e 12. Ogni mese ha almeno 28 giorni.',
    hook: 'È un classico tranello: non rispondere di getto.'
  },
  {
    category: 'Numeri',
    title: 'Quanto fa davvero?',
    text: 'Se 5 macchine producono 5 pezzi in 5 minuti, quanto tempo impiegano 100 macchine a produrre 100 pezzi?',
    solution: '5 minuti. Ogni macchina produce un pezzo in 5 minuti, quindi 100 macchine producono 100 pezzi nello stesso tempo.',
    hook: 'Sembra matematica, ma è soprattutto logica.'
  },
  {
    category: 'Tranello',
    title: 'La stanza buia',
    text: 'Entri in una stanza completamente buia. Hai un solo fiammifero e davanti a te ci sono una candela, una lanterna e una stufa. Cosa accendi per primo?',
    solution: 'Il fiammifero.',
    hook: 'Rispondono tutti candela, ma non è quella la prima cosa.'
  },
  {
    category: 'Osservazione',
    title: 'La porta misteriosa',
    text: 'Davanti a te ci sono due porte. Una porta porta alla salvezza, l’altra a una trappola. Due guardiani sanno la verità: uno mente sempre e uno dice sempre la verità. Puoi fare una sola domanda a uno solo di loro. Cosa chiedi?',
    solution: 'Chiedi: “Quale porta mi indicherebbe l’altro guardiano?” Poi scegli la porta opposta a quella indicata.',
    hook: 'Un grande classico che mette in crisi tantissime persone.'
  }
];

const titles = [
  'NON RISPONDERE DI GETTO',
  'SOLO I PIÙ ATTENTI CI ARRIVANO',
  'IL 97% SBAGLIA QUESTO QUIZ',
  'QUIZ LOGICO VELOCE',
  'RIESCI A RISOLVERLO?'
];

const hashtags = ['#quizlogico', '#indovinelli', '#brainchallenge', '#enigmi', '#tiktokitalia'];

const $ = (id) => document.getElementById(id);

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function buildDescription(quiz) {
  return `${quiz.hook} 🧠\n\n${quiz.text}\n\nScrivi la risposta nei commenti 👇\n\n${hashtags.join(' ')}`;
}

function buildImagePrompt(quiz) {
  return `Poster verticale 9:16 per TikTok, stile quiz virale italiano, sfondo nero drammatico, testo grande bianco e giallo, accenti rossi, atmosfera misteriosa, layout pulito e leggibile. Titolo: "${pick(titles)}". Categoria: "${quiz.category}". Domanda principale: "${quiz.title}". Testo: "${quiz.text}". In basso inserire call to action: "COMMENTA LA TUA RISPOSTA".`;
}

function generateQuiz() {
  const quiz = pick(quizzes);
  $('quizCategory').textContent = quiz.category;
  $('quizTitle').textContent = quiz.title;
  $('quizText').textContent = quiz.text;
  $('solution').textContent = quiz.solution;
  $('description').value = buildDescription(quiz);
  $('imagePrompt').value = buildImagePrompt(quiz);
}

async function copyDescription() {
  const text = $('description').value;
  try {
    await navigator.clipboard.writeText(text);
    $('copyBtn').textContent = 'Copiata!';
    setTimeout(() => $('copyBtn').textContent = 'Copia descrizione', 1300);
  } catch {
    $('description').select();
    document.execCommand('copy');
  }
}

$('generateBtn').addEventListener('click', generateQuiz);
$('copyBtn').addEventListener('click', copyDescription);

generateQuiz();
