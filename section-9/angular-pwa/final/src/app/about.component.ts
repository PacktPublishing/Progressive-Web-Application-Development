import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="container">
      <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">ABOUT!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a
          bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </div>
      <a class="btn btn-primary" routerLink='/'>GO TO HOMEPAGE</a>
    </div>
  `,
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
