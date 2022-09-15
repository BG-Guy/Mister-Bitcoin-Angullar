import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ContactListComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,

    ) { }

  @Input() contacts: Contact[]
  @Output('remove') onRemove = new EventEmitter<string>()

  contact: Contact

  ngOnInit(): void {
      this.contact = this.contactService.getEmptyContact() as Contact    
   
  }
  
  async onSaveContact() {
    // const contact = JSON.parse(JSON.stringify(this.contact),

    await this.contactService.save({ ...this.contact }).toPromise()


    // this.contactService.query
  }
}
