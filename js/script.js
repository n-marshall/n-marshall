window.onload = function() {
    setAge();
    addPrintIframe();
    addEventListeners();
};

var contactLayer = document.getElementById('contact-layer');
var contact = document.getElementById('contact');
var emailField = document.getElementById('email-field');
var messageField = document.getElementById('message-field');
var submitButton = document.getElementById('submit');
var isContactActive = false;

function addEventListeners() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener('click', clickHandler, false);
};

function keyDownHandler(e) {
    var keyCode = e.which;
    if (keyCode == 27) {
        closeContact();
        console.log(e.target)
    }
    if (keyCode == 13 && e.target === emailField) {
        e.preventDefault();
        if (emailField.checkValidity()) {
            messageField.focus();
        } else {
        	submitButton.click();
        }
    }
};

function clickHandler(e) {
    if (isContactActive && e.target === contactLayer) {
        closeContact();
    }
};

function triggerPrint(elementId) {
    var getMyFrame = document.getElementById(elementId);
    getMyFrame.focus();
    getMyFrame.contentWindow.print();
};

function addPrintIframe() {
    var iFramePdf = document.createElement('iframe');
    iFramePdf.id = "iFramePdf";
    iFramePdf.src = "pdf/Nicolas-Marshall-Resume.pdf";
    iFramePdf.style.display = 'none';
    document.body.appendChild(iFramePdf);
};

function setAge() {
    var birthDate = new Date('1991-10-17');
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById('age').textContent = age;
};

function toggleContact() {
    isContactActive = !isContactActive;
    contactLayer.classList.toggle('dim');
    contact.classList.toggle('active');
    emailField.focus();
};

function closeContact() {
    if (isContactActive) {
        toggleContact();
    }
};
