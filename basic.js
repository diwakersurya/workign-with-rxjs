import {Observable} from "rxjs";
let numbers = [1, 2, 3, 4];
let source = Observable.from(numbers);
class MyObserver {
	next(value) {
		console.log(`value is ${value}`);
	}
	error(e) {
		console.log(`error is ${e}`);
	}
	complete() {
		console.log(`complete`);
	}
}
source.subscribe(new MyObserver());
//subscribe using arrow funcitons
source.subscribe(value => console.log(`value is ${value}`), e => console.log(`error is ${e}`), () => console.log(`complete`));
//creating custom observer --low level
let csource = Observable.create(observer => {
	numbers.forEach(num => observer.next(num));
	observer.complete();
});
csource.subscribe(value => console.log(`value is ${value}`), e => console.log(`error is ${e}`), () => console.log(`complete`));
//using map operator to perform modification
csource.map(val => val * 2).subscribe(value => console.log(`value is ${value}`), e => console.log(`error is ${e}`), () => console.log(`complete`));
//using filter operator to perform modification
csource.map(val => val * 2).filter(val => val > 2).subscribe(value => console.log(`value is ${value}`), e => console.log(`error is ${e}`), () => console.log(`complete`));
