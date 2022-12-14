import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { ContactFilter } from '../models/contact-filter.model';
import { UtilsService } from './utils-service.service';
import { Transaction } from '../models/transaction.model';


@Injectable({
  providedIn: 'root'
})

export class ContactService {
  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  KEY = 'contactsDB';
  
  private _contactsDb: Contact[] = this.utilsService.load(this.KEY)?._value || [
  {
      _id: "5a56640269f443a5d64b32ca",
      name: "Ochoa Hyde",
      email: "ochoahyde@renovize.com",
      phone: "+1 (968) 593-3824",
    },
    {
      _id: "5a5664025f6ae9aa24a99fde",
      name: "Hallie Mclean",
      email: "halliemclean@renovize.com",
      phone: "+1 (948) 464-2888",
      

    },
    {
      _id: "5a56640252d6acddd183d319",
      name: "Parsons Norris",
      email: "parsonsnorris@renovize.com",
      phone: "+1 (958) 502-3495",
      

    },
    {
      _id: "5a566402ed1cf349f0b47b4d",
      name: "Rachel Lowe",
      email: "rachellowe@renovize.com",
      phone: "+1 (911) 475-2312",
      

    },
    {
      _id: "5a566402abce24c6bfe4699d",
      name: "Dominique Soto",
      email: "dominiquesoto@renovize.com",
      phone: "+1 (807) 551-3258",
      

    },
    {
      _id: "5a566402a6499c1d4da9220a",
      name: "Shana Pope",
      email: "shanapope@renovize.com",
      phone: "+1 (970) 527-3082",
      

    },
    {
      _id: "5a566402f90ae30e97f990db",
      name: "Faulkner Flores",
      email: "faulknerflores@renovize.com",
      phone: "+1 (952) 501-2678",
      

    },
    {
      _id: "5a5664027bae84ef280ffbdf",
      name: "Holder Bean",
      email: "holderbean@renovize.com",
      phone: "+1 (989) 503-2663",
      

    },
    {
      _id: "5a566402e3b846c5f6aec652",
      name: "Rosanne Shelton",
      email: "rosanneshelton@renovize.com",
      phone: "+1 (968) 454-3851",
      

    },
    {
      _id: "5a56640272c7dcdf59c3d411",
      name: "Pamela Nolan",
      email: "pamelanolan@renovize.com",
      phone: "+1 (986) 545-2166",
      

    },
    {
      _id: "5a5664029a8dd82a6178b15f",
      name: "Roy Cantu",
      email: "roycantu@renovize.com",
      phone: "+1 (929) 571-2295",
      

    },
    {
      _id: "5a5664028c096d08eeb13a8a",
      name: "Ollie Christian",
      email: "olliechristian@renovize.com",
      phone: "+1 (977) 419-3550",
      

    },
    {
      _id: "5a5664026c53582bb9ebe9d1",
      name: "Nguyen Walls",
      email: "nguyenwalls@renovize.com",
      phone: "+1 (963) 471-3181",
      

    },
    {
      _id: "5a56640298ab77236845b82b",
      name: "Glenna Santana",
      email: "glennasantana@renovize.com",
      phone: "+1 (860) 467-2376",
      

    },
    {
      _id: "5a56640208fba3e8ecb97305",
      name: "Malone Clark",
      email: "maloneclark@renovize.com",
      phone: "+1 (818) 565-2557",
      

    },
    {
      _id: "5a566402abb3146207bc4ec5",
      name: "Floyd Rutledge",
      email: "floydrutledge@renovize.com",
      phone: "+1 (807) 597-3629",
      

    },
    {
      _id: "5a56640298500fead8cb1ee5",
      name: "Grace James",
      email: "gracejames@renovize.com",
      phone: "+1 (959) 525-2529",
      

    },
    {
      _id: "5a56640243427b8f8445231e",
      name: "Tanner Gates",
      email: "tannergates@renovize.com",
      phone: "+1 (978) 591-2291",
      

    },
    {
      _id: "5a5664025c3abdad6f5e098c",
      name: "Lilly Conner",
      email: "lillyconner@renovize.com",
      phone: "+1 (842) 587-3812",
      
    },
  ];

  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contacts$.asObservable()

  private _filterBy$ = new BehaviorSubject<ContactFilter>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable()

  public query() {
    const filterBy = this._filterBy$.getValue()
    let contacts = this._contactsDb
    contacts = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filterBy.term.toLowerCase())
    })
    this._contacts$.next(contacts)
  }

  public shouldTransferBitcoin() {
    return this.http.get<{ image: string }>('https://yesno.wtf/api')
        .pipe(
            map(res => res.image)
        )
}

  public getEmptyContact() {
    return { name: '', email: '', phone: '' }
  }

  public remove(contactId: string) {
    const contacts = this._contactsDb
    const contactIdx = contacts.findIndex(contact => contact._id === contactId)
    contacts.splice(contactIdx, 1)
    this._contacts$.next(contacts)
    this.utilsService.store(this.KEY, contacts);
    return of({})
  }

  public getById(contactId: string): Observable<Contact> {
    const contact = this._contactsDb.find(contact => contact._id === contactId)
    return of({ ...contact })
  }

  public setFilterBy(filterBy: ContactFilter) {
    this._filterBy$.next({ ...filterBy })
    this.query()
  }

  public save(contact: Contact) {
    return contact._id ? this._edit(contact) : this._add(contact)
  }

  private _add(contact: Contact) {
    contact._id = this._makeId()
    contact.image = `https://robohash.org/${contact.name}?set=set5`
    const contacts = this._contactsDb
    this._contactsDb.push(contact)
    this._contacts$.next([...contacts])
    this.utilsService.store(this.KEY, contacts);
    return of(contact)
  }

  private _edit(contact: Contact) {
    const contacts = this._contactsDb
    const contactIdx = contacts.findIndex(_contact => _contact._id === contact._id)
    contacts.splice(contactIdx, 1, contact)
    this._contacts$.next([...contacts])
    this.utilsService.store(this.KEY, this._contacts$);
    return of(contact)
  }

  private _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

}
