// GET ELEMENTS

// const loginBtn = document.querySelector(".formBtn");
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
    const response = await fetch("/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (response) => {
      console.log("respo");
      console.log(await response.json());
      console.log(await response.json(body));

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
  }
};

// FUNCTION CALLS
// loginBtn.addEventListener("click", (e) => handleLogin(e));
if (emailInput) {
  emailInput.addEventListener("change", (e) => handleLogin(e));
}
if (passwordInput) {
  passwordInput.addEventListener("change", (e) => handleLogin(e));
}
