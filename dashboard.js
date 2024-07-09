const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.href="login.html";
};

const userData = localStorage.getItem("userData");

if (userData) {
    try {
        const userDataObj = JSON.parse(userData);
        const profilePic = document.getElementById('profile-pic');
        const usernameElement = document.getElementById('username');

        if (userDataObj.file) {
            profilePic.src = userDataObj.file;
        }

        usernameElement.textContent = userDataObj.username;
    } catch (error) {
        console.error('Error parsing userData:', error);
    }
}
