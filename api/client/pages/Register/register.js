const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const RepasswordInput = document.querySelector(".Repassword");
const formBtn = document.querySelector(".formBtn");

let email;
let password;
let inputs = {};

const handleChange = async (e) => {
  inputs = { ...inputs, [e.target.name]: e.target.value };
};

const handleRegister = async (e) => {
  try {
    e.preventDefault();

    const body = { ...inputs };

    const response = await fetch("/api/auth/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(async (response) => {
      if (response.ok) {
        window.location.assign("/client/pages/attendants/attendants.html");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

formBtn && formBtn.addEventListener("click", (e) => handleRegister(e));
emailInput && emailInput.addEventListener("change", (e) => handleChange(e));
passwordInput &&
  passwordInput.addEventListener("change", (e) => handleChange(e));
RepasswordInput &&
  RepasswordInput.addEventListener("change", (e) => handleChange(e));
