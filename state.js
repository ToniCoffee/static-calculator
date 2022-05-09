import { Stack } from './data-structures.js';

export function State() {
	Stack.call(this, 'memory');
	this.on = false;
	this.mode = 1;
	this.ans = null;
	this.display = '';
	this.afterEqual = false;
}

State.prototype = Object.create(Stack.prototype);
State.prototype.constructor = State;
State.prototype.setOn = function(on) {
	this.on = on ? on : !this.on;
};
State.prototype.setMode = function(mode = this.mode) {
	this.mode = mode;
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
}