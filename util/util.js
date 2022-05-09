export function onCalculatorOn(state, actionElement, resultElement) {
	actionElement.value = '';
	resultElement.innerText = '';
	state.on = false;
};

export function onCalculatorOff(state, actionElement, resultElement) {
	actionElement.value = '';
	resultElement.innerText = '0';
	state.on = true;
};

export function onAnsIsSet(state, actionElement, value) {
	actionElement.value = `Ans${value}`;
	state.afterEqual = false;
}

export function onAnsNotSet(actionElement, value) {
	actionElement.value += `${value}`;
}

export function onDelMatch(actionElement) {
	actionElement.value = actionElement.value.replace(/(Ans|sin |cos |tan )$/, '');
}

export function onDelNotMatch(actionElement) {
	actionElement.value = actionElement.value.substring(0, actionElement.value.length - 1);
}

export function replaceInput(element, regexPattern) {
	element.value = element.value.substring(0, element.value.length - 1);
	element.value = element.value.replace(regexPattern, '');
}

export function onEqual(state, actionElement, resultElement) {
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

export const CHECK_TYPE = {
	true: (fnc) => { fnc(); },
	false: (fnc) => { fnc(); },
	null: (fnc) => { fnc(); },
	undefined: (fnc) => { fnc(); },
	object: (fnc) => { fnc(); },
	function: (fnc) => { fnc(); }
};

export const ON_TYPE = function(value, onType = CHECK_TYPE) {
	CHECK_TYPE.true = onType.true;
	CHECK_TYPE.false = onType.false;
	CHECK_TYPE.null = onType.null;
	CHECK_TYPE.undefined = onType.undefined;
	CHECK_TYPE.object = onType.object;
	CHECK_TYPE.function = onType.function;
	if(CHECK_TYPE[value]) CHECK_TYPE[value]();
};