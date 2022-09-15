import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  constructor( private userService: UserService ) {}
  user: User
  userSubscription: Subscription
  
  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => this.user = user);
  }
  

  options: AnimationOptions = {
    path: 'assets/Animations/animation-data.json',
  };

  
}
