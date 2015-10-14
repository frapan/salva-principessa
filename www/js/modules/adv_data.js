'use strict';
define(['adv_room', 'lodash'], function(Room, _) {
  var adv_engine, adv_ui;
  var roomMap = Create2DArray(7);
  var verbs;
  var nouns;
  var sentences = [];

  function init(engine, ui) {
    adv_engine = engine;
    adv_ui = ui;

    // Le coordinate (x,y) partono dall'angolo in basso a sinistra (0,0)
    roomMap[4][0] = new Room(adv_engine)
      .setImage('scuola-musica.jpg')
      .setTitle('Scuola di musica')
      .setDescription('Ti accoglie un maestro di musica.')
      .setAvailableExits(['N'])
      .setAvailableObjectMainNames(['Maestro/teacher']);

    roomMap[1][1] = new Room(adv_engine)
      .setImage('elfo.jpg')
      .setTitle('Bosco')
      .setDescription('Sei all\'interno di un fitto bosco. C\'è una strana creatura di fronte a te.')
      .setAvailableExits(['N', 'E'])
      .setAvailableObjectMainNames(['Elfo']);

    roomMap[2][1] = new Room(adv_engine)
      .setImage('')
      .setImage('bosco.jpg')
      .setDescription('Sei all\'interno di un fitto bosco.')
      .setAvailableExits(['N', 'O'])
      .setAvailableObjectMainNames(['Siepe']);

    roomMap[3][1] = new Room(adv_engine)
      .setImage('taverna.jpg')
      .setTitle('Taverna')
      .setDescription('Sei all\'interno della taverna. Oltre all\'oste ci sono diverse persone sedute ai tavolini che bevono vino in allegria.')
      .setAvailableExits(['E'])
      .setAvailableObjectMainNames(['Oste']);

    roomMap[4][1] = new Room(adv_engine)
      .setImage('piazza-centrale.jpg')
      .setTitle('Piazza centrale')
      .setDescription('Ti trovi nella piazza centrale del paese. A ovest vedi una taverna, a sud una scuola di musica e a est il negozio di un liutaio.')
      .setAvailableExits(['N', 'S', 'E', 'O'])
      .setAvailableObjectMainNames([]);

    roomMap[5][1] = new Room(adv_engine)
      .setImage('liutaio.jpg')
      .setTitle('Negozio del liutaio')
      .setDescription('E\' piuttosto buio, ma nell\'oscurità riesci a vedere un uomo che sta lavorando.')
      .setAvailableExits(['O'])
      .setAvailableObjectMainNames(['Liutaio']);

    roomMap[1][2] = new Room(adv_engine)
      .setImage('bosco.jpg')
      .setTitle('Bosco')
      .setDescription('Sei all\'interno di un fitto bosco.')
      .setAvailableExits(['N', 'S', 'E'])
      .setAvailableObjectMainNames([]);

    roomMap[2][2] = new Room(adv_engine)
      .setImage('bosco.jpg')
      .setTitle('Bosco')
      .setDescription('Sei all\'interno di un fitto bosco.')
      .setAvailableExits(['S', 'E', 'O'])
      .setAvailableObjectMainNames([]);

    roomMap[3][2] = new Room(adv_engine)
      .setImage('ingresso-bosco.jpg')
      .setTitle('Ingresso del bosco')
      .setDescription('Ad ovest scorgi un bosco con molti alberi e poca luce.')
      .setAvailableExits(['E'])
      .setAvailableObjectMainNames(['Cartello-divieto']);

    roomMap[4][2] = new Room(adv_engine)
      .setImage('crocevia.jpg')
      .setTitle('Crocevia')
      .setDescription('Ti trovi in un crocevia fra quattro sentieri.')
      .setAvailableExits(['N', 'S', 'E', 'O'])
      .setAvailableObjectMainNames(['Cartello-indicazioni']);

    roomMap[5][2] = new Room(adv_engine)
      .setImage('sentiero.jpg')
      .setTitle('Sentiero')
      .setDescription('Sei sul sentiero che porta al castello.')
      .setAvailableExits(['E', 'O'])
      .setAvailableObjectMainNames([]);

    roomMap[6][2] = new Room(adv_engine)
      .setImage('sentiero.jpg')
      .setTitle('Sentiero')
      .setDescription('Sei sul sentiero che porta al castello. Vedi un bidone della spazzatura a lato del sentiero.')
      .setAvailableExits(['N', 'O'])
      .setAvailableObjectMainNames(['Bidone']);

    roomMap[0][3] = new Room(adv_engine)
      .setImage('funghi.jpg')
      .setTitle('Bosco')
      .setDescription('Sei all\'interno di un fitto bosco. Vedi tre strani funghi.')
      .setAvailableExits(['E'])
      .setAvailableObjectMainNames(['Fungo-sinistra', 'Fungo-centro', 'Fungo-destra']);

    roomMap[1][3] = new Room(adv_engine)
      .setImage('bosco.jpg')
      .setTitle('Bosco')
      .setDescription('Sei all\'interno di un fitto bosco. Ad est vedi una caverna nella roccia.')
      .setAvailableExits(['S', 'E', 'O'])
      .setAvailableObjectMainNames([]);

    roomMap[2][3] = new Room(adv_engine)
      .setImage('caverna.jpg')
      .setTitle('Caverna')
      .setDescription('Sei all\'interno della caverna, piena di ragnatele. In un angolo scorgi un baule.')
      .setAvailableExits(['O'])
      .setAvailableObjectMainNames(['Baule', 'Chiave-rossa/red-key', 'Chiave-verde/green-key', 'Chiave-blu/blue-key']);

    roomMap[3][3] = new Room(adv_engine)
      .setImage('granchio.jpg')
      .setTitle('Spiaggia')
      .setDescription('Sei nel bel mezzo di una grandissima spiaggia.')
      .setAvailableExits(['N'])
      .setAvailableObjectMainNames(['Granchio']);

    roomMap[4][3] = new Room(adv_engine)
      .setImage('spiaggia.jpg')
      .setTitle('Spiaggia')
      .setDescription('Sei nel bel mezzo di una grandissima spiaggia.')
      .setAvailableExits(['N', 'S'])
      .setAvailableObjectMainNames([]);

    roomMap[5][3] = new Room(adv_engine)
      .setImage('spiaggia.jpg')
      .setTitle('Spiaggia')
      .setDescription('Sei nel bel mezzo di una grandissima spiaggia.')
      .setAvailableExits(['N'])
      .setAvailableObjectMainNames([]);

    roomMap[6][3] = new Room(adv_engine)
      .setImage('melo.jpg')
      .setTitle('Sentiero')
      .setDescription('Sei sul sentiero che porta al castello. Vedi un albero di mele.')
      .setAvailableExits(['N', 'S'])
      .setAvailableObjectMainNames(['Melo/apple-tree']);

    roomMap[3][4] = new Room(adv_engine)
      .setImage('spiaggia.jpg')
      .setTitle('Spiaggia')
      .setDescription('Sei nel bel mezzo di una grandissima spiaggia.')
      .setAvailableExits(['N', 'S', 'E'])
      .setAvailableObjectMainNames([]);

    roomMap[4][4] = new Room(adv_engine)
      .setImage('spiaggia.jpg')
      .setTitle('Spiaggia')
      .setDescription('Sei nel bel mezzo di una grandissima spiaggia.')
      .setAvailableExits(['N', 'S', 'E', 'O'])
      .setAvailableObjectMainNames([]);

    roomMap[5][4] = new Room(adv_engine)
      .setImage('spiaggia.jpg')
      .setTitle('Spiaggia')
      .setDescription('Sei nel bel mezzo di una grandissima spiaggia.')
      .setAvailableExits(['N', 'S', 'O'])
      .setAvailableObjectMainNames([]);

    roomMap[6][4] = new Room(adv_engine)
      .setImage('sentiero.jpg')
      .setTitle('Sentiero')
      .setDescription('Sei sul sentiero che porta al castello.')
      .setAvailableExits(['N', 'S'])
      .setAvailableObjectMainNames([]);

    roomMap[3][5] = new Room(adv_engine)
      .setImage('spiaggia.jpg')
      .setTitle('Spiaggia')
      .setDescription('Sei nel bel mezzo di una grandissima spiaggia.')
      .setAvailableExits(['S', 'E'])
      .setAvailableObjectMainNames([]);

    roomMap[4][5] = new Room(adv_engine)
      .setImage('spiaggia.jpg')
      .setTitle('Spiaggia')
      .setDescription('Sei nel bel mezzo di una grandissima spiaggia.')
      .setAvailableExits(['S', 'E', 'O'])
      .setAvailableObjectMainNames([]);

    roomMap[5][5] = new Room(adv_engine)
      .setImage('conchiglia.jpg')
      .setTitle('Spiaggia')
      .setDescription('Sei nel bel mezzo di una grandissima spiaggia.')
      .setAvailableExits(['S', 'O'])
      .setAvailableObjectMainNames(['Conchiglia/shell']);

    roomMap[6][5] = new Room(adv_engine)
      .setImage('entrata-castello.jpg')
      .setTitle('Entrata del castello')
      .setDescription('Sei all\'ingresso del castello. Vedi in lontanza dei grossi cani a guardia del castello.')
      .setAvailableExits(['S'])
      .setAvailableObjectMainNames(['Cani/dogs', 'Cartello-castello']);

    roomMap[6][6] = new Room(adv_engine)
      .setImage('drago.jpg')
      .setTitle('Castello')
      .setDescription('Sei arrivato al castello. Finalmente puoi vedere la principessa che è sana e salva, ma un grosso drago la tiene imprigionata.')
      .setAvailableExits(['S'])
      .setAvailableObjectMainNames(['Drago/dragon']);

  }
  
  verbs = [
    // Verbo principale seguito dai sinonimi
    {synonyms: ['N', 'Nord', 'North']},
    {synonyms: ['S', 'Sud', 'South']},
    {synonyms: ['E', 'Est', 'East']},
    {synonyms: ['O', 'Ovest', 'West', 'W']},
    {synonyms: ['I', 'Inventario', 'Inventory']},
    {synonyms: ['H', 'Help', 'Aiuto']},
    {synonyms: ['Prendi', 'Take']},
    {synonyms: ['Lascia', 'Drop']},
    {synonyms: ['Esamina', 'Guarda', 'Osserva', 'Leggi', 'Examine', 'Look']},
    {synonyms: ['Parla', 'Talk']},
    {synonyms: ['Dai', 'Give']},
    {synonyms: ['Metti', 'Infila', 'Inserisci', 'Put']},
    {synonyms: ['Apri', 'Open']},
    {synonyms: ['Scuoti', 'Shake']},
    {synonyms: ['Mangia', 'Eat']},
    {synonyms: ['Dai', 'Give']},
    {synonyms: ['Spara', 'Shoot']},
    {synonyms: ['Suona', 'Play']},
    {synonyms: ['12']},
    {synonyms: ['Alberto']},
    {synonyms: ['75']}
  ];

  nouns = [
    // Sostantivo principale seguito dai sinonimi
    {synonyms: ['Maestro/teacher'], description: 'Sembra una persona molto gentile e disponibile', canBeTaken: false},
    {synonyms: ['Elfo'], description: 'Sembra un po\' malconcio. Chissà perché...', canBeTaken: false, status: 'triste'},
    {synonyms: ['Siepe'], description: 'Osservando la siepe trovi nascosta una chiave blu.', canBeTaken: false, status: 'con chiave'},
    {synonyms: ['Oste'], description: 'Un grosso uomo a cui piace bere e chiaccherare.', canBeTaken: false},
    {synonyms: ['Liutaio'], description: 'Sta aggiustando una vecchia lira', canBeTaken: false},
    {synonyms: ['Cartello-divieto'], description: '"Lavori in corso: il passaggio sarà riaperto al più presto"', canBeTaken: false},
    {synonyms: ['Cartello-indicazioni'], description: 'C\'è scritto: "A nord: la spiaggia; a est: il castello; a sud: il villaggio; a ovest: il bosco".', canBeTaken: false},
    {synonyms: ['Bidone'], description: 'Esaminando il bidone trovi nascosta sotto di esso una banconota da 10€.', canBeTaken: false, status: 'con banconota'},
    {synonyms: ['Fungo-sinistra'], description: 'Che puzza! Fa un odore veramente sgradevole!!!', canBeTaken: false},
    {synonyms: ['Fungo-centro'], description: 'Aiuto! E\' velenoso... Svengo... Dopo 3 ore di dormita ti risvegli.', canBeTaken: false},
    {synonyms: ['Fungo-destra'], description: 'Osservando il fungo trovi nascosta una chiave verde', canBeTaken: false, status: 'con chiave'},
    {synonyms: ['Baule'], description: 'Il baule è chiuso. Ci sono tre serrature di colore rosso, verde e blu.', canBeTaken: false, status: 'non esaminato'},
    {synonyms: ['Fucile'], description: 'Fai attenzione: il fucile è carico!', canBeTaken: true},
    {synonyms: ['Melo/apple-tree', 'Albero', 'L\'albero', 'Apple-tree'], description: 'E\' carico di mele. Forse scuotendolo ne scende una...', canBeTaken: false},
    {synonyms: ['Mela/apple'], description: 'E\' una mela dall\'aspetto delizioso. Che voglia di mangiarla!!!', canBeTaken: true},
    {synonyms: ['Conchiglia/shell'], description: 'E\' enorme. Sopra c\'è scritto: "Solo chi risolverà gli indovinelli del granchio portà aprirmi".', canBeTaken: false, status:'chiusa'},
    {synonyms: ['Granchio'], description: 'Non sembra un granchio comune, ha un non so che di magico.', canBeTaken: false, status:'iniziale'},
    {synonyms: ['Cartello-castello'], description: 'C\'è scritto: "FOSSO"', canBeTaken: false, status: 'intero'},
    {synonyms: ['Cani/dogs'], description: 'Io non mi avvicinerei se fossi in te!', canBeTaken: false},
    {synonyms: ['Osso'], description: 'Un fantastico osso che piacerà molto ai tuoi amichetti!', canBeTaken: true},
    {synonyms: ['Drago/dragon'], description: 'Non ha un\'aria molto amichevole...', canBeTaken: false},
    {synonyms: ['Violino/violin'], description: 'Un rarissimo violino elfico... rotto.', canBeTaken: true, status: 'broken'},
    {synonyms: ['Banconota'], description: 'Un banconota da 10€.', canBeTaken: true},
    {synonyms: ['Chiave-verde/green-key'], description: 'Esaminando bene la chiave verde vedi... che è verde', canBeTaken: true},
    {synonyms: ['Chiave-rossa/red-key'], description: 'Esaminando bene la chiave rossa vedi... che è rossa', canBeTaken: true},
    {synonyms: ['Chiave-blu/blue-key'], description: 'Esaminando bene la chiave blu vedi... che è blu', canBeTaken: true},
    {synonyms: ['Serratura-verde'], description: 'Per una serratura verde ci vorrà una chiave verde!', canBeTaken: false, status:'chiusa'},
    {synonyms: ['Serratura-rossa'], description: 'Per una serratura rossa ci vorrà una chiave rossa!', canBeTaken: false, status:'chiusa'},
    {synonyms: ['Serratura-blu'], description: 'Per una serratura blu ci vorrà una chiave blu!', canBeTaken: false, status:'chiusa'}
  ];

  sentences = [
    {words: ['N']},
    {words: ['S']},
    {words: ['E']},
    {words: ['O']},
    {words: ['I']},
    {words: ['H'], action: helpFn},
    {words: ['Esamina', '*'], action: examineFn},
    {words: ['Prendi', '*'], action: takeFn},
    {words: ['Lascia', '*'], action: dropFn},
    {words: ['Parla', 'Maestro/teacher'], action: talkMaestroFn},
    {words: ['Parla', 'Liutaio'], action: talkLiutaioFn},
    {words: ['Dai', 'Banconota', 'Liutaio'], action: giveBanconotaFn},
    {words: ['Dai', 'Violino/violin', 'Liutaio'], action: giveBanconotaFn},
    {words: ['Parla', 'Oste'], action: talkOsteFn},
    {words: ['Parla', 'Elfo'], action: talkElfoFn},
    {words: ['Parla', 'Granchio'], action: talkGranchioFn},
    {words: ['Metti', 'Chiave-verde/green-key', 'Serratura-verde'], action: putChiaveVerdeFn},
    {words: ['Metti', 'Chiave-rossa/red-key', 'Serratura-rossa'], action: putChiaveRossaFn},
    {words: ['Metti', 'Chiave-blu/blue-key', 'Serratura-blu'], action: putChiaveBluFn},
    {words: ['Apri', 'Serratura-verde', 'Chiave-verde/green-key'], action: putChiaveVerdeFn},
    {words: ['Apri', 'Serratura-rossa', 'Chiave-rossa/red-key'], action: putChiaveRossaFn},
    {words: ['Apri', 'Serratura-blu', 'Chiave-blu/blue-key'], action: putChiaveBluFn},
    {words: ['Apri', 'Baule'], action: openBauleFn},
    {words: ['Apri', 'Conchiglia/shell'], action: openConchigliaFn},
    {words: ['Scuoti', 'Melo/apple-tree'], action: shakeMeloFn},
    {words: ['Mangia', 'Mela/apple'], action: eatMelaFn},
    {words: ['Dai', 'Mela/apple', 'Elfo'], action: giveMelaElfoFn},
    {words: ['Spara', 'Cartello-castello'], action: shootCartelloFn},
    {words: ['Dai', 'Osso', 'Cani/dogs'], action: giveOssoCaniFn},
    {words: ['Suona', 'Violino/violin'], action: playViolinoFn},
    {words: ['12'], action: answer12Fn},
    {words: ['Alberto'], action: answerAlbertoFn},
    {words: ['75'], action: answer75Fn}
  ];

  return {
    init: init,
    startRoomX: 4,
    startRoomY: 2,
    roomMap: roomMap,
    verbs: verbs,
    nouns: nouns,
    sentences: sentences
  };

  function Create2DArray(rows) {
    var arr = [];
    for (var i=0;i<rows;i++) {
       arr[i] = [];
    }
    return arr;
  }

  function helpFn(askedSentence) {
    var commands = _.filter(verbs, function(synonyms) {
      var mainWord = synonyms.synonyms[0];
      return mainWord !== '12' && mainWord !== 'Alberto' && mainWord !== '75';
    });
    commands = _.pluck(commands, 'synonyms').map(function(synonyms) {
      return '<li>' + synonyms.join(', ') + '</li>';
    });
    return 'Puoi usare i seguenti comandi:<ul>' + commands.join('') + '</ul>';
  }

  function examineFn(askedSentence) {
    var description;
    var currentRoom = adv_engine.getCurrentRoom();
    var objectMainName = adv_engine.getMainName(askedSentence[1]);
    var noun = adv_engine.getNounByMainName(objectMainName);
    if (!noun) {
      return 'Non capisco cosa vuoi esaminare.';
    }
   
    if (!adv_engine.userHasNoun(noun) && !currentRoom.hasNoun(noun)) {
      return 'Non è qui!';
    }

    if (objectMainName === 'Fungo-destra' && noun.status === 'con chiave') {
      noun.status = 'senza chiave';
      description = noun.description;
      noun.description = 'Semplicemente un fungo!';
      currentRoom.addObjectMainName('Chiave-verde/green-key');
      return description;
    }

    if (objectMainName === 'Baule') {

      if (noun.status === 'non esaminato') {
        noun.status = 'esaminato';
        currentRoom.addObjectMainName('Serratura-rossa');
        currentRoom.addObjectMainName('Serratura-verde');
        currentRoom.addObjectMainName('Serratura-blu');
        return noun.description;
      }
      if (noun.status === 'aperto') {
        noun.status = 'con fucile';
        currentRoom.addObjectMainName('Fucile');
        noun.description = 'Dentro al baule trovi un fucile.'
        return noun.description;
      }
    }

    if (objectMainName === 'Siepe' && noun.status === 'con chiave') {
      noun.status = 'senza chiave';
      description = noun.description;
      noun.description = 'Esaminando la siepe... ti fai male con una spina: per fortuna hai un cerotto con te!';
      currentRoom.addObjectMainName('Chiave-blu/blue-key');
      return description;
    }

    if (objectMainName === 'Bidone' && noun.status === 'con banconota') {
      noun.status = 'senza banconota';
      description = noun.description;
      noun.description = 'Guardi bene attorno al bidone e non trovi niente, poi ci guardi dentro e ci finisci dentro. Ne esci dopo un\'ora tutto puzzolente!';
      currentRoom.addObjectMainName('Banconota');
      return description;
    }

    return noun.description;
  }

  function takeFn(askedSentence) {
    var currentRoom = adv_engine.getCurrentRoom();
    var objectMainName = adv_engine.getMainName(askedSentence[1]);
    var noun = adv_engine.getNounByMainName(objectMainName);
    if (!noun || !noun.canBeTaken || adv_engine.userHasNoun(noun)) {
      return 'Non puoi prenderlo!';
    }
    if (currentRoom.hasObjectMainName(objectMainName)) {

      if (objectMainName === 'Fucile') {
        var baule = adv_engine.getNounByMainName('Baule');
        baule.description = 'Il baule è aperto ma... vuoto.';
      }

      adv_engine.userTakeNoun(noun);
      currentRoom.removeObjectMainName(objectMainName);
      return 'Hai preso: ' + objectMainName;
    }
    return 'Non puoi prenderlo!';
  }

  function dropFn(askedSentence) {
    var currentRoom = adv_engine.getCurrentRoom();
    var objectMainName = adv_engine.getMainName(askedSentence[1]);
    var noun = adv_engine.getNounByMainName(objectMainName);
    if (noun && noun.canBeTaken && adv_engine.userHasNoun(noun)) {
      adv_engine.userDropNoun(noun);
      currentRoom.addObjectMainName(objectMainName);
      return 'Hai lasciato: ' + objectMainName;
    }
    return 'Non puoi lasciarlo!';
  }

  function talkMaestroFn() {
    var noun = adv_engine.getNounByMainName('Violino/violin');
    if (adv_engine.userHasNoun(noun) && noun.status == 'repaired') {
      noun.status = 'taught';
      noun.description = 'Un rarissimo violino elfico... con cui so suonare una dolcissima canzone.';
      return 'Il maestro ti insegna a suonare una dolcissima canzone.';
    }
    return 'Il maestro è molto contento di parlare con te.';
  }

  function talkLiutaioFn() {
    var violino = adv_engine.getNounByMainName('Violino/violin');
    var banconota = adv_engine.getNounByMainName('Banconota');
    var result;
    if (adv_engine.userHasNoun(violino) && violino.status == 'broken') {
      if (adv_engine.userHasNoun(banconota)) {
        violino.status = 'repaired';
        violino.description = 'Un rarissimo violino elfico... che purtroppo non so suonare.';
        adv_engine.userDropNoun(banconota);
        result = 'Il maestro prende i 10€ e ti aggiusta il violino. Appena provi a suonarlo il liutaio si tappa le orecchie: forse hai bisogno di un maestro che ti insegni!';
      } else {
        result = 'Il maestro vorrebbe aggiustarti il violino ma vorrebbe anche 10€.';
      }
    } else {
      result = '"Aggiusto tutto per 10€: se hai uno strumento rotto, portamelo e te le farò diventare come nuovo! Non dimenticarti i 10€! Ah ah ah!"';
    }
    return result;
  }

  function giveBanconotaFn() {
    var violino = adv_engine.getNounByMainName('Violino/violin');
    var banconota = adv_engine.getNounByMainName('Banconota');
    var result;
    if (!adv_engine.userHasNoun(banconota)) {
      result = 'Non hai la banconota.';
    } else if (!adv_engine.userHasNoun(violino)) {
      result = 'Non hai uno strumento da far aggiustare al liutaio.';
    } else {
      result = talkLiutaioFn();
    }
    return result;
  }

  function talkOsteFn() {
    var noun = adv_engine.getNounByMainName('Cartello-divieto');
    var room = adv_engine.getRoomByCoords(3, 2);
    if (room.hasNoun(noun)) {
      room.removeNoun(noun);
      room.addExit('O');
    }
    return 'L\'oste di racconta un sacco di cose. Fra tutte te ne rimangono impresse due:<br/> - dei lavori in corso che sono ormai terminati<br/> - e una antica leggenda in cui un drago cattivo diventava buono grazie al dolce suono di un violino elfico.';
  }

  function talkElfoFn() {
    var elfo = adv_engine.getNounByMainName('Elfo');
    var result;
    if (elfo.status == 'triste') {
      result = 'Ti dice: "Aiutami per favore, sono vecchio e ho molta fame."';
    } else {
      result = 'Ciao amico mio, è sempre un piacere rivederti.';
    }
    return result;
  }

  function talkGranchioFn() {
    var granchio = adv_engine.getNounByMainName('Granchio');
    var result;
    if (granchio.status == 'iniziale' || granchio.status == 'per Lucia') {
      result = 'Ti dice: "Ciao! Ti piacciono gli indovinelli? Te ne farò tre: uno facile, uno medio e uno difficile.<br/> Cominciamo con quello facile: Filippo ha 2 fratelli: Giovanni e Giovanna. La mamma dà 4 mozzarelline a Filippo, 3 a Giovanni e 5 a Giovanna. Quante mozzarelline hanno?"';
      granchio.status = 'per Lucia';
    } else if (granchio.status == 'per Anna') {
      result = 'Ti dice: "Molto bene. Ora l\'indovinello medio:<br/> Alberto è il papà di Norberto. Come si chiama il marito di Roberta, mamma di Norberto?"';
    } else if (granchio.status == 'per Caterina') {
      result = 'Ti dice: "Benissimo. Ora l\'indovinello difficile:<br/> Quanto fa 7 * 8 + 19?"';
    } else {
      result = 'Ciao amico mio, è sempre un piacere rivederti.';
    }
    return result;
  }

  function answer12Fn() {
    var granchio = adv_engine.getNounByMainName('Granchio');
    var currentRoom = adv_engine.getCurrentRoom();
    var result;
    if (!currentRoom.hasNoun(granchio)) {
      return 'Non capisco con chi stai parlando!';
    }
    if (granchio.status != 'per Lucia') {
      result = 'Errato!';
    }
    result = '"Molto bene. Ora l\'indovinello medio (per Anna).<br/> Norberto è figlio di Alberto. Come si chiama il marito di Roberta, mamma di Norberto?"';
    granchio.status = 'per Anna';
    return result;
  }

  function answerAlbertoFn() {
    var granchio = adv_engine.getNounByMainName('Granchio');
    var currentRoom = adv_engine.getCurrentRoom();
    var result;
    if (!currentRoom.hasNoun(granchio)) {
      return 'Non capisco con chi stai parlando!';
    }
    if (granchio.status != 'per Anna') {
      result = 'Errato!';
    }
    result = '"Benissimo. Ora l\'indovinello difficile (per Caterina):<br/> Quanto fa 7 * 8 + 19?"';
    granchio.status = 'per Caterina';
    return result;
  }

  function answer75Fn() {
    var granchio = adv_engine.getNounByMainName('Granchio');
    var currentRoom = adv_engine.getCurrentRoom();
    var conchiglia = adv_engine.getNounByMainName('Conchiglia/shell');
    var result;
    if (!currentRoom.hasNoun(granchio)) {
      return 'Non capisco con chi stai parlando!';
    }
    if (granchio.status != 'per Caterina') {
      result = 'Errato!';
    }
    result = '"Perfetto. Ora ti do il potere di aprire la conchiglia magica della spiaggia. Vai pure."';
    granchio.status = 'finito';
    conchiglia.status = 'apribile';
    return result;
  }

  function putChiaveVerdeFn() {
    return putChiaveFn('verde', 'green');
  }

  function putChiaveRossaFn() {
    return putChiaveFn('rossa', 'red');
  }

  function putChiaveBluFn() {
    return putChiaveFn('blu', 'blue');
  }

  function putChiaveFn(colore, color) {
    var chiave = adv_engine.getNounByMainName('Chiave-' + colore + '/' + color + '-key');
    var serratura = adv_engine.getNounByMainName('Serratura-' + colore);
    var currentRoom = adv_engine.getCurrentRoom();
    if (currentRoom.hasNoun(serratura) && serratura.status === 'chiusa' && adv_engine.userHasNoun(chiave)) {
      serratura.status = 'aperta';
      serratura.description = 'La serratura è aperta.';
      adv_engine.userDropNoun(chiave);
      return 'La serratura ' + colore + ' si è aperta.';
    }
    return 'Non puoi farlo.';
  }

  function openBauleFn() {
    var baule = adv_engine.getNounByMainName('Baule');
    var serraturaVerde = adv_engine.getNounByMainName('Serratura-verde');
    var serraturaRossa = adv_engine.getNounByMainName('Serratura-rossa');
    var serraturaBlu = adv_engine.getNounByMainName('Serratura-blu');
    var currentRoom = adv_engine.getCurrentRoom();
    if (!currentRoom.hasNoun(baule)) {
      return 'Non c\'è nessun baule qui!';
    }
    if (baule.status === 'aperto') {
      return 'Il baule è già aperto!';
    }

    if (serraturaVerde.status === 'chiusa'
        || serraturaRossa.status === 'chiusa'
        || serraturaBlu.status === 'chiusa') {
      return 'Non si apre, le serrature sono chiuse!';
    }

    baule.status = 'aperto';
    baule.description = 'Il baule contiene un fucile.';
    return 'Il baule si è aperto.';
  }

  function openConchigliaFn() {
    var conchiglia = adv_engine.getNounByMainName('Conchiglia/shell');
    var currentRoom = adv_engine.getCurrentRoom();
    if (!currentRoom.hasNoun(conchiglia)) {
      return 'Non c\'è nessuna conchiglia qui!';
    }
    if (conchiglia.status === 'aperta') {
      return 'La conchiglia è già aperta!';
    }
    if (conchiglia.status === 'chiusa') {
      return 'Ci provi ma non ci riesci. Deve essere protetta da un incantesimo!';
    }

    conchiglia.status = 'aperta';
    conchiglia.description = 'La conchiglia è aperta.';
    currentRoom.addObjectMainName('Chiave-rossa/red-key');
    return 'Finalmente riesci ad parire la conchiglia e trovi... una chiave rossa!';
  }

  function shakeMeloFn() {
    var melo = adv_engine.getNounByMainName('Melo/apple-tree');
    var currentRoom = adv_engine.getCurrentRoom();
    if (!currentRoom.hasNoun(melo)) {
      return 'Non c\'è nessun melo qui!';
    }

    if (!currentRoom.hasObjectMainName('Mela/apple')) {
      currentRoom.addObjectMainName('Mela/apple');
    }
    return 'Scuotendo il melo ti cade una mela in testa e poi finisce per terra.';
  }

  function eatMelaFn() {
    var mela = adv_engine.getNounByMainName('Mela/apple');
    if (!adv_engine.userHasNoun(mela)) {
      return 'Non hai una mela da mangiare!';
    }

    adv_engine.userDropNoun(mela);

    return 'Buona :)';
  }

  function giveMelaElfoFn() {
    var mela = adv_engine.getNounByMainName('Mela/apple');
    var elfo = adv_engine.getNounByMainName('Elfo');
    var currentRoom = adv_engine.getCurrentRoom();
    if (!adv_engine.userHasNoun(mela)) {
      return 'Non hai una mela da dare all\'elfo!';
    }
    if (!currentRoom.hasNoun(elfo)) {
      return 'Non vedo l\'elfo.'
    }

    if (elfo.status === 'triste') {
      var violino = adv_engine.getNounByMainName('Violino/violin');
      elfo.status = 'felice';
      adv_engine.userTakeNoun(violino);
      adv_engine.userDropNoun(mela);
      return 'L\'elfo è veramente felice di poter mangiare una mela così buona, e per ringraziarti ti dà un vecchio violino rotto che lui non usa più.';
    }

    return 'L\'elfo è veramente felice di poter mangiare una mela così buona.';
  }

  function shootCartelloFn() {
    var fucile = adv_engine.getNounByMainName('Fucile');
    var cartello = adv_engine.getNounByMainName('Cartello-castello');
    var currentRoom = adv_engine.getCurrentRoom();
    if (!adv_engine.userHasNoun(fucile)) {
      return 'Non hai un fucile per sparare!';
    }
    if (!currentRoom.hasNoun(cartello)) {
      return 'Non vedo il cartello del castello.'
    }
    if (cartello.status === 'intero') {
      cartello.status = 'rotto';
      cartello.description = 'C\'è scritto: "OSSO"';
      currentRoom.addObjectMainName('Osso');
      return 'Colpisci la lettera F. Rimane OSSO.';
    }

    currentRoom.removeObjectMainName('Cartello-castello');
    return 'Hai distrutto il cartello!';
  }

  function giveOssoCaniFn() {
    var osso = adv_engine.getNounByMainName('Osso');
    var cani = adv_engine.getNounByMainName('Cani/dogs');
    var currentRoom = adv_engine.getCurrentRoom();
    if (!adv_engine.userHasNoun(osso)) {
      return 'Non hai un osso da dare ai cani!';
    }
    if (!currentRoom.hasNoun(cani)) {
      return 'Non vedo i cani.'
    }

    cani.description = 'Sono distratti, mangiano l\'osso che gli hai dato.';
    adv_engine.userDropNoun(osso);
    currentRoom.addExit('N');
    return 'I cani si avventano sull\'osso. Sembra un buon momento per entrare nel castello.';
  }

  function playViolinoFn() {
    var violino = adv_engine.getNounByMainName('Violino/violin');
    var drago = adv_engine.getNounByMainName('Drago/dragon');
    var currentRoom = adv_engine.getCurrentRoom();
    if (!adv_engine.userHasNoun(violino)) {
      return 'Non hai un violino da suonare!';
    }
    if (violino.status === 'broken') {
      return 'Non suona, deve essere rotto.';
    }
    if (violino.status === 'repaired') {
      return 'No basta, ti prego! Suoni note stonate a caso. Ti ci vorrebbe un maestro!';
    }
    if (!currentRoom.hasNoun(drago)) {
      return 'Suoni una dolcissima canzone.'
    }

    window.location = 'finale.html';
  }

});