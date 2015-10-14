//Interazione con l'utente
'use strict';
define(['adv_ui', 'jquery', 'lodash'], function(adv_ui, $, _) {
  var exporting = {};
  var adv_data;

  var currentRoom, currentRoomX, currentRoomY;

  // Metodi pubblici esportati
  exporting.init = function(options) {
    adv_data = options.adv_data;

    exporting.goToRoom(adv_data.startRoomX, adv_data.startRoomY);
  }

  exporting.submitCommand = function(command) {
    var result, verb;
    var parsedCommand = parseCommand(command);
    var askedSentence, foundSentence;
    console.log('parsedCommand: ', parsedCommand);
    if (!parsedCommand || !parsedCommand.foundSentence) {
      result = 'Spiacente, non capisco...';
    } else {
      askedSentence = parsedCommand.askedSentence;
      foundSentence = parsedCommand.foundSentence;
      verb = foundSentence.words[0];
      switch(verb) {
        case 'N':
        case 'S':
        case 'E':
        case 'O': if (move(verb)) {
                    return;
                  } else {
                    result = 'Non puoi andarci.';
                  }
                  break;
/*        case 'Esamina':  result = examine(askedSentence, foundSentence);
                        break;
        case 'Prendi':  if (take(askedSentence, foundSentence)) {
                          result = 'Hai preso: ' + exporting.getMainName(askedSentence[1]);
                        } else {
                          result = 'Non puoi prenderlo.';
                        }
                        break;
        case 'Lascia':  if (drop(askedSentence, foundSentence)) {
                          result = 'Hai lasciato: ' + exporting.getMainName(askedSentence[1]);
                        } else {
                          result = 'Non puoi lasciarlo.';
                        }
                        break;*/
        case 'I': result = 'Possiedi: ' + (getInventoryList().length ? _.pluck(getInventoryList(), 'synonyms[0]').join(', ') : 'nulla!');
                  break;
        default: result = foundSentence.action(askedSentence);
      }
    }
    adv_ui.addCommandToHistory(command, result);
    adv_ui.updateHtml(currentRoom, false);
  }

  exporting.userHasNoun = function(noun) {
    return noun.inInventory;
  }

  exporting.userDropNoun = function(noun) {
    noun.inInventory = false;
  }

  exporting.userTakeNoun = function(noun) {
    noun.inInventory = true;
  }

  exporting.getNounByMainName = function(name) {
    return _.find(adv_data.nouns, function(noun){
      return exporting.getMainName(noun).toLowerCase() === name.toLowerCase();
    });
  }

  exporting.getMainName = function(x) {
    return x.synonyms[0];
  }

  exporting.getRoomByCoords = function(x, y) {
    var room = adv_data.roomMap[x][y];
    if (!room) {
      var msg = 'Impossibile trovara una stanza di coordinate ' + x + ', ' + y;
      console.log(msg);
      alert(msg);
    }
    return room;
  }

  exporting.getCurrentRoom = function() {
    return currentRoom;
  }

  exporting.getCurrentRoomX = function() {
    return currentRoomX;
  }

  exporting.getCurrentRoomY = function() {
    return currentRoomY;
  }

  exporting.goToRoom = function(x, y) {
    currentRoomX = x;
    currentRoomY = y;
    currentRoom = exporting.getRoomByCoords(x, y);
    adv_ui.updateHtml(currentRoom, true);
  }

  // Metodi privati
  function getInventoryList() {
    var objects = _.filter(adv_data.nouns, function(noun){
      return noun.inInventory;
    });
    return objects;
  }

  function move(direction) {
    if (currentRoom.hasExit(direction)) {
      switch(direction) {
        case 'N': exporting.goToRoom(currentRoomX, currentRoomY + 1); break;
        case 'S': exporting.goToRoom(currentRoomX, currentRoomY - 1); break;
        case 'E': exporting.goToRoom(currentRoomX + 1, currentRoomY); break;
        case 'O': exporting.goToRoom(currentRoomX - 1, currentRoomY); break;
      }
      return true;
    }
    return false;
  }

  function parseCommand(command) {
    var words, askedVerb, mainVerb, askedSentence, askedSentenceCompact, foundSentence;
    command = $.trim(command).replace('\'', ' ');
    if (!command.length) {
      return null;
    }
    words = command.split(' ');
    askedVerb = words[0];
    mainVerb = findWordRecord(askedVerb, adv_data.verbs);
    if (!mainVerb) {
      return null;
    }
    askedSentence = [mainVerb];
    _.drop(words, 1).forEach(function(currWord){
      var mainNoun = findWordRecord(currWord, adv_data.nouns);
      if (mainNoun) {
        askedSentence.push(mainNoun);
      }
    });
    console.log(askedSentence);

    // Cerco la frase trovata fra quelle ammesse (considerando anche la wildcard *)
    askedSentenceCompact = askedSentence.map(function(w){ return exporting.getMainName(w) });
    foundSentence = _.find(adv_data.sentences, function (currSentence) {
      var words = currSentence.words;
      var i;
      if (words.length !== askedSentenceCompact.length) {
        return false;
      }
      for(i = 0; i < words.length; i++) {
        if (words[i] !== '*' && words[i] !== askedSentenceCompact[i]) {
          return false;
        }
      }
      return true;
    });
    return {askedSentence: askedSentence, foundSentence: foundSentence};
  }

  // Restituisce la parola principale (la prima in elenco) fra la collection di sinonimi (verrb o nouns)
  function findWordRecord(word, collection) {
    var wordRecord = _.find(collection, function(words) {
      return _.find(words.synonyms, function(currSynonym){
        return currSynonym.toUpperCase() == word.toUpperCase();
      });
    });
    return wordRecord;
  }

  return exporting;
});