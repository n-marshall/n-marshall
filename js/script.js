var contactLayer = document.getElementById('contact-layer');
var contactForm = document.getElementById('contact-form');
var emailField = document.getElementById('email-field');
var messageField = document.getElementById('message-field');
var submitButton = document.getElementById('submit');

var message = new Object();
message.loading = 'Loading...';
message.success = 'Thank you. Application received!';
message.failure = 'Whoops! There was a problem sending your message.';
var statusMessage = document.createElement('div');
statusMessage.className = 'status';

// Set up the AJAX request
var request = new XMLHttpRequest();
request.open('POST', 'http://formspree.io/wot@mailinator.com', true);
request.setRequestHeader('accept', 'application/json');

window.onload = function() {
    setAge();
    contactForm.isActive = false;
    addEventListeners();
    addPrintIframe();
}

function addEventListeners() {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener('click', clickHandler);
    document.addEventListener('focusout', focusOutHandler);
    document.addEventListener('backbutton', backButtonHandler);
    contactForm.addEventListener('submit', submitHandler);
}

/*function postForm(form) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://formspree.io/wot@mailinator.com');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control')
    var xhrBody = { '_replyto': contactForm._replyto.value, 'message': contactForm.message.value };
    xhr.onload = function() {
        if (xhr.status == 200) {
            alert(xhr.responseText);
        } else {
            console.log(Error(xhr.statusText));
        }
    }
    xhr.onerror = function() {
        console.error(Error("Network error"));
    }
    xhr.send(xhrBody);
}*/

function submitHandler(e) {
    e.preventDefault();
    contactForm.appendChild(statusMessage);

    // Create a new FormData object passing in the form's key value pairs (that was easy!)
    var formData = new FormData(contactForm);

    // Send the formData
    request.send(formData);

    // Watch for changes to request.readyState and update the statusMessage accordingly
    request.onreadystatechange = function() {
        // <4 =  waiting on response from server
        if (request.readyState < 4)
            statusMessage.innerHTML = message.loading;
        // 4 = Response from server has been completely loaded.
        else if (request.readyState === 4) {
            // 200 - 299 = successful
            if (request.status == 200 && request.status < 300)
                statusMessage.innerHTML = message.success;
            else
                contactForm.insertAdjacentHTML('beforeend', message.failure);
        }
    }
}

function keyDownHandler(e) {
    var keyCode = e.which;
    if (keyCode == 27) {
        closeContact();
    }
    if ((keyCode == 13) && e.target === emailField) {
        e.preventDefault();
        updateValidityHint(e.target);
        messageField.focus();
    }
    if (e.target.parentNode.classList.contains('invalid')) {
        updateValidityHint(e.target);
    }
}

function clickHandler(e) {
    if (contactForm.isActive && e.target === contactLayer) {
        closeContact();
    }
}

function focusOutHandler(e) {
    if (e.target === emailField || e.target === messageField) {
        updateValidityHint(e.target);
    }
}

function updateValidityHint(field) {
    if (field === emailField || field === messageField) {
        if (field.checkValidity()) {
            field.parentNode.classList.remove('invalid');
        } else {
            field.parentNode.classList.add('invalid');
        }
    }
}

function backButtonHandler() {
    if (contactForm.isActive) {
        closeContact();
    } else {
        navigator.app.exitApp();
    }
}

function triggerPrint(elementId) {
    var getMyFrame = document.getElementById(elementId);
    getMyFrame.focus();
    getMyFrame.contentWindow.print();
}

function addPrintIframe() {
    var iFramePdf = document.createElement('iframe');
    iFramePdf.id = "iFramePdf";
    iFramePdf.src = "pdf/Nicolas-Marshall-Resume.pdf";
    iFramePdf.style.display = 'none';
    document.body.appendChild(iFramePdf);
}

function setAge() {
    var birthDate = new Date('1991-10-17');
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById('age').textContent = age;
}

function toggleContact() {
    contactForm.isActive = !contactForm.isActive;
    contactLayer.classList.toggle('dim');
    contactForm.classList.toggle('active');
    emailField.focus();
}

function closeContact() {
    if (contactForm.isActive) {
        toggleContact();
    }
}
