document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim().toLowerCase(); 
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value.trim();

            
            if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                document.getElementById("emailError").innerText = "Invalid email format";
                return;
            }

            
            if (!phone.match(/^(\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4})$/)) {
                document.getElementById("phoneError").innerText = "Invalid phone format";
                return;
            }

            
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
                document.getElementById("passwordError").innerText = "Weak password";
                return;
            }

            
            let users = JSON.parse(localStorage.getItem("users")) || [];

            
            if (users.some(user => user.email === email)) {
                alert("Email already registered. Please login.");
                return;
            }

            
            const newUser = { email, phone, password };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Signup Successful! Please login.");
            window.location.href = "index.html";
        });

        document.getElementById("password").addEventListener("input", function () {
            const password = this.value;
            const strength = document.getElementById("passwordStrength");
            if (password.length < 8) {
                strength.innerText = "Weak";
                strength.className = "weak";
            } else if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
                strength.innerText = "Strong";
                strength.className = "strong";
            } else {
                strength.innerText = "Medium";
                strength.className = "medium";
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim().toLowerCase(); 
            const password = document.getElementById("loginPassword").value.trim();

            
            let users = JSON.parse(localStorage.getItem("users")) || [];

            console.log("Stored Users:", users); 

            
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                alert("Login successful!");
                window.location.href = "home.html";
            } else {
                alert("Invalid credentials. Please try again.");
            }
        });
    }
});
