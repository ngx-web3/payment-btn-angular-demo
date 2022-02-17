import { Component, Input, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-share-button',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  @Input() width?: number = 50;
  public isBrowserShareAvailable!: boolean;

  async ngOnInit() {
    await new Promise((resolve: (value: unknown) => void, reject) => {
      if (!!navigator.share) {
        this.isBrowserShareAvailable = true;
        resolve(true);
      }
    });
  }

  async share() {
    const title = `[PAYMENT] Your invited to execute payment`;
    const text = `Hi, I am inviting you to execute payment. Please click on the link below to accept the payment.`
    const url = document.URL;
    
    console.log('share');
    
    const res = await Share.share({ 
      title, 
      text, 
      url, 
      dialogTitle: 'Share Payment' 
    }).catch((err) => err); // catch error to not display Alert on cancel action
    console.log(res);
  }
}
