import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class ContactPreviewComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }
    @Input() contact: Contact
    @Output('remove') onRemove = new EventEmitter<string>()


    ngOnInit(): void {

    }

    onRemoveContact(ev: MouseEvent, contactId: string) {
        ev.stopPropagation()
        this.onRemove.emit(contactId)

    }
}
