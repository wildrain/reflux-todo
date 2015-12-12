'use strict';

var Reflux = require('reflux'),
	TodoActions = require('./todoActions');

var allTodoItems = [];	

var store = Reflux.createStore({


	listenables : TodoActions ,

	onAddItem: function(item){
		allTodoItems.push({
			text: item.text,
			uid : item.uid ,
			editPanel : item.editPanel,
			colorPanel: item.colorPanel,
		});
		this.onUpdateTodos(allTodoItems);		
	},

	onShowEditPanel: function(editPanel){
		allTodoItems.forEach(function(item){
			if(item.uid === editPanel.uid){
				item.editPanel = !item.editPanel;
				item.colorPanel = false;
			}	
		});	

		this.onUpdateTodos(allTodoItems);
	},

	onEditItem: function(value , uid){				
		allTodoItems.forEach(function(item){
			if(item.uid == uid){
				item.text = value;			
			}	
		});
		this.onUpdateTodos(allTodoItems);
	},

	onShowColorPanel: function(colorPanel){
		allTodoItems.forEach(function(item){
			if(item.uid === colorPanel.uid){
				item.colorPanel = !item.colorPanel;
				item.editPanel = false;
			}	
		});	
		this.onUpdateTodos(allTodoItems);
	},

	onColorItem: function(value , uid){				
		allTodoItems.forEach(function(item){
			if(item.uid == uid){
				item.color = value;			
			}	
		});
		this.onUpdateTodos(allTodoItems);
	},

	onDeleteItem: function(item){		
		var index = -1;
		for(var i=0; i<allTodoItems.length; i++){
			if(allTodoItems[i].uid == item.uid){
				index = i; 
				break;
			}
		}
		allTodoItems.splice(index, 1);
		this.onUpdateTodos(allTodoItems);
	},

	onUpdateTodos: function(todos){
		this.trigger(todos);
	}
	
});

module.exports = store;	

