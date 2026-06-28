// This guarantees the browser has loaded the HTML before trying to find the icon
document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#password');

    // Quick sanity check: Open your browser console (F12) to see if this prints!
    console.log("Elements found:", togglePassword, passwordInput);

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggles the Font Awesome visual icon
            this.classList.toggle('fa-eye-slash');
        });
    }
});