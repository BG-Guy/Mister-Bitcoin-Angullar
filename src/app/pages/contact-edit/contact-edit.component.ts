import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})

export class ContactEditComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  contact: Contact

  ngOnInit(): void {
    this.route.data.subscribe(async ({ contact }) => {
      this.contact = contact._id ? contact : this.contactService.getEmptyContact() as Contact
    })
  //   this.route.params.subscribe(async params => {
  //     const pet = await this.petService.getById(params.id).toPromise()

      
  //     const contact = await lastValueFrom(this.contactService.getById(params.id))
  //     this.contact = contact
  // })
  }

  async onSaveContact() {
    await this.contactService.save({ ...this.contact }).toPromise()
    this.router.navigateByUrl('')
}

handleEmailChange(email: string) {
    this.contact.email = email
}

onBack() {
  this.router.navigateByUrl('contacts')
  // this.router.navigate([''])
}

}
