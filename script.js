const state = {
  generated: 0,
  recent: JSON.parse(localStorage.getItem('recentQuizKeys') || '[]')
};

const hooks = [
  'NON RISPONDERE\nDI GETTO',
  'IL 97%\nSBAGLIA QUESTO QUIZ',
  'SOLO IL 3%\nRISPONDE GIUSTO',
  'QUIZ LOGICO\nVELOCE',
  'RIESCI A\nRISOLVERLO?'
];

const hashtags = {
  base: ['#quizlogico', '#enigmi', '#brainchallenge', '#indovinelli', '#tiktokitalia'],
  matematica: ['#quizmatematico', '#logica', '#brainchallenge', '#enigmi', '#tiktokitalia'],
  attenzione: ['#attenzione', '#quizlogico', '#indovinelli', '#brainchallenge', '#tiktokitalia']
};

const data = {
  objects: ['candele', 'monete', 'chiavi', 'biglie', 'libri', 'caramelle', 'palline', 'matite', 'carte', 'bicchieri'],
  people: ['Luca', 'Marco', 'Giulia', 'Sara', 'Davide', 'Anna', 'Marta', 'Paolo', 'Nico', 'Elena'],
  places: ['cantina', 'soffitta', 'stanza buia', 'casa abbandonata', 'ufficio', 'garage', 'magazzino', 'corridoio'],
  containers: ['scatole', 'sacchetti', 'cassetti', 'barattoli', 'stanze', 'zaini'],
  animals: ['pecore', 'galline', 'pesci', 'cavalli', 'conigli']
};

function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

