import React from 'react';
import '../../css/Form.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Form = ({value, onChange, onCreate, onKeyPress}) => {

    const navi = useNavigate();
    const handleLogOut = () => {
        axios.get('/api/account/logout')
            .then(res => {
                console.log(res);
                navi('/');
            }).catch(err => {console.log(err)})
    }

    return(
        <div className="form">
            <input value={value} onChange={onChange} onKeyDown={onKeyPress}/>
            <div className="create-button" onClick={onCreate}>
                추가
            </div>
            <div className="create-button" onClick={handleLogOut}>
                로그아웃
            </div>
        </div>
    );
};

export default Form;