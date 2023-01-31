import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../../css/Login.css';
import $ from 'jquery';
import axios from "axios";

const Regist = () => {

    const [account, setAccount] = useState({
        id : "",
        pwd : "",
        pwdChk : "",
        email : "",
        phone : ""
    });

    const navi = useNavigate();

    const inputChange = (e) => {
        const {value , name} = e.target;

        setAccount({
            ...account,
            [name] : value
        })
    }

    const handleChange = (e) => {
        console.log(e)
        if(e.target.checked){
            $('#pwd').prop('type','text');
        } else {
            $('#pwd').prop('type','password');
        }
    }

    const handleRegist = () => {
        axios.post('/api/account/regist', {...account})
            .then(res => {
                console.log(res);
                if(res.data.msg != null){
                    alert(res.data.msg);
                } else {
                    alert("회원가입 완료");
                    navi('/');
                }
            }).catch(err => {console.log(err)});
    }

    return(
        <main className="todo-list-template">
            <div className="title">
                회원가입
            </div>
            <section className="login-form-wrapper">
                <input id="id" name="id" className="input-style" placeholder="아이디" maxLength="20" onChange={(e) => inputChange(e)}/>
                <div className="create-button">
                    중복확인
                </div>
            </section>
            <section className="login-form-wrapper">
                <input id="pwd" name="pwd" className="input-style" placeholder="비밀번호" type="password" maxLength="20" onChange={(e) => inputChange(e)}/>
                <label> 비밀번호 표시 <input type="checkbox" onClick={(e) => handleChange(e)}/></label>
            </section>
            <section className="login-form-wrapper">
                <input id="pwdChk" name="pwdChk" className="input-style" placeholder="비밀번호 확인" type="password" maxLength="20" onChange={(e) => inputChange(e)}/>
            </section>
            <section className="login-form-wrapper">
                <input id="email" name="email" className="input-style" placeholder="이메일" maxLength="30" onChange={(e) => inputChange(e)}/>
            </section>
            <section className="login-form-wrapper">
                <input id="phone" name="phone" className="input-style" placeholder="전화번호" maxLength="13" onChange={(e) => inputChange(e)}/>
            </section>
            <section className="login-form-wrapper">
                <div className="join-button" onClick={handleRegist}>
                    가입하기
                </div>
            </section>
        </main>
    );
}

export default Regist;