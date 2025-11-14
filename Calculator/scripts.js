let calculation = localStorage.getItem('stored') || '' ;
                    
// if(!localStorage.getItem('stored')){0
//     console.log(0);     // if null stored in "stored" then by clicking equal it give 0
// }
// else{
//     console.log( localStorage.getItem('stored')); //when some value init.. then print it
                    
// }
                    
//function for all buttons
function funCaluation(value){
    (calculation+=value);
    return onPageCalculation(calculation);
                                
}
                            
//function for equal
function equalResult(equal){
    if(!calculation){return}
    else{
        calculation = eval(calculation);
                                    
        // console.log(typeof(calculation));
        // calculation = JSON.stringify(calculation);  // no need line of code
                                    
        localStorage.setItem('stored', calculation);     //stored in local memory
                                    
        onPageCalculation();
    }
}

function funPercentage(){
    (calculation/=100)
    onPageCalculation();
}

    //calculation on page function

function onPageCalculation(){
    document.querySelector('.js-calculatorPage').innerHTML = calculation;
}

onPageCalculation();

function funClear(){
    calculation = calculation.slice(0, -1);
    onPageCalculation();
}

function funallClear(){
    calculation = '';
    localStorage.removeItem('stored');         //remove for memory
    document.querySelector('.js-calculatorPage').innerHTML = 0
}

document.body.addEventListener('keydown', (event) => {
    const key = event.key
    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    calculation += key;
    onPageCalculation()}

    else if(key === '%'){funPercentage();}
    else if(key === 'Enter' || key === '='){equalResult();}
    else if(key === 'Backspace'){funClear();}
    else if(key === 'Delete'){funallClear();}
});