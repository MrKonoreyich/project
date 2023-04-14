import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from "./services/UserService";
import {DataRes} from "./models/DataRes";
import Button from 'react-bootstrap/Button';
import LoginCard from "./components/LoginCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import {log} from "util";
import Table from "./components/Table";

const App: FC = () => {
    const {store} = useContext(Context);
    const [uniq_ids, setUniq] = useState<string[]>([]);
    const [seeData, setSeeData] = useState(false);
    const [seeUniqs, setSeeUniqs] = useState(false);
    const [data, setData] = useState<DataRes[]>([]);


    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])


    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return (
            <div>
                <LoginCard/>
            </div>
        );
    }
    return (
        <div className={"main"}>
            <Button variant={'danger'} className={"float-end"} onClick={() => store.logout()}>Выйти</Button>
            <Table/>

        </div>
    );
};

export default observer(App);
