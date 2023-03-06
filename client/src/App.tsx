import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";
import {DataRes} from "./models/DataRes";

const App: FC = () => {
    const {store} = useContext(Context);
    const [uniq_ids, setUniq] = useState<String[]>();
    const [seeData, setSeeData] = useState(false);
    const [seeUniqs, setSeeUniqs] = useState(true);
    const [info, setInfo] = useState<DataRes[]>([]);
    const [data, setData] = useState<DataRes[]>([]);
    let a: String[] = [];

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])
    async function getUsers() {
        try {
            const response = await UserService.fetchIds();
            response.data.forEach(data => {
                if (!a.includes(data.uniq_id)) {
                    a.push(data.uniq_id);
                }
            });
            setUniq(a);
        } catch (e) {
            console.log(e);
        }
    }

    async function getUniqs(id: String) {
        try {
            const res = await  UserService.fetchuniqs(id);
            setInfo(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    async function getInfo(id: String) {
        try {
            const res = await UserService.fetchInfo(id);
            setData(res.data)
            return
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm/>
            </div>
        );
    }

    return (
        <div className={"main"}>
            <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>
                <button onClick={getUsers}>Получить данные</button>
            </div>
            {seeUniqs && uniq_ids?.map(uniq_id =>
            <button onClick={e => {setSeeUniqs(!seeUniqs); setSeeData(!seeData); getUniqs(uniq_id); getInfo(uniq_id)}}>{uniq_id}</button>)}
            {seeData && data.forEach(data => <div>{data.temperature}</div>)}
        </div>
    );
};

export default observer(App);
