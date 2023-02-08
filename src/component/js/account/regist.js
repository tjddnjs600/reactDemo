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
        phone : "",
        check : false,
        pwdCheck : false
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

    const handleRegist = async () => {
        if(!account.check){
            alert("ID 중복확인 필수");
            return;
        }

        if(!account.pwdCheck){
            alert("비밀번호 확인 필수");
            return;
        }

        await axios.post('/api/account/regist', {...account})
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

    const handleClick = async (e) => {
        await axios.get('/api/account/chkId/'+account.id)
            .then(res => {
                console.log(res);
                if("ok" === res.data){
                    setAccount({
                        ...account,
                        check : true
                    });

                    alert("중복확인 완료");
                }
            })
            .catch(err => {console.log(err)})
    }

    const handleFocusOut = (e) => {
        console.log("포커스아웃");
        console.log(e);

        if("" !== account.pwd && "" !== account.pwdChk){
            if(account.pwd === account.pwdChk){
                setAccount({
                    ...account,
                    pwdCheck : true
                })

                alert("비밀번호 일치 확인");
            } else {
                alert("비밀번호 불일치");
            }
        }
    }

    return(
        <main className="todo-list-template">
            <div className="title">
                회원가입
            </div>
            <section className="login-form-wrapper">
                <input id="id" name="id" className="input-style" placeholder="아이디" maxLength="20" onChange={(e) => inputChange(e)}/>
                <div className="create-button" onClick={(e) => handleClick(e)}>
                    중복확인
                </div>
            </section>
            <section className="login-form-wrapper">
                <input id="pwd" name="pwd" className="input-style" placeholder="비밀번호" type="password" maxLength="20" onChange={(e) => inputChange(e)}/>
                <label> 비밀번호 표시 <input type="checkbox" onClick={(e) => handleChange(e)}/></label>
            </section>
            <section className="login-form-wrapper">
                <input id="pwdChk" name="pwdChk" className="input-style" placeholder="비밀번호 확인" type="password" maxLength="20" onChange={(e) => inputChange(e)} onBlur={(e) => handleFocusOut(e)}/>
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