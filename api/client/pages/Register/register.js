let email;
let password;
let inputs = [];

const handleChange = async (e) => {
  inputs = { ...inputs, [e.target.name]: e.target.value };
};

const handleRegister = async (e) => {
  try {
    e.preventDefault();

    const body = { ...inputs };

    const response = await fetch(
      "https://zstore-manager.herokuapp.com/api/auth/signup",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    ).then(async (response) => {
      if (response.ok) {
        window.location.assign(
          "http://127.0.0.1:5500/client/pages/attendants/attendants.html"
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};
