import {Observable} from "rxjs";
let button = document.getElementById("button");
let output = document.getElementById("output");
let click = Observable.fromEvent(button, "click");
//without using observables
// function load(url) {
// 	let xhr = new XMLHttpRequest();
// 	xhr.addEventListener("load", () => {
// 		let movies = JSON.parse(xhr.responseText);
// 		movies.forEach(m => {
// 			let div = document.createElement("div");
// 			div.innerText = m.name;
// 			output.appendChild(div);
// 		})
// 	})
// 	xhr.open("GET", url)
// 	xhr.send();
// }
//using observables and retry strategy.
function load(url) {
	return Observable.create(observer => {
		let xhr = new XMLHttpRequest();
		xhr.addEventListener("load", () => {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				observer.next(data);
				observer.complete();
			} else {
				observer.error(xhr.statusText)
			}
		})
		xhr.open("GET", url)
		xhr.send();
		//	}).retry(5);
	}).retryWhen(retryStrategy({attempts: 5, delay: 1000}));
}
function retryStrategy({
	attempts = 4,
	delay = 2000
}) {
	return error => error.scan((acc, val) => {
		return acc + 1;
	}, 0).takeWhile(acc => acc < attempts).delay(delay);
}
function renderMovies(movies) {
	movies.forEach(m => {
		let div = document.createElement("div");
		div.innerText = m.name;
		output.appendChild(div);
	})
}
function loadWithFetch(url) {
	return Observable.fromPromise(fetch(url).then(resp => resp.json()))
}
//click.subscribe(e => load("movies.json"), e => console.log(`error is ${e}`), () => console.log(`complete`));
//see flatmap for more details on what it is doing here. it basically helps us to subscribe to the observable returned by
//inner function
//normal
//click.flatMap(e => load("movies.json")).subscribe(renderMovies, e => console.log(`error is ${e}`), () => console.log(`complete`));
//with fetch
click.flatMap(e => loadWithFetch("movies.json")).subscribe(renderMovies, e => console.log(`error is ${e}`), () => console.log(`complete`));
