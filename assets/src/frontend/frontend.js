var React = require('react'),
	Reflux = require('reflux'),
	TodoActions = require('./todoActions'),
	store = require('./todoStore');


var TodoForm = React.createClass({

	getInitialState: function(){
		return ({text: ''});
	},

	render: function(){
		return (
			<form onSubmit = {this._handleFormSubmit}>
				<input onChange = {this._handleTodoOnChange} value= {this.state.text} />
				<button>add {this.props.length + 1}</button>
			</form>
		)
	},

	_handleTodoOnChange: function(e){
		this.setState({text: e.target.value});
	},

	_handleFormSubmit: function(e){		
		TodoActions.addItem({
			text: this.state.text, 
			uid : new Date().getTime(),
			editPanel: false,
			colorPanel: false,
		});
		this.setState({text: ''});
		e.preventDefault();
	}
});

var Todo = React.createClass({
	render: function(){	
		var item = function(todoItem, index){	
			var style = {
				color : todoItem.color
			};				
			return(
				<li style={style}>
					{todoItem.text}	
					<button type="button" onClick={this._handleEditButton.bind(this,todoItem)}> editTodo </button>
					<button type="button" onClick={this._handleColorButton.bind(this,todoItem)}> changeColor </button>
					<button type="button" onClick={this._handleItemDelete.bind(this, todoItem)} >Delete </button>
					{todoItem.editPanel ? <p><input type="text" id={todoItem.uid} value={todoItem.text} onChange={this._handleItemEdit}/></p> : null }	
					{todoItem.colorPanel ? <p><input type="text" id={todoItem.uid} value={todoItem.color} onChange={this._handleItemColor} /></p> : null }				
				</li>
			) 
		}.bind(this);
		return (
			this.props.items.length ? 
				<ul>{this.props.items.map(item)}</ul>
				:
				<p> Sorry ! No Todo Item Found </p>			
		);
	},

	_handleEditButton: function(todoItem){
		TodoActions.showEditPanel(todoItem);
	},

	_handleItemEdit: function(e){		
		var value = e.target.value,
			id   = e.target.id;
		TodoActions.editItem(value, id);			
	},

	_handleColorButton: function(todoItem){
		TodoActions.showColorPanel(todoItem);
	},

	_handleItemColor: function(e){		
		var value = e.target.value,
			id   = e.target.id;
		TodoActions.colorItem(value, id);			
	},

	_handleItemDelete: function(todoItem){
		TodoActions.deleteItem(todoItem);
	}

});


var RefluxTodos = React.createClass({

	mixins: [Reflux.listenTo(store,"onResponse") ],

	getInitialState: function(){
		return ({items: []});
	},

	// componentWillMount : function(){		
	// 	if(JSON.parse(localStorage.getItem('refluxTodo')) != null ){
	// 		this.state.items = JSON.parse(localStorage.getItem('refluxTodo'));
	// 	}
	// },

	render: function(){
		return ( 
			<div>
				<h3>Reflux Todo Apps </h3>
				<TodoForm length={this.state.items.length}></TodoForm>
				<h3> Todos </h3>
				<Todo items = {this.state.items}></Todo>
			</div>
		);	
	},

	onResponse: function(items){
		
		this.setState({items: items});
	}


});


React.render(<RefluxTodos/>,document.getElementById('refluxTodoApp'));