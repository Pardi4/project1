'use strict';

const menu = document.querySelector("nav .material-icons");
const menuItems = document.querySelector(".div-menu");
const menuHide = document.querySelector(".div-menu span");

const links = document.querySelectorAll(".div-menu a");
console.log(links)

links.forEach(element => {
    element.addEventListener("click" , () =>{
        menuItems.classList.add("hide-menu");
    });
});

menu.addEventListener("click", () => {
    menuItems.classList.remove("hide-menu");
});
menuHide.addEventListener("click", () => {
    menuItems.classList.add("hide-menu");
});

const labelAll = document.querySelectorAll('label');

const labelVal = [];

labelAll.forEach(elem =>{
    labelVal.push(elem.innerText);
});

const showError = (label,texterror) =>{
    label.innerText = texterror;
    label.classList.add("alert","alert-danger");
};

const getDataFromSrv = async dataFromForm => {
    const urlRestAPI = 'http://localhost:7654/validate';
    const method = 'post';
    const dataToSend = dataFromForm;
    const headers = {
        "Content-Type": "application/json"
    }

    try {
        const response = await fetch(urlRestAPI, {
            method,
            body: JSON.stringify(dataToSend),
            headers    
        });

        const getDataFromSrv = await response.json();
        return getDataFromSrv;
    } catch (error) {
        console.error(error)
    }

}

const validateData = e =>{
    e.preventDefault();

    const resultPlace = document.querySelector("#resultPlace");

    resultPlace.innerHTML = '';
    resultPlace.classList.remove("alert-succes");

    labelAll.forEach((element, i) => {
        element.classList.remove("alert", "alert-danger");
        element.innerHTML = labelVal[i];
    });
    

    const mail = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;

    const dataFromForm = {
        mail,
        subject,
        message
    }

    getDataFromSrv(dataFromForm)
    .then(res => {
        console.log(res);
        if('send' in res){
            resultPlace.innerHTML = res.send;
            resultPlace.classList.add("alert-succes")

            document.querySelectorAll("input:not(input[type='submit']), textarea").forEach(elem => {elem.value = ''});
        }else{
            if('email' in res){
                showError(labelAll[0], res.email)
            }
            if('subject' in res){
                showError(labelAll[1], res.subject)
            }
            if('message' in res){
                showError(labelAll[2], res.message)
            }
        }

    });

};

const form = document.querySelector('form');
form.addEventListener('submit', validateData);
