import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <div className={"content"}>
            <form>
                <div className={"box"}>
                    <h1>Вход</h1>
                    <p><input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder='Email'
                    /></p>
                    <p><input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder='Пароль'
                    /></p>
                    <button onClick={(e) => {
                        e.preventDefault();
                        store.login(email, password);
                    }}>
                        Логин
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        store.registration(email, password)
                    }}>
                        Регистрация
                    </button>
                </div>
            </form>
        </div>
    );
};

export default observer(LoginForm);
