import { BUTTON_MAP, SWITCH_ACTIONS, CLICK_ACTIONS } from './maps/buttons.js';
import { ON_TYPE, replaceInput } from './util/util.js';
import { State } from './state.js';

let displayAction = null;
let displayResult = null;
let state = null;

document.addEventListener('DOMContentLoaded', () => {
	displayAction = document.getElementById('display-action');
	displayResult = document.getElementById('display-result');
	state = new State();

	const regexPattern = /[^-()\d/*+.%^]/g;

	displayAction.onchange = function(e) {
		displayAction.value = displayAction.value.replace(regexPattern, '');
	};

	displayAction.onkeydown = function(e) {
		ON_TYPE(
			displayAction.value.match(regexPattern) !== null,
			{ true: () => replaceInput(displayAction, regexPattern) }
		);
	};

	displayAction.onkeyup = function(e) {
		ON_TYPE(
			displayAction.value.match(regexPattern) !== null,
			{ true: () => replaceInput(displayAction, regexPattern) }
		);
	};

	document.addEventListener('click', e => {
		if(SWITCH_ACTIONS[e.target.id]) {
			SWITCH_ACTIONS[e.target.id](state, displayAction, displayResult);
		}
	
		if(state.on === true) {
			if(typeof BUTTON_MAP[e.target.innerText] === 'function' && CLICK_ACTIONS[e.target.nodeName]) {
				CLICK_ACTIONS[e.target.nodeName](e, state, displayAction, displayResult);
			}
		}
	});
});