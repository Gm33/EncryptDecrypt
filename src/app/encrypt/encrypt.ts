export class Encrypt {
  p: number;
  q: number;
  e: number;
  n: number;

  private map: string[] = ["","a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  constructor() {
  }

  findPAndQ(): number {
    console.log('Finding P and Q for N: ', this.n);
    let primeNumbers: number[] = this.getPrimes(5000);
    let startTime = +(Date.now());
    let endTime = 0;
    primeNumbers.some(i => {
      return primeNumbers.some(j => {
        if (i * j == this.n) {
          this.p = j;
          this.q = i;
          console.log('Found something? ', i, j);
          endTime = +(Date.now());
          return true;
        }
        return false;
      });
    });
    return endTime - startTime;
  }

  // Prime
  getPrimes(max: number): number[] {
    let sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
      if (!sieve[i]) {
        // i has not been marked -- it is prime
        primes.push(i);
        for (j = i << 1; j <= max; j += i) {
          sieve[j] = true;
        }
      }
    }
    return primes;
  }

  findAllE(): number[] {
    let result: number[] = [];
    let x: number = (this.p - 1) * (this.q - 1);
    for (let i = 2; i < x && i < 40; i++) {
      if (this.gcd(x, i) == 1) {
        if (result.indexOf(i) === -1) {
          result.push(i);
        }
      }
    }
    return result;
  }

  private gcd(a: number, b: number): number {
    let t: number;
    while (b != 0) {
      t = a;
      a = b;
      b = t % b;
    }
    return a;
  }

  encrypt(message: string): string {
    message = message.toLowerCase();
    let result = "";
    let charArray: string[] = message.split('');
    for (let i = 0; i < charArray.length; i++) {
      try {
        if (this.map.indexOf(charArray[i]) !== -1) {
          let bi = this.map.indexOf(charArray[i]);
          bi = Math.pow(bi, this.e);
          // bi = this.modulo(bi, this.p * this.q);
          bi = ((bi % (this.p * this.q)) + (this.p * this.q)) % (this.p * this.q);
          result += bi;
          if (i < (charArray.length - 1)) {
            result += ",";
          }
        } else if (charArray[i] == ' ') {
          result += " ,";
        }
      } catch (e) {
        console.log(e);
      }
    }

    return result.toString();
  }
}
