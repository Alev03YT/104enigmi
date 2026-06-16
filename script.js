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

const categoryMap = {
  logica: 'Logica',
  matematica: 'Matematica',
  attenzione: 'Attenzione',
  interruttori: 'Interruttori',
  fiammiferi: 'Fiammiferi',
  porte: 'Osservazione',
  bicchieri: 'Bicchieri',
  detective: 'Detective',
  sequenze: 'Sequenze',
  parole: 'Parole'
};

const hashtags = {
  base: ['#quizlogico', '#enigmi', '#brainchallenge', '#indovinelli', '#tiktokitalia'],
  matematica: ['#quizmatematico', '#logica', '#brainchallenge', '#enigmi', '#tiktokitalia'],
  attenzione: ['#attenzione', '#quizlogico', '#indovinelli', '#brainchallenge', '#tiktokitalia'],
  detective: ['#detective', '#mistero', '#quizlogico', '#enigmi', '#tiktokitalia'],
  sequenze: ['#sequenze', '#quizmatematico', '#brainchallenge', '#enigmi', '#tiktokitalia']
};

const data = {
  objects: ['candele', 'monete', 'chiavi', 'biglie', 'libri', 'caramelle', 'palline', 'matite', 'carte', 'bicchieri', 'bottoni', 'anelli'],
  people: ['Luca', 'Marco', 'Giulia', 'Sara', 'Davide', 'Anna', 'Marta', 'Paolo', 'Nico', 'Elena', 'Sofia', 'Leo'],
  places: ['cantina', 'soffitta', 'stanza buia', 'casa abbandonata', 'ufficio', 'garage', 'magazzino', 'corridoio'],
  animals: ['pecore', 'galline', 'pesci', 'cavalli', 'conigli']
};

function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function $(id) { return document.getElementById(id); }

