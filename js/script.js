window.onload = function() {
    addPrintTrigger();
    setAge();
};

function printTrigger(elementId) {
    var getMyFrame = document.getElementById(elementId);
    getMyFrame.focus();
    getMyFrame.contentWindow.print();
};

function addPrintTrigger() {
    var iFramePdf = document.createElement('iframe');
    iFramePdf.id = "iFramePdf";
    iFramePdf.src = "Nicolas-Marshall-Resume.pdf";
    iFramePdf.style.display = 'none';
    document.getElementsByTagName('body')[0].appendChild(iFramePdf);
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
