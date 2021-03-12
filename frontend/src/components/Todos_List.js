import React, { Component } from 'react'
import axios from 'axios';
import Todos_TableRow from './Todos_TableRow';

export default class Todos_List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch(function(err){
                console.log(err);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/todos/')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch(function(err){
                console.log(err);
            });
    }

    todoList(){
        return this.state.todos.map(function(currentTodo, i){
            return <Todos_TableRow todo={currentTodo} key={i} />
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
