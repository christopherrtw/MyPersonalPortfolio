// Login Form Validation
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Password visibility toggle
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.querySelector('i').classList.toggle('fa-eye');
                this.querySelector('i').classList.toggle('fa-eye-slash');
            });
        }
        
        // Password validation
        const passwordRequirements = document.querySelectorAll('.requirement');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                
                // Check each requirement
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumber = /[0-9]/.test(password);
                const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
                
                // Update requirement indicators
                passwordRequirements[0].classList.toggle('valid', hasUpperCase);
                passwordRequirements[0].classList.toggle('invalid', !hasUpperCase);
                
                passwordRequirements[1].classList.toggle('valid', hasLowerCase);
                passwordRequirements[1].classList.toggle('invalid', !hasLowerCase);
                
                passwordRequirements[2].classList.toggle('valid', hasNumber);
                passwordRequirements[2].classList.toggle('invalid', !hasNumber);
                
                passwordRequirements[3].classList.toggle('valid', hasSymbol);
                passwordRequirements[3].classList.toggle('invalid', !hasSymbol);
            });
        }
        
        // Form submission validation
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (username.length < 4) {
                alert('Username must be at least 4 characters long.');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }
            
            // Check password requirements
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
            
            if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSymbol) {
                alert('Password does not meet all requirements.');
                return;
            }
            
            // If validation passes, redirect to home page
            window.location.href = 'home.html';
        });
    }
    
    // Update date and time on home page
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const dateTimeString = now.toLocaleDateString('en-US', options);
        
        const datetimeElement = document.getElementById('datetime');
        if (datetimeElement) {
            datetimeElement.textContent = dateTimeString;
        }
    }
    
    // Update date time immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Image Slideshow functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlides(n) {
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;
        
        const slidesContainer = document.querySelector('.slides');
        if (slidesContainer) {
            slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        }
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
    }
    
    // Next/previous controls
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            slideIndex++;
            showSlides(slideIndex);
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            slideIndex--;
            showSlides(slideIndex);
        });
    }
    
    // Dot controls
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index;
            showSlides(slideIndex);
        });
    });
    
    // Auto-advance slides
    let slideInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000);
    
    // Pause auto-advance on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                slideIndex++;
                showSlides(slideIndex);
            }, 5000);
        });
    }
    
    // Gallery modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            if (modal && modalImg && modalCaption) {
                modal.style.display = 'block';
                modalImg.src = this.querySelector('img').src;
                modalCaption.textContent = this.querySelector('.gallery-caption').textContent;
            }
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            
            // Save theme preference to localStorage
            const isDarkTheme = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDarkTheme);
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('darkTheme');
        if (savedTheme === 'true') {
            document.body.classList.add('dark-theme');
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // Interactive elements for extra pages
    // Hobbies page - Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar');
    if (skillBars.length > 0) {
        // Animate skill bars when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target.getAttribute('data-level');
                    entry.target.style.width = skillLevel + '%';
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Career goals page - Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.3 });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // Blog page - Like functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likesCount = this.querySelector('.likes-count');
            let count = parseInt(likesCount.textContent);
            count++;
            likesCount.textContent = count;
            
            // Visual feedback
            this.classList.add('liked');
            setTimeout(() => {
                this.classList.remove('liked');
            }, 1000);
        });
    });
});

/*vfx*/

function openVideoModal(videoId) {
    document.getElementById(videoId + '-modal').style.display = 'flex';
}

function closeVideoModal(videoId) {
    document.getElementById(videoId + '-modal').style.display = 'none';
}

// Close modal when clicking outside the content
window.onclick = function(event) {
    if (event.target.classList.contains('video-modal')) {
        event.target.style.display = 'none';
    }
}

/* theme */

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.title = 'Toggle Dark Mode';
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference or prefer dark scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '🌙';
        }
    });
});

// Add functionality for music playlist
document.addEventListener('DOMContentLoaded', function() {
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            playlistItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('i').classList.remove('fa-pause');
                i.querySelector('i').classList.add('fa-play');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            const icon = this.querySelector('i');
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            
            // In a real implementation, this would play the actual audi5.o
            console.log('Playing: ' + this.querySelector('span').textContent);
        });
    });
    
    // Arsenal theme toggle
    const arsenalHeader = document.querySelector('.interest-header[style*="EF0107"]');
    const themeToggle = document.getElementById('themeToggle');
    
    if (arsenalHeader && themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Small delay to ensure theme class has been applied
            setTimeout(() => {
                if (document.body.classList.contains('dark-theme')) {
                    arsenalHeader.style.background = 'linear-gradient(135deg, #9C0000 0%, #6B5A3A 100%)';
                } else {
                    arsenalHeader.style.background = 'linear-gradient(135deg, #EF0107 0%, #9C824A 100%)';
                }
            }, 10);
        });
    }
});