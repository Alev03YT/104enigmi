// Fase C: strumenti creator avanzati.
// Aggiunge preferiti, calendario editoriale settimanale ed esportazione CSV.
(function phaseC() {
  const $ = (id) => document.getElementById(id);
  const STORAGE_KEY = 'favoriteQuizVideos';

  function getCurrentContent() {
    return {
      title: $('quizTitle')?.textContent || '',
      category: $('quizCategory')?.textContent || '',
      quiz: $('quizText')?.textContent || '',
      solution: $('solution')?.textContent || '',
      videoPlan: $('videoPlan')?.textContent || '',
      description: $('description')?.value || '',
      pinnedComment: $('pinnedComment')?.value || '',
      voiceover: $('voiceover')?.value || '',
      coverPrompt: $('imagePrompt')?.value || '',
      savedAt: new Date().toLocaleString('it-IT')
    };
  }

  function getFavorites() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }

  function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.slice(-200)));
  }

  function formatContent(item, index = null) {
    const prefix = index ? `${index}. ` : '';
    return `${prefix}${item.title}\nCategoria: ${item.category}\nQuiz: ${item.quiz}\nSoluzione: ${item.solution}\nPiano video: ${item.videoPlan}\nVoice-over: ${item.voiceover}\nDescrizione: ${item.description}\nCommento fissato: ${item.pinnedComment}\nPrompt copertina: ${item.coverPrompt}\nSalvato: ${item.savedAt}`;
  }

  function renderFavorites() {
    const favorites = getFavorites();
    const output = $('favoritesOutput');
    if (!output) return;
    output.value = favorites.length
      ? favorites.map((item, i) => formatContent(item, i + 1)).join('\n\n-----------------------------\n\n')
      : 'Nessun preferito salvato.';
  }

  function saveCurrentFavorite() {
    const current = getCurrentContent();
    const favorites = getFavorites();
    const key = `${current.title}|${current.quiz}`;
    if (!favorites.some(item => `${item.title}|${item.quiz}` === key)) {
      favorites.push(current);
      saveFavorites(favorites);
    }
    renderFavorites();
    flashButton('favoriteBtn', 'Salvato!', 'Salva preferito');
  }

  function clearFavorites() {
    localStorage.removeItem(STORAGE_KEY);
    renderFavorites();
    flashButton('clearFavoritesBtn', 'Svuotati!', 'Svuota preferiti');
  }

  function generateWeekPlan() {
    const days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
    const slots = ['12:30', '18:30', '21:00'];
    const rows = [];
    const generateBtn = $('generateBtn');

    days.forEach((day) => {
      slots.forEach((time) => {
        generateBtn?.click();
        const item = getCurrentContent();
        rows.push(`${day} ore ${time}\nTitolo: ${item.title}\nCategoria: ${item.category}\nQuiz: ${item.quiz}\nSoluzione: ${item.solution}\nDescrizione: ${item.description}\nPrompt copertina: ${item.coverPrompt}`);
      });
    });

    $('calendarOutput').value = rows.join('\n\n-----------------------------\n\n');
    flashButton('weekPlanBtn', 'Creato!', 'Piano 7 giorni');
  }

  function csvEscape(value) {
    return `"${String(value).replaceAll('"', '""').replaceAll('\n', ' ')}"`;
  }

  function exportCSV() {
    const favorites = getFavorites();
    const current = getCurrentContent();
    const calendarText = $('calendarOutput')?.value || '';
    const batchText = $('batchOutput')?.value || '';
    const rows = [];

    rows.push(['tipo', 'titolo', 'categoria', 'quiz', 'soluzione', 'piano_video', 'voiceover', 'descrizione', 'commento_fissato', 'prompt_copertina', 'data'].map(csvEscape).join(','));
    rows.push(['corrente', current.title, current.category, current.quiz, current.solution, current.videoPlan, current.voiceover, current.description, current.pinnedComment, current.coverPrompt, current.savedAt].map(csvEscape).join(','));

    favorites.forEach((item) => {
      rows.push(['preferito', item.title, item.category, item.quiz, item.solution, item.videoPlan, item.voiceover, item.description, item.pinnedComment, item.coverPrompt, item.savedAt].map(csvEscape).join(','));
    });

    if (calendarText && !calendarText.startsWith('Premi')) {
      rows.push(['calendario_testo', 'Piano 7 giorni', '', calendarText, '', '', '', '', '', '', new Date().toLocaleString('it-IT')].map(csvEscape).join(','));
    }
    if (batchText && !batchText.startsWith('Premi')) {
      rows.push(['batch_testo', '30 idee', '', batchText, '', '', '', '', '', '', new Date().toLocaleString('it-IT')].map(csvEscape).join(','));
    }

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `104-enigmi-export-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    flashButton('exportCsvBtn', 'CSV creato!', 'Esporta CSV');
  }

  function flashButton(id, text, original) {
    const btn = $(id);
    if (!btn) return;
    btn.textContent = text;
    setTimeout(() => { btn.textContent = original; }, 1400);
  }

  $('favoriteBtn')?.addEventListener('click', saveCurrentFavorite);
  $('clearFavoritesBtn')?.addEventListener('click', clearFavorites);
  $('weekPlanBtn')?.addEventListener('click', generateWeekPlan);
  $('exportCsvBtn')?.addEventListener('click', exportCSV);

  renderFavorites();
})();
