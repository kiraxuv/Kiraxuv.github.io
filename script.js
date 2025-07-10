document.addEventListener('DOMContentLoaded', () => {
  // --- UI Element Selectors ---
  const preloader = document.getElementById('preloader');
  const typingTextElement = document.querySelector('.typing-text');
  const loginBtn = document.querySelector('.nav-btn');
  const loginModal = document.getElementById('loginModal');

  // Boxes
  const loginBox = document.getElementById('loginBox');
  const signupBox = document.getElementById('signupBox');
  const forgotPasswordVerifyBox = document.getElementById('forgotPasswordVerifyBox');
  const forgotPasswordResetBox = document.getElementById('forgotPasswordResetBox');

  // Close buttons for each box (using querySelectorAll and iteration for consolidation)
  document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
      loginModal?.classList.remove('show');
      // Reset all boxes display style when closing the modal
      loginBox.style.display = 'none';
      signupBox.style.display = 'none';
      forgotPasswordVerifyBox.style.display = 'none';
      forgotPasswordResetBox.style.display = 'none';
      // Clear all input fields when modal closes
      clearAllFormFields();
    });
  });

  // Switch links
  const switchToSignup = document.getElementById('switchToSignup');
  const switchToLogin = document.getElementById('switchToLogin');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const backToLoginFromForgot = document.getElementById('backToLoginFromForgot');
  const backToLoginFromReset = document.getElementById('backToLoginFromReset');

  // Sign Up inputs and button
  const signupName = document.getElementById('signupName');
  const signupDob = document.getElementById('signupDob');
  const signupGender = document.getElementById('signupGender'); // Correctly selected
  const countryCodeSelect = document.getElementById('countryCodeSelect'); // For Signup
  const signupMobile = document.getElementById('signupMobile');
  const signupPassword = document.getElementById('signupPassword');
  const signupConfirmPassword = document.getElementById('signupConfirmPassword');
  const createAccountBtn = document.getElementById('createAccountBtn');
  const passwordStrengthIndicator = document.getElementById('passwordStrength');

  // Login inputs
  const loginCountryCodeSelect = document.getElementById('loginCountryCodeSelect');
  const loginMobile = document.getElementById('loginMobile');
  const loginPassword = document.getElementById('loginPassword');
  const loginSubmitBtn = loginBox?.querySelector('.login-submit');

  // Forgot Password inputs and buttons
  const forgotCountryCodeSelect = document.getElementById('forgotCountryCodeSelect'); // For Forgot Password
  const forgotName = document.getElementById('forgotName');
  const forgotDob = document.getElementById('forgotDob');
  const forgotMobile = document.getElementById('forgotMobile');
  const verifyDetailsBtn = document.getElementById('verifyDetailsBtn');
  const newPassword = document.getElementById('newPassword');
  const confirmNewPassword = document.getElementById('confirmNewPassword');
  const saveNewPasswordBtn = document.getElementById('saveNewPasswordBtn');

  // Sidebar elements
  const menuIcon = document.querySelector('.fa-solid.fa-bars');
  const sidebar = document.getElementById('sidebarMenu');
  const overlay = document.getElementById('sidebarOverlay');
  const closeSidebar = document.querySelector('.close-sidebar');

  // Background Video/Image elements
  const bgVideo = document.getElementById('bg-video');
  const fallbackImage = document.getElementById('fallback-image');

  // --- Utility Functions ---
  function clearAllFormFields() {
    document.querySelectorAll('.login-input, .country-code-select').forEach(input => {
      if (input.type === 'tel' || input.type === 'password' || input.type === 'text' || input.type === 'date') {
        input.value = '';
        // Special handling for date and select inputs to manage placeholder visibility
        if (input.type === 'date' || input.tagName === 'SELECT') {
            input.classList.remove('has-value');
        }
      } else if (input.tagName === 'SELECT') {
        input.value = ''; // For gender select, reset to empty option
        input.classList.remove('has-value'); // Ensure placeholder shows
      }
      // Remove validation classes
      input.classList.remove('valid', 'invalid');
      // For mobile input group
      if (input.closest('.single-mobile-input')) {
        input.closest('.single-mobile-input').classList.remove('valid', 'invalid');
      }
    });
    // Clear password strength indicator
    if (passwordStrengthIndicator) {
      passwordStrengthIndicator.textContent = '';
      passwordStrengthIndicator.className = 'password-strength';
    }
  }

  function showAlert(message) {
    // Replace with a more sophisticated notification system (e.g., a custom toast)
    alert(message);
  }

  // --- Preloader Logic ---
  window.addEventListener('load', () => {
    // Hide preloader after everything is loaded
    if (preloader) {
      preloader.classList.add('hidden');
    }
    // Initialize AOS after content is visible
    AOS.init({
      duration: 1000,
      once: true, // Whether animation should happen only once - while scrolling down
      easing: 'ease-in-out', // default easing for AOS animations
    });
    console.log("✅ Website loaded and AOS initialized.");
  });

  // --- Typing Effect ---
  const textToType = "⚔️ Powered by Team Kira XUV ⚔️";
  let charIndex = 0;
  function typeEffect() {
    if (typingTextElement && charIndex < textToType.length) {
      typingTextElement.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 100);
    }
  }
  typeEffect();

  // --- Login Modal Logic ---
  // Helper function to show a specific box and hide others
  function showBox(boxToShow) {
    if (!loginModal) {
      console.error("Login modal element not found.");
      return;
    }
    // Hide all boxes
    loginBox.style.display = 'none';
    signupBox.style.display = 'none';
    forgotPasswordVerifyBox.style.display = 'none';
    forgotPasswordResetBox.style.display = 'none';

    // Show the desired box
    boxToShow.style.display = 'block';
    loginModal.classList.add('show'); // Ensure modal is visible
    clearAllFormFields(); // Clear fields when switching boxes
  }

  // Event Listeners for Modal Flow
  loginBtn?.addEventListener('click', () => {
    showBox(loginBox); // Show login box by default
  });

  // Switch between Login/Signup/Forgot
  switchToSignup?.addEventListener('click', (e) => {
    e.preventDefault();
    showBox(signupBox);
  });

  switchToLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    showBox(loginBox);
  });

  forgotPasswordLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showBox(forgotPasswordVerifyBox);
  });

  backToLoginFromForgot?.addEventListener('click', (e) => {
    e.preventDefault();
    showBox(loginBox);
  });

  backToLoginFromReset?.addEventListener('click', (e) => {
    e.preventDefault();
    showBox(loginBox);
  });

  // Close modal when clicking outside the box
  loginModal?.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove('show');
      clearAllFormFields(); // Clear fields when closing modal
    }
  });

  // --- Password Toggle Functionality ---
  document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.dataset.target;
      const targetInput = document.getElementById(targetId);
      if (targetInput) {
        if (targetInput.type === 'password') {
          targetInput.type = 'text';
          toggle.innerHTML = '<i class="fas fa-eye"></i>';
        } else {
          targetInput.type = 'password';
          toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
        }
      }
    });
  });

  // --- User Data Simulation (Using localStorage for demo) ---
  let users = JSON.parse(localStorage.getItem('kiraXUVUsers')) || [];

  // Function to generate a simple UID
  function generateUid() {
    return 'KIRA' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
  }

  // --- Country Data for Mobile Input ---
  const countries = [
    { name: 'India', code: '+91', flag: '🇮🇳', regex: /^\d{10}$/ },
    { name: 'USA', code: '+1', flag: '🇺🇸', regex: /^\d{10}$/ },
    { name: 'UK', code: '+44', flag: '🇬🇧', regex: /^\d{10}$/ },
    { name: 'Canada', code: '+1', flag: '🇨🇦', regex: /^\d{10}$/ },
    { name: 'Australia', code: '+61', flag: '🇦🇺', regex: /^\d{9}$/ },
    { name: 'Germany', code: '+49', flag: '🇩🇪', regex: /^\d{10,11}$/ },
    { name: 'France', code: '+33', flag: '🇫🇷', regex: /^\d{9}$/ },
    { name: 'Japan', code: '+81', flag: '🇯🇵', regex: /^\d{10,11}$/ },
    { name: 'China', code: '+86', flag: '🇨🇳', regex: /^\d{11}$/ },
    { name: 'Brazil', code: '+55', flag: '🇧🇷', regex: /^\d{11}$/ },
  ];

  // Populate country code select dropdowns
  function populateCountryCodes(selectElement) {
    if (selectElement) {
      selectElement.innerHTML = ''; // Clear existing options
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = country.code;
        selectElement.appendChild(option);
      });
      selectElement.value = '+91'; // Set India as default
    }
  }

  populateCountryCodes(countryCodeSelect);
  populateCountryCodes(forgotCountryCodeSelect);
  populateCountryCodes(loginCountryCodeSelect);

  // --- Input Validation Feedback ---
  function validateInput(inputElement, regex = null) {
    if (!inputElement) return false;

    const value = inputElement.value.trim();
    let isValid = true;
    let parentGroup = inputElement.closest('.single-mobile-input'); // For mobile input group

    if (inputElement.type === 'password') {
        isValid = value.length >= 6; // Basic password length check
    } else if (inputElement.type === 'email') {
        isValid = /\S+@\S+\.\S+/.test(value);
    } else if (inputElement.type === 'tel' && regex) {
        isValid = regex.test(value);
    } else if (inputElement.tagName === 'SELECT') { // Specific validation for select elements
        isValid = value !== ''; // Check if a non-empty option is selected
        // Manage has-value class for select elements
        if (isValid) {
            inputElement.classList.add('has-value');
        } else {
            inputElement.classList.remove('has-value');
        }
    } else {
        isValid = value !== ''; // Simple check for non-empty
    }

    if (isValid) {
      inputElement.classList.remove('invalid');
      inputElement.classList.add('valid');
      if (parentGroup) {
        parentGroup.classList.remove('invalid');
        parentGroup.classList.add('valid');
      }
    } else {
      inputElement.classList.remove('valid');
      inputElement.classList.add('invalid');
      if (parentGroup) {
        parentGroup.classList.remove('valid');
        parentGroup.classList.add('invalid');
      }
    }
    return isValid;
  }

  // Add real-time validation listeners for common inputs
  [signupName, signupDob, signupGender, signupPassword, signupConfirmPassword, // Added signupGender here
   loginMobile, loginPassword, forgotName, forgotDob, forgotMobile,
   newPassword, confirmNewPassword
  ].filter(Boolean).forEach(input => {
    input.addEventListener('input', () => {
      if (input.id === 'signupPassword') {
        checkPasswordStrength(input.value);
        validateInput(signupConfirmPassword, input.value); // Re-validate confirm password
      } else if (input.id === 'signupConfirmPassword') {
        validateInput(input, signupPassword.value);
      } else {
        validateInput(input);
      }

      // Handle 'has-value' class for date and select inputs
      if (input.type === 'date' || input.tagName === 'SELECT') {
        if (input.value) {
          input.classList.add('has-value');
        } else {
          input.classList.remove('has-value');
        }
      }
    });
    input.addEventListener('blur', () => {
        if (input.id === 'signupPassword') {
            checkPasswordStrength(input.value);
            validateInput(signupConfirmPassword, input.value);
        } else if (input.id === 'signupConfirmPassword') {
            validateInput(input, signupPassword.value);
        } else {
            validateInput(input);
        }

        // Handle 'has-value' class for date and select inputs on blur
        if (input.type === 'date' || input.tagName === 'SELECT') {
          if (input.value) {
            input.classList.add('has-value');
          } else {
            input.classList.remove('has-value');
          }
        }
    });
  });

  // Specific validation for mobile inputs with country code
  const setupMobileInputValidation = (mobileInput, countryCodeSelect) => {
    if (mobileInput && countryCodeSelect) {
      const validateMobile = () => {
        const selectedCountry = countries.find(c => c.code === countryCodeSelect.value);
        validateInput(mobileInput, selectedCountry ? selectedCountry.regex : null);
      };
      mobileInput.addEventListener('input', validateMobile);
      mobileInput.addEventListener('blur', validateMobile);
      countryCodeSelect.addEventListener('change', validateMobile);
    }
  };

  setupMobileInputValidation(signupMobile, countryCodeSelect);
  setupMobileInputValidation(loginMobile, loginCountryCodeSelect);
  setupMobileInputValidation(forgotMobile, forgotCountryCodeSelect);

  // --- Password Strength Indicator ---
  function checkPasswordStrength(password) {
    let strength = 0;
    if (!password) {
      passwordStrengthIndicator.textContent = '';
      passwordStrengthIndicator.className = 'password-strength';
      return;
    }

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$&+,:;=?@#|'<>.^*()%!-]/)) strength++;

    passwordStrengthIndicator.className = 'password-strength'; // Reset classes

    if (strength <= 2) {
      passwordStrengthIndicator.textContent = 'Weak';
      passwordStrengthIndicator.classList.add('invalid', 'weak');
    } else if (strength <= 4) {
      passwordStrengthIndicator.textContent = 'Medium';
      passwordStrengthIndicator.classList.add('medium');
    } else {
      passwordStrengthIndicator.textContent = 'Strong';
      passwordStrengthIndicator.classList.add('valid', 'strong');
    }
  }

  if (signupPassword) {
    signupPassword.addEventListener('input', () => checkPasswordStrength(signupPassword.value));
  }


  // --- Sign Up Logic ---
  createAccountBtn?.addEventListener('click', () => {
    const name = signupName?.value.trim();
    const dob = signupDob?.value;
    const gender = signupGender?.value;
    const selectedCountryCode = countryCodeSelect?.value;
    const mobileNumber = signupMobile?.value.trim();
    const password = signupPassword?.value;
    const confirmPassword = signupConfirmPassword?.value;

    let allValid = true;
    allValid = validateInput(signupName) && allValid;
    allValid = validateInput(signupDob) && allValid;
    allValid = validateInput(signupGender) && allValid; // Validate gender select
    const selectedCountry = countries.find(c => c.code === selectedCountryCode);
    allValid = validateInput(signupMobile, selectedCountry?.regex) && allValid;
    allValid = validateInput(signupPassword) && allValid;
    allValid = validateInput(signupConfirmPassword) && allValid;


    if (!allValid) {
        showAlert('Please fill in all fields correctly.');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match.');
        signupPassword?.classList.add('invalid');
        signupConfirmPassword?.classList.add('invalid');
        return;
    }

    const fullMobileNumber = selectedCountryCode + mobileNumber;

    if (users.some(user => user.mobile === fullMobileNumber)) {
        showAlert('Mobile number already registered. Please log in or use forgot password.');
        signupMobile?.classList.add('invalid');
        signupMobile?.closest('.single-mobile-input')?.classList.add('invalid');
        return;
    }

    const uid = generateUid();
    const newUser = { name, dob, gender, mobile: fullMobileNumber, password, uid };
    users.push(newUser);
    localStorage.setItem('kiraXUVUsers', JSON.stringify(users));

    showAlert(`Account created successfully! Your UID is: ${uid}. Please keep it safe.`);
    showBox(loginBox);
    clearAllFormFields(); // Clear signup fields after successful registration
  });

  // --- Login Logic ---
  loginSubmitBtn?.addEventListener('click', () => {
    const selectedLoginCountryCode = loginCountryCodeSelect?.value || '';
    const mobileNumber = loginMobile?.value.trim();
    const password = loginPassword?.value;

    let allValid = true;
    const selectedCountry = countries.find(c => c.code === selectedLoginCountryCode);
    allValid = validateInput(loginMobile, selectedCountry?.regex) && allValid;
    allValid = validateInput(loginPassword) && allValid;

    if (!allValid) {
        showAlert('Please enter complete mobile number and password correctly.');
        return;
    }

    const fullMobile = selectedLoginCountryCode + mobileNumber;
    const user = users.find(u => u.mobile === fullMobile && u.password === password);

    if (user) {
      showAlert(`Login successful! Welcome, ${user.name} (UID: ${user.uid})`);
      loginModal?.classList.remove('show');
      clearAllFormFields(); // Clear login fields
    } else {
      showAlert('Invalid mobile number or password.');
      loginMobile?.classList.add('invalid');
      loginMobile?.closest('.single-mobile-input')?.classList.add('invalid');
      loginPassword?.classList.add('invalid');
    }
  });

  // --- Forgot Password Logic - Step 1: Verify Details ---
  verifyDetailsBtn?.addEventListener('click', () => {
    const name = forgotName?.value.trim();
    const dob = forgotDob?.value;
    const selectedForgotCountryCode = forgotCountryCodeSelect?.value || '';
    const mobileNumber = forgotMobile?.value.trim();

    let allValid = true;
    allValid = validateInput(forgotName) && allValid;
    allValid = validateInput(forgotDob) && allValid;
    const selectedCountry = countries.find(c => c.code === selectedForgotCountryCode);
    allValid = validateInput(forgotMobile, selectedCountry?.regex) && allValid;

    if (!allValid) {
        showAlert('Please enter all details correctly for verification.');
        return;
    }

    const fullMobileNumber = selectedForgotCountryCode + mobileNumber;
    const user = users.find(u => u.name === name && u.dob === dob && u.mobile === fullMobileNumber);

    if (user) {
      localStorage.setItem('resetUserMobile', fullMobileNumber);
      showBox(forgotPasswordResetBox);
      clearAllFormFields(); // Clear verify fields
    } else {
      showAlert('No account found with these details.');
      forgotName?.classList.add('invalid');
      forgotDob?.classList.add('invalid');
      forgotMobile?.classList.add('invalid');
      forgotMobile?.closest('.single-mobile-input')?.classList.add('invalid');
    }
  });

  // --- Forgot Password Logic - Step 2: Save New Password ---
  saveNewPasswordBtn?.addEventListener('click', () => {
    const mobileToReset = localStorage.getItem('resetUserMobile');
    const newPass = newPassword?.value;
    const confirmNewPass = confirmNewPassword?.value;

    if (!mobileToReset) {
      showAlert('Error: User not identified for password reset. Please start again.');
      showBox(forgotPasswordVerifyBox);
      return;
    }

    let allValid = true;
    allValid = validateInput(newPassword) && allValid;
    allValid = validateInput(confirmNewPassword) && allValid;

    if (!allValid) {
        showAlert('Please enter and confirm your new password correctly.');
        return;
    }

    if (newPass !== confirmNewPass) {
      showAlert('New passwords do not match.');
      newPassword?.classList.add('invalid');
      confirmNewPassword?.classList.add('invalid');
      return;
    }
    if (newPass.length < 6) { // Redundant if validateInput handles, but good for explicit feedback
      showAlert('New password must be at least 6 characters long.');
      newPassword?.classList.add('invalid');
      return;
    }

    const userIndex = users.findIndex(u => u.mobile === mobileToReset);

    if (userIndex > -1) {
      users[userIndex].password = newPass;
      localStorage.setItem('kiraXUVUsers', JSON.stringify(users));

      showAlert('Your password has been reset successfully. Please log in with your new password.');
      localStorage.removeItem('resetUserMobile');
      showBox(loginBox);
      clearAllFormFields(); // Clear new password fields
    } else {
      showAlert('An error occurred. User not found. Please try again.');
      localStorage.removeItem('resetUserMobile');
      showBox(forgotPasswordVerifyBox);
    }
  });

  // --- Background Video + Fallback ---
  if (bgVideo && fallbackImage) {
    bgVideo.addEventListener('loadeddata', () => {
      bgVideo.style.opacity = '1';
      fallbackImage.style.opacity = '0';
      console.log("Background video loaded successfully.");
    });

    bgVideo.addEventListener('error', () => {
      console.warn("Background video failed to load. Displaying fallback image.");
      fallbackImage.style.opacity = '1';
    });
  } else {
    console.warn("Background video or fallback image element not found.");
  }

  // --- Sidebar Menu Logic ---
  menuIcon?.addEventListener('click', () => {
    sidebar?.classList.add('show');
    overlay?.classList.add('show');
  });

  closeSidebar?.addEventListener('click', () => {
    sidebar?.classList.remove('show');
    overlay?.classList.remove('show');
  });

  overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('show');
    overlay?.classList.remove('show');
  });

  // --- Keyboard Shift Fix for Mobile ---
  function resetBodyScroll() {
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    const scrollY = document.body.dataset.scrollY;
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
    }
    document.body.removeAttribute('data-scrollY');
    document.documentElement.style.scrollBehavior = '';
  }

  const searchInput = document.querySelector('.search-input');
  // Added signupGender to the array of inputs for keyboard shift fix
  const allKeyboardInputs = [
    // searchInput,//
    loginMobile, loginPassword,
    signupName, signupDob, signupGender, signupMobile, signupPassword, signupConfirmPassword,
    forgotName, forgotDob, forgotMobile, newPassword, confirmNewPassword
  ].filter(Boolean); // Filter out any null elements

  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  if (isMobileDevice()) {
    allKeyboardInputs.forEach(input => {
      input?.addEventListener('focus', () => {
        document.body.dataset.scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
        document.documentElement.style.scrollBehavior = 'auto';
      });

      input?.addEventListener('blur', () => {
        // A small delay can help if another input is immediately focused,
        // preventing a flicker. Adjust as needed.
        setTimeout(resetBodyScroll, 100);
      });
    });
  }

  console.log("✅ All UI Components Initialized.");
});
