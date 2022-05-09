export function Observable(element = null, subscribers = []) {
	if(Array.isArray(subscribers)) this.subscribers = subscribers;
	else throw new TypeError('the subscribers parameter must be of type array.');

	if(element) {
		if(element.constructor.name === 'Object' || element instanceof HTMLElement) {
			this.element = element;
			this.element.subscribe = Observable.prototype.subscribe;
			this.element.unsubscribe = Observable.prototype.unsubscribe;
			this.element.notify = Observable.prototype.notify;
			return this;
		}
	}
}

Observable.prototype.subscribe = function(element) {
	this.subscribers.push(element);
};
Observable.prototype.unsubscribe = function(element) {
	this.subscribers = this.subscribers.filter(subscriber => element !== subscriber);
};
Observable.prototype.notify = function(action, data) {
	this.subscribers.forEach(subscriber => subscriber.onNotify(action, data));
};

export function Observer(element = null) {
	if(element) {
		if(element.constructor.name === 'Object' || element instanceof HTMLElement) {
			this.element = element;
			this.element.onNotify = Observer.prototype.onNotify;
			return this;
		}
	}
}

Observer.prototype.onNotify = function() {}