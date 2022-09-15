import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { UserMsgService } from '../../services/user-msg.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})

export class ContactsPageComponent implements OnInit, OnDestroy {

    constructor(private contactService: ContactService, private userMsgService: UserMsgService) { }
    subscription: Subscription
    contacts: Contact[]
    contacts$: Observable<Contact[]>
    prm = new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved!')
        }, 800);
    })

    ngOnInit(): void {
        this.contactService.query()
        this.contacts$ = this.contactService.contacts$


        // this.subscription = this.contactService.contacts$.subscribe(contacts => {
        //     this.contacts = contacts
        // })
    }

    onRemoveContact(contactId: string) {
        this.contactService.remove(contactId)
        this.userMsgService.setMsg(`contact (${contactId}) removed!`)

    }



    ngOnDestroy(): void {
        // this.subscription.unsubscribe()
    }

}

