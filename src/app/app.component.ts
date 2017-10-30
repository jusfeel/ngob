import { Component } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


// 0f - It simply converts a list of arguments into an Observable sequence.
// from - Creates an Observable sequence from an array or an object that can be iterated.
// map - Transforms each element of the Observable sequence. Can be considered similar to map function of Array.
// subscribe - This operator is basically the connecting point between an Observer and Observable.

export class AppComponent {

  fruits: string[];
  animals: string[];
  sports: string[];

  fruits$: Rx.Observable<string[]>;
  animals$: Rx.Observable<string[]>;
  sports$: Rx.Observable<string[]>;

  observables$: Rx.Observable<string[]>;
  whateverFromPromise: string[];

  merged: string[] = [];

  constructor(private http: Http) {

    // Observable
    this.fruits  = ["apple", "pear", "peach", "banana", "pineapple"];
    this.animals = ["dogs", "cats", "dolpins", "elephons", "tigers"];
    this.sports  = ["basketball", "soccer", "boxing", "swimming", "running"];

    this.fruits$ = Rx.Observable.of(this.fruits).delay(3000);;
    this.animals$ = Rx.Observable.of(this.animals).delay(3000);
    this.sports$ = Rx.Observable.of(this.sports).delay(5000);


    let subject = new Rx.Subject();

    this.fruits$.subscribe( e => subject.next(e) );
    this.animals$.subscribe( e => subject.next(e) );
    this.sports$.subscribe( e => subject.next(e) );

    subject.subscribe( { next: (v: string[]) => this.merged = this.merged.concat(v)})

  }

  selectObservables(what: string) {
    this.observables$ = this.http.get(`http://localhost:3000/whatever/${what}`).map(
      response => response.json().data
      ).catch( error => {
        console.log(error);
        return Rx.Observable.throw(error);
      });
  }

  selectPromises(what: string) {

    this.myAsyncFunction(`http://localhost:3000/whatever/${what}`).then( elem => {
      console.log(elem);
      this.whateverFromPromise = JSON.parse(elem).data;
      });

  }

  myAsyncFunction(url): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }


}
