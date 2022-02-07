import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import '@ngx-web3/ui-payment-btn';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      amount: new FormControl(250, Validators.required),
      to: new FormControl('0x...', Validators.required),
      symbol: new FormControl('BNB', Validators.required)
    });
  }
}
