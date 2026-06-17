// Fase B: espansione archivio con quiz parametrizzati.
// Questo file aumenta molto la varietà senza appesantire il codice principale.
window.QUIZ_BANK = window.QUIZ_BANK || [];

(function addPhaseBQuizBank() {
  const names = ['Luca', 'Giulia', 'Marco', 'Sara', 'Paolo', 'Anna', 'Nico', 'Elena', 'Marta', 'Davide'];
  const objects = ['monete', 'biglie', 'chiavi', 'matite', 'carte', 'caramelle', 'libri', 'sassolini', 'bottoni', 'gettoni'];
  const animals = ['pecore', 'conigli', 'galline', 'oche', 'pesci', 'cavalli'];
  const places = ['cantina', 'soffitta', 'garage', 'magazzino', 'ufficio', 'corridoio'];
  const colors = ['rosso', 'blu', 'verde', 'giallo', 'nero', 'bianco'];

  const add = (quiz) => window.QUIZ_BANK.push(quiz);

  // ATTENZIONE / TRANELLI: 80 varianti
  for (let i = 0; i < 80; i++) {
    const total = 12 + i;
    const left = 3 + (i % 17);
    const item = [...objects, ...animals][i % (objects.length + animals.length)];
    add({
      category: 'Attenzione',
      difficulty: i % 3 === 0 ? 'facile' : 'medio',
      title: `Ne restano ${left}`,
      text: `Hai ${total} ${item}. Li perdi tutti tranne ${left}. Quanti ${item} ti restano?`,
      solution: `Restano ${left}. La frase dice “tutti tranne ${left}”.`,
      hook: 'La risposta è dentro la frase, ma molti leggono troppo in fretta.'
    });
  }

  // MATEMATICA: 90 varianti
  for (let i = 0; i < 45; i++) {
    const child = 4 + (i % 16);
    const diff = [18, 20, 22, 24, 26, 28, 30, 32, 34][i % 9];
    const total = child * 2 + diff;
    add({
      category: 'Matematica',
      difficulty: i % 4 === 0 ? 'difficile' : 'medio',
      title: 'Età del figlio',
      text: `Un padre e un figlio hanno insieme ${total} anni. Il padre ha ${diff} anni più del figlio. Quanti anni ha il figlio?`,
      solution: `Il figlio ha ${child} anni. Il padre ne ha ${child + diff}.`,
      hook: 'Non dividere il totale a metà: devi considerare la differenza.'
    });
  }
  for (let i = 0; i < 45; i++) {
    const machines = [3, 4, 5, 6, 8, 10, 12][i % 7];
    const minutes = [3, 4, 5, 6, 8, 10][i % 6];
    const target = machines * (6 + (i % 20));
    add({
      category: 'Matematica',
      difficulty: 'medio',
      title: 'Macchine e pezzi',
      text: `Se ${machines} macchine producono ${machines} pezzi in ${minutes} minuti, quanto tempo impiegano ${target} macchine a produrre ${target} pezzi?`,
      solution: `${minutes} minuti. Ogni macchina produce un pezzo in ${minutes} minuti.`,
      hook: 'Sembra una proporzione lunga, ma il tempo resta lo stesso.'
    });
  }

  // LOGICA: 90 varianti
  for (let i = 0; i < 60; i++) {
    const item = objects[i % objects.length];
    const total = 15 + i;
    const taken = 2 + (i % 19);
    add({
      category: 'Logica',
      difficulty: i % 5 === 0 ? 'medio' : 'facile',
      title: 'Quanti ne hai?',
      text: `Sul tavolo ci sono ${total} ${item}. Tu ne prendi ${taken}. Quanti ${item} hai?`,
      solution: `Hai ${taken} ${item}. La domanda chiede quanti ne hai tu, non quanti restano sul tavolo.`,
      hook: 'La parola più importante è “hai”.'
    });
  }
  for (let i = 0; i < 30; i++) {
    const name = names[i % names.length];
    const place = places[i % places.length];
    add({
      category: 'Logica',
      difficulty: 'medio',
      title: 'La stanza buia',
      text: `${name} entra in una ${place} completamente buia. Ha un solo fiammifero. Davanti a sé trova una candela, una lanterna e una stufa. Cosa accende per primo?`,
      solution: 'Accende per primo il fiammifero.',
      hook: 'Non guardare gli oggetti: guarda cosa serve per iniziare.'
    });
  }

  // SEQUENZE: 75 varianti
  for (let i = 0; i < 40; i++) {
    const start = 1 + (i % 9);
    const step = 2 + (i % 12);
    const seq = [0, 1, 2, 3, 4].map(n => start + n * step);
    add({
      category: 'Sequenze',
      difficulty: 'facile',
      title: 'Numero mancante',
      text: `Completa la sequenza: ${seq.join(', ')}, ?`,
      solution: `${start + 5 * step}. Si aggiunge sempre ${step}.`,
      hook: 'Guarda la differenza tra un numero e l’altro.'
    });
  }
  for (let i = 0; i < 35; i++) {
    const base = 2 + (i % 6);
    const seq = [1, 2, 3, 4, 5].map(n => n * n + base);
    add({
      category: 'Sequenze',
      difficulty: 'medio',
      title: 'Sequenza nascosta',
      text: `Completa la sequenza: ${seq.join(', ')}, ?`,
      solution: `${36 + base}. Sono quadrati più ${base}.`,
      hook: 'Non è una somma fissa: cerca lo schema nascosto.'
    });
  }

  // DETECTIVE: 50 varianti brevi
  for (let i = 0; i < 50; i++) {
    const name = names[i % names.length];
    const place = places[i % places.length];
    add({
      category: 'Detective',
      difficulty: i % 2 === 0 ? 'medio' : 'difficile',
      title: 'Il dettaglio decisivo',
      text: `${name} viene trovato in un ${place}. La porta è chiusa dall’interno, non ci sono segni di lotta e sul pavimento c’è una piccola pozzanghera. Cosa è successo?`,
      solution: 'Era salito su un blocco di ghiaccio che poi si è sciolto. La pozzanghera è l’indizio.',
      hook: 'Nei casi detective il dettaglio più piccolo spesso è quello decisivo.'
    });
  }

  // PAROLE / INDOVINELLI: 45 varianti
  const wordRiddles = [
    ['Più togli più cresce', 'Che cosa diventa più grande più ne togli?', 'Un buco.'],
    ['Sempre davanti', 'Che cosa sta sempre davanti a te ma non puoi mai vedere?', 'Il futuro.'],
    ['Denti senza morso', 'Ha tanti denti ma non può mordere. Che cos’è?', 'Un pettine.'],
    ['Senza peso', 'È leggero come una piuma, ma nessuno riesce a tenerlo a lungo. Cos’è?', 'Il respiro.'],
    ['Parla senza bocca', 'Parla senza bocca e risponde senza orecchie. Che cos’è?', 'L’eco.']
  ];
  for (let i = 0; i < 45; i++) {
    const r = wordRiddles[i % wordRiddles.length];
    add({
      category: 'Parole',
      difficulty: i % 4 === 0 ? 'medio' : 'facile',
      title: r[0],
      text: r[1],
      solution: r[2],
      hook: 'Indovinello breve: perfetto per far scrivere la risposta nei commenti.'
    });
  }

  // BICCHIERI / OSSERVAZIONE: 35 varianti
  for (let i = 0; i < 35; i++) {
    add({
      category: 'Bicchieri',
      difficulty: i % 3 === 0 ? 'medio' : 'facile',
      title: 'Quale bicchiere si riempie?',
      text: `L’acqua entra dall’alto nel bicchiere 1. Alcuni tubi sono bloccati con una X rossa. Disegna ${4 + (i % 4)} bicchieri: quale si riempie per primo?`,
      solution: 'Si riempie il primo bicchiere collegato da un percorso libero. I tubi bloccati non contano.',
      hook: 'Non guardare il bicchiere più vicino: segui il percorso dell’acqua.'
    });
  }

  // INTERUTTORI / FIAMMIFERI: 40 varianti
  for (let i = 0; i < 20; i++) {
    add({
      category: 'Interruttori',
      difficulty: 'medio',
      title: 'La lampadina nascosta',
      text: `Hai 3 interruttori e una lampadina in un’altra stanza. Puoi entrare una sola volta. Come capisci quale interruttore la accende?`,
      solution: 'Accendi il primo per qualche minuto, poi spegnilo. Accendi il secondo ed entra. Accesa = secondo, spenta ma calda = primo, spenta e fredda = terzo.',
      hook: 'La soluzione usa anche il calore, non solo la luce.'
    });
  }
  for (let i = 0; i < 20; i++) {
    add({
      category: 'Fiammiferi',
      difficulty: i % 2 === 0 ? 'facile' : 'medio',
      title: 'Prima cosa da accendere',
      text: `Hai un fiammifero. Davanti a te ci sono una candela ${colors[i % colors.length]}, una lanterna e un camino. Cosa accendi per primo?`,
      solution: 'Il fiammifero.',
      hook: 'La domanda dice “per primo”: lì c’è il tranello.'
    });
  }
})();
