import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl:string='http://localhost:3000/api/v1/users';
  constructor(private _httpClient:HttpClient) { 

  }

  getAll():Observable<any>{
    return this._httpClient.get(`${this.baseUrl}`);
  }

  deleteUser(userId:string):Observable<any>{
    return this._httpClient.delete(`${this.baseUrl}/${userId}`);
  }

  updateUser(user:User):Observable<any>{
    return this._httpClient.patch(`${this.baseUrl}/32`,user);
  }

  getUserById(userId:string):Observable<any>{
    return this._httpClient.get(`${this.baseUrl}/${userId}`);
  }



  uploadPhoto(img:any):Observable<any>{
    return this._httpClient.patch(`${this.baseUrl}/32`,img);
  }
}
