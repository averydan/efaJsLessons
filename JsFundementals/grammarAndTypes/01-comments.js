function validateForm() {
    if (document.forms["signUp"]["fname"].value == "") {
        alert("Name must be filled out");
        return false;
    } else if(document.forms["signUp"]["password"].value !== document.forms["signUp"]["cPassword"].value)
    {
        alert("Passwords do not match");
    }
    else {
        document.getElementById("submit").disabled = true;
    }
}