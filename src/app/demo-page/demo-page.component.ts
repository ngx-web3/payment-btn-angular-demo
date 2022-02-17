import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import '@ngx-web3/ui-payment-btn';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss']
})
export class DemoPageComponent implements OnInit {
  
  public form!: FormGroup;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      amount: new FormControl(250, Validators.required),
      to: new FormControl('0x...', Validators.required),
      symbol: new FormControl('BNB', Validators.required)
    });
  }

  async createPaymentLink() {
    // emcrypt base64 the form data
    const data = this.form.getRawValue();
    const encryptedData = await this._encryptAsBase64(JSON.stringify(data));
    // seconde encryption with secret key
    const encryptedDataWithSecretKey = await this._encryptAsBase64(encryptedData + 'secretKey');
    // rermove last character from encrypted data
    const code = encryptedDataWithSecretKey.slice(0, encryptedDataWithSecretKey.length - 1);
    this._router.navigate(['p', code]);
  }

  private async _encryptAsBase64(data: string): Promise<string> {
    // encrypt base64 the form data
    return btoa(data);
  }

  toBinary(data: string) {
    const codeUnits = new Uint16Array(data.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = data.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
  }
}
