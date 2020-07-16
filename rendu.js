const ipc = require('electron').ipcRenderer;

const { dialog } = require('electron').remote

const form = document.querySelector("form");
const input = document.getElementById("link");
const loadingBlock = document.getElementById("loading");
const btnDl = document.getElementById("dlBtn");
const btnDir = document.getElementById("btnDir");

form.addEventListener("submit", (event) => {
    console.log(input.value);
    loadingBlock.classList.remove("hide");
    ipc.send("setLink", input.value);

    event.preventDefault();
});

btnDl.addEventListener("click", () => {
    if (window.localStorage.getItem("directory")) {
        ipc.send("download", "audio");
    }
});

btnDir.addEventListener("click", () => {
    dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] }).then(_res => {
        console.log(_res.filePaths);
        window.localStorage.setItem("directory", _res.filePaths[0]);
        ipc.send('selectDir', _res.filePaths);
    });
    
});


ipc.on("moviesData", (event, res) => {
    console.log(res);
    loadingBlock.classList.add("hide");
    setMoviesData(res);
});

ipc.on("error", (event, err) => {
    console.log(err);
});

function setMoviesData(info) {
    const section = document.getElementById("data-section");
    const thumbnail = document.querySelector("#data-section img");
    const title = document.getElementById("title");
    removeChildElement(title);
    section.classList.remove("hide");
    title.appendChild(document.createTextNode(info.fulltitle));
    thumbnail.src = info.thumbnails[2].url;

}

function removeChildElement(currentElement) {
    if (currentElement.hasChildNodes()) {
        while (currentElement.hasChildNodes()) {
            currentElement.removeChild(currentElement.firstChild);
        }
    }
}