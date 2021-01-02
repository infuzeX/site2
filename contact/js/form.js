const xhr = new XMLHttpRequest();
const status = document.getElementById('status');
const form = document.querySelector('.my-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {};
    const inputs = [...e.target.elements];
    inputs.forEach(input => {
        if (input.name) data[input.name] = input.value;
    })
 submitform(data)
})

function submitform(data){
    showMsg('INFO', 'Submitting form please wait');
    xhr.open('POST', '/php/clients.php');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
}

xhr.onload = function() {
    const res = JSON.parse(this.responseText);
    if(res.success) {
        showMsg('SUCCESS',res.message);
    }else{
        showMsg('FAILED', res.message);
    }
}

function showMsg(type, msg) {
    const color = {
        INFO:'royalblue',
        SUCCESS:'green',
        FAILED:'orangered'
    } [type];
    status.innerHTMl = `<p style="color:${color}">${msg}</p>`
}
