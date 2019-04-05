import { Component, OnInit } from '@angular/core';
import { Encrypt } from "./encrypt";

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.css']
})
export class EncryptComponent implements OnInit {

  n: number;
  p: number;
  q: number;
  duration: number;
  e: number;
  availableE: number[];
  textToEncrypt: string = "";
  encryptedText: string;
  encrypter: Encrypt = new Encrypt();

  constructor() {
  }

  ngOnInit() {
  }

  step1() {
    this.encrypter.n = this.n;
    let duration = this.encrypter.findPAndQ();
    if (this.encrypter.p > 0 && this.encrypter.q > 0) {
      this.p = this.encrypter.p;
      this.q = this.encrypter.q;
      this.duration = duration;
    } else {
      this.clearInputs();
      alert("No suitable p and q found for " + this.n);
    }
  }

  step2() {
    this.availableE = this.encrypter.findAllE();
    this.e = this.availableE[0];
  }

  step3() {
    if (this.textToEncrypt && this.textToEncrypt.length) {
      this.encrypter.e = this.e;
      this.encryptedText = this.encrypter.encrypt(this.textToEncrypt);
    }
  }

  clearInputs(): void {
    this.n = null;
    this.p = null;
    this.q = null;
    this.duration = null;
  }

}
