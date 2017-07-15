function performCalc(oper,currVal,prevVal){
	var intCurrVal = Number(currVal);
	var intPrevVal = Number(prevVal);
	var result = 0;
	switch (oper) {
		case '+':
			result = intPrevVal + intCurrVal;
			break;
		case '-':
			result = intPrevVal - intCurrVal;
			break;
		case 'x':
			result = intPrevVal * intCurrVal;
			break;
		case '/':
			result = intPrevVal / intCurrVal;
			break;
		default:
			// statements_def
			break;
	}
	return result;
}

$(document).ready(function(){
	var currValue = 0;
	var result = 0;
	var collectNums = [];
	var history = [];
	var prevNo = 0;
	var operator = '';
	$('button').click(function(){
		var currNo = 0;

		currValue = $(this).attr('value');
		// console.log(currValue);
		if(currValue === '='){
			currNo = collectNums.join("");
			// console.log(currNo);
			result = performCalc(operator,currNo,prevNo);
			// prevNo = result;
			$('.result').text(result);
		}else if (currValue == '+' || currValue == '-' || currValue == 'x' || currValue == '/') {
			operator = currValue;
			console.log(operator);
			prevNo = collectNums.join("");
			collectNums = [];
			// console.log(prevNo);
			// console.log(collectNums);
		}else{
			collectNums.push(currValue);

			// console.log(collectNums);
		}
		history.push(currValue);
		$('.history').text(history.join(""));
		// $('.collectNums').text(collectNums);
		// $('.collectNums').text(collectNums);
	});
	
});