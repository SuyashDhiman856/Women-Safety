const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signup = document.getElementById('signup');
const login = document.getElementById('loginBtn');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signup.addEventListener("click", () => {
    location.href = "/"
})

login.addEventListener("click", function()
{
    window.location.href = "/"
    console.log("Hi")
})