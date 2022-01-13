// GET ELEMENTS

const loginBtn = document.querySelector(".formBtn");
const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const span = document.querySelector(".errorInfo");

let email;
let password;
let body = {};

const handleChange = (e) => {
  body = { ...body, [e.tatrget.name]: e.target.value };
};

const handleLogin = async (e) => {
  e.preventDefault();
  const response = await fetch("/api/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }).then(async (response) => {
    console.log("respo");
    console.log(response.json());

    // if (response.ok) {
    //   const user = await response.json(body);
    //   localStorage.setItem("user", JSON.stringify(user));
    // window.location.assign(
    //     "https://alausa-abdulazeez.github.io/index.html"
    //   );
    // } else {
    //   span.classList.add("errorIndicator");
    //   span.textContent = "Incorrect email or password";
    // }
  });
};

// FUNCTION CALLS
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => handleLogin(e));
}
if (emailInput) {
  emailInput.addEventListener("change", (e) => handleChange(e));
}
if (passwordInput) {
  passwordInput.addEventListener("change", (e) => handleChange(e));
}