const proceduralGenerators = {
  attenzione: () => {
    const templates = [
      () => {
        const n = rnd(7, 35);
        const left = rnd(2, n - 2);
        return {
          category: 'Attenzione', difficulty: 'facile', title: `Ne restano solo ${left}?`,
          text: `Hai ${n} ${pick(data.objects)}. Ne perdi tutte tranne ${left}. Quante te ne restano?`,
          solution: `Te ne restano ${left}. La frase dice “tutte tranne ${left}”.`,
          hook: 'La risposta è nascosta nella frase.'
        };
      },
      () => {
        const name = pick(data.people);
        return {
          category: 'Attenzione', difficulty: 'medio', title: 'La gara di corsa',
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
        const machines = pick([3, 4, 5, 6, 8, 10]);
        const target = machines * pick([8, 10, 15, 20, 25]);
        const minutes = pick([3, 5, 6, 10, 12]);
        return {
          category: 'Matematica', difficulty: 'medio', title: 'Quanto tempo ci vuole?',
          text: `Se ${machines} macchine producono ${machines} pezzi in ${minutes} minuti, quanto tempo impiegano ${target} macchine a produrre ${target} pezzi?`,
          solution: `${minutes} minuti. Ogni macchina produce un pezzo in ${minutes} minuti.`,
          hook: 'Sembra proporzione, ma è logica pura.'
        };
      },
      () => {
        const child = rnd(3, 18);
        const diff = pick([18, 20, 22, 24, 26, 30, 32, 36]);
        const total = child + child + diff;
        return {
          category: 'Matematica', difficulty: 'medio', title: 'Età del figlio',
          text: `Un padre e un figlio hanno insieme ${total} anni. Il padre ha ${diff} anni più del figlio. Quanti anni ha il figlio?`,
          solution: `Il figlio ha ${child} anni. Il padre ne ha ${child + diff}.`,
          hook: 'Non dividere il totale a metà: c’è la differenza da rispettare.'
        };
      },
      () => {
        const price = pick([20, 30, 40, 50, 60, 80, 100, 120]);
        const discount = pick([10, 20, 25, 30, 50]);
        const finalPrice = price * (100 - discount) / 100;
        return {
          category: 'Matematica', difficulty: 'facile', title: 'Sconto veloce',
          text: `Un oggetto costa ${price} euro e viene scontato del ${discount}%. Quanto costa dopo lo sconto?`,
          solution: `Costa ${finalPrice} euro.`,
          hook: 'Calcolo rapido, ottimo per far commentare.'
        };
      }
    ];
    return pick(templates)();
  },
  logica: () => {
    const obj = pick(data.objects);
    const n = rnd(10, 40);
    const take = rnd(3, n - 3);
    return {
      category: 'Logica', difficulty: 'facile', title: 'Quanti ne hai?',
      text: `Su un tavolo ci sono ${n} ${obj}. Tu ne prendi ${take}. Quanti ${obj} hai?`,
      solution: `Ne hai ${take}. La domanda chiede quanti ne hai tu, non quanti restano.`,
      hook: 'Leggi bene fino alla fine.'
    };
  },
  fiammiferi: () => {
    const items = shuffle(['candela', 'lampada a olio', 'camino', 'stufa', 'lanterna']).slice(0, 3);
    return {
      category: 'Fiammiferi', difficulty: 'facile', title: 'Cosa accende per primo?',
      text: `Un uomo accende un fiammifero. Davanti a lui ci sono ${items[0]}, ${items[1]} e ${items[2]}. Cosa accende per primo?`,
      solution: 'Il fiammifero. È la prima cosa che deve essere accesa.',
      hook: 'Non rispondere di getto: la risposta è prima della lista.'
    };
  },
  sequenze: () => {
    const start = rnd(1, 6);
    const step = rnd(2, 9);
    const seq = Array.from({length: 5}, (_, i) => start + i * step);
    return {
      category: 'Sequenze', difficulty: 'facile', title: 'Numero mancante',
      text: `Completa la sequenza: ${seq.join(', ')}, ?`,
      solution: `${start + 5 * step}. Si aggiunge sempre ${step}.`,
      hook: 'Guarda la differenza tra i numeri.'
    };
  }
};

function normalizeCategory(value) {
  return categoryMap[value] || value;
}

function matchesFilters(quiz) {
  const selectedType = $('typeSelect').value;
  const selectedDifficulty = $('difficultySelect').value;
  const wantedCategory = normalizeCategory(selectedType);
  const categoryOk = selectedType === 'mix' || quiz.category === wantedCategory || (selectedType === 'porte' && quiz.title.toLowerCase().includes('porta'));
  const difficultyOk = selectedDifficulty === 'mix' || !quiz.difficulty || quiz.difficulty === selectedDifficulty;
  return categoryOk && difficultyOk;
}

function getBankCandidates() {
  const bank = window.QUIZ_BANK || [];
  return bank.filter(matchesFilters);
}

function generateProceduralCandidate() {
  const selectedType = $('typeSelect').value;
  const keys = Object.keys(proceduralGenerators);
  const key = selectedType !== 'mix' && proceduralGenerators[selectedType] ? selectedType : pick(keys);
  return proceduralGenerators[key]();
}

function quizKey(quiz) {
  return `${quiz.category}|${quiz.title}|${quiz.text}`;
}

function uniqueQuiz() {
  const bankCandidates = shuffle(getBankCandidates());
  const combined = [...bankCandidates];

  for (let i = 0; i < 25; i++) combined.push(generateProceduralCandidate());

  const fresh = combined.find(q => !state.recent.includes(quizKey(q)) && matchesFilters(q));
  const quiz = fresh || combined.find(matchesFilters) || generateProceduralCandidate();

  const key = quizKey(quiz);
  state.recent.push(key);
  state.recent = state.recent.slice(-250);
  localStorage.setItem('recentQuizKeys', JSON.stringify(state.recent));
  return quiz;
}

function buildDescription(quiz) {
  const tagSet = hashtags[quiz.category.toLowerCase()] || hashtags.base;
  return `🧠 ${quiz.title}\n\n${quiz.hook}\n\n${quiz.text}\n\nScrivi la tua risposta nei commenti 👇\n\n${tagSet.slice(0, 5).join(' ')}`;
}

function buildImagePrompt(quiz, hook) {
  return `Poster verticale 9:16 per TikTok, stile quiz virale italiano, sfondo nero drammatico, testo grande bianco e giallo, accenti rossi, atmosfera misteriosa, layout pulito e leggibile. Titolo: "${hook.replace('\n', ' ')}". Categoria: "${quiz.category}". Domanda principale: "${quiz.title}". Testo: "${quiz.text}". In basso inserire call to action: "COMMENTA LA TUA RISPOSTA".`;
}

function renderHook(hook) {
  const parts = hook.split('\n');
  $('posterHook').innerHTML = parts.length > 1 ? `${parts[0]}<br><span>${parts.slice(1).join(' ')}</span>` : hook;
}

function generateQuiz() {
  const quiz = uniqueQuiz();
  const hook = pick(hooks);
  renderHook(hook);
  $('quizCategory').textContent = quiz.category;
  $('quizTitle').textContent = quiz.title;
  $('quizText').textContent = quiz.text;
  $('solution').textContent = quiz.solution;
  $('description').value = buildDescription(quiz);
  $('imagePrompt').value = buildImagePrompt(quiz, hook);
  state.generated++;
  const total = (window.QUIZ_BANK || []).length;
  $('counter').textContent = `Quiz generati in questa sessione: ${state.generated} | Archivio: ${total} quiz + varianti automatiche | Anti-ripetizione: ultimi ${state.recent.length}`;
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

function resetRecent() {
  state.recent = [];
  localStorage.removeItem('recentQuizKeys');
  $('counter').textContent = `Anti-ripetizione resettato. Quiz generati in questa sessione: ${state.generated}`;
}

$('generateBtn').addEventListener('click', generateQuiz);
$('copyBtn').addEventListener('click', () => copyFrom('description', 'copyBtn', 'Copia descrizione'));
$('copyPromptBtn').addEventListener('click', () => copyFrom('imagePrompt', 'copyPromptBtn', 'Copia prompt'));
$('resetBtn').addEventListener('click', resetRecent);

generateQuiz();
