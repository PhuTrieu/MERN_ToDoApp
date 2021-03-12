import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Todos_TableRow extends Component {
    constructor(props) {
        super(props);
        this.onDeleteTodo = this.onDeleteTodo.bind(this);
    }
    
    onDeleteTodo(){
        axios.delete('http://localhost:4000/todos/delete/' + this.props.todo._id)
            .then(res => {
                console.log('Todo deleted');
            })
            .catch(function(err){
                console.log(err);
            })
    }

    render() {
        return (
            <tr>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_description}</td>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_responsible}</td>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_priority}</td>
                <td>
                    <Link to={"/edit/"+this.props.todo._id}>Edit</Link>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={ this.onDeleteTodo }>Delete</button>
                </td>
            </tr>
        )
    }
}