const generators = {
  attenzione: () => {
    const templates = [
      () => ({
        category: 'Attenzione',
        title: 'Quanti mesi hanno 28 giorni?',
        text: 'Senza pensarci troppo: quanti mesi dell’anno hanno 28 giorni?',
        solution: 'Tutti e 12. Ogni mese ha almeno 28 giorni.',
        hook: 'È un tranello: quasi tutti pensano solo a febbraio.'
      }),
      () => {
        const n = rnd(7, 25);
        const left = rnd(2, n - 1);
        return {
          category: 'Attenzione',
          title: `Ne restano solo ${left}?`,
          text: `Hai ${n} ${pick(data.objects)}. Ne perdi tutte tranne ${left}. Quante te ne restano?`,
          solution: `Te ne restano ${left}. La frase dice “tutte tranne ${left}”.`,
          hook: 'La risposta è nascosta nella frase.'
        };
      },
      () => ({
        category: 'Attenzione',
        title: 'Cosa pesa di più?',
        text: 'Pesa di più un chilo di ferro o un chilo di piume?',
        solution: 'Pesano uguale: entrambi sono un chilo.',
        hook: 'Sembra banale, ma l’immagine mentale inganna.'
      }),
      () => {
        const name = pick(data.people);
        return {
          category: 'Attenzione',
          title: 'La gara di corsa',
          text: `${name} supera il secondo classificato durante una gara. In che posizione si trova adesso?`,
          solution: 'Si trova al secondo posto. Se superi il secondo, prendi il suo posto.',
          hook: 'La risposta istintiva è “primo”, ma è sbagliata.'
        };
      }
    ];
    return pick(templates)();
  },

  matematica: () => {
    const templates = [
      () => {
        const machines = pick([3, 4, 5, 6, 10]);
        const target = machines * pick([10, 20, 25]);
        const minutes = pick([3, 5, 10]);
        return {
          category: 'Numeri',
          title: 'Quanto tempo ci vuole?',
          text: `Se ${machines} macchine producono ${machines} pezzi in ${minutes} minuti, quanto tempo impiegano ${target} macchine a produrre ${target} pezzi?`,
          solution: `${minutes} minuti. Ogni macchina produce un pezzo in ${minutes} minuti.`,
          hook: 'Sembra un calcolo, ma è logica pura.'
        };
      },
      () => {
        const son = rnd(2, 12);
        const diff = pick([20, 24, 30, 36]);
        const total = son + son + diff;
        return {
          category: 'Matematica',
          title: 'Età del figlio',
          text: `Un padre e un figlio hanno insieme ${total} anni. Il padre ha ${diff} anni più del figlio. Quanti anni ha il figlio?`,
          solution: `Il figlio ha ${son} anni. Il padre ne ha ${son + diff}.`,
          hook: 'Attenzione: non basta dividere il totale a caso.'
        };
      },
      () => {
        const price = pick([10, 20, 50, 100]);
        const discount = pick([10, 20, 25, 50]);
        const finalPrice = price * (100 - discount) / 100;
        return {
          category: 'Numeri',
          title: 'Sconto veloce',
          text: `Un oggetto costa ${price}€. Viene scontato del ${discount}%. Quanto costa dopo lo sconto?`,
          solution: `Costa ${finalPrice}€. Il ${discount}% di ${price}€ è ${(price - finalPrice)}€.`,
          hook: 'Un piccolo calcolo per vedere se sei sveglio.'
        };
      }
    ];
    return pick(templates)();
  },

  logica: () => {
    const templates = [
      () => {
        const obj = pick(data.objects);
        const n = rnd(10, 30);
        const remove = rnd(3, n - 3);
        return {
          category: 'Logica',
          title: 'Quanti ne hai presi?',
          text: `Su un tavolo ci sono ${n} ${obj}. Tu ne prendi ${remove}. Quanti ${obj} hai?`,
          solution: `Ne hai ${remove}. La domanda chiede quanti ne hai tu, non quanti restano sul tavolo.`,
          hook: 'Leggi bene fino alla fine.'
        };
      },
      () => {
        const name = pick(data.people);
        const place = pick(data.places);
        return {
          category: 'Logica',
          title: 'La luce al buio',
          text: `${name} entra in una ${place} completamente buia. Ha un solo fiammifero. Davanti a sé trova una candela, una lanterna e una stufa. Cosa accende per primo?`,
          solution: 'Il fiammifero. Prima di accendere qualsiasi altra cosa deve accendere quello.',
          hook: 'Il classico tranello che fa cadere tutti.'
        };
      },
      () => ({
        category: 'Logica',
        title: 'Il dottore misterioso',
        text: 'Un ragazzo arriva in ospedale. Il medico dice: “Non posso operarlo, è mio figlio”. Ma il padre del ragazzo non è lì. Come è possibile?',
        solution: 'Il medico è sua madre.',
        hook: 'Un enigma semplice che smaschera i pregiudizi.'
      })
    ];
    return pick(templates)();
  },

  interruttori: () => ({
    category: 'Interruttori',
    title: 'Quale interruttore accende la lampadina?',
    text: 'Hai 3 interruttori. In un’altra stanza c’è una sola lampadina. Puoi entrare nella stanza una sola volta. Come fai a capire quale interruttore la accende?',
    solution: 'Accendi il primo per qualche minuto, poi spegnilo. Accendi il secondo ed entra. Accesa = secondo. Spenta ma calda = primo. Spenta e fredda = terzo.',
    hook: 'Questo enigma separa chi ragiona da chi tira a caso.'
  }),

  fiammiferi: () => {
    const items = shuffle(['candela', 'lampada a olio', 'camino', 'stufa', 'lanterna']).slice(0, 3);
    return {
      category: 'Fiammiferi',
      title: 'Cosa accende per primo?',
      text: `Un uomo accende un fiammifero. Davanti a lui ci sono ${items[0]}, ${items[1]} e ${items[2]}. Cosa accende per primo?`,
      solution: 'Il fiammifero. È la prima cosa che deve essere accesa.',
      hook: 'Non rispondere di getto: la risposta è prima della lista.'
    };
  },

  porte: () => ({
    category: 'Osservazione',
    title: 'La porta misteriosa',
    text: 'Davanti a te ci sono due porte. Una porta porta alla salvezza, l’altra a una trappola. Due guardiani sanno la verità: uno mente sempre e uno dice sempre la verità. Puoi fare una sola domanda a uno solo di loro. Cosa chiedi?',
    solution: 'Chiedi: “Quale porta mi indicherebbe l’altro guardiano?” Poi scegli la porta opposta a quella indicata.',
    hook: 'Un grande classico che mette in crisi tantissime persone.'
  }),

  bicchieri: () => {
    const answer = rnd(2, 5);
    return {
      category: 'Bicchieri',
      title: 'Quale bicchiere si riempie per primo?',
      text: `L’acqua entra dall’alto nel bicchiere 1. Alcuni tubi sono bloccati con una X rossa. Guardando bene i passaggi, quale bicchiere si riempie per primo?`,
      solution: `Si riempie il primo bicchiere raggiungibile attraverso un tubo libero. Per questa bozza usa come risposta il numero ${answer} e disegna i blocchi in modo coerente nel poster.`,
      hook: 'Solo chi osserva i blocchi trova la risposta.'
    };
  }
};

