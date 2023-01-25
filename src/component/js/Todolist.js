import React, { Component } from 'react';
import TodoListTemplate from "./TodoListTemplate";
import Form from "./Form";
import TodoItemList from "./TodoItemList";

class Todolist extends Component{

    id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

    state = {
        input: '',
        todos: [
            { id: 0, text: ' 리액트 소개1', checked: false },
            { id: 1, text: ' 리액트 소개2', checked: true },
            { id: 2, text: ' 리액트 소개3', checked: false }
        ]
    }

    handleChange = (e) => {
        this.setState({
            input : e.target.value
        });
    }

    handleCreate = () => {
        const { input, todos } = this.state;
        this.setState({
            input: '',
            todos: todos.concat({
                id : this.id++,
                text : input,
                checked: false
            })
        });
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    handelToggle = (id) => {
        const {todos} = this.state;

        // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index]; // 선택한 객체

        const nextTodos = [...todos]; // 배열을 복사
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        }

        this.setState({
            todos: nextTodos
        })
    }

    handleRemove = (id) => {
        const {todos} = this.state;
        
        this.setState({
            todos: todos.filter(arr => arr.id !== id)
        })
    }

    render() {
        const {input, todos} = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handelToggle,
            handleRemove
        } = this;

        return(
            <TodoListTemplate form={
                <Form value={input} onKeyPress={handleKeyPress} onChange={handleChange} onCreate={handleCreate}/>
            }>
                <TodoItemList todos={todos} onToggle={handelToggle} onRemove={handleRemove}/>
            </TodoListTemplate>
        );
    };
};

export default Todolist;
