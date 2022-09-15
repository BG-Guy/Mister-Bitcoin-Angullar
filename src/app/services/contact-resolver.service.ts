import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model'
import { ContactService } from './contact.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { interval, take, lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ContactResolverService implements Resolve<Promise<Contact>> {

  constructor(private ContactService: ContactService) { }
  
  async resolve(route: ActivatedRouteSnapshot) {
      const { id } = route.params
      const contact = await this.ContactService.getById(id).toPromise()
      return contact
  }
}
