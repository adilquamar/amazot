const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');

const registerForm = document.querySelector('.register');
const regularLogin = document.querySelector('.login-regular');
const signOut = document.querySelector('.sign-out');

const landing = document.querySelector('.showcase');
const main = document.querySelector('.main')
const logo = document.querySelector('.logo')

const passwordReset = document.querySelector('.forgot-password');
const passwordResetForm = document.querySelector('.pwd-reset');

// going back to landing page if logo is clicked
logo.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        main.classList.add('hide');
        landing.classList.remove("hide");
    });
})

// toggle auth modals
authSwitchLinks.forEach(link => {
    const modalList = [authModals[0], authModals[1]];
    link.addEventListener('click', () => {
        modalList.forEach(modal => modal.classList.toggle('active'))
    });
});

// register form
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = registerForm.email.value;
    const password = registerForm.password.value;
    const displayName = registerForm.displayName.value;
    const photoRef = storage.ref('userProfilePics/defaultProfPic.jpg');

    if (email.endsWith("@uci.edu")){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(result => {
                photoRef.getDownloadURL().then(url => {
                    // creating auth user fields
                    return result.user.updateProfile({
                        displayName: displayName,
                        photoURL: url
                    });
                });
                registerForm.reset();
            })
            .catch((error) => {
                registerForm.querySelector('.error').textContent = error.message;
            });
    } else {
        registerForm.reset();
        registerForm.querySelector('.error').textContent = "Email must end with '@uci.edu'";
    }
});

// login form - regular
regularLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = regularLogin.email.value;
    const password = regularLogin.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            registerForm.reset();
        })
        .catch((error) => {
            // outputs error message in <p> element with class="error"
            if (error.code === "auth/wrong-password"){passwordReset.classList.add('open');}
            regularLogin.querySelector('.error').textContent = error.message;
        });
});

// sign out
signOut.addEventListener('click', () =>{
    firebase.auth().signOut();
});

// switching to reset password modal
passwordReset.addEventListener('click', () => {
    authModals[0].classList.remove('active');
    authModals[2].classList.add('active');
});
// resetting password
passwordResetForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailAddress = passwordResetForm.email.value;
    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
        passwordResetForm.reset();
        regularLogin.querySelector('.error').textContent = 'Sign in again once the password is reset.';
        authModals[0].classList.add('active');
        authModals[2].classList.remove('active');
    }).catch(err => {
        passwordResetForm.querySelector('.error').textContent = err.message;
    });
});


// auth listener - makes login/register modal active depending on user
firebase.auth().onAuthStateChanged((user) => {
    if (user){
        // toggle UI elements
        prodList.innerHTML = "";
        landing.classList.add("hide"); // showing landing page
        main.classList.remove('hide');
        authModals.forEach(modal => modal.classList.remove('active'));

        // load content
        showAllProducts();

    } else{
        main.classList.add('hide');
        authModals[0].classList.add('active'); // login form active
        landing.classList.remove("hide"); // showing landing page
    }
});
