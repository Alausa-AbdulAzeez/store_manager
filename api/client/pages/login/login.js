// GET ELEMENTS

const loginBtn = document.querySelector(".formBtn");
const bypassLoginBtn = document.querySelector(".bypassBtn");
const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const span = document.querySelector(".errorInfo");


// {accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0F0dGVuZGFudCI6dHJ1ZSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ2NjQ2ODE0LCJleHAiOjE2NTUyODY4MTR9.gHe_Xei5nn-h4PskIYp6qO4OMx5jmIXzPmacbShTjX4"
// created_at: "2022-01-13T10:25:26.402Z"
// email: "tayo@gmail.com"
// isadmin: true
// isattendant: true
// personnel_id: 2
// profile_picture: ""
// total_items_sold: 6
// updated_at: "2022-01-19T14:52:29.036Z"}

let email;
let password;
let body = {};

const handleChange = (e) => {
  body = { ...body, [e.target.name]: e.target.value };
  return body;
};

const handleLogin = async (e) => {
  e.preventDefault();
//   window.location.assign("/index.html");
  const response = await fetch("/api/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }).then(async (response) => {
    console.log(`response: ${response}`);

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      window.location.assign("/index.html");
    } else {
      span.classList.add("errorIndicator");
      span.textContent = "Incorrect email or password";
    }
  });
};

const handlebypassLoginBtn = (e)=>{
  e.preventDefault();
  const dUser = {
                 accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0F0dGVuZGFudCI6dHJ1ZSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ2NjQ2ODE0LCJleHAiOjE2NTUyODY4MTR9.gHe_Xei5nn-h4PskIYp6qO4OMx5jmIXzPmacbShTjX4",
                 created_at: "2022-01-13T10:25:26.402Z",
                 email: "tayo@gmail.com",
                 isadmin: true,
                 isattendant: true,
                 personnel_id: 2,
                 profile_picture: "",
                 total_items_sold: 6,
                updated_at: "2022-01-19T14:52:29.036Z"
               }
  localStorage.setItem("user", JSON.stringify(dUser));

  window.location.assign("/index.html");
}


// FUNCTION CALLS
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => handleLogin(e));
}
if (bypassLoginBtn) {
  bypassLoginBtn.addEventListener("click", (e) => handlebypassLoginBtn(e));
}
if (emailInput) {
  emailInput.addEventListener("change", (e) => handleChange(e));
}
if (passwordInput) {
  passwordInput.addEventListener("change", (e) => handleChange(e));
}
