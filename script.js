const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

const userExists = (email) => {
  const users = getUsers();
  return users.some(user => user.email === email);
};

const handleAuth = () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("All fields are required.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePassword(password)) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  const users = getUsers();
  const userIndex = users.findIndex(user => user.email === email && user.password === password);

  if (userIndex !== -1) {
    if (users[userIndex].isLoggedIn) {
      alert("User is already logged in.");
      return;
    }

    const updatedUser = {
      ...users[userIndex],
      isLoggedIn: true
    };

    const updatedUsers = [
      ...users.slice(0, userIndex),
      updatedUser,
      ...users.slice(userIndex + 1)
    ];
    const currentUser = {
      username: updatedUser.username,
      email: updatedUser.email,
      isLoggedIn: "true",
      role: updatedUser.role
    }

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    if (updatedUser.role === "admin") {
      window.location.href = "dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }
  } else {
    alert("Invalid email or password.");
  }
};



const displaySignupForm = () => {
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
      <label for="role">Role</label>
      <select id="role" required>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <div class="fields">
      <input accept="image/*" type="file" id="profile-pic" required>
    </div>
    <div id="form-handles">
      <label for="already-have-account" onclick="gotoLogin()">Already have an account?</label>
    </div>
    <div id="form-btns">
      <div id="formlogin-btn" onclick="gotoLogin()">Login</div>
      <div id="formsignup-btn" onclick="handleSignup()">Signup</div>
    </div>
  `;

  const loginBtn = document.getElementById("formlogin-btn");
  loginBtn.style.backgroundColor = "#ffffff";
  loginBtn.style.color = "#fcc822";
  loginBtn.style.border = "1px solid #fcc822";

  const signupBtn = document.getElementById("formsignup-btn");
  signupBtn.style.backgroundColor = "#fcc822";
  signupBtn.style.color = "#ffffff";
};

const handleSignup = () => {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const fileInput = document.getElementById("profile-pic");

  if (!username || !fileInput.files.length || !email || !password || !role) {
    alert("All fields are required.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePassword(password)) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (userExists(email)) {
    alert("This email is already registered. Please use a different email or login.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const fileDataUrl = e.target.result;

    const user = {
      username: username,
      email: email,
      password: password,
      role: role,
      profilePic: fileDataUrl,
      isLoggedIn:false
    };

    saveUser(user);
    alert("Signup successful. Please log in.");
    gotoLogin();
  };

  reader.readAsDataURL(file);
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
      <label for="forgot-password" onclick="handleForgotPassword()">Forgot Password?</label>
    </div>
    <div id="form-btns">
      <div id="formlogin-btn" onclick="handleAuth()">Login</div>
      <div id="formsignup-btn" onclick="displaySignupForm()">Signup</div>
    </div>
  `;
};

const handleForgotPassword = () => {
  alert("Feature Coming Soon.");
};

const checkAuthentication = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      window.location.href = "dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }
  } else {
    gotoLogin();
  }
};

window.onload = checkAuthentication;