function chooseType() {
  const selected = $('typeSelect').value;
  if (selected !== 'mix') return selected;
  return pick(Object.keys(generators));
}

function uniqueQuiz() {
  let quiz;
  for (let i = 0; i < 25; i++) {
    quiz = generators[chooseType()]();
    const key = `${quiz.category}|${quiz.title}|${quiz.text}`;
    if (!state.recent.includes(key)) {
      state.recent.push(key);
      state.recent = state.recent.slice(-80);
      localStorage.setItem('recentQuizKeys', JSON.stringify(state.recent));
      return quiz;
    }
  }
  return quiz;
}

function buildDescription(quiz) {
  const tagSet = hashtags[quiz.category.toLowerCase()] || hashtags.base;
  return `🧠 ${quiz.title}\n\n${quiz.hook}\n\n${quiz.text}\n\nScrivi la tua risposta nei commenti 👇\n\n${tagSet.slice(0, 5).join(' ')}`;
}

function buildImagePrompt(quiz, hook) {
  return `Poster verticale 9:16 per TikTok, stile quiz virale italiano, sfondo nero drammatico, testo grande bianco e giallo, accenti rossi, atmosfera misteriosa, layout pulito e leggibile. Titolo: "${hook.replace('\n', ' ')}". Categoria: "${quiz.category}". Domanda principale: "${quiz.title}". Testo: "${quiz.text}". In basso inserire call to action: "COMMENTA LA TUA RISPOSTA".`;
}

function $(id) { return document.getElementById(id); }

function generateQuiz() {
  const quiz = uniqueQuiz();
  const hook = pick(hooks);
  $('posterHook').innerHTML = hook.replace('\n', '<br><span>') + (hook.includes('\n') ? '</span>' : '');
  $('quizCategory').textContent = quiz.category;
  $('quizTitle').textContent = quiz.title;
  $('quizText').textContent = quiz.text;
  $('solution').textContent = quiz.solution;
  $('description').value = buildDescription(quiz);
  $('imagePrompt').value = buildImagePrompt(quiz, hook);
  state.generated++;
  $('counter').textContent = `Quiz generati in questa sessione: ${state.generated}`;
}

async function copyFrom(id, buttonId, label) {
  const text = $(id).value;
  try {
    await navigator.clipboard.writeText(text);
    $(buttonId).textContent = 'Copiato!';
    setTimeout(() => $(buttonId).textContent = label, 1300);
  } catch {
    $(id).select();
    document.execCommand('copy');
  }
}

$('generateBtn').addEventListener('click', generateQuiz);
$('copyBtn').addEventListener('click', () => copyFrom('description', 'copyBtn', 'Copia descrizione'));
$('copyPromptBtn').addEventListener('click', () => copyFrom('imagePrompt', 'copyPromptBtn', 'Copia prompt'));

generateQuiz();
