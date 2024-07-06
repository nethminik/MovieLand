let signupBtn = document.getElementById("signUpBtn");

let isMatched = false;

signupBtn.addEventListener("click", ()=> {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    if (userName && password) {

        const data = {
            userName, password
        }

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirect to the dashboard page
                    window.location.href = '/dashboard';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert("Please Enter both details");
    }
})
