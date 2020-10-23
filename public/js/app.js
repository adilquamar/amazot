// generate snackbar
function addSnackbar(message){
    const el = document.createElement('div');
    el.className = "snackbar";
    const snackbar_container = document.getElementById('snackbar-container');
    el.innerHTML = message;
    snackbar_container.append(el)
    el.className = "snackbar show";
    setTimeout(function ()
    {el.className = el.className.replace("snackbar show", "snackbar");}, 3000)
}