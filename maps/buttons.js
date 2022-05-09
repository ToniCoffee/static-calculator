import { 
	ON_TYPE,
	onCalculatorOn,
	onCalculatorOff,
	onAnsIsSet,
	onAnsNotSet,
	onDelMatch,
	onDelNotMatch,
	onEqual
} from '../util/util.js';

export const BUTTON_MAP = {
	'0': (actionElement) => actionElement.value += '0',
	'1': (actionElement) => actionElement.value += '1',
	'2': (actionElement) => actionElement.value += '2',
	'3': (actionElement) => actionElement.value += '3',
	'4': (actionElement) => actionElement.value += '4', 
	'5': (actionElement) => actionElement.value += '5',
	'6': (actionElement) => actionElement.value += '6', 
	'7': (actionElement) => actionElement.value += '7',
	'8': (actionElement) => actionElement.value += '8', 
	'9': (actionElement) => actionElement.value += '9',
	'x': (actionElement, state) => ON_TYPE(state.afterEqual, { true: () => onAnsIsSet(state, actionElement, '*'), false: () => onAnsNotSet(actionElement, '*') }),
	'/': (actionElement, state) => ON_TYPE(state.afterEqual, { true: () => onAnsIsSet(state, actionElement, '/'), false: () => onAnsNotSet(actionElement, '/') }),
	'+': (actionElement, state) => ON_TYPE(state.afterEqual, { true: () => onAnsIsSet(state, actionElement, '+'), false: () => onAnsNotSet(actionElement, '+') }),
	'-': (actionElement, state) => ON_TYPE(state.afterEqual, { true: () => onAnsIsSet(state, actionElement, '-'), false: () => onAnsNotSet(actionElement, '-') }),
	'EXP': (actionElement) => actionElement.value += 'E', 
	'Ans': (actionElement) => actionElement.value += 'Ans',
	'.': (actionElement) => actionElement.value += '.', 
	'AC': (actionElement, state, resultElement) => {
		actionElement.value = '';
		resultElement.innerText = '0';
		state.afterEqual = false;
	},
	'DEL': (actionElement) => {
		ON_TYPE(
			actionElement.value.match(/(Ans|sin |cos |tan )$/) !== null, 
			{ true: () => onDelMatch(actionElement), false: () => onDelNotMatch(actionElement) }
		);
	},
	'=': (actionElement, state, resultElement) => onEqual(state, actionElement, resultElement),
	'(': (actionElement) => actionElement.value += '(',
	')': (actionElement) => actionElement.value += ')',
	'sin': (actionElement) => actionElement.value += 'sin ',
	'cos': (actionElement) => actionElement.value += 'cos ',
	'tan': (actionElement) => actionElement.value += 'tan ',
};

export const SWITCH_ACTIONS = {
	shift: (element) => {console.log(element.id)},
	alpha: (element) => {console.log(element.id)},
	mode: (element) => {console.log(element.id)},
	on: (state, actionElement, resultElement) => {
		ON_TYPE(state.on, {
			true: () => onCalculatorOn(state, actionElement, resultElement),
			false: () => onCalculatorOff(state, actionElement, resultElement)
		});
	}
}

export const CLICK_ACTIONS = {
	BUTTON: (e, state, actionElement, resultElement) => {
		BUTTON_MAP[e.target.innerText](actionElement, state, resultElement);
	}
};