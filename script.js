const handleLogin = () => {
  window.location.href = "/login.html";
};

const handleAuth = () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Fields can't be submitted empty");
    return;
  }

  if (password.length < 8 || !(email.includes("@") && email.includes("."))) {
    alert(
      "Password must be at least 8 characters long and email should include @ and . symbol"
    );
    return;
  }

  const storedUserData = localStorage.getItem("userData");

  if (!storedUserData) {
    alert("No user data found. Please sign up first.");
    return;
  }

  const userData = JSON.parse(storedUserData);

  if (email === userData.email && password === userData.password) {
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password");
  }
};

const handleSignup = () => {
  const form = document.getElementById("auth");

  form.innerHTML = `
        <div class="fields">
            <label for="username">Username</label>
            <input type="text" id="username" required>
        </div>
        <div class="fields">
            <label for="email">Email Address</label>
            <input type="email" id="email" required>
        </div>
        <div class="fields">
            <label for="password">Password</label>
            <input type="password" id="password" required>
        </div>
        <div class="fields">
            <input accept="image/*" type="file" id="profile-pic" required>
        </div>
        <div id="form-handles">
            <label for="already-have-account" onclick="gotoLogin()">Already have an account?</label>
        </div>
        <div id="form-btns">
            <div id="formlogin-btn" onclick="handleAuth()">Login</div>
            <div id="formsignup-btn" onclick="handleSignup()">Signup</div>
        </div>
    `;

  const loginbtn = document.getElementById("formlogin-btn");
  loginbtn.style.backgroundColor = "#ffffff";
  loginbtn.style.color = "#fcc822";
  loginbtn.style.border = "1px solid #fcc822";
  loginbtn.onclick = null;

  const signupbtn = document.getElementById("formsignup-btn");
  signupbtn.style.backgroundColor = "#fcc822";
  signupbtn.style.color = "#ffffff";

  signupbtn.onclick = () => {
    const username = document.getElementById("username").value.trim();
    const fileInput = document.getElementById("profile-pic");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !fileInput.files.length || !email || !password) {
      alert("All fields are required.");
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileDataUrl = e.target.result;

      const userData = {
        username: username,
        file: fileDataUrl,
        email: email,
        password: password,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Data stored successfully.");
      gotoLogin();
    };

    reader.readAsDataURL(file);
  };
};

const gotoLogin = () => {
  const form = document.getElementById("auth");
  form.innerHTML = `
        <div class="fields">
            <label for="email">Email Address</label>
            <input type="email" id="email" required>
        </div>
        <div class="fields">
            <label for="password">Password</label>
            <input type="password" id="password" required>
        </div>
        <div id="form-handles">
            <div id="rememberme"><input type="checkbox" name="rememberme"><label for="rememberme">Remember Me</label></div>
            <label for="forgot-password">Forgot Password?</label>
        </div>
        <div id="form-btns">
            <div id="formlogin-btn" onclick="handleAuth()">Login</div>
            <div id="formsignup-btn" onclick="handleSignup()">Signup</div>
        </div>
    `;
};
