let inputEl = document.getElementById("searchInput");
let resultcontainerEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let detailheadingEl = document.getElementById("detailheading");

function eachdata(eachdata) {
    let {
        title,
        author,
        imageLink,
    } = eachdata;

    console.log(author);

    let containerEL = document.createElement("div");
    containerEL.classList.add("col-6", "d-flex", "flex-column", "flex-content-center");
    resultcontainerEl.appendChild(containerEL);

    let imageEl = document.createElement("img");
    imageEl.src = imageLink;
    imageEl.classList.add("search-book-image");
    containerEL.appendChild(imageEl);

    let paragraphEL = document.createElement("p");
    paragraphEL.classList.add("search-book-name");
    paragraphEL.textContent = author;
    containerEL.appendChild(paragraphEL);


}


function alldata(data) {
    spinnerEl.classList.add("d-none");
    console.log(data.length);
    let totalitem = data.length;
    if (totalitem === 0) {
        detailheadingEl.classList.add("text-center");
        detailheadingEl.textContent = "No Result found";
        resultcontainerEl.textContent = "";
    } else {
        detailheadingEl.classList.remove("text-center");
        detailheadingEl.textContent = "Popular Books";
        for (let i of data) {
            eachdata(i);
        }
    }
}

function inputentered(event) {
    let keyperessed = event.key;
    spinnerEl.classList.remove("d-none");
    if (keyperessed === "Enter") {
        let inputvalue = inputEl.value;
        console.log(inputvalue);

        let url = "https://apis.ccbp.in/book-store?title=" + inputvalue;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = (jsonData);
                console.log(search_results);
                alldata(search_results);
            });
    }
}


inputEl.addEventListener("keydown", inputentered);