const handleLogout = () => {
  const username = localStorage.getItem("username");
  const users = getUsers();
  const currentUserIndex = users.findIndex(user => user.username === username);

  if (currentUserIndex !== -1) {
    const updatedUser = {
      ...users[currentUserIndex],
      isLoggedIn: false
    };

    const updatedUsers = [
      ...users.slice(0, currentUserIndex),
      updatedUser,
      ...users.slice(currentUserIndex + 1)
    ];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log("Updated Users Array:", updatedUsers);
  }

  localStorage.removeItem("currentUser");
  console.log("User logged out successfully.");
  window.location.href = "login.html";
};

console.log("Dashboard loaded");

const userData = localStorage.getItem("currentUser");

if (userData) {
  try {
    const userDataObj = JSON.parse(userData);

    const profilePic = document.getElementById('profile-pic');
    const usernameElement = document.getElementById('username');

    if (userDataObj.profilePic) {
      profilePic.src = userDataObj.profilePic;
    }

    usernameElement.innerText = userDataObj.username;

    if (userDataObj.role === "admin") {
      console.log("Role is admin. Fetching users...");
      displayAllUsers();
    } else {
      console.log("Role is non-admin.");
    }
  } catch (error) {
    console.error('Error parsing userData:', error);
  }
} else {
  console.error('No userData found.');
}

function displayAllUsers() {
  const users = getUsers();
  console.log("Fetched users:", users);

  const usersList = document.getElementById("users-list");

  if (!usersList) {
    console.error("Element with ID 'users-list' not found.");
    return;
  }

  if (!users || users.length === 0) {
    usersList.innerHTML = "<p>No users found.</p>";
    return;
  }

  let usersHTML = "<h2>All Users</h2><ul>";
  users.forEach(user => {
    usersHTML += `<li>${user.username} - ${user.email}</li>`;
  });
  usersHTML += "</ul>";

  usersList.innerHTML = usersHTML;
}

function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}
