const history_block =document.querySelector(".history-text");
const clear_btn=document.querySelector("#clear");
const history=[];

const calculator=
{
    displayValue:'0',
    firstOperand:null,
    secondOperand:false,
    operator:null,
};

//to Update display value
function updateDisplay()
{
    const screen=document.querySelector(".display");
    screen.value=calculator.displayValue;
    console.log("value updated",typeof(calculator.displayValue));
}

updateDisplay();


//to enter digit
function inputDigit(digit)
{
    const {displayValue,secondOperand}=calculator;
    // if OPERATOR is already enterd and WAITING for SECOND_OPERAND , then "DISPLAY_VALUE = DIGIT"
    if(secondOperand===true)
    {
        calculator.displayValue=digit;
        calculator.secondOperand=false;
        console.log(calculator);
    }
    else  //if display value is 0 , then "DISPLAY-VALUE=DIGIT" otherwise APPEND to 'DISPLAY-VALUE'
    {
        calculator.displayValue = displayValue==='0' ? digit : displayValue + digit;
    }

    updateDisplay();
}

function inputDecimal(decimal)
{
    //if DECIMAL is ALREADY PRESENT while entering operand
    if(calculator.secondOperand===true)
    {
        calculator.displayValue='0.';
        calculator.secondOperand=false;
        return;

    }
    // if DISPLAY_VALUE doesn't have DECIMAL
    if (!calculator.displayValue.includes(decimal))
    calculator.displayValue += decimal;
    updateDisplay();

}

function handleOperator(nextOperator)
{
    const {operator,displayValue,firstOperand}=calculator;

    const inputValue=parseFloat(displayValue)

    //changing operator when operator is already entered
    if(operator && calculator.secondOperand)
    {
        calculator.operator=nextOperator;
        console.log(calculator);
        console.log("operator changed") ;
        return;
    }

    //enter first operand
    if(firstOperand===null && !isNaN(inputValue))
    {
        calculator.firstOperand=inputValue;
        console.log(calculator,"first operand in");
    }
    // if first is already entered then entered then calculate with inputDisplay value
    else if(operator)
    {
        const result=calculate(firstOperand,inputValue,operator);

        calculator.displayValue=`${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand=result;
        updateDisplay();
        addToHistory(firstOperand,inputValue,operator,result);
    }
    

    calculator.secondOperand=true;
    calculator.operator=nextOperator;
   //
    //updateDisplay();
}

function calculate(firstOperand,secondOperand,operator)
{
    if(operator==='+')
    {
        return firstOperand+secondOperand;
    }
    else if(operator==='-')
    {
        return firstOperand-secondOperand;
    }
    else if(operator==='*')
    {
        return firstOperand*secondOperand;
    }
    else if(operator==='/')
    {
        return firstOperand/secondOperand;
    }

    else if(operator==='=')
    {
        return secondOperand;
    }
    else if(operator=="%")
    {  
        return firstOperand%secondOperand;
    }
    else if(operator=="^")
    {
        return Math.pow(firstOperand, secondOperand);
    }
    

}

//reset
function resetCalculator()
{
    calculator.displayValue='0';
    calculator.firstOperand=null;
    calculator.secondOperand=false;
    calculator.operator=null;
    console.log("Reset");
    history.unshift("-------------");
    calculator.displayValue='0';
    updateDisplay();
}




const keys = document.querySelector('.calculator');

keys.addEventListener('click', (event) => {
    const { target } = event; //clicked button
    const {value}=target;

    //check if TARGET is button ,else return
    if (!target.matches('button')) {
      return;
    }
    
    //check if TARGET is OPERATOR
    if (target.classList.contains('key--operator')) {
      console.log('key--operator', target.value);
      handleOperator(target.value);
      return;
    }
    
    //check if TARGET is DECIMAL 
    if (target.classList.contains('item_dot')) {
      console.log('decimal', target.value);
      inputDecimal(target.value);
      return;
    }
  
    //check if TARGET is ALL-CLEAR button
    if(target.classList.contains('itemAC'))
    {
        console.log("all-clear",target.value);
        resetCalculator();
        return;
    }
  
    //else DIGIT
    console.log('digit', target.value);
    inputDigit(target.value);
});


//function to update history
function addToHistory(firstOperand,secondOperand,operator,result)
{   
    const equation=firstOperand+operator+secondOperand+"="+result;
    history.unshift(equation);

    const historyBlockHTML=updateHistoryBlock(history);
    history_block.innerHTML=historyBlockHTML;




   /* const historyBlockHTML=history.map((eq) => updateHistoryBlock(eq));
    
    history_block.innerHTML=history.join(""); */
    console.log(history);
}

//update block text
function updateHistoryBlock(history)
{
    let result="";
    for(let i=0;i<history.length;i++)
    {   
        result += history[i] + "<br/>";
    }
    return result;
}

//clear history after 
clear_btn.addEventListener('click', function() 
{
    history.length=0;
    console.log("cleared");
    history_block.innerHTML=updateHistoryBlock(history);
    calculator.displayValue='0'
    updateDisplay();
});