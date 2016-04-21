function postForm(form) {
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Accept', 'application/json');
   	xhr.setRequestHeader('Content-Type', 'application/json');
    var xhrBody = {'_replyto': contactForm._replyto.value, 'message':contactForm.message.value};
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
}



/*function post(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff


        xhr.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (xhr.status == 200) {
                // Resolve the promise with the response text
                resolve(xhr.response);
            } else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(xhr.statusText));
            }
        };

        // Handle network errors
        xhr.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        xhr.send();
    });
}

// Use it!
post('http://formspree.io/watisdat@mailinator.com').then(function(response) {
    console.log("Success!", response);
}, function(error) {
    console.error("Failed!", error);
});
*/