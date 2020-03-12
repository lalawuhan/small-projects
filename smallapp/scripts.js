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
            let div = document.createElement("div");
            //book.setAttribute("class", "card");
            const h1 = document.createElement("h1");
            h1.textContent = item.title;
            console.log(h1);
            const p = document.createElement("p");
            p.textContent = item.author;
            console.log(p);
        });
    } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "oh no it is not working";
        app.appendChild(errorMessage);
    }
};
request.send();
