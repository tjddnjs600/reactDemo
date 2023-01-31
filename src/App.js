import React, { Component } from 'react';
import Todolist from "./component/js/todoList/Todolist";
import Login from "./component/js/account/Login";
import Regist from "./component/js/account/regist";
import {BrowserRouter, Route, Routes} from "react-router-dom";

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/regist" element={<Regist/>}/>
            <Route path="/todo" element={<Todolist/>}/>
          </Routes>
        </BrowserRouter>
    );
  }
}

export default App;