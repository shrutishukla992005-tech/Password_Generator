const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");

const message = document.getElementById("message");


const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";


/* Length Display */

lengthInput.addEventListener("input", function () {
    lengthValue.textContent = lengthInput.value;
    generatePassword();
});


/* Generate Password */

function generatePassword() {

    let characters = "";

    if (uppercase.checked) {
        characters += upperChars;
    }

    if (lowercase.checked) {
        characters += lowerChars;
    }

    if (numbers.checked) {
        characters += numberChars;
    }

    if (symbols.checked) {
        characters += symbolChars;
    }

    if (characters.length === 0) {
        passwordInput.value = "";
        strengthText.textContent = "Select an option";
        strengthBar.style.width = "0%";
        return;
    }

    const length = Number(lengthInput.value);

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex =
            Math.floor(Math.random() * characters.length);

        password += characters[randomIndex];
    }

    passwordInput.value = password;

    checkStrength(password);
}


/* Password Strength */

function checkStrength(password) {

    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    if (score <= 2) {

        strengthText.textContent = "Weak";
        strengthBar.style.width = "30%";

    } else if (score <= 4) {

        strengthText.textContent = "Medium";
        strengthBar.style.width = "65%";

    } else {

        strengthText.textContent = "Strong";
        strengthBar.style.width = "100%";
    }
}


/* Generate Button */

generateBtn.addEventListener("click", function () {

    generatePassword();

    message.textContent = "New password generated!";

    setTimeout(() => {
        message.textContent = "";
    }, 2000);
});


/* Copy Password */

copyBtn.addEventListener("click", async function () {

    if (passwordInput.value === "") {
        return;
    }

    await navigator.clipboard.writeText(passwordInput.value);

    message.textContent = "Password copied! ✓";

    copyBtn.textContent = "✓";

    setTimeout(() => {
        copyBtn.textContent = "📋";
        message.textContent = "";
    }, 2000);
});


/* Generate when options change */

uppercase.addEventListener("change", generatePassword);
lowercase.addEventListener("change", generatePassword);
numbers.addEventListener("change", generatePassword);
symbols.addEventListener("change", generatePassword);


/* Initial Password */

generatePassword();