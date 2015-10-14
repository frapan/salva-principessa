// Motore principale

/*
Operazioni da eseguire.
All'init deve:
1. Caricare dati avventura
2. Aggiornare la pagina con la prima stanza

A regime deve eseguire il comando al submit, ossia:
1. fare il parse del comando
2. verificare le condizioni del comando
3. eseguire le azioni del comando
*/

'use strict';
define(['adv_room', 'jquery'], function(Room, $) {
	var adv_engine;
	var adv_data;
	var $titleArea;
	var $image;
	var $descriptionArea;
	var $objectsArea;
	var $objectsList;
	var $exitsList;
	var $commandHistoryArea;
	var $commandHistoryList;
	var $commandForm;
	var $commandInput;
	var $salvaBtn;
	var $caricaBtn;
	var manualSaveLSItem = 'adv_manual_save'; // nome del Local Storage Item per salvataggio manuale
	var automaticSaveLSItem = 'adv_automatic_save'; // nome del Local Storage Item per salvataggio automatico
	var currentCommandIndex = -1;

	var exporting = {};

	exporting.init = function(options) {
		adv_engine = options.adv_engine;
		adv_data = options.adv_data;
		$titleArea = options.$titleArea;
		$image = options.$image;
		$descriptionArea = options.$descriptionArea;
		$objectsArea = options.$objectsArea;
		$objectsList = options.$objectsList;
		$exitsList = options.$exitsList;
		$commandHistoryArea = options.$commandHistoryArea;
		$commandHistoryList = options.$commandHistoryList;
		$commandForm = options.$commandForm;
		$commandInput = options.$commandInput;
		$salvaBtn = options.$salvaBtn;
		$caricaBtn = options.$caricaBtn;

		// Metto il focus ogni 100 mullisecondi per evitare che lo si perda e non si riesca a scrivere
		// o, ancor peggio, che il backspace faccia andare alla pagina precedente!
		setInterval(function(){ $commandInput.focus(); }, 100);
		
		$commandForm.on('submit', function(e){
			var command = $commandInput.val();
			adv_engine.submitCommand(command);
			$commandInput.val('');
			$commandInput.focus();

			// Salvo automaticamente il gioco
			adv_data.currentRoomX = adv_engine.getCurrentRoomX();
			adv_data.currentRoomY = adv_engine.getCurrentRoomY();
			save(automaticSaveLSItem);

			e.preventDefault();
			e.stopPropagation();
			return false;
		});

		$commandInput.on('keydown', function(e){
			var $commands = $('.command');
			var commandsNumber = $commands.length;
			if (e.which === 38 || e.which === 40) {
				if (e.which === 38) {
					currentCommandIndex--;
				} else {
					currentCommandIndex++;
				}

				if (commandsNumber > 0) {
					currentCommandIndex = currentCommandIndex % commandsNumber;
					$commandInput.val($commands.eq(currentCommandIndex).html());
				}
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			return true;
		});

		$salvaBtn.on('click', function(e) {
			if (confirm('Sei sicuro di voler salvare il gioco?')) {
				save(manualSaveLSItem);
				alert('Gioco salvato.');
			}
			$commandInput.focus();
			e.preventDefault();
			e.stopPropagation();
			return false;
		});

		$caricaBtn.on('click', function(e) {
			if (confirm('Sei sicuro di voler caricare il gioco salvato?')) {
				var data = localStorage.getItem(manualSaveLSItem);
				if (data) {
					load(data);
					alert('Gioco caricato.');
				}
			}
			$commandInput.focus();
			e.preventDefault();
			e.stopPropagation();
			return false;
		});

	}

	// Se c'è una partita salvata automaticamente, chiedo all'utente se vuole proseguire o ricominciare
	// Questo è utile quando per sbaglio si chiude il browser o si cambia pagina
	exporting.checkAutomaticSavedGame = function() {
		var automaticSavedData = localStorage.getItem(automaticSaveLSItem);
		if (automaticSavedData) {
			if (confirm('C\' è una partita già iniziata. Puoi riprendere il gioco da dove eri arrivato o ricominciare dall\'inizio. Vuoi riprendere il gioco?')) {
				load(automaticSavedData);
			}
		}
	}

	exporting.updateHtml = function (currentRoom, clearCommandHistory) {
		var availableObjectMainNames = currentRoom.getAvailableObjectMainNames();
		var availableExits = currentRoom.getAvailableExits();
		$titleArea.html(currentRoom.getTitle());
		$image[0].src = 'img/' + currentRoom.getImage();
		$descriptionArea.html(currentRoom.getDescription());
		
		if (availableObjectMainNames.length) {
			$objectsList.html(availableObjectMainNames.map(function(obj){return '<li>' + obj + '</li>'}).join(''));
			$objectsArea.show();
		} else {
			$objectsArea.hide();
		}

		if (availableExits.length) {
			$exitsList.html(availableExits.join(', '));
		} else {
			$exitsList.html('nessuna');
		}

		if (clearCommandHistory) {
			$commandHistoryList.html('');
		}
		$commandInput.focus();
	}

	exporting.addCommandToHistory = function(command, result) {
		$commandInput.val('');
		$commandHistoryList.append('<div class="command">' + command + '</div>\n<div class="result">' + result + '</div>');
		$commandHistoryArea.scrollTop($commandHistoryArea.prop("scrollHeight"));
	}

	function save(localStorageItem) {
		var data;
		adv_data.currentRoomX = adv_engine.getCurrentRoomX();
		adv_data.currentRoomY = adv_engine.getCurrentRoomY();
		data = JSON.stringify(adv_data);
		localStorage.setItem(localStorageItem, data);
	}

	function load(data) {
		var loadedData = JSON.parse(data);
		adv_data.roomMap = loadedData.roomMap;
		// Aggiungo il proprtype di Room ad ogni stanza
		adv_data.roomMap.forEach(function(arr){
			arr.forEach(function(room){
				if (room) {
					room.__proto__ = Room.prototype;
					room.adv_engine = adv_engine;
				}
			});
		});
		//adv_data.verbs = loadedData.verbs;
		adv_data.nouns = loadedData.nouns;
		var currentRoomX = loadedData.currentRoomX;
		var currentRoomY = loadedData.currentRoomY;
		adv_engine.goToRoom(currentRoomX, currentRoomY);
	}

	return exporting;
});