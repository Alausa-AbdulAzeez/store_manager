// GET ELEMENTS

const loginBtn = document.querySelector(".formBtn");
const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const span = document.querySelector(".errorInfo");

let email;
let password;

const handleLogin = async (e) => {
  e.preventDefault();
  if (e.target.name === "email") {
    email = e.target.value;
  }
  if (e.target.name === "password") {
    password = e.target.value;
  }
  const body = { email, password };

  if (e.target.name === "loginBtn") {
    const response = await fetch(
      "https://fast-ridge-96854.herokuapp.com/https://zstore-manager.herokuapp.com/api/auth/login",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "https://alausa-abdulazeez.github.io'",
        },
        body: JSON.stringify(body),
      }
    ).then(async (response) => {
      const user = await response.json(body);
      localStorage.setItem("user", JSON.stringify(user));
      if (response.ok) {
        window.location.assign(
          "http://127.0.0.1:5500/client/pages/home/home.html"
        );
      } else {
        span.classList.add("errorIndicator");
        span.textContent = "Incorrect email or password";
      }
    });
  }
};

// FUNCTION CALLS
loginBtn.addEventListener("click", (e) => handleLogin(e));
emailInput.addEventListener("change", (e) => handleLogin(e));
passwordInput.addEventListener("change", (e) => handleLogin(e));
