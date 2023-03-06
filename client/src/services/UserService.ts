import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser} from "../models/IUser";
import {DataRes} from "../models/DataRes";

export default class UserService {
    static fetchIds(): Promise<AxiosResponse<DataRes[]>> {
        return $api.get<DataRes[]>('/users')
    }

    static fetchuniqs(id: String): Promise<AxiosResponse<DataRes[]>> {
        return $api.post('/uniqs', {uniq: id})
    }

    static fetchInfo(id: String): Promise<AxiosResponse<DataRes[]>> {
        return $api.post('/info', {uniq: id});

    }
}

