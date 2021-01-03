const xhr = new XMLHttpRequest();
const status = document.querySelector('.status');
const form = document.querySelector('.my-form');
let inputs = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {};
    inputs = [...e.target.elements];
    inputs.forEach(input => {
        if (input.name) data[input.name] = input.value;
    })
 submitform(data)
})

function submitform(data){
    showMsg('INFO', 'Submitting form please wait');
    xhr.open('POST', '/contact/php/clients.php');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
}

xhr.onload = function() {
    const res = JSON.parse(this.responseText);
    if(res.success) {
        showMsg('SUCCESS',res.message);
        clearField(inputs);
    }else{
        showMsg('FAILED', res.message);
    }
}

function clearField(inputs) {
  inputs.forEach(input => input.value = " " );
}

function showMsg(type, msg) {
    const color = {
        INFO:'royalblue',
        SUCCESS:'green',
        FAILED:'orangered'
    } [type];
    status.innerHTML = `<p style="color:${color}">${msg}</p>`
}
