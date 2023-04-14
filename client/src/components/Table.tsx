import React, {FC, useEffect, useLayoutEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import UserService from "../services/UserService";
import {DataRes} from "../models/DataRes";

const Table: FC = () => {
    const [uniq_ids, setUniq] = useState<string[]>([]);
    const [seeData, setSeeData] = useState(false);
    const [seeUniqs, setSeeUniqs] = useState(true);
    const [data, setData] = useState<DataRes[]>([]);

    const getUsers = async () => {
        try {
            let a: string[] = [];
            const response = await UserService.fetchIds();
            response.data.forEach(data => {
                if (!a.includes(data.uniq_id)) {
                    a.push(data.uniq_id)
                }
            });
            setUniq(a)
        } catch (e) {
            console.log(e);
        }
    }
    useEffect( () => {
        getUsers();
    }, [])
    async function getInfo(id: string) {
        try {
            const res = await UserService.fetchInfo(id);
            setData(res.data)
            console.log(data)
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="row justify-content-center m-3">
            <div className="col-auto" style={{display: seeUniqs ? 'block' : 'none'}}>
            <table className="table table-bordered">
                    <thead>
                    <tr className="align-top">
                        <th scope="col">#</th>
                        <th scope="col">Тип микроконтроллера</th>
                        <th scope="col">Уникальный<br/>id</th>
                        <th scope="col">Данные</th>
                    </tr>
                    </thead>
                    <tbody>
                    {uniq_ids.length > 0 && uniq_ids.map( (uniq,id) => {
                        return(
                            <tr key={uniq}>
                                <th scope="row">{id}</th>
                                <td>esp8266</td>
                                <td>{uniq}</td>
                                <td><Button variant={"primary"} onClick={e => {setSeeUniqs(!seeUniqs); setSeeData(!seeData); getInfo(uniq)}}>Посмотреть</Button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            {seeData && <div className={"container"} style={{maxWidth: "50vw"}}>
                <table className=" table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Дата</th>
                        <th scope="col">Долгота</th>
                        <th scope="col">Широта</th>
                        <th scope="col">Температура</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 && data.map( (d,id) => {
                        return(
                            <tr key={id}>
                                <td scope="row">{id}</td>
                                <td>{d.date}</td>
                                <td>{d.longitude}</td>
                                <td>{d.latitude}</td>
                                <td>{d.temperature}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {/*{seeData && data.map(d => {*/}
                {/*    return(*/}
                {/*        <div>{d.temperature}</div>*/}
                {/*    )*/}
                {/*})}*/}
                {<Button variant="primary"  onClick={e => {setSeeUniqs(!seeUniqs); setSeeData(!seeData)}}>Назад</Button>}
            </div>}
        </div>

    )

}

export default Table;