import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IUser } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<IUser> {
  protected override source: string = 'users';
  private userListSignal = signal<IUser[]>([]);

  get users$() {
    return this.userListSignal;
  }
  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.userListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      }
    });
  }

  saveUserSignal (user: IUser): Observable<any>{
  const userAux = {
    email: user.email,
    lastname: user.lastname,
    name: user.name,
    password: user.password,
    streak: 0,
    score: 0,
    userType: {
      id: 1,
      typeName: "player"
    },
    role: { 
      id: 1,
      name: "USER",
			description: "Super Administrator role"
    },
  };
   
   
    return this.add(userAux).pipe(
      tap((response: any) => {
        this.userListSignal.update( users => [response, ...users]);
      }),
      catchError(error => {
        console.log('User:', user);
        console.error('Error saving user', error);
        return throwError(error);
      })
    );
  }


  updateUserSignal (user: IUser): Observable<any> {


      /**
      *@Author Alejandro José Salazar Lobo
      *@param user es el usuario que se va a actualizar sin el authorities que no esta en el backend y por eso daba el error
      */
    const { authorities, ...userWithoutAuthorities } = user;


    return this.edit(user.id, userWithoutAuthorities).pipe(
      tap((response: any) => {
        const updatedUsers = this.userListSignal().map(u => u.id === user.id ? response : u);
        this.userListSignal.set(updatedUsers);
      }),
      catchError(error => {
        console.error('Error saving user', error);
        return throwError(error);
      })
    );
  }


  deleteUserSignal (user: IUser): Observable<any>{
    return this.del(user.id).pipe(
      tap((response: any) => {
        const updatedUsers = this.userListSignal().filter(u => u.id !== user.id);
        this.userListSignal.set(updatedUsers);
      }),
      catchError(error => {
        console.error('Error saving user', error);
        return throwError(error);
      })
    );
  }
}
