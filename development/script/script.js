var result = 0;
function performCalc(oper,value){
	// console.log(value);
	var intValue = parseFloat(value);
	// console.log(intValue + 1);
	var intResult = parseFloat(result);
	switch (oper) {
		case '+':
			intResult += intValue;
			break;
		case '-':
			intResult -= intValue;
			break;
		case 'x':
			intResult *= intValue;
			break;
		case '/':
			intResult /= intValue;
			break;
		default:
			return result;
			break;
	}
	//console.log(result);
	return intResult;
}

$(document).ready(function(){
	var currValue = 0;
	// var result = 0;
	var collectNums = [];
	var history = [];
	var prevNo = 0;
	var operator = '';
	$('button').click(function(){
		var currNo = 0;
		var regex = /^\d+$/;
		currValue = $(this).attr('value');
		if(currValue === '='){
			//equals is pressed perform the operation
			prevNo = collectNums.join("");
			// console.log(prevNo);
			result = performCalc(operator,prevNo);
			// console.log(result);
			// console.log(result);
			$('.result').text(result);
		}//(currValue === '=')
		else if (currValue == '+' || currValue == '-' || currValue == 'x' || currValue == '/') {
		//get the firstNumber entered
		console.log(currValue);
			if(result === 0 && history[0].match(regex)){
				result = collectNums.join("");
				console.log(result);
				collectNums = [];
			}else {
				//get the the next numbers
				prevNo = collectNums.join("");
				result = performCalc(operator,prevNo);
				console.log(result);
				console.log(prevNo);
			}
			operator = currValue;
			collectNums = [];
		}//(currValue == '+' || currValue == '-' || currValue == 'x' || currValue == '/')
		else if(currValue === 'ce'){
			result = 0;
			history = [];
			prevNo = 0;
			collectNums = [];
			$('.result').text(result);
			$('.history').text(result);
			return;
		}
		else{
			collectNums.push(currValue);
		}
		history.push(currValue);
		his = history.join("");
		his = his.replace(/=/g,"");
		$('.history').text(his);
	});
	
});