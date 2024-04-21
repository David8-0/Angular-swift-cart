import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
  })
  export class AuthenticationService {
    baseUrl:string='http://localhost:3000/';
    userData:BehaviorSubject<any> = new BehaviorSubject('');

    constructor(
      private _httpClient:HttpClient
    ) {
    }

    getuserData(){
    const encoded = JSON.stringify(localStorage.getItem('token'));
    const decodedData=jwtDecode(encoded);
    this.userData.next(decodedData);
    }

    registerUser(user:User):Observable<any>{
      return this._httpClient.post(`${this.baseUrl}api/v1/users/signup`,user)
    }

    loginUser(user:User):Observable<any>{
      return this._httpClient.post(`${this.baseUrl}api/v1/users/login`,user)
    }

    forgotPassword(email:string):Observable<any>{
      return this._httpClient.post(`${this.baseUrl}api/v1/users/forgotPassword`,{email})
    }

    resetPassword(user:User,resetToken:string):Observable<any>{
      return this._httpClient.patch(`${this.baseUrl}api/v1/users/resetPassword`,user,{
        params:{
          resetToken
        }
      })  
    }

    updatePassword(updatedPassword:User):Observable<any>{
      return this._httpClient.patch(`${this.baseUrl}api/v1/users/updatePassword`,updatedPassword)
    }
}


