const bill = document.getElementById('bill');
const btntips = document.querySelectorAll('.tip-btn');
const customBtn = document.getElementById('custom-tip-btn');
const noOfPersons = document.getElementById('people');
const resetbtn = document.getElementById('reset-btn');
const tipOutput = document.querySelector('.tip-amt-output');
const totalOutput = document.querySelector('.total-amt-output');
const error = document.querySelector('.error');
let billValue = 0.00, 
peopleValue = 0,
tipValue = 0;



bill.addEventListener('input', getBill);
people.addEventListener('input', getPeople);
btntips.forEach(btntip => {
    btntip.addEventListener('click', function(){
      let current= document.getElementsByClassName('active');
      current[0].className = current[0].className.replace('active', '')
      btntip.className += ' active';
        tipValue = parseInt(btntip.value);
        // console.log(tipValue);
        setValue(tipValue, billValue,peopleValue);
    });
})
customBtn.addEventListener('input', getCustomTip);
resetbtn.addEventListener('click', reset);

function validate(s) {
    var rgx =/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
    return s.match(rgx);
}

function validatePeople(s) {
    let regex = /^[1-9][0-9]*$/;
    return s.match(regex)
}


function getBill(e) {
   billValue = e.target.value;
  let result = validate(billValue);
//   console.log(result, billValue)
  if (result === null) {
      bill.style.outlineColor = 'red';
  }else{
      bill.style.outlineColor = 'hsl(172, 67%, 45%)';
  }
  setValue(tipValue, billValue,peopleValue);
}




function getPeople(e) {
     peopleValue = e.target.value;
    let result2 = validatePeople(peopleValue);
    // console.log(result2,peopleValue)
    if (result2 === null) {
        people.style.outlineColor = 'red';
        error.classList.add('d-none');
    if (peopleValue == '0'){
        people.style.outlineColor = 'red';
        error.classList.remove('d-none');
    }
    }else{
        people.style.outlineColor = 'hsl(172, 67%, 45%)';
        error.classList.add('d-none');
    }
    setValue(tipValue, billValue,peopleValue);
   
}

function getCustomTip(e) {
    tipValue = e.target.value;
    let result3 = validatePeople(tipValue);
    if (result3 === null){
        customBtn.style.outlineColor = 'red';
    }else{
        customBtn.style.outlineColor = 'hsl(172, 67%, 45%)';
    }
   setValue(tipValue, billValue, peopleValue);  
   
}

function reset(){
    bill.value = '';
    tipValue = '';
    people.value = '';
    setValue(tipValue, billValue, peopleValue);  
}



function setValue(tipValue, billValue, peopleValue){
   if (tipValue && billValue && peopleValue > 0){
    let tipAmt = parseFloat(((tipValue/100)* parseFloat(billValue)));
    let sharedTipAmt = parseFloat((tipAmt / parseFloat(peopleValue)));
    let sharedTotal = (parseInt(billValue) + parseInt(tipValue)) / peopleValue;



  const tipOutput = document.querySelector('.tip-amt-output');
  const totalOutput =  document.querySelector('.total-amt-output');

    tipOutput.innerText = '$' + sharedTipAmt.toFixed(2);
    totalOutput.innerText = '$' + sharedTotal.toFixed(2);
   }
}






