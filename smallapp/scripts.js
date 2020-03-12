const app = document.getElementById("root");
const container = document.createElement("div");

let request = new XMLHttpRequest();
request.open("GET", "https://thabis-api.herokuapp.com/books", true);
request.onload = function() {
    //accessing json data here
    let data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(item => {
            console.log(data);
            let main = document.getElementById("root");
            let container = document.getElementById("bookcontainer");
            const heading = document.createElement("h1");
            heading.textContent = item.title;
            const author = document.createElement("p");
            author.textContent = item.author;
            container.appendChild(heading);
            container.appendChild(author);
            main.appendChild(container);
        });
    } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "oh no it is not working";
        app.appendChild(errorMessage);
    }
};

request.send();
