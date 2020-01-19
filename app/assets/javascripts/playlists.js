$("#playlists").sortable();

function showList(id) {
    console.log(id);
    let a = document.getElementById(id);
    if (a.style.display == "block") {
        a.style.display = "none";
        console.log("shutting it down")
    } else {
        a.style.display = "block";
        console.log("shutting it tf up")
    }
}