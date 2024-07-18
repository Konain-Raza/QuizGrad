const handleLogout = () => {
  const username = localStorage.getItem("username");
  const users = getUsers();
  const currentUserIndex = users.findIndex(user => user.username === username);

  if (currentUserIndex !== -1) {
    // Update isLoggedIn status to false for the current user
    console.log(currentUserIndex)
    console.log()
    const updatedUser = {
      ...users[currentUserIndex],
      isLoggedIn: false
    };

    // Update the users array with the updated user
    const updatedUsers = [
      ...users.slice(0, currentUserIndex),
      updatedUser,
      ...users.slice(currentUserIndex + 1)
    ];

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Log updated users array
    console.log("Updated Users Array:", updatedUsers);
  }

  // Remove currentUser from localStorage
  localStorage.removeItem("currentUser");

  // Log confirmation message
  console.log("User logged out successfully.");

  // Redirect to login page
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
      displayAllUsers(); // Call function to display users only if admin
    } else {
      console.log("Role is non-admin.");
      // Handle display for non-admin users if needed
    }
  } catch (error) {
    console.error('Error parsing userData:', error);
    // Handle error if userData parsing fails
  }
} else {
  console.error('No userData found.');
  // Handle case where no userData is found
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
