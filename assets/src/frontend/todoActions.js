'use strict';

var Reflux = require('reflux');

var TodoActions = Reflux.createActions([
		'addItem',
		'deleteItem',
		'showEditPanel',
		'editItem',
		'showColorPanel',
		'colorItem'
	]);

module.exports = TodoActions;