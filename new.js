const Login = document.getElementById("Login");
const Signup = document.getElementById("Signup");

Login.addEventListener("click", (event) => {
  event.preventDefault();
  const Email = document.getElementById("Email").value;
  const Password = document.getElementById("Password").value;
  const obj = {
    Email: Email,
    Password: Password,
  };
  check(obj);
});

function check(param) {
  axios
    .post("http://localhost:5000/signin", param)
    .then((response) => {
      alert(response.data);
      window.location.href = "expense.html";
    })
    .catch((err) => {
      alert("User does not exist");
    });
}

Signup.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "index.html";
  });