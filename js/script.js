var contactLayer = document.getElementById('contact-layer');
var contactForm = document.getElementById('contact-form');
var emailField = document.getElementById('email-field');
var messageField = document.getElementById('message-field');
var submitButton = document.getElementById('submit-button');

var request = new XMLHttpRequest();
request.open('POST', 'http://formspree.io/marshall.nicolas@gmail.com', true);
request.setRequestHeader('accept', 'application/json');

window.onload = function() {
    setAge();
    contactForm.isActive = false;
    addEventListeners();
    addPrintIframe();
    setContactFormMaxHeight();
}

function setContactFormMaxHeight() {
    var h = contactForm.offsetHeight;
    console.log(h + 'px')
    contactForm.style.maxHeight = 'calc(' + h + 'px + 5em)'; //todo: update
}

function addEventListeners() {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener('click', clickHandler);
    document.addEventListener('focusout', focusOutHandler);
    document.addEventListener('backbutton', backButtonHandler);
    /*
        contactForm.addEventListener('submit', submitHandler);*/
}

/*function submitHandler(e) {
    e.preventDefault();
}*/

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
    if (e.target === submitButton) {
        e.preventDefault();
        if (emailField.checkValidity()) {
            if (messageField.checkValidity()) {

                //send form using xhr
                var formData = new FormData(contactForm);
                request.send(formData);
                var loadingAlert = setTimeout(function() {
                    if (request.readyState < 4) {
                        alert('There seems to be a problem sending your message. Sorry about that ! Please try again later.');
                    }
                }, 15000);;
                request.onreadystatechange = function() {
                    if (request.readyState === 4) {
                        if (request.status == 200 && request.status < 300) {
                            contactForm.classList.add('sent');
                            clearTimeout(loadingAlert);
                            setTimeout(function() {
                                closeContact();
                                setTimeout(function(){
                                    contactForm.classList.remove('sent');
                                }, 600);
                            }, 2400);
                        } else {
                            alert('There was a problem sending your message. Sorry about that ! Please try again later.');
                        }
                    }
                }
            } else {
                updateValidityHint(messageField);
            }
        } else {
            updateValidityHint(emailField);
        }

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

function backButtonHandler() { //not working
    alert('backbutton');
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
    contactLayer.classList.toggle('active');
    emailField.focus();
}

function closeContact() {
    if (contactForm.isActive) {
        toggleContact();
    }
}
