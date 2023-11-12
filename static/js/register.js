const usernameField=document.querySelector("#usernameField");
const feedBackArea=document.querySelector('.invalid_feedback');
const emailField=document.querySelector('#emailField');
const emailfeedBackArea = document.querySelector('.emailFeedBackArea');
const passwordField = document.querySelector('#passwordField');
const usernameSuccessOutput = document.querySelector('.usernameSuccessOutput');
//const emailSuccessOutput = document.querySelector('.emailSuccessOutput');
const showPasswordToggle=document.querySelector('.showPasswordToggle');

const handleToggleInput= (e) =>{
    if(showPasswordToggle.textContent==='SHOW'){
        showPasswordToggle.textContent = "HIDE";
        passwordField.setAttribute("type", "text");
    }else{
        showPasswordToggle.textContent = "SHOW";
        passwordField.setAttribute("type", "password");
    }
}

showPasswordToggle.addEventListener("click",handleToggleInput);


usernameField.addEventListener("keyup",(e) => {

    const usernameVal = e.target.value;
    

    usernameField.classList.remove("is-invalid");
    feedBackArea.style.display="none";
    usernameSuccessOutput.style.display="block";
    usernameSuccessOutput.textContent=`Checking ${usernameVal}`;


    if(usernameVal.length > 3 && usernameVal.length < 20){
        fetch("/authentication/validate-username",{
            body: JSON.stringify({ username: usernameVal }), 
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);

            if(data.username_error){
                usernameSuccessOutput.style.display="none";
                usernameField.classList.add("is-invalid");
                feedBackArea.style.display="block";
                feedBackArea.innerHTML=`<p>${data.username_error}</p>`
            } else {
                usernameField.classList.remove("is-invalid");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});


emailField.addEventListener('keyup',(e)=>{
    const emailVal = e.target.value;

    emailField.classList.remove("is-invalid");
    emailfeedBackArea.style.display="none";
    emailSuccessOutput.style.display="block";
    emailSuccessOutput.textContent=`Checking ${emailVal}`;



    if(emailVal.length > 0){
        fetch("/authentication/validate-email",{
            body: JSON.stringify({ email: emailVal }), 
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);

            if(data.email_error){
                emailSuccessOutput.style.display="none";
                emailField.classList.add("is-invalid");
                emailfeedBackArea.style.display="block";
                emailfeedBackArea.innerHTML=`<p>${data.email_error}</p>`
            } else {
                emailField.classList.remove("is-invalid");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
})
