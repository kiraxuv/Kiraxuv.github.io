document.addEventListener('DOMContentLoaded', () => {
  // ✅ Typing Effect (unchanged)
  const text = "⚔️ Powered by Team Kira XUV ⚔️";
  let i = 0;
  function typeEffect() {
    if (i < text.length) {
      document.querySelector('.typing-text').textContent += text.charAt(i);
      i++;
      setTimeout(typeEffect, 100);
    }
  }
  typeEffect();

  // ✅ Login Modal Elements
  const loginBtn = document.querySelector('.nav-btn');
  const loginModal = document.getElementById('loginModal');

  // Boxes
  const loginBox = document.getElementById('loginBox');
  const signupBox = document.getElementById('signupBox');
  const forgotPasswordVerifyBox = document.getElementById('forgotPasswordVerifyBox');
  const forgotPasswordResetBox = document.getElementById('forgotPasswordResetBox');

  // Close buttons for each box
  const closeLoginModal = document.getElementById('closeLoginModal');
  const closeSignupModal = document.getElementById('closeSignupModal');
  const closeForgotPasswordVerifyModal = document.getElementById('closeForgotPasswordVerifyModal');
  const closeForgotPasswordResetModal = document.getElementById('closeForgotPasswordResetModal');

  // Switch links
  const switchToSignup = document.getElementById('switchToSignup');
  const switchToLogin = document.getElementById('switchToLogin');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const backToLoginFromForgot = document.getElementById('backToLoginFromForgot');
  const backToLoginFromReset = document.getElementById('backToLoginFromReset');

  // Sign Up inputs and button
  const signupName = document.getElementById('signupName');
  const signupDob = document.getElementById('signupDob');
  const signupGender = document.getElementById('signupGender');

  const countryCodeSelect = document.getElementById('countryCodeSelect'); // For Signup
  const signupMobile = document.getElementById('signupMobile');
  
  const forgotCountryCodeSelect = document.getElementById('forgotCountryCodeSelect'); // For Forgot Password
  const forgotMobile = document.getElementById('forgotMobile');

  // For Login Form
  const loginCountryCodeSelect = document.getElementById('loginCountryCodeSelect');
  const loginMobile = document.getElementById('loginMobile'); 
  
  const signupPassword = document.getElementById('signupPassword');
  const signupConfirmPassword = document.getElementById('signupConfirmPassword');
  const createAccountBtn = document.getElementById('createAccountBtn');

  // Login inputs
  const loginPassword = document.getElementById('loginPassword');
  
  // 💡 IMPROVEMENT: Select the login submit button more directly and robustly.
  // Using querySelector on the loginBox ensures we get the button inside THAT specific box.
  const loginSubmitBtn = loginBox?.querySelector('.login-submit');

  // Forgot Password inputs and buttons
  const forgotName = document.getElementById('forgotName');
  const forgotDob = document.getElementById('forgotDob');
  const verifyDetailsBtn = document.getElementById('verifyDetailsBtn');
  const newPassword = document.getElementById('newPassword');
  const confirmNewPassword = document.getElementById('confirmNewPassword');
  const saveNewPasswordBtn = document.getElementById('saveNewPasswordBtn');

  // Helper function to show a specific box and hide others
  function showBox(boxToShow) {
    // Hide all boxes first
    loginBox.style.display = 'none';
    signupBox.style.display = 'none';
    forgotPasswordVerifyBox.style.display = 'none';
    forgotPasswordResetBox.style.display = 'none';

    // Show the desired box
    boxToShow.style.display = 'block';
    loginModal.classList.add('show'); // Ensure modal is visible
  }

  // --- Event Listeners for Modal Flow ---

  loginBtn?.addEventListener('click', () => {
    showBox(loginBox); // Show login box by default
  });

  // Close buttons
  closeLoginModal?.addEventListener('click', () => { loginModal.classList.remove('show'); });
  closeSignupModal?.addEventListener('click', () => { loginModal.classList.remove('show'); });
  closeForgotPasswordVerifyModal?.addEventListener('click', () => { loginModal.classList.remove('show'); });
  closeForgotPasswordResetModal?.addEventListener('click', () => { loginModal.classList.remove('show'); });

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
    }
  });

  // --- User Data Simulation (Using localStorage for demo) ---
  let users = JSON.parse(localStorage.getItem('kiraXUVUsers')) || [];

  // Function to generate a simple UID
  function generateUid() {
    return 'KIRA' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
  }

  // --- Country Data for Mobile Input ---
  const countries = [
    { name: 'India', code: '+91', flag: '🇮🇳', regex: /^\d{10}$/ }, // 10 digits for India
    { name: 'USA', code: '+1', flag: '🇺🇸', regex: /^\d{10}$/ },
    { name: 'UK', code: '+44', flag: '🇬🇧', regex: /^\d{10}$/ },
    { name: 'Canada', code: '+1', flag: '🇨🇦', regex: /^\d{10}$/ },
    { name: 'Australia', code: '+61', flag: '🇦🇺', regex: /^\d{9}$/ },
    { name: 'Germany', code: '+49', flag: '🇩🇪', regex: /^\d{10,11}$/ },
    { name: 'France', code: '+33', flag: '🇫🇷', regex: /^\d{9}$/ },
    { name: 'Japan', code: '+81', flag: '🇯🇵', regex: /^\d{10,11}$/ },
    { name: 'China', code: '+86', flag: '🇨🇳', regex: /^\d{11}$/ },
    { name: 'Brazil', code: '+55', flag: '🇧🇷', regex: /^\d{11}$/ },
    // Add more countries as needed
    // The regex above are basic examples. For production, use a dedicated library.
  ];

  // Populate country code select dropdowns - using optional chaining for safety
  if (countryCodeSelect) { // For Signup
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.code;
      option.textContent = country.code;
      countryCodeSelect.appendChild(option);
    });
    countryCodeSelect.value = '+91'; // Set India as default
  }

  if (forgotCountryCodeSelect) { // For Forgot Password
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.code;
      option.textContent = country.code;
      forgotCountryCodeSelect.appendChild(option);
    });
    forgotCountryCodeSelect.value = '+91'; // Set India as default
  }

  if (loginCountryCodeSelect) { // For Login Form
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.code;
      option.textContent = country.code;
      loginCountryCodeSelect.appendChild(option);
    });
    loginCountryCodeSelect.value = '+91'; // Set India as default
  }

  // --- Sign Up Logic ---
  createAccountBtn?.addEventListener('click', () => {
    const name = signupName.value.trim();
    const dob = signupDob.value;
    const gender = signupGender.value;
    const selectedCountryCode = countryCodeSelect.value;
    const mobileNumber = signupMobile.value.trim();
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;

    if (!name || !dob || !gender || !selectedCountryCode || !mobileNumber || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    const selectedCountry = countries.find(c => c.code === selectedCountryCode);
    if (selectedCountry && !selectedCountry.regex.test(mobileNumber)) {
        alert(`Please enter a valid ${selectedCountry.name} mobile number.`);
        return;
    } else if (!selectedCountry) {
        alert('Please select a valid country code.');
        return;
    }

    const fullMobileNumber = selectedCountryCode + mobileNumber;

    if (users.some(user => user.mobile === fullMobileNumber)) {
      alert('Mobile number already registered. Please log in or use forgot password.');
      return;
    }

    const uid = generateUid();
    const newUser = { name, dob, gender, mobile: fullMobileNumber, password, uid };
    users.push(newUser);
    localStorage.setItem('kiraXUVUsers', JSON.stringify(users));

    alert(`Account created successfully! Your UID is: ${uid}. Please keep it safe.`);
    showBox(loginBox);
    // Clear signup fields
    signupName.value = '';
    signupDob.value = '';
    signupGender.value = '';
    countryCodeSelect.value = '+91';
    signupMobile.value = '';
    signupPassword.value = '';
    signupConfirmPassword.value = '';
  });

  // --- Login Logic ---
  // 💡 IMPORTANT: Ensure loginSubmitBtn is not null before adding event listener
  loginSubmitBtn?.addEventListener('click', () => {
    const selectedLoginCountryCode = loginCountryCodeSelect ? loginCountryCodeSelect.value : '';
    const mobileNumber = loginMobile.value.trim();
    const fullMobile = selectedLoginCountryCode + mobileNumber;
    const password = loginPassword.value;

    if (!mobileNumber || !password || !selectedLoginCountryCode) {
      alert('Please enter complete mobile number and password.');
      return;
    }

    const selectedCountry = countries.find(c => c.code === selectedLoginCountryCode);
    if (selectedCountry && !selectedCountry.regex.test(mobileNumber)) {
        alert(`Please enter a valid ${selectedCountry.name} mobile number.`);
        return;
    } else if (!selectedCountry) {
        alert('Please select a valid country code.');
        return;
    }

    const user = users.find(u => u.mobile === fullMobile && u.password === password);

    if (user) {
      alert(`Login successful! Welcome, ${user.name} (UID: ${user.uid})`);
      loginModal.classList.remove('show');
      // Clear login fields
      loginMobile.value = '';
      loginPassword.value = '';
      if (loginCountryCodeSelect) {
          loginCountryCodeSelect.value = '+91';
      }
    } else {
      alert('Invalid mobile number or password.');
    }
  });

  // --- Forgot Password Logic - Step 1: Verify Details ---
  verifyDetailsBtn?.addEventListener('click', () => {
    const name = forgotName.value.trim();
    const dob = forgotDob.value;
    const selectedForgotCountryCode = forgotCountryCodeSelect ? forgotCountryCodeSelect.value : '';
    const mobileNumber = forgotMobile.value.trim();
    const fullMobileNumber = selectedForgotCountryCode + mobileNumber;

    if (!name || !dob || !fullMobileNumber) {
      alert('Please enter all details.');
      return;
    }

    if (selectedForgotCountryCode && mobileNumber) {
      const selectedCountry = countries.find(c => c.code === selectedForgotCountryCode);
      if (selectedCountry && !selectedCountry.regex.test(mobileNumber)) {
          alert(`Please enter a valid ${selectedCountry.name} mobile number for verification.`);
          return;
      } else if (!selectedCountry) {
          alert('Please select a valid country code for verification.');
          return;
      }
    } else {
        alert('Please enter a complete mobile number for verification.');
        return;
    }

    const user = users.find(u => u.name === name && u.dob === dob && u.mobile === fullMobileNumber);

    if (user) {
      localStorage.setItem('resetUserMobile', fullMobileNumber);
      showBox(forgotPasswordResetBox);
      // Clear verify fields
      forgotName.value = '';
      forgotDob.value = '';
      forgotMobile.value = '';
      if (forgotCountryCodeSelect) {
          forgotCountryCodeSelect.value = '+91';
      }
    } else {
      alert('No account found with these details.');
    }
  });

  // --- Forgot Password Logic - Step 2: Save New Password ---
  saveNewPasswordBtn?.addEventListener('click', () => {
    const mobileToReset = localStorage.getItem('resetUserMobile');
    const newPass = newPassword.value;
    const confirmNewPass = confirmNewPassword.value;

    if (!mobileToReset) {
      alert('Error: User not identified for password reset. Please start again.');
      showBox(forgotPasswordVerifyBox);
      return;
    }

    if (!newPass || !confirmNewPass) {
      alert('Please enter and confirm your new password.');
      return;
    }
    if (newPass !== confirmNewPass) {
      alert('New passwords do not match.');
      return;
    }
    if (newPass.length < 6) {
        alert('New password must be at least 6 characters long.');
        return;
    }

    const userIndex = users.findIndex(u => u.mobile === mobileToReset);

    if (userIndex > -1) {
      users[userIndex].password = newPass;
      localStorage.setItem('kiraXUVUsers', JSON.stringify(users));

      alert('Your password has been reset successfully. Please log in with your new password.');
      localStorage.removeItem('resetUserMobile');
      showBox(loginBox);
      // Clear new password fields
      newPassword.value = '';
      confirmNewPassword.value = '';
    } else {
      alert('An error occurred. User not found. Please try again.');
      localStorage.removeItem('resetUserMobile');
      showBox(forgotPasswordVerifyBox);
    }
  });

  // ✅ Background Video + Fallback (unchanged)
  const bgVideo = document.getElementById('bg-video');
  const fallbackImage = document.getElementById('fallback-image');

  if (bgVideo && fallbackImage) {
    bgVideo.addEventListener('loadeddata', () => {
      bgVideo.style.opacity = '1';
      fallbackImage.style.opacity = '0';
    });

    bgVideo.addEventListener('error', () => {
      console.warn("Video failed to load.");
      fallbackImage.style.opacity = '1';
    });
  }

  // ✅ Sidebar Menu Logic (unchanged)
  const menuIcon = document.querySelector('.fa-solid.fa-bars');
  const sidebar = document.getElementById('sidebarMenu');
  const overlay = document.getElementById('sidebarOverlay');
  const closeSidebar = document.querySelector('.close-sidebar');

  menuIcon?.addEventListener('click', () => { // Use optional chaining for safety
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

  console.log("✅ All UI Components Loaded and Updated");

  // --- START: Keyboard Shift Fix for Mobile (Updated) ---
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
  // There is no explicit search button in your HTML based on the provided code.
  // If you add one later, select it here. For now, it will be null.
  const searchButton = null; // No search submit button in your HTML

  const allKeyboardInputs = [
    searchInput,
    document.getElementById('loginMobile'),
    document.getElementById('loginPassword'),
    document.getElementById('signupName'),
    document.getElementById('signupDob'),
    document.getElementById('signupMobile'),
    document.getElementById('signupPassword'),
    document.getElementById('signupConfirmPassword'),
    document.getElementById('forgotName'),
    document.getElementById('forgotDob'),
    document.getElementById('forgotMobile'),
    document.getElementById('newPassword'),
    document.getElementById('confirmNewPassword')
  ].filter(Boolean);

  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  if (isMobileDevice()) {
    allKeyboardInputs.forEach(input => {
      input?.addEventListener('focus', () => { // Use optional chaining
        document.body.dataset.scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
        document.documentElement.style.scrollBehavior = 'auto';
      });

      input?.addEventListener('blur', () => { // Use optional chaining
        resetBodyScroll();
      });
    });

    if (searchButton) { // This block won't execute as searchButton is null
      searchButton.addEventListener('click', () => {
        if (searchInput) {
          searchInput.blur();
        }
        resetBodyScroll();
      });
    }
  }
  // --- END: Keyboard Shift Fix for Mobile (Updated) ---

}); // <-- document.addEventListener('DOMContentLoaded', () => { का अंत
