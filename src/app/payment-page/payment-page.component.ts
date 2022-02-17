import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {

  data!: {
    amount: number;
    to: string;
    symbol: string;
    message?: string;
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const {code = undefined} = this._route.snapshot.params;
    if (!code) {
      throw new Error('No code provided');
    }
    this.data = await this._parseData(code);
    console.log(this.data);
  }

  private async _parseData(code: string) {
    const predecrypted = await this._decryptFromBase64(code);
    // remove secret key
    const decryptedWithoutSecretKey = predecrypted.replace('secretKey', '');
    const decrypted = await this._decryptFromBase64(decryptedWithoutSecretKey);
    try {
      // parse as json
      const data = JSON.parse(decrypted);
      return data;
    } catch (error) {
      this._router.navigate(['/']);
      throw new Error('Invalid code');
    }
  }

  private async _decryptFromBase64(data: string): Promise<string> {
    // decrypt base64 the form data
    try {
      return atob(data);
    } catch (error) {
      this._router.navigate(['/']);
      throw new Error('Invalid code');
    }
  }
}
