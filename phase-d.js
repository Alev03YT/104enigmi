// Fase D: modalità IA sicura, tema, quiz del giorno e import quiz custom.
(function phaseD() {
  const $ = (id) => document.getElementById(id);
  const CUSTOM_KEY = 'customQuizBank104';
  const DAILY_KEY = 'dailyQuiz104';
  const THEME_KEY = 'theme104';

  function applyTheme() {
    const theme = localStorage.getItem(THEME_KEY) || 'dark';
    document.body.classList.toggle('light-theme', theme === 'light');
  }

  function toggleTheme() {
    const next = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, next);
    applyTheme();
    flash('themeBtn', next === 'light' ? 'Tema chiaro' : 'Tema scuro', 'Cambia tema');
  }

  function getCustomQuiz() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]'); }
    catch { return []; }
  }

  function saveCustomQuiz(items) {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(items));
  }

  function importCustomQuiz() {
    const raw = $('customQuizInput')?.value || '';
    const rows = raw.split('\n').map(row => row.trim()).filter(Boolean);
    const imported = [];

    rows.forEach(row => {
      const parts = row.split('|').map(x => x.trim());
      if (parts.length >= 4) {
        imported.push({
          category: parts[1] || 'Custom',
          difficulty: 'medio',
          title: parts[0],
          text: parts[2],
          solution: parts.slice(3).join(' | '),
          hook: 'Quiz personalizzato aggiunto da te.'
        });
      }
    });

    if (imported.length) {
      const current = getCustomQuiz();
      const merged = [...current, ...imported];
      saveCustomQuiz(merged);
      window.QUIZ_BANK.push(...imported);
      flash('importQuizBtn', `${imported.length} importati`, 'Importa quiz');
      if (typeof updateStats === 'function') updateStats();
    } else {
      flash('importQuizBtn', 'Formato errato', 'Importa quiz');
    }
  }

  function loadCustomQuiz() {
    const custom = getCustomQuiz();
    if (custom.length && Array.isArray(window.QUIZ_BANK)) {
      window.QUIZ_BANK.push(...custom);
    }
  }

  function createAIPrompt() {
    const brief = $('aiBrief')?.value || '';
    const category = $('typeSelect')?.value || 'mix';
    const difficulty = $('difficultySelect')?.value || 'mix';
    const currentTitle = $('quizTitle')?.textContent || '';
    const currentQuiz = $('quizText')?.textContent || '';

    const prompt = `Agisci come creator italiano specializzato in quiz virali per TikTok.\n\nObiettivo: crea un contenuto completo per il canale 104 Enigmi.\nCategoria desiderata: ${category}.\nDifficoltà: ${difficulty}.\nIspirazione attuale da non copiare: ${currentTitle} - ${currentQuiz}.\n\nRichiesta:\n${brief}\n\nFormato obbligatorio:\n1. Titolo breve e virale\n2. Categoria\n3. Domanda del quiz\n4. Soluzione\n5. Spiegazione breve\n6. Descrizione TikTok con CTA\n7. Massimo 5 hashtag\n8. Commento fissato con soluzione\n9. Script voice-over breve\n10. Prompt copertina verticale 9:16 con sfondo nero, testo bianco/giallo, accenti rossi, stile quiz virale italiano\n\nRegole:\n- Non usare quiz troppo famosi se possibile.\n- Deve essere comprensibile in meno di 15 secondi.\n- Deve spingere le persone a commentare.\n- Non inventare soluzioni ambigue.`;

    $('aiBrief').value = prompt;
    flash('aiPromptBtn', 'Prompt creato', 'Crea prompt IA');
  }

  async function copyAIPrompt() {
    try {
      await navigator.clipboard.writeText($('aiBrief').value);
      flash('copyAiPromptBtn', 'Copiato!', 'Copia prompt IA');
    } catch {
      $('aiBrief').select();
      document.execCommand('copy');
    }
  }

  function dailySeed() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  function seededIndex(seed, length) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    return Math.abs(hash) % Math.max(1, length);
  }

  function showDailyQuiz() {
    const bank = window.QUIZ_BANK || [];
    if (!bank.length) return;
    const seed = dailySeed();
    const index = seededIndex(seed, bank.length);
    const quiz = bank[index];
    localStorage.setItem(DAILY_KEY, JSON.stringify({ seed, quiz }));

    $('quizCategory').textContent = `${quiz.category} • quiz del giorno`;
    $('quizTitle').textContent = quiz.title;
    $('quizText').textContent = quiz.text;
    $('solution').textContent = quiz.solution;
    if ($('description')) $('description').value = `🧠 Quiz del giorno: ${quiz.title}\n\n${quiz.text}\n\nScrivi la risposta nei commenti 👇\n\n#quizlogico #enigmi #brainchallenge #indovinelli #tiktokitalia`;
    if ($('pinnedComment')) $('pinnedComment').value = `✅ SOLUZIONE:\n${quiz.solution}\n\nCi eri arrivato? 👇`;
    if ($('voiceover')) $('voiceover').value = `Quiz del giorno. ${quiz.text} Hai pochi secondi per rispondere.`;
    if ($('imagePrompt')) $('imagePrompt').value = `Poster verticale 9:16 per TikTok, stile quiz virale italiano, titolo "QUIZ DEL GIORNO", categoria "${quiz.category}", domanda "${quiz.title}", testo "${quiz.text}", sfondo nero, testo bianco e giallo, accenti rossi.`;
    flash('dailyQuizBtn', 'Caricato!', 'Quiz del giorno');
  }

  function flash(id, text, original) {
    const btn = $(id);
    if (!btn) return;
    btn.textContent = text;
    setTimeout(() => { btn.textContent = original; }, 1400);
  }

  loadCustomQuiz();
  applyTheme();

  $('themeBtn')?.addEventListener('click', toggleTheme);
  $('importQuizBtn')?.addEventListener('click', importCustomQuiz);
  $('aiPromptBtn')?.addEventListener('click', createAIPrompt);
  $('copyAiPromptBtn')?.addEventListener('click', copyAIPrompt);
  $('dailyQuizBtn')?.addEventListener('click', showDailyQuiz);
})();
