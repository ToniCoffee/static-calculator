import { Observable } from './reactive.js'; 
import { ACTION } from './actions.js';
import { Stack } from './data-structures.js';

export function State() {
	Stack.call(this, 'memory');
	Observable.call(this);
	this.on = false;
	this.mode = 1;
	this.ans = null;
	this.display = '';
	this.afterEqual = false;
}

// State.prototype = Object.create(Observable.prototype);
State.prototype = Object.assign(Stack.prototype, Observable.prototype); // multiple inheritance
State.prototype.constructor = State;
State.prototype.setOn = function(on) {
	this.on = on ? on : !this.on;
	this.notify(ACTION.on, this.on);
};
State.prototype.setMode = function(mode = this.mode) {
	this.mode = mode;
	this.notify(ACTION.mode, this.mode);
};
State.prototype.setState = function(props = {}) {
	this.on = props.on ? props.on : this.on;
	this.mode = props.mode ? props.mode : this.mode;
};
State.prototype.set = function(on = this.on, mode = this.mode) {
	this.on = on ? on : this.on;
	this.mode = mode ? mode : this.mode;
};
State.prototype.setDisplay = function(display = '') {
	this.display = display;
	this.notify(ACTION.display, this.display);
}