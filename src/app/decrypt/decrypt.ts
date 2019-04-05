import BigNumber from "bignumber.js";

export class Decrypt {
  p: number;
  q: number;
  e: number;
  n: number;
  d: number;

  private map: string[] = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

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
          endTime = +(Date.now());
          return true;
        }
        return false;
      });
    });
    return endTime - startTime;
  }

  calculateD() {
    let pq: number = (this.p - 1) * (this.q - 1);

    for (let i = 1; i < 1000000000; i++) {
      if ((this.e * i) % pq == 1) {
        this.d = i;
        break;
      }

    }
    return this.d;
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

  decrypt(message: string) {
    message = message.toLowerCase();
    let split: string[] = message.split(",");
    console.log('SPLIT: ', split);
    let result: number[] = [];
    for (let i = 0; i < split.length; i++) {
      if (split[i].indexOf(" ") === -1) {
        let bi = new BigNumber(split[i]);
        bi = bi.pow(this.d);
        bi = bi.mod(this.n);
        result.push(bi.toNumber());
      } else {
        result.push(0);
      }
    }
    return result;
  }

  numbersToCharacters(messageIntegers: number[]): string {
    let result = "";
    messageIntegers.forEach(i => {
      result += i == 0 ? ' ' : this.map[i];
    });
    return result.toString();
  }
}
