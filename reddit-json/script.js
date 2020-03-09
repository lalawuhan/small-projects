$(document).ready(function() {
    getRedditJson();
});

function getRedditJson() {
    $.ajax({
        method: "GET",
        url: "https://www.reddit.com/r/todayilearned/top.json",
        dataType: "json",
        success: returnData,
        error: onError
    });
}

function returnData(data) {
    const listings = data.data.children;
    for (let i = 0; i < listings.length; i++) {
        const list = listings[i].data;
        const headline = list.title;
        const author = list.author;
        let mainHTML = $("#main");
        let div = document.createElement("div");
        let authorName = document.createElement("h4");
        let post = document.createElement("p");
        let currentUpvotes = document.createElement("span");
        let upvoteBtn = document.createElement("button");
        div.className = "grid-item";
        upvoteBtn.clicked = false;
        upvoteBtn.ups = list.ups;
        upvoteBtn.span = currentUpvotes;
        upvoteBtn.innerHTML = "Upvote ";
        authorName.innerHTML = "Posted by: " + author;
        post.innerHTML = headline;
        currentUpvotes.innerHTML = list.ups;
        div.append(authorName);
        div.append(post);
        div.append(upvoteBtn);
        div.append(currentUpvotes);
        mainHTML.append(div);
    }
    $("button").click(function() {
        if (this.clicked) {
            this.ups--;
        } else {
            this.ups++;
        }
        this.clicked = !this.clicked;
        $(this).toggleClass("changeColor");
        $(this.span).text(this.ups);
    });
}

//if JSON fails
function onError() {
    console.log("error");
}
