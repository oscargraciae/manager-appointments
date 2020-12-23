import { User, UserResponse } from "../types/User";
import HttpClient from './HttpClient';

export class UserService extends HttpClient {

  public constructor() {
    super('http://localhost:8001/api/manager_v1');
  }

  public login = (data: User) => this.instance.post<UserResponse>('/users/auth', data);
  public getMe = () => this.instance.get<UserResponse>('/users');
}