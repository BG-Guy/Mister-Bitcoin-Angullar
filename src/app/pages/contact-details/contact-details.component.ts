import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Transaction } from 'src/app/models/transaction.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class ContactDetailsComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
) { }

  contact: Contact
  transaction: Transaction
  msg: string
  msg$: Observable<string>

  ngOnInit(): void {

      this.route.data.subscribe(async ({ contact }) => {
        this.contact = contact._id ? contact : this.contactService.getById(contact._id)
    })

   

    this.transaction = new Transaction

}

  onBack() {
    this.router.navigateByUrl('')
    // this.router.navigate([''])
  }

  onTransferBitcoin() {    
    this.userService.addTransaction(this.contact, this.transaction.amount)
    this.transaction.amount = 0
  }

  shouldTransferBitcoin() {
    this.contactService.shouldTransferBitcoin().subscribe(msg => {
      this.cd.markForCheck()
      this.msg = msg
      console.log(msg);
      
      setTimeout(() => {
        this.cd.markForCheck()
        this.msg = ''
      }, 3000)
    })
  }

}
