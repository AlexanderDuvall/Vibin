$("#playlists").sortable();

function showList(id) {
    let a = document.getElementById(id);
    if (a.style.display == "block") {
        a.style.display = "none";
    } else {
        a.style.display = "block";
    }
}