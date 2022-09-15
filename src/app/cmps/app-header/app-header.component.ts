import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { User } from 'src/app/models/user.model';
import { ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

constructor(private userService: UserService) { }

  modalToggle = false
  sideMenuOpen = false
  user: User
  userSubscription: Subscription

  @Output() ('toggle') onToggle = new EventEmitter()
    
  
  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => this.user = user);
    }


  onToggleSideMenu() {
    this.sideMenuOpen = !this.sideMenuOpen
    if (this.sideMenuOpen) document.body.classList.toggle('no-scroll')
    else document.body.classList.toggle('no-scroll')
  }

  onModalToggle() {
    this.modalToggle = !this.modalToggle
    document.body.classList.toggle('modal-open')
  }

  onLogout() {
    this.userService.logout()
  }

  isGuest():boolean {
    return this.user.name === 'Guest' ? true : false
  }

  options: AnimationOptions = {
    path: 'assets/Animations/bitcoin-fill-animation.json',
  };

  

}
