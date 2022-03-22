let word = "hello";

async function fetchData() {
    
    try {
        const res = await fetch ("https://api.dictionaryapi.dev/api/v2/entries/en/" + word);
        
        //check response status code is between 200-299
        if (!res.ok) {
            throw new Error("Not a word");
        }
        
        const data = await res.json();
        document.getElementById("word").innerHTML = data[0]["word"];

        //only show phonetic when it is available
        if (data[0]["phonetic"]) {
            document.getElementById("phonetic").innerHTML = data[0]["phonetic"];
        } else {
            document.getElementById("phonetic").innerHTML = "";
        }
        let s = "";
        
        //loop through multiple definitions
        for (let i = 0; i < data[0]["meanings"].length; i++) {
            s += ((i + 1) + ". ");
            s += data[0]["meanings"][i]["definitions"][0]["definition"];
            s += "<br>";
        }
        
        document.getElementById("definition").innerHTML = s;

    } catch(err) {
        document.getElementById("word").innerHTML = word;
        document.getElementById("phonetic").innerHTML = "";
        document.getElementById("definition").innerHTML = "Can not find the word :( <br> Please enter another word or check your spelling.";
    }   
}

function getWord() {
    //first update the search word value, then call the fetchData function
    word = document.getElementById("search_word").value;
    fetchData();
}

//default: display definition of "hello"
fetchData();

//connect click event to the search button
document.getElementById("searchButton").addEventListener("click", getWord);
