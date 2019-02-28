import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import Popup from "reactjs-popup";
import axios from 'axios';

class Form1 extends Component{
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			name: "asa"
		};
		//this.updateItem = this.updateItem.bind(this);//to link the functions
	}
/*	updateName(event) {
		this.setState({name:event.target.value})
	}
	addUser = () => {

		//alert(this.state.name+" has been added")
	}*/
    render(){
        	return (
	        	<html>
	        	<b>Add Item</b>
				   <body>
				 
				   	  <Popup trigger={<button> Add Item</button>} position="right center">

				      <form action = "http://localhost:5000/login" method = "post">
				      	 <b>Create Item:</b>
				         <p>Enter Name:</p>
				         <p><input type = "text" name = "nm"/></p>
				         <p>Enter Price:</p>
				         <p><input type = "text" name = "price" /></p>
				         <p>Enter Quantity:</p>
				         <p><input type = "text" name = "qty" /></p>
							
				         <p><input type = "submit" value = "submit" /></p>
				      </form>
				      </Popup>
				   </body>
				</html>
        	);
    }
}
class InitDB extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialised: false
		};
	}

	componentDidMount() {
    	this.InitialiseDB();
  	}
  	InitialiseDB() {
	    fetch("http://localhost:5000/DB");
  	}
	render() {
		return (
			<html>
				<body>
				<div>
				</div>
				</body>
			</html>
		);
	}
}
class RemoveStudent extends Component {
	render() {
		return (
			<html>
				<b>Remove Item</b>

				<body>
				<Popup trigger={<button> Remove Item</button>} position="right center">

					<form action = "http://localhost:5000/remove" method = "post">
						<b>Remove Item:</b>
				        <p>Enter Name:</p>
				        <p><input type = "text" name = "nm"/></p>
						<p><input type = "submit" value = "Remove Item"/></p>
					</form>
				</Popup>
				</body>
			</html>
		)
	}
}

class ListAll extends Component {
	render() {
		return (

			<html>
				<body>
					<form action = "http://localhost:5000/list" method = "post">
						<p><input class="button" type = "submit" value = "List All Items"/></p>
					</form>
				</body>
			</html>
		)
	}
}
class Livelist extends Component {
	constructor(props) {
		super(props);
		this.state = {
	      users: [],
	      isLoading: true,
    	  errors: null
	    };
	}

	componentDidMount() {
		axios
	    .get("http://localhost:5000/livelist")
	    .then(response => this.setState({users: response.data}))
	    .catch(error => this.setState({ error, isLoading: false }));
  	}
	render() {
		const { isLoading, users } = this.state;
		return (

			<html>
				<body>
					<b>List all Items in database</b>
						<table border = "1">
					         <thead>
					            <td>Name</td>
					            <td>Price ($)</td>
					            <td>Quantity</td>
					         </thead>
					           
					            	{users.map(p => 
                              			<tr>
                              			<td>{p.name}</td>
                          
                              			<td>{p.price}</td>
                              			<td>{p.qty}</td>
                              			</tr>)}
					            
					      </table>
				</body>
			</html>
		)
	}
}
class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  name: '',
	      users: [],
	      isLoading: true,
    	  errors: null
	    };
	    this.getSearch = this.getSearch.bind(this);
	}
	
	getSearch() {
		axios
	    .get("http://localhost:5000/search",{
				  params: {
				    name: this.state.name
				  }
				})
	    .then(response => this.setState({users: response.data}))
	    .catch(error => this.setState({ error, isLoading: false }));
  	}
  	handleChange(event) {
  		this.setState({name: event.target.value})
	}
	render() {
		const { isLoading, users } = this.state;
		return (

			<html>
				<input type="text" name="title" value={this.state.title} 
    			onChange={this.handleChange.bind(this)}/>
    			<div>{this.state.name}</div>
    			<div onClick={this.getSearch.bind(this)} >
    			<Popup trigger={<button> Search Item</button>} position="right center">

					<table border = "1" >
					         <thead>
					            <td>Name</td>
					            <td>Price ($)</td>
					            <td>Quantity</td>
					         </thead>
					           
					            	{users.map(p => 
                              			<tr>
                              			<td>{p.name}</td>
                              			<td>{p.price}</td>
                              			<td>{p.qty}</td>
                              			</tr>)}
					            
					</table>
				</Popup>
				</div>
			</html>
		)
	}
}
class UpdateStudent extends Component {
	
	render() {
		return (
		<html>
		<b>Update Item</b>
			<body>
	        <Popup trigger={<button> Update Item</button>} position="right center">
			    <form action = "http://localhost:5000/update" method = "post">
							<b>Update Item:</b>
					        <p>Enter item name:</p>
					         <p><input type = "text" name = "nm"/></p>
					         <p>Enter Price:</p>
					         <p><input type = "text" name = "price" /></p>
					         <p>Enter Quantity:</p>
					         <p><input type = "text" name = "qty" /></p>
							<p><input type = "submit" value = "Update Item"/></p>
						</form>
			  </Popup>
			  </body>
	        </html>
		);
	}
}
ReactDOM.render(
    <Search/>,
    document.getElementById('search')
);
ReactDOM.render(
    <Livelist/>,
    document.getElementById('list2')
);
ReactDOM.render(
    <UpdateStudent/>,
    document.getElementById('update')
);
ReactDOM.render(
    <RemoveStudent/>,
    document.getElementById('remove')
);
ReactDOM.render(
    <ListAll/>,
    document.getElementById('list')
);
ReactDOM.render(
    <Form1/>,
    document.getElementById('root')
);
ReactDOM.render(
    <InitDB/>,
    document.getElementById('db')
);