import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-button',
  templateUrl: './new-button.component.html',
  styleUrls: ['./new-button.component.scss']
})
export class NewButtonComponent {
  @Input()
  public route: string;

  constructor(private _router: Router) {}

  public new() {
    this._router.navigate([this.route]);
  }
}
