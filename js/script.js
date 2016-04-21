var contactLayer, contactForm, emailField, messageField, submitButton, actions, request;

window.onload = function() {
    contactLayer = document.getElementById('contact-layer');
    contactForm = document.getElementById('contact-form');
    emailField = document.getElementById('email-field');
    messageField = document.getElementById('message-field');
    submitButton = document.getElementById('submit-button');
    actions = document.getElementById('actions');

    contactForm.isActive = false;
    document.isMobile = /Mobi/.test(navigator.userAgent);

    setAge();
    addEventListeners();
    initRequest();
    addPrintIframe();
}

function initRequest() {
    request = new XMLHttpRequest();
    request.open('POST', 'http://formspree.io/marshall.nicolas@gmail.com', true);
    request.setRequestHeader('accept', 'application/json');
}

function addEventListeners() {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener('click', clickHandler);
    document.addEventListener('focusout', focusOutHandler);
    document.addEventListener('backbutton', backButtonHandler);
    document.addEventListener('scroll', scrollHandler);
}

function scrollHandler() {
    scrollPosition = window.pageYOffset | document.body.scrollTop;

    //sticky actions
    if (scrollPosition > 50) {
        actions.classList.remove('top');
        var newContactsPosition = scrollPosition + 100;
        actions.style.paddingTop = newContactsPosition + 'px';
    } else {
        actions.classList.add('top');
        actions.style.paddingTop = '';

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
                }, 15000);
                request.onreadystatechange = function() {
                    if (request.readyState === 4) {
                        if (request.status == 200 && request.status < 300) {
                            contactForm.classList.add('sent');
                            clearTimeout(loadingAlert);
                            setTimeout(function() {
                                closeContact();
                                setTimeout(function() {
                                    contactForm.classList.remove('sent');
                                    initRequest();
                                }, 600);
                            }, 3000);
                        } else {
                            alert('There was a problem sending your message. Sorry about that ! Please try again later.');
                        }
                    }
                }
            } else {
                updateValidityHint(messageField);
                messageField.focus();
            }
        } else {
            updateValidityHint(emailField);
            emailField.focus();
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

function triggerPrint() {
    if (!document.isMobile) {
        var getMyFrame = document.getElementById('iFramePdf');
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
    }
}

function addPrintIframe() {
    if (!document.isMobile) {
        var iFramePdf = document.createElement('iframe');
        iFramePdf.id = "iFramePdf";
        iFramePdf.src = "pdf/Nicolas-Marshall-Resume.pdf";
        iFramePdf.style.display = 'none';
        document.body.appendChild(iFramePdf);
    }
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
    if (contactForm.isActive) {
        emailField.focus();
    }
}

function closeContact() {
    if (contactForm.isActive) {
        toggleContact();
    }
}
