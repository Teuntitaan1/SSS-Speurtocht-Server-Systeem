
function GetRequest() {
    
    // Initial page setup, requests all the questions and displays them on the website
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8000");
    request.send();
    request.responseType = "text";
    request.onload = () => {
    if (request.readyState == 4 && request.status == 200) {
        
        const data = request.response;
        console.log(data);

    } else {
        console.log(`Error: ${request.status}`);
    }
    };
}

function PostRequest(Data) {
    
    // Initial page setup, requests all the questions and displays them on the website
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8000");
    request.send(Data);
    request.onload = () => {
    if (request.readyState == 4 && request.status == 200) {
        
        const data = request.response;
        console.log(data);

    } else {
        console.log(`Error: ${request.status}`);
    }
    };
}

function BadRequest(Data) {
    
    // Initial page setup, requests all the questions and displays them on the website
    const request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:8000");
    request.send(Data);
    request.onload = () => {
    if (request.readyState == 4 && request.status == 200) {
        
        const data = request.response;
        console.log(data);

    } else {
        console.log(`Error: ${request.status}`);
    }
    };
}

PostRequest("Test");

