//Interazione con l'utente
'use strict';
define(['adv_engine', 'adv_ui'], function(adv_engine, adv_ui) {
  var exporting = {};

  exporting.init = function(options) {
    // Nota: è importante l'ordine delle inizializzazioni (l'ultimo deve essere l'engine)
    options.adv_data.init(adv_engine, adv_ui);

    options.adv_engine = adv_engine;

    adv_ui.init(options);

    adv_engine.init({
      adv_data: options.adv_data
    });

    adv_ui.checkAutomaticSavedGame();

  }

  return exporting;
});