import { Observer } from './reactive.js';
import { State } from './state.js';
import { ACTION } from './actions.js';

const DISPLAY_ACTION = {
	[ACTION.on]: function(obj, data) {
		if(!data) obj.element.value = '';
		else obj.element.value = '';
	},
	[ACTION.mode]: function(obj, data) { console.log(data); },
	[ACTION.display]: function(obj, data) {
		if(data) obj.element.value = data;
		// else obj.element.value = '';
	}
};

const DISPLAY_RESULT = {
	[ACTION.on]: function(obj, data) {
		if(!data) obj.element.innerText = '';
		else obj.element.innerText = '0';
	},
	[ACTION.mode]: function(obj, data) { console.log(data); },
	[ACTION.display]: function(obj, data) { console.log(data); }
};

const CHECK_TYPE = {
	true: (fnc) => { fnc(); },
	false: (fnc) => { fnc(); },
	null: (fnc) => { fnc(); },
	undefined: (fnc) => { fnc(); },
	object: (fnc) => { fnc(); },
	function: (fnc) => { fnc(); }
};

const ON_TYPE = function(value, onType = CHECK_TYPE) {
	CHECK_TYPE.true = onType.true;
	CHECK_TYPE.false = onType.false;
	CHECK_TYPE.null = onType.null;
	CHECK_TYPE.undefined = onType.undefined;
	CHECK_TYPE.object = onType.object;
	CHECK_TYPE.function = onType.function;
	if(CHECK_TYPE[value]) CHECK_TYPE[value]();
};

function onCalculatorOn(actionElement, resultElement) {
	actionElement.value = '';
	resultElement.innerText = '';
	state.on = false;
};

function onCalculatorOff(actionElement, resultElement) {
	actionElement.value = '';
	resultElement.innerText = '0';
	state.on = true;
};

function onAnsIsSet(actionElement, value) {
	actionElement.value = `Ans${value}`;
	state.afterEqual = false;
}

function onAnsNotSet(actionElement, value) {
	actionElement.value += `${value}`;
}

function onDelMatch(actionElement) {
	actionElement.value = actionElement.value.replace(/(Ans|sin |cos |tan )$/, '');
}

function onDelNotMatch(actionElement) {
	actionElement.value = actionElement.value.substring(0, actionElement.value.length - 1);
}

function replaceInput(element, regexPattern) {
	element.value = element.value.substring(0, element.value.length - 1);
	element.value = element.value.replace(regexPattern, '');
}

function onEqual(actionElement, resultElement) {
	let temp = actionElement.value.replace(/%/g, '/100');
	actionElement.value.match(/(sin|cos|tan) \d+/g)?.forEach(i => {
		const splitted = i.split(' ');
		const result = Math[splitted[0]]((Number(splitted[1]) * Math.PI) / 180);
		temp = temp.replace(/(sin|cos|tan) \d+/g, result);
	});
	temp = temp.replace(/Ans/g, state.ans);

	const result = eval(temp);
	resultElement.innerText = result;
	state.push(result);
	state.ans = state.peak();
	state.afterEqual = true;
}

const BUTTON_MAP = {
	'0': (actionElement, resultElement) => actionElement.value += '0',
	'1': (actionElement, resultElement) => actionElement.value += '1',
	'2': (actionElement, resultElement) => actionElement.value += '2',
	'3': (actionElement, resultElement) => actionElement.value += '3',
	'4': (actionElement, resultElement) => actionElement.value += '4', 
	'5': (actionElement, resultElement) => actionElement.value += '5',
	'6': (actionElement, resultElement) => actionElement.value += '6', 
	'7': (actionElement, resultElement) => actionElement.value += '7',
	'8': (actionElement, resultElement) => actionElement.value += '8', 
	'9': (actionElement, resultElement) => actionElement.value += '9',
	'x': (actionElement, resultElement) => ON_TYPE(state.afterEqual, { true: () => onAnsIsSet(actionElement, '*'), false: () => onAnsNotSet(actionElement, '*') }),
	'/': (actionElement, resultElement) => ON_TYPE(state.afterEqual, { true: () => onAnsIsSet(actionElement, '/'), false: () => onAnsNotSet(actionElement, '/') }),
	'+': (actionElement, resultElement) => ON_TYPE(state.afterEqual, { true: () => onAnsIsSet(actionElement, '+'), false: () => onAnsNotSet(actionElement, '+') }),
	'-': (actionElement, resultElement) => ON_TYPE(state.afterEqual, { true: () => onAnsIsSet(actionElement, '-'), false: () => onAnsNotSet(actionElement, '-') }),
	'EXP': (actionElement, resultElement) => actionElement.value += 'E', 
	'Ans': (actionElement, resultElement) => actionElement.value += 'Ans',
	'.': (actionElement, resultElement) => actionElement.value += '.', 
	'AC': (actionElement, resultElement) => {
		actionElement.value = '';
		resultElement.innerText = '0';
		state.afterEqual = false;
	},
	'DEL': (actionElement, resultElement) => {
		ON_TYPE(
			actionElement.value.match(/(Ans|sin |cos |tan )$/) !== null, 
			{ true: () => onDelMatch(actionElement), false: () => onDelNotMatch(actionElement) }
		);
	},
	'=': (actionElement, resultElement) => onEqual(actionElement, resultElement),
	'(': (actionElement, resultElement) => actionElement.value += '(',
	')': (actionElement, resultElement) => actionElement.value += ')',
	'sin': (actionElement, resultElementsin) => actionElement.value += 'sin ',
	'cos': (actionElement, resultElement) => actionElement.value += 'cos ',
	'tan': (actionElement, resultElement) => actionElement.value += 'tan ',
};

let displayAction = null;
let displayResult = null;
let state = null;

document.addEventListener('DOMContentLoaded', () => {
	displayAction = new Observer(document.getElementById('display-action'));
	displayResult = new Observer(document.getElementById('display-result'));
	state = new State();

	const regexPattern = /[^-()\d/*+.%^]/g;

	displayAction.element.onchange = function(e) {
		displayAction.element.value = displayAction.element.value.replace(regexPattern, '');
	};

	displayAction.element.onkeydown = function(e) {
		ON_TYPE(
			displayAction.element.value.match(regexPattern) !== null,
			{ true: () => replaceInput(displayAction.element, regexPattern) }
		);
	};

	displayAction.element.onkeyup = function(e) {
		ON_TYPE(
			displayAction.element.value.match(regexPattern) !== null,
			{ true: () => replaceInput(displayAction.element, regexPattern) }
		);
	};

	/* displayAction.onNotify = function(action, data) {
		DISPLAY_ACTION[action](displayAction, data);
	};

	displayResult.onNotify = function(action, data) {
		DISPLAY_RESULT[action](displayResult, data);
	};

	state.subscribe(displayAction);
	state.subscribe(displayResult); */
});

const SWITCH_ACTIONS = {
	shift: (element) => {console.log(element.id)},
	alpha: (element) => {console.log(element.id)},
	mode: (element) => {console.log(element.id)},
	on: (actionElement, resultElement) => {
		ON_TYPE(state.on, {
			true: () => onCalculatorOn(actionElement, resultElement),
			false: () => onCalculatorOff(actionElement, resultElement)
		});
	}
}

const CLICK_ACTIONS = {
	BUTTON: (e) => {
		BUTTON_MAP[e.target.innerText](displayAction.element, displayResult.element);
	}
};

document.addEventListener('click', e => {
	if(SWITCH_ACTIONS[e.target.id]) {
		SWITCH_ACTIONS[e.target.id](displayAction.element, displayResult.element);
	}

	if(state.on === true) {
		if(typeof BUTTON_MAP[e.target.innerText] === 'function' && CLICK_ACTIONS[e.target.nodeName]) {
			CLICK_ACTIONS[e.target.nodeName](e);
		}
	}
});