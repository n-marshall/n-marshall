window.onload() = function() {
	setAge();
	addPrintTrigger();
}

function printTrigger(elementId) {
    var getMyFrame = document.getElementById(elementId);
    getMyFrame.focus();
    getMyFrame.contentWindow.print();
}

function addPrintTrigger() {
	var getMain = document.getElementByTagName('main')[0];
	var iFramePdf = document.createElement('iframe');
    iFramePdf.id = "dfghjkl";
    getMain.appendChild('iFramePdf');
}