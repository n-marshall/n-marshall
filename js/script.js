window.onload = function() {
/*	setAge();*/
	addPrintTrigger();
};

function printTrigger(elementId) {
    var getMyFrame = document.getElementById(elementId);
    getMyFrame.focus();
    getMyFrame.contentWindow.print();
};

function addPrintTrigger() {
	var getMain = document.getElementsByTagName('main')[0];
	console.log(getMain);
	var iFramePdf = document.createElement('iframe');
    iFramePdf.id = "iFramePdf";
    iFramePdf.src = "Nicolas-Marshall-Resume.pdf";
    iFramePdf.style.display = 'none';
    console.log(iFramePdf);
    document.getElementsByTagName('body')[0].appendChild(iFramePdf);
};