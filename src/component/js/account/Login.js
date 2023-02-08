import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../../css/Login.css';
import $ from 'jquery';
import axios from "axios";

const Login = () => {

    const navi = useNavigate();

    const [account, setAccount] = useState({
        id : '',
        pwd : ''
    });

    const inputChange = (e) => {
        const {value , name} = e.target;
        setAccount({
            ...account, //기존객체 복사
            [name]: value //name 값의 키를 가진 키에 value값 할당
        });
    }

    const handleLog = () => {

        if(account.id.trim() == null || "" === account.id.trim()){
            alert("아이디입력");
            return;
        }

        if(account.pwd.trim() == null || "" === account.pwd.trim()){
            alert("비밀번호입력");
            return;
        }

        axios.post('/api/account/login',{id:account.id, pwd:account.pwd})
            .then(res => {
                console.log("로그인");
                console.log(res);
                if(res.data.msg == null || "" === res.data.msg){
                    navi("/todo", {state: {isBack : true}});
                } else {
                    alert(res.data.msg);
                }
            }).catch(err => {
                console.log(err);
            });
    }

    const handleChange = (e) => {
        console.log(e)
        if(e.target.checked){
            $('#pwd').prop('type','text');
        } else {
            $('#pwd').prop('type','password');
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleLog();
        }
    }

    return(
        <main className="todo-list-template">
            <div className="title">
                로그인
            </div>
            <section className="login-form-wrapper">
                <input id="id" name="id" className="input-style" placeholder="아이디" maxLength="20" onChange={(e) => inputChange(e)}/>
                    <div className="create-button" onClick={handleLog}>
                        로그인
                    </div>
                    <Link to="/regist">
                        <div className="create-button">
                            회원가입
                        </div>
                    </Link>
            </section>
            <section className="login-form-wrapper">
                <input id="pwd" name="pwd" className="input-style" placeholder="비밀번호" type="password" maxLength="20"
                       onChange={(e) => inputChange(e)} onKeyDown={(e) => handleKeyDown(e)}/>
                <label> 비밀번호 표시 <input type="checkbox" onChange={(e) => handleChange(e)}/></label>
            </section>
        </main>
    );

}

export default Login;