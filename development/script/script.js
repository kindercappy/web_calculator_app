result = 0;
function performCalc(oper,value){
	var intValue = parseFloat(value);
	var intResult = parseFloat(result);
	switch (oper) {
		case '+':
			intResult += intValue;
			break;
		case '-':
			intResult -= intValue;
			break;
		case '*':
			intResult *= intValue;
			break;
		case '/':
			if(intValue===0) return intResult = 'Can\'t divide by zero';
			intResult /= intValue;
			break;
		default:
			return result;
			break;
	}
	return intResult;
}

$(document).ready(function(){
	var currValue = 0;	
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
			result = performCalc(operator,prevNo);
			if(Number.isNaN(result)) return $('.result').text('Can\'t process');
			$('.result').text(result);
		}//(currValue === '=')
		else if (currValue == '+' || currValue == '-' || currValue == '*' || currValue == '/') {
			if(history.length > 0){
				//get the firstNumber entered
				if(result === 0 && history[0].match(regex)){
					result = collectNums.join("");
					collectNums = [];
				}else {
					//get the the next numbers
					prevNo = collectNums.join("");
					collectNums = [];
				}
			}//(history.length > 0)
			else{
				$('.history').text('Please enter a number');
				return;
			}
			if(history[history.length-1] !== currValue && history[history.length-1] !== '+' && history[history.length-1] !== '-' && history[history.length-1] !== '/' && history[history.length-1] !== '*'){
				operator = currValue;
				console.log(operator)
				history.push(currValue);
			}//(history[history.length-1] !== currValue && history[history.length-1] !== '+' && history[history.length-1] !== '-' && history[history.length-1] !== '/' && history[history.length-1] !== 'x')
		}//(currValue == '+' || currValue == '-' || currValue == 'x' || currValue == '/')
		else if(currValue === 'ce'){
			//clear the variables as ce is pressed
			result = 0;
			history = [];
			prevNo = 0;
			collectNums = [];
			$('.result').text(result);
			$('.history').text(result);
			return;
		}//(currValue === 'ce')
		else{
			//push the numbers pressed back to back into the collection
			collectNums.push(currValue);
			history.push(currValue);
		}
		//join the history array and replace the = sign
		his = history.join("");
		his = his.replace(/=/g,"");
		$('.history').text(his);
	});
	
});