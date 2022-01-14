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
