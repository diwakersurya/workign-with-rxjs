import {Observable} from "rxjs";
let ball = document.getElementById("ball");
let source = Observable.fromEvent(document, "mousemove").map(e => {
	return {x: e.clientX, y: e.clientY}
}).delay(200);
function onNext(value) {
	ball.style.left = value.x + "px";
	ball.style.top = value.y + "px";
}
source.subscribe(onNext, e => console.log(`error is ${e}`), () => console.log(`complete`));
