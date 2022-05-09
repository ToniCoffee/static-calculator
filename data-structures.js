export function Stack(dataPropertyName = 'data') {
	this.dataPropertyName = dataPropertyName;
	this[this.dataPropertyName] = [];
}

Stack.prototype.push = function(data) {
	this[this.dataPropertyName].push(data);
};
Stack.prototype.pop = function() {
	return this[this.dataPropertyName].pop();
};
Stack.prototype.peak = function() {
	return this[this.dataPropertyName][this[this.dataPropertyName].length - 1];
};
Stack.prototype.toString = function() {
	return this[this.dataPropertyName].join(', ');
};
Stack.prototype.print = function() {
	return this[this.dataPropertyName].join(', ');
};

export function Quue(dataPropertyName = 'data') {
	this.dataPropertyName = dataPropertyName;
	this[this.dataPropertyName] = [];
}

Quue.prototype.push = function(data) {
	this[this.dataPropertyName].unshift(data);
};
Quue.prototype.pop = function() {
	return this[this.dataPropertyName].shift();
};
Quue.prototype.peak = function() {
	return this[this.dataPropertyName][0];
};
Quue.prototype.toString = function() {
	return this[this.dataPropertyName].join(', ');
};
Quue.prototype.print = function() {
	return this[this.dataPropertyName].join(', ');
};