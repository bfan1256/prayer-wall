import { AfterViewInit, Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const options = {
      strings: [' peace', ' joy', ' the future', ' hope', ' this nation'],
      typeSpeed: 80,
      startDelay: 1000,
      backSpeed: 80,
      loop: true,
      backDelay: 2000,
      shuffle: true,
    };
    const typed = new Typed('.type', options);
  }

}
