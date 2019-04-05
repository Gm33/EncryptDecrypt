import { Component, OnInit } from '@angular/core';
import { Decrypt } from "./decrypt";

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.css']
})
export class DecryptComponent implements OnInit {

  n: number;
  e: number;
  d: number;
  duration: number;
  textToDecrypt: string = "";
  decryptedText: string;
  decryptedCharacters: number[];
  decrypter: Decrypt = new Decrypt();

  constructor() {
  }

  ngOnInit() {
  }

  step1() {
    this.decrypter.n = this.n;
    this.decrypter.e = this.e;
    this.duration = this.decrypter.findPAndQ();
    this.d = this.decrypter.calculateD();
  }

  step2() {
    this.decryptedCharacters = this.decrypter.decrypt(this.textToDecrypt);
    this.decryptedText = this.decrypter.numbersToCharacters(this.decryptedCharacters);
  }

  arrayToString(array): string {
    return array.join(', ');
  }

}
