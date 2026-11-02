(function installEngine(){
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const DIGITS = '0123456789';
  const people = ['Luca','Giulia','Marco','Sara','Anna','Paolo','Marta','Davide','Elena','Nico'];
  const objects = ['monete','biglie','sassolini','gettoni','caramelle','matite'];
  const rand = (lo,hi) => lo + Math.floor(Math.random()*(hi-lo+1));
  const pick = a => a[rand(0,a.length-1)];
  function mix(a){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=rand(0,i);[b[i],b[j]]=[b[j],b[i]]}return b}
  function base(category,difficulty,family,title,text,solution,hook='Ragiona su ogni indizio prima di rispondere.'){
    return {category,difficulty,family,title,text,solution,hook,verified:true};
  }
  function math(d){
    if(d==='facile'){
      if(rand(0,1)){const a=rand(12,60),b=rand(4,18);return base('Matematica',d,'somma','Calcolo lampo',`Hai ${a} gettoni e ne ricevi altri ${b}. Quanti gettoni hai in totale?`,`${a+b} gettoni: ${a} + ${b} = ${a+b}.`)}
      const price=pick([40,60,80,100,120,200]),pct=pick([10,20,25,50]);return base('Matematica',d,'sconto','Quanto paghi?',`Un articolo costa ${price} €. C'è uno sconto del ${pct}%. Quanto paghi?`,`${price*(100-pct)/100} €: lo sconto vale ${price*pct/100} €.`);
    }
    if(d==='medio'){
      if(rand(0,1)){const son=rand(6,24),diff=rand(20,40);return base('Matematica',d,'eta','Padre e figlio',`Padre e figlio hanno insieme ${2*son+diff} anni. Il padre ha ${diff} anni più del figlio. Quanti anni ha il figlio?`,`${son} anni. (${2*son+diff} - ${diff}) / 2 = ${son}.`)}
      const m=rand(3,9),t=pick([3,5,6,8,10]),target=m*rand(3,12);return base('Matematica',d,'macchine','Macchine e pezzi',`Se ${m} macchine producono ${m} pezzi in ${t} minuti, quanti minuti servono a ${target} macchine per produrre ${target} pezzi, lavorando allo stesso ritmo?`,`${t} minuti. Ogni macchina produce un pezzo in ${t} minuti.`);
    }
    if(d==='difficile'){
      if(rand(0,1)){const a=rand(12,45),b=rand(4,11),c=rand(5,15);return base('Matematica',d,'equazione','Trova il numero',`Penso a un numero. Lo moltiplico per ${b}, aggiungo ${c} e ottengo ${a*b+c}. Qual è il numero?`,`${a}. (${a*b+c} - ${c}) / ${b} = ${a}.`)}
      const x=rand(8,32),y=rand(3,x-1);return base('Matematica',d,'sistema','Due numeri misteriosi',`La somma di due numeri è ${x+y} e la loro differenza (maggiore meno minore) è ${x-y}. Qual è il numero più grande?`,`${x}. La metà della somma fra ${x+y} e ${x-y} è ${x}.`);
    }
    const a=rand(8,32),b=rand(5,29),c=rand(7,28),ab=a+b,bc=b+c,ac=a+c;
    return base('Matematica',d,'tripla','Tre numeri segreti',`Tre numeri A, B e C soddisfano A+B=${ab}, B+C=${bc}, A+C=${ac}. Quanto vale B?`,`${b}. B = ((${ab}) + (${bc}) - (${ac})) / 2 = ${b}.`);
  }
  function sequence(d){
    const start=rand(1,15);
    if(d==='facile'){const delta=rand(2,12);const s=Array.from({length:5},(_,i)=>start+i*delta);return base('Sequenze',d,'aritmetica','Completa la sequenza',`${s.join(' · ')} · ?`,`${start+5*delta}. Si aggiunge ogni volta ${delta}.`);}
    if(d==='medio'){const q=pick([2,3,4]),k=rand(1,18);const s=Array.from({length:5},(_,i)=>k*q**i);return base('Sequenze',d,'geometrica','Qual è il prossimo?',`${s.join(' · ')} · ?`,`${k*q**5}. Ogni termine si moltiplica per ${q}.`);}
    if(d==='difficile'){const k=rand(2,16),s=Array.from({length:5},(_,i)=>(i+1)**2+k);return base('Sequenze',d,'quadrati','Il numero mancante',`${s.join(' · ')} · ?`,`${36+k}. Sono i quadrati consecutivi 1², 2²... più ${k}.`);}
    const a=rand(2,10),b=rand(13,28),da=rand(3,9),db=rand(2,8);const s=Array.from({length:6},(_,i)=>i%2===0?a+Math.floor(i/2)*da:b+Math.floor(i/2)*db);
    return base('Sequenze',d,'alternata','Due sequenze nascoste',`${s.join(' · ')} · ?`,`${a+3*da}. Le posizioni dispari crescono di ${da}, le pari di ${db}.`);
  }
  function logic(d){
    if(d==='facile'){const n=rand(15,80),t=rand(3,n-5),o=pick(objects);return base('Logica',d,'prendi','Leggi la domanda',`Sul tavolo ci sono ${n} ${o}. Tu ne prendi ${t}. Quanti ${o} hai tu?`,`${t}. Hai preso esattamente ${t} ${o}.`);}
    if(d==='medio'){const order=mix(people).slice(0,3);return base('Logica',d,'ordine-3','Chi arriva per primo?',`${order[0]} arriva prima di ${order[1]}, e ${order[1]} prima di ${order[2]}. Chi arriva per primo?`,`${order[0]}. È davanti a entrambi.`);}
    if(d==='difficile'){const order=mix(people).slice(0,4);const clues=mix([`${order[0]} arriva prima di ${order[1]}`,`${order[1]} arriva prima di ${order[2]}`,`${order[2]} arriva prima di ${order[3]}`]);return base('Logica',d,'ordine-4','Chi è arrivato ultimo?',`Quattro persone arrivano una dopo l'altra. ${clues.join('; ')}. Chi arriva ultimo?`,`${order[3]}. L'ordine completo è ${order.join(' → ')}.`);}
    const order=mix(people).slice(0,5);const clues=mix(order.slice(0,-1).map((n,i)=>`${n} è davanti a ${order[i+1]}`));return base('Logica',d,'ordine-5','Cinque posti in fila',`Cinque persone sono in fila. ${clues.join('; ')}. Chi si trova esattamente al centro?`,`${order[2]}. La fila è ${order.join(' → ')}.`);
  }
  function attention(d){
    if(d==='facile'){const n=rand(20,90),left=rand(3,19),o=pick(objects);return base('Attenzione',d,'tranne','Quanti ne restano?',`Hai ${n} ${o}. Li perdi tutti tranne ${left}. Quanti te ne restano?`,`${left}. "Tutti tranne ${left}" significa che ${left} rimangono.`);}
    if(d==='medio'){const p=rand(2,7),n=rand(p+3,p+14),name=pick(people);return base('Attenzione',d,'sorpasso','Il sorpasso',`${name} sta correndo ed è al ${p+1}° posto. Supera chi è al ${p}° posto. A che posto si trova ora?`,`${p}° posto. Prende il posto di chi ha superato.`);}
    const days=['lunedì','martedì','mercoledì','giovedì','venerdì','sabato','domenica'];
    const i=rand(0,6),offset=d==='difficile'?rand(50,100):rand(400,900),next=days[(i+offset)%7];
    return base('Attenzione',d,'giorni',d==='esperto'?'Il calendario impossibile':'Che giorno sarà?',`Oggi è ${days[i]}. Che giorno della settimana sarà fra esattamente ${offset} giorni?`,`${next}. ${offset} diviso 7 lascia resto ${offset%7}, quindi avanzi di ${offset%7} giorni.`);
  }
  const candidateCache={};
  function candidates(n){
    if(candidateCache[n])return candidateCache[n];
    const out=[];function rec(prefix,remaining){if(prefix.length===n){out.push(prefix);return}for(let i=0;i<remaining.length;i++)rec(prefix+remaining[i],remaining.slice(0,i)+remaining.slice(i+1))}
    rec('',DIGITS);candidateCache[n]=out;return out;
  }
  function marks(secret,guess){
    let exact=0,present=0;for(let i=0;i<secret.length;i++){if(secret[i]===guess[i])exact++;if(secret.includes(guess[i]))present++}return [exact,present-exact];
  }
  function codeText(e,w){
    if(!e&&!w)return 'NESSUNA CIFRA È PRESENTE';
    if(e&&!w)return `${e===1?'UNA CIFRA È GIUSTA':e+' CIFRE SONO GIUSTE'} ${e===1?'ED È':'E SONO'} AL POSTO GIUSTO`;
    if(!e&&w)return `${w===1?'UNA CIFRA È GIUSTA':w+' CIFRE SONO GIUSTE'} MA ${w===1?'NEL POSTO':'NEI POSTI'} SBAGLIATI`;
    return `${e} ${e===1?'CIFRA AL POSTO GIUSTO':'CIFRE AL POSTO GIUSTO'} E ${w} ${w===1?'NEL POSTO SBAGLIATO':'NEI POSTI SBAGLIATI'}`;
  }
  function code(d){
    const n=d==='esperto'?5:d==='difficile'?4:3, count=d==='facile'?4:d==='medio'?5:d==='difficile'?6:7, all=candidates(n);
    for(let run=0;run<(n===5?3:5);run++){
      const secret=pick(all),clues=[],used=new Set(),types=new Set();let remain=all;
      for(let step=0;step<count;step++){
        let best=null;
        const tries=step===count-1?90:32;
        for(let sample=0;sample<tries;sample++){
          const guess=pick(all);
          if(used.has(guess)||guess===secret)continue;
          const [e,w]=marks(secret,guess);
          if(e===n||(!e&&!w&&d!=='facile')|| (d==='esperto'&& e+w<=1))continue;
          const next=remain.filter(v=>{const a=marks(v,guess);return a[0]===e&&a[1]===w});
          if(next.length===remain.length)continue;
          if(step<count-1&&next.length===1)continue;
          if(step===count-1&&next.length!==1)continue;
          const target=step===count-1?1:Math.max(2,Math.round(remain.length*Math.pow(1/Math.max(2,remain.length),1/(count-step))));
          const score=-Math.abs(next.length-target)*4 + (types.has(`${e},${w}`)?-10:8) + (e+w>=2?5:0);
          if(!best||score>best.score)best={guess,e,w,next,score};
        }
        if(!best)break;
        used.add(best.guess);types.add(`${best.e},${best.w}`);clues.push(best);remain=best.next;
      }
      if(clues.length===count&&remain.length===1&&remain[0]===secret){
        const prompt=clues.map(c=>`${c.guess} → ${codeText(c.e,c.w)}`).join('\n');
        return base('Trova il codice',d,'codice-'+n,`Codice segreto da ${n} cifre`,`${prompt}\n\nQUAL È IL CODICE?`,`${secret}. Gli indizi lasciano una sola combinazione compatibile. Progressione: ${clues.map((c)=>c.next.length).join(' → ')} possibili codici.`,`Una sola soluzione. Scrivi solo ${n} cifre nei commenti.`);
      }
    }
    return null;
  }
  const extra=(function extraCategories(){
  const chooseName = n => mix(people).slice(0,n);
  function testimony(kind,d){
    const n=d==='facile'?3:d==='medio'?3:4;
    const target=d==='facile'?1:d==='medio'?2:d==='difficile'?2:3;
    const labels=kind==='porte'?['A','B','C','D'].slice(0,n):chooseName(n);
    for(let tries=0;tries<200;tries++){
      const claims=Array.from({length:n},()=>({index:rand(0,n-1),negative:rand(0,1)===1}));
      const truth=(claim,culprit)=>(claim.index===culprit)!==claim.negative;
      const valid=labels.map((_,i)=>i).filter(i=>claims.filter(c=>truth(c,i)).length===target);
      if(valid.length!==1)continue;
      const answer=valid[0];
      const phrases=claims.map((c,i)=>`${kind==='porte'?'Cartello sulla porta':'Testimonianza di'} ${labels[i]}: «${kind==='porte'?"L’uscita è":'Il colpevole è'} ${c.negative?'NON ':''}${kind==='porte'?'dietro la porta ':''}${labels[c.index]}»`);
      const t=`${kind==='porte'?'Una sola porta conduce all’uscita':'Una sola persona è colpevole'}. ${target} delle ${n} frasi seguenti ${target===1?'è vera':'sono vere'}. ${phrases.join('; ')}. ${kind==='porte'?'Quale porta conduce all’uscita?':'Chi è il colpevole?'}`;
      const trueOnes=claims.map((c,i)=>truth(c,answer)?labels[i]:null).filter(Boolean);
      return base(kind==='porte'?'Osservazione':'Detective',d,kind+'-'+n,
        kind==='porte'?'La porta giusta':'Chi sta mentendo?',t,
        `${labels[answer]}. Se è la risposta, le affermazioni vere sono quelle di ${trueOnes.join(', ')} (${target} in totale).`,
        'Non indovinare: prova ogni possibilità e conta le frasi vere.');
    }
    return null;
  }
  function matches(d){
    if(d==='facile'||d==='medio'){const k=d==='facile'?rand(2,5):rand(6,12);
      return base('Fiammiferi',d,'quadrati-fila','Quanti fiammiferi?',`Costruisci ${k} quadrati in fila, ciascuno con un lato condiviso col quadrato accanto. Ogni lato è un fiammifero. Quanti fiammiferi servono in tutto?`,
       `${3*k+1}. Il primo quadrato richiede 4, ognuno dei ${k-1} successivi aggiunge 3.`);
    }
    const rows=d==='difficile'?rand(2,4):rand(4,7),cols=d==='difficile'?rand(3,6):rand(5,8);
    const count=2*rows*cols+rows+cols;
    return base('Fiammiferi',d,'griglia','La griglia di fiammiferi',`Realizzi una griglia rettangolare con ${rows} righe e ${cols} colonne di quadratini. Ogni lato usa un fiammifero e i lati condivisi si contano una volta. Quanti fiammiferi servono?`,
      `${count}. Lati verticali: ${rows}×${cols+1}=${rows*(cols+1)}; orizzontali: ${cols}×${rows+1}=${cols*(rows+1)}.`);
  }
  function cups(d){
    const n=d==='facile'?rand(6,12):d==='medio'?rand(9,15):d==='difficile'?rand(13,20):rand(19,27);
    const steps=d==='facile'?[2]:d==='medio'?[2,3]:d==='difficile'?[2,3,4]:[2,3,4,5];
    const flips=Array(n).fill(0);
    for(const k of steps)for(let i=k;i<=n;i+=k)flips[i-1]^=1;
    const up=flips.filter(x=>!x).length;
    return base('Bicchieri',d,`giri-${steps.join('-')}`,'I bicchieri capovolti',
      `Hai ${n} bicchieri in fila, tutti inizialmente rivolti verso l’alto. Capovolgi una volta quelli nelle posizioni multiple di ${steps.join(', poi di ')} (a partire dalla posizione 1). Quanti restano rivolti verso l’alto?`,
      `${up}. Un bicchiere resta verso l'alto se viene capovolto un numero pari di volte.`);
  }
  function switches(d){
    const n=d==='facile'?3:d==='medio'?4:d==='difficile'?5:6;
    const presses=d==='facile'?4:d==='medio'?6:d==='difficile'?9:13;
    const p=Array.from({length:presses},()=>rand(1,n));
    const values=Array(n).fill(false);p.forEach(i=>values[i-1]=!values[i-1]);
    const lit=values.map((on,i)=>on?i+1:null).filter(Boolean);
    return base('Interruttori',d,`interruttori-${n}`,'Le luci accese',
     `Ci sono ${n} lampadine spente, ognuna comandata dal proprio interruttore numerato. Premendo un interruttore cambi lo stato della sua lampadina. Premi, nell'ordine: ${p.join(', ')}. Quante lampadine sono accese alla fine?`,
     `${lit.length}. Restano accese le lampadine n. ${lit.length?lit.join(', '):'nessuna'}: una lampadina si accende dopo un numero dispari di pressioni.`);
  }
  function words(d){
    const words=['CASA','GATTO','LUNA','SOLE','MARE','LIBRO','STELLA','MENTE','CUORE','MONDO','FIORE','TEMPO','AMICO','PORTA','NOTTE','PONTE','NUVOLA','SEGRETO','LETTERA','PIRATA'];
    const word=pick(words),shift=d==='facile'?1:d==='medio'?rand(2,3):d==='difficile'?rand(4,6):rand(7,12);
    const code=[...word].map(x=>String.fromCharCode(65+(x.charCodeAt(0)-65+shift)%26)).join('');
    return base('Parole',d,'cifrario-caesar','Decifra il messaggio',
      `Ho sostituito ogni lettera con quella che si trova ${shift} posizioni DOPO nell'alfabeto A-Z (dopo Z si torna ad A). Il testo cifrato è «${code}». Qual è la parola originale?`,
      `${word}. Per decifrare, sposta ogni lettera di ${shift} posizioni indietro.`);
  }
  return {detective:d=>testimony('detective',d),porte:d=>testimony('porte',d),fiammiferi:matches,bicchieri:cups,interruttori:switches,parole:words};
})();
  const methods={matematica:math,sequenze:sequence,logica:logic,attenzione:attention,codici:code,...extra};
  function generate(category,difficulty){
    const keys=Object.keys(methods);
    const key=category==='mix'?pick(keys):category;
    const d=difficulty==='mix'?pick(['facile','medio','difficile','esperto']):difficulty;
    return methods[key]?methods[key](d):null;
  }
  root.QuizEngineV2={generate,marks,candidates,codeText,version:'2.0.0',supported:Object.keys(methods)};
})();
