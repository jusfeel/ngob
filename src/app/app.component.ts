import { Component } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Person } from './person';

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
  observables$$: Rx.Observable<string[]>;
  whateverFromPromise: string[];

  merged: string[];

  fruitsData : string[] = undefined;

  fruitsSubscription: Rx.Subscription;
  animalSubscription: Rx.Subscription;
  sportSubscription: Rx.Subscription;


  team1: Person[] = [];
  team2: Person[] = [];

  teamMembersToPipe: Person[] = [];
  teamMembersToSort: Person[] = [];
  person: Person = new Person();
  constructor(private http: Http) {

    this.merged = [];
    // Observable
    this.fruits  = ["apple", "pear", "peach", "banana", "pineapple"];
    this.animals = ["dogs", "cats", "dolpins", "elephons", "tigers"];
    this.sports  = ["basketball", "soccer", "boxing", "swimming", "running"];

    this.fruits$ = Rx.Observable.of(this.fruits).delay(1000);
    this.animals$ = Rx.Observable.of(this.animals).delay(3000);
    this.sports$ = Rx.Observable.of(this.sports).delay(5000);

    this.fruits$.subscribe( elem => {

      this.fruitsData = elem;
    });

    let subject = new Rx.Subject();

    this.fruitsSubscription = this.fruits$.subscribe( e => subject.next(e) );
    this.animalSubscription = this.animals$.subscribe( e => subject.next(e) );
    this.sportSubscription = this.sports$.subscribe( e => subject.next(e) );

    subject.subscribe( { next: (v: string[]) => this.merged = this.merged.concat(v)})


    "Aaa,Bbb,Ccc,Dcc,Ecc".split(",").map(  (elem, index) => {
          let p = new Person();
          p.firstName = elem;
          p.lastName = elem.concat("asdf");
          p.age = "23";
          p.sex = "male";
          p.weight = "111";
          p.height = "160";
          this.team1.push(p);
      });

    "Tom,Jim,Peter,Cake,Jane".split(",").map(
        (elem, index) => {
          let p = new Person();
          p.firstName = elem;
          p.lastName = elem.concat("asdf");
          p.age = "23";
          p.sex = "male";
          p.weight = "111";
          p.height = "160";
          this.team2.push(p);
      });

    Rx.Observable.of(this.team1).delay(1000).subscribe(
        elem => {
          this.teamMembersToPipe = this.teamMembersToPipe.concat(elem);
          this.teamMembersToSort = this.teamMembersToSort.concat(elem);
        }
      );
    Rx.Observable.of(this.team2).delay(3000).subscribe(
        elem => {
          this.teamMembersToPipe = this.teamMembersToPipe.concat(elem);
          this.teamMembersToSort = this.teamMembersToSort.concat(elem);
        }
      );
  }

  get teamMembers() : Person[] {
    return this.teamMembersToSort.sort(
         (a, b) => (a.firstName < b.firstName) ? 1 : (a.firstName == b.firstName) ? 0 : -1
      );
  }

  addNewPerson(person: Person) {
    this.teamMembersToPipe.push(person);
    this.teamMembersToSort.push(person);
    this.teamMembersToSort.sort(
         (a, b) => (a.firstName < b.firstName) ? 1 : (a.firstName == b.firstName) ? 0 : -1
      );
    this.person = new Person();
  }

  stopSubscribe() : void {
    this.sportSubscription.unsubscribe();
  }

  selectObservables(what: string) {
    this.observables$ = this.http.get(`http://localhost:3000/whatever/${what}`).map(
      response => {

        return response.json().data;
      }
      ).catch( error => {
        console.log(error);
        return Rx.Observable.throw(error);
      });
  }

  selectPromises(what: string) {

    this.observables$$ = this.http.get(`http://localhost:3000/whatever/${what}`).map(
          response => {

            return response.json().data;
          }
          ).catch( error => {
            console.log(error);
            return Rx.Observable.throw(error);
          });


    // this.myAsyncFunction(`http://localhost:3000/whatever/${what}`).then( elem => {
    //   console.log(elem);
    //   this.whateverFromPromise = JSON.parse(elem).data;
    //   });

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
