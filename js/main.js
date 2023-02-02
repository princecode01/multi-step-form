/// <reference path="../typings/globals/jquery/index.d.ts" />
const register = document.querySelector('.register');
const thankYou = document.querySelector('.thank-you');
const circles = document.querySelectorAll('.step-circle');
const users = Array.from(document.querySelectorAll('form .user'));
const nextButton = document.querySelectorAll('.right-button');
const backButton = document.querySelectorAll('.left-button');
const form = document.querySelector('form');

nextButton.forEach(button => {
    button.addEventListener('click', () => {
        changeStep('next');
        if (stepIndex == 3) {
            calcTotalPrice();
        }
    })
})

backButton.forEach(button => {
    button.addEventListener('click', () => {
        changeStep('prev');
    })
})

let circleBackground = () => {
    circles.forEach((circle, index) => {
        if (index == stepIndex) {
            circle.style.backgroundColor = 'hsl(206, 94%, 87%)';
            circle.style.color = 'hsl(213, 96%, 18%)';
        }
        else {
            circle.style.background = 'none';
            circle.style.color = 'white';
        }
    })
}

let stepIndex = 0;

let changeStep = (btn) => {

    // routing between steps 
    const active = document.querySelector('form .user.active');
    stepIndex = users.indexOf(active);
    users[stepIndex].classList.remove('active');

    if (btn === 'next') {
        stepIndex++;
    }
    else if (btn === 'prev') {
        stepIndex--;
    }
    users[stepIndex].classList.add('active');


    // change circle background 
    circleBackground();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // const inputs = [];
    // form.querySelectorAll('input').forEach(input => {
    //     const { name, value } = input;
    //     inputs.push({ name, value })
    // })
    // console.log(inputs);
    // form.reset();

    // stepIndex = 0;
    // const active = document.querySelector('form .user.active');
    // stepIndex = users.indexOf(active);
    // users[stepIndex].classList.remove('active');
    // users[stepIndex].classList.add('active');

    register.style.display = 'none';
    thankYou.style.display = 'block';
})


// choosing plan 
const plans = Array.from(document.querySelectorAll('.plan'));
plans.forEach((plan) => {
    plan.addEventListener('click', () => {

        plan.classList.add('plan-check')
        $('.plan').not(plan).removeClass('plan-check');
    })
})

// // switch month to year 
let yearChecked = false;
const duration = document.getElementById('switch');

const perYear = document.querySelectorAll('.year');
const price = document.querySelectorAll('.price');
const overPrice = document.querySelectorAll('.over-price');
const monthsFree = document.querySelectorAll('.plan-info small');


const setYear = () => {

    if (yearChecked) {
        // year price 
        price.forEach(price => {
            price.innerHTML *= 10;
        });
        // over price per year 
        overPrice.forEach(over => {
            over.innerHTML *= 10;
        });
        // switch month to year  
        perYear.forEach(year => {
            year.innerHTML = 'year';
        });
        // extra months for year subscription 
        monthsFree.forEach(month => {
            month.innerHTML = '2 months free';
        })
    }
    else {
        // month price 
        price.forEach(price => {
            price.innerHTML /= 10;
        });
        // over price per month
        overPrice.forEach(over => {
            over.innerHTML *= 10;
        });
        // switch month to month
        perYear.forEach(year => {
            year.innerHTML = 'mo';
        });
        // reverse extra months for year subscription
        monthsFree.forEach(month => {
            month.innerHTML = '';
        })
    }
}

duration.addEventListener('click', () => {
    if (duration.checked) {
        yearChecked = true;
        setYear()
    }
    else {
        yearChecked = false;
        setYear();
    }
})


// if duration switched to year this will change all stages
const addBox = document.querySelectorAll('.add');
const addCheck = document.querySelectorAll('.add-check input');

addCheck.forEach((check, index) => {
    check.addEventListener('click', () => {
        if (check.checked) {
            addBox[index].classList.add('active-check');
        }
        else {
            addBox[index].classList.remove('active-check');
        }
    })
})


// change button that reset the plan 
const changeBtn = document.querySelector('.final-info small');
changeBtn.addEventListener('click', () => {

    // remove active class from current step 
    const active = document.querySelector('form .user.active');
    stepIndex = users.indexOf(active);
    users[stepIndex].classList.remove('active');

    // add active class to first step 
    stepIndex = 1;
    circleBackground();
    users[stepIndex].classList.add('active');
})


let calcTotalPrice = () => {
    const plan = document.querySelector('.plan-check');
    const planName = document.querySelector('.final-info p');
    const planPrice = document.querySelector('.final-price span');
    const year = document.querySelector('.year');

    let planValue = Number(plan.querySelector('.price').innerHTML);
    let planAddsValue = 0;

    planName.innerHTML = `${plan.querySelector('.plan-info h5').innerHTML} (${year.innerHTML == 'mo' ? 'Monthly' : 'Yearly'})`;
    planPrice.innerHTML = `$${planValue}/${year.innerHTML}`;
    /////////////////////////////////////////////////

    const adds = document.querySelectorAll('.active-check');
    const finalBottom = document.querySelector('.final-bottom');
    let addsBox = '';
    adds.forEach(add => {
        planAddsValue += Number(add.querySelector('.over-price').innerHTML);
        addsBox += `<div class=" d-flex justify-content-between">
        <small>${add.querySelector('.add-info p').innerHTML}</small>
        <span>+$${add.querySelector('.over-price').innerHTML}/${year.innerHTML}</span>
        </div>`;
    })
    finalBottom.innerHTML = addsBox;
    //////////////////////////////////////////////////

    let totalPrice = document.querySelector('.total-price h5');
    totalPrice.innerHTML = `+$${planValue + planAddsValue}/${year.innerHTML}`;
}

