import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NFC } from "@ionic-native/nfc";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  granted: boolean;
  denied: boolean;
  scanned: boolean;
  tagId: string;

  constructor(public navCtrl: NavController, private nfc: NFC) {
    this.resetScanData();
  }

  resetScanData() {
    this.granted = false;
    this.scanned = false;
    this.tagId = "";
  }

  ionViewDidEnter() {
    this.nfc.enabled().then((resolve) => {
      this.addListenNFC();
    }).catch((reject) => {
      alert("NFC is not supported by your Device");
    });
  }

  addListenNFC() {

    this.nfc.addTagDiscoveredListener(nfcEvent => this.sesReadNFC(nfcEvent.tag)).subscribe(data => {
      if (data && data.tag && data.tag.id) {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        if (tagId) {
          this.tagId = tagId;
          this.scanned = true;

          // only testing data consider to ask web api for access
          this.granted = [
            "7d3c6179"
          ].indexOf(tagId) != -1;

        } else {
          alert('NFC_NOT_DETECTED');
        }
      }
    });
  }

  sesReadNFC(data): void {

  }

  failNFC(err) {
    alert("Error while reading: Please Retry");
  }

}
