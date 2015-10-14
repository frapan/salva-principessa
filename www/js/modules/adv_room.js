'use strict';
define([], function() {
	
	function Room(engine) {
		this.adv_engine = engine;
	}

	Room.prototype.setTitle = function(title) {
		this.title = title;
	    return this;
	}

	Room.prototype.getTitle = function() {
	    return this.title;
	}

	Room.prototype.setImage = function(image) {
		this.image = image;
	    return this;
	}

	Room.prototype.getImage = function() {
	    return this.image;
	}

	Room.prototype.setDescription = function(description) {
		this.description = description;
	    return this;
	}

	Room.prototype.getDescription = function() {
	    return this.description;
	}

	Room.prototype.setAvailableExits = function(availableExits) {
		this.availableExits = availableExits;
	    return this;
	}

	Room.prototype.getAvailableExits = function() {
	    return this.availableExits;
	}

	Room.prototype.hasExit = function(exit) {
	    return this.availableExits.indexOf(exit) >= 0;
	}

	Room.prototype.addExit = function(exit) {
		if (!this.hasExit(exit)) {
	    	this.availableExits.push(exit);
		}
	}

	Room.prototype.removeExit = function(exit) {
	    _.remove(this.availableExits, function(e){ return e === exit; });
	}

	Room.prototype.setAvailableObjectMainNames = function(availableObjectMainNames) {
		this.availableObjectMainNames = availableObjectMainNames;
	    return this;
	}

	Room.prototype.getAvailableObjectMainNames = function() {
	    return this.availableObjectMainNames;
	}

	Room.prototype.hasObjectMainName = function(objectMainName) {
	    return this.availableObjectMainNames.indexOf(objectMainName) >= 0;
	}

	Room.prototype.addObjectMainName = function(objectMainName) {
		if (!this.hasObjectMainName(objectMainName)) {
	    	this.availableObjectMainNames.push(objectMainName);
		}
	}

	Room.prototype.removeObjectMainName = function(objectMainName) {
	    _.remove(this.availableObjectMainNames, function(name){ return name === objectMainName; });
	}

	Room.prototype.hasNoun = function(noun) {
		var objectMainName = this.adv_engine.getMainName(noun);
	    return this.hasObjectMainName(objectMainName);
	}

	Room.prototype.addNoun = function(noun) {
		var objectMainName = this.adv_engine.getMainName(noun);
	    return this.addObjectMainName(objectMainName);
	}

	Room.prototype.removeNoun = function(noun) {
		var objectMainName = this.adv_engine.getMainName(noun);
	    return this.removeObjectMainName(objectMainName);
	}

	return Room;
});