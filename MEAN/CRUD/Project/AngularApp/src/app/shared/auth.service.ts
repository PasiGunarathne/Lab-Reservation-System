import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Lab } from './lab.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  selectedLab: Lab;
  labs: Lab[];
  readonly baseURL = 'http://localhost:3000/labs';

  selectedUser: User;
  users: User[];
  readonly baseURL1 = 'http://localhost:3000/user/register';

  // selectedLUser: User;
  // usersL: User[];
  // readonly baseURL2 = 'http://localhost:3000/login';


  constructor(private http: HttpClient) { }

  //related to lab component
  postLab(labReservation: Lab) {
    return this.http.post('http://localhost:3000/labs/add', labReservation);
  }
  getLabList() {
    return this.http.get('http://localhost:3000/labs');
  }
  // update lab reservation
  putLab(labReservation: Lab) {
    return this.http.put('http://localhost:3000/labs/' + labReservation._id, labReservation);
    // return this.http.put('http://localhost:3000/labs/5b348bd3ce3dcc5134e1fff7', labReservation);
  }
  // delete lab reservation
  deleteLab(_id: string) {
    return this.http.delete('http://localhost:3000/labs/' + _id);
  }



  //related to signup component - register
  register(body: any) {
    return this.http.post('http://localhost:3000/user/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  // update user
  putUser(users: User) {
    return this.http.put('http://localhost:3000/user/' + users._id, users);
  }
  // delete User
  deleteUser(_id: string) {
    return this.http.delete('http://localhost:3000/user/' + _id);
  }


  // postUser(user: User){
  //   console.log('hell2');

  //   return this.http.post(this.baseURL1, user);
  // }

  // getUserList(){
  //   return this.http.get(this.baseURL1);
  // }


  //related to login component
  //  getUserDetails(username, password){
  //   return this.http.post(this.baseURL1, {
  //     username,
  //     password
  //   }).subscribe(data => {
  //     console.log(data, " what we got");

  //   });
  // } 

  login(body: any) {
    console.log('hello2');

    return this.http.post('http://localhost:3000/user/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')

    });
  }

  user() {
    return this.http.get('http://localhost:3000/user/user', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  admin() {
    return this.http.get('http://localhost:3000/user/admin', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  logout() {
    return this.http.get('http://localhost:3000/user/logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  getUserList() {
    return this.http.get('http://localhost:3000/user');
  }

}




