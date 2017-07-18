var result =0;
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
function showHistory(history){
	his = history.join("");
	his = his.replace(/=/g,"");
	$('.history').text(his);
}
// check if its avalid number
function checkNum(collectNums){///^(-)?(\.)?\d+(\.\d{1,3})?$/
	var regex1Decimal = /^(-)?\d+(\d{1,2})?$|^(-)?\d+(\.\d{1,2})?$|^(-)?(\.)?\d{1,2}?$/;
	if(collectNums.join("").match(regex1Decimal)){
		return collectNums;
	}
	else{
		collectNums = [];
		$('.history').text("Please a enter valid number");
	}
}
$(document).ready(function(){
	$("h5").fadeIn()
	.css({bottom:1000,position:'absolute',left:5})
	.animate({bottom:0}, 2000);
	$('.calcContainer').fadeIn(3000);
	var currValue   = 0;	
	var collectNums = [];
	var history     = [];
	var prevNo      = 0;
	var operator    = '';
	//pressing equal will set it to true. if a digit entered after that then it will set the result to 0 or else continue the operation
	var checkIfDidgitEnteredAfterEqualPressed = false;
	$('button').click(function(){
		var currNo = 0;
		var regex  = /^\d+$/;
		var regexMatchDigit = /[0-9]/;
		currValue  = $(this).attr('value');
		if(currValue.match(regex) && checkIfDidgitEnteredAfterEqualPressed){
			result=0;
		}
		if(currValue === '='){
			//equals is pressed perform the operation
				//checkIfDidgitEnteredAfterEqualPressed is set to true to check if the next button pressed is a digit or an operator and perform operations accordingly
				checkIfDidgitEnteredAfterEqualPressed = true;
				if(collectNums.length > 0){
					prevNo = collectNums.join("");
					collectNums=[];
					history=[];
					result = performCalc(operator,prevNo);
					if(result == 'Can\'t divide by zero'){
						$('.history').text(result);
						$('.result').text(result);
						return;
					}
					var rounded =  Math.round(result * 100)/100;
					if(Number.isNaN(rounded)) rounded = "Can't process";
					$('.history').text(rounded);
					$('.result').text(rounded);
					return;
				}else {
					$('.history').text(result);
					$('.result').text(result);
					return;
				}
		}//(currValue === '=')
		else if (currValue == '+' || currValue == '-' || currValue == '*' || currValue == '/') {
			if(currValue === '-' && collectNums.length <= 0){
				if(history[history.length-1] !== currValue){
					//checkIfDidgitEnteredAfterEqualPressed is set to false because an operator was pressed after equal was pressed
					checkIfDidgitEnteredAfterEqualPressed=false;
					history.push(currValue);
					collectNums.push(currValue);
					$('.history').text(currValue);
					return;
				}
			}			
				if(history.length >= 0){
					//get the firstNumber entered
					if(result === 0 ){
						// console.log(collectNums.join(""));
						collectNums = checkNum(collectNums);
						result      = collectNums.join("");
						//checkIfDidgitEnteredAfterEqualPressed is set to false because an operator was pressed after equal was pressed
						checkIfDidgitEnteredAfterEqualPressed=false;
						collectNums = [];
					}else if(collectNums.length > 0){
						//get the the next numbers
						collectNums = checkNum(collectNums);
						prevNo = collectNums.join("");
						//checkIfDidgitEnteredAfterEqualPressed is set to false because an operator was pressed after equal was pressed
						checkIfDidgitEnteredAfterEqualPressed=false;
						result = performCalc(operator,prevNo);
						collectNums = [];
					}
				}//(history.length > 0)
				else{
					$('.history').text('Please enter a number');
					return;
				}
			if(history[history.length-1] !== currValue && history[history.length-1] !== '+' && history[history.length-1] !== '-' && history[history.length-1] !== '/' && history[history.length-1] !== '*'){
				operator = currValue;
				history.push(currValue);
				//checkIfDidgitEnteredAfterEqualPressed is set to false because an operator was pressed after equal was pressed
				checkIfDidgitEnteredAfterEqualPressed=false;

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
		//join the history array and replace the = sign and show it
		showHistory(history);
	});
});