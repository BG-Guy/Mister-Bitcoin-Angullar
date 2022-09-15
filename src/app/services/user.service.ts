import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model'; 
import { Contact } from '../models/contact.model';
import { UtilsService } from './utils-service.service';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private KEY = 'user';
  private _user: User;
  private _usersDB: User[] = this.utilsService.load(this.KEY) || this.getUsers()
  // private _transaction = new BehaviorSubject<Transaction>()
  private _user$ = new BehaviorSubject<User>(this.getEmptyUser('Guest'))
  public user$ = this._user$.asObservable();

  constructor(private utilsService: UtilsService) { }

  public getUser() {
    return this.user$;
  }

  public getUsers() {
    return [
      this.getEmptyUser('Guy'),
      this.getEmptyUser('Guy100'),
      this.getEmptyUser('Guest'),
      this.getEmptyUser('Yoav'),
  ]
  }

  public getGuestUser() {
    return {
      name: 'Guest',
      balance: 0,
      transactions: 
        [new Transaction()]
    }
  }

  public getEmptyUser(str?: string) {
    return {name: str || '', balance: 100, transactions: [new Transaction()]}
  }

  public logout() {
    let user = this.getGuestUser()
    this._user$.next(user);

  }

  public login(name: string): void {
    
        let loggedUser = this._usersDB.find((user) => user.name === name)
        if (loggedUser) {
          this._user = loggedUser
          this._user$.next(loggedUser)
          return
          
        }
        let newUser = this.getEmptyUser(name)
        this._usersDB.push(newUser)
        this.utilsService.store(this.KEY, this._usersDB);
        this._user = newUser;
        return

    // let savedUser = this._user
    // savedUser.name = user.name
    // this._user$.next(savedUser);
    // this._usersDB.push(savedUser)
    // this.utilsService.store('user', this._usersDB)
  
}

  public isAuthenticated(): boolean {
    const user = this._user$.value;
    // return (user) ? true : false;
    return !!user;
  }

  public addTransaction(contact: Contact, amount: number): void {
    let newTransaction = new Transaction
    const editedUser = { ...this._user$.value };
    newTransaction._id = this.utilsService.setId();
    newTransaction.to = contact.name;
    newTransaction.from = editedUser.name;
    newTransaction.timestamp = Date.now();
    newTransaction.amount = amount;
    
    editedUser.balance -= amount;
    editedUser.transactions.unshift(newTransaction);
    const userIdx = this._usersDB.findIndex((user) => user.name === editedUser.name)
    this._usersDB.splice(userIdx, 1, editedUser)
    this._user$.next(editedUser);
    this.utilsService.store(this.KEY, this._usersDB);
  }
}
