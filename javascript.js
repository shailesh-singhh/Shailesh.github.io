document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Dark Mode Toggle
    const modeToggle = document.getElementById("mode-toggle");
    const body = document.body;

    // Load saved mode preference from localStorage
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        modeToggle.checked = true;
    } else {
        body.classList.remove("light-mode");
        modeToggle.checked = false;
    }

    // Toggle light/dark mode
    modeToggle.addEventListener("change", () => {
        if (modeToggle.checked) {
            body.classList.add("light-mode");
            localStorage.setItem("theme", "light");
        } else {
            body.classList.remove("light-mode");
            localStorage.setItem("theme", "dark");
        }
    });
    
});
const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            let category = button.getAttribute("data-category");

            projectCards.forEach(card => {
                if (category === "all" || card.getAttribute("data-category") === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Lightbox Popup
    const viewButtons = document.querySelectorAll(".view-btn");
    const popup = document.getElementById("project-popup");
    const popupTitle = document.getElementById("popup-title");
    const popupImg = document.getElementById("popup-img");
    const popupDesc = document.getElementById("popup-desc");
    const popupLink = document.getElementById("popup-link");
    const closeButton = document.querySelector(".close-btn");

    const projectData = {
        1: { title: "Portfolio Website", img: "/image/Untitled design (1).png", desc: "A modern personal portfolio.", link: "#" },
        2: { title: "AI Chatbot", img: "/image/chatbot.jpg", desc: "An AI-powered chatbot.", link: "https://google.com" },
        3: { title: "Reward System", img: "/image/Task.jpg", desc: "This project  to provide feedback on portfolios by  blockchain-based tokens." , link: "https://github.com/shailesh-singhh/-Tokens-for-providing-portfolio-feedback."},
        4: { title: "Society Management", img: "/image/Society.jpg", desc: "A website to manage society efficiently.", link: "https://github.com/shailesh-singhh/Society-Management-System" },
        
    };
  

    viewButtons.forEach(button => {
        button.addEventListener("click", () => {
            let projectId = button.getAttribute("data-id");
            let project = projectData[projectId];

            popupTitle.textContent = project.title;
            popupImg.src = project.img;
            popupDesc.textContent = project.desc;
            popupLink.href = project.link;

            popup.style.display = "flex";
        });
    });

    closeButton.addEventListener("click", () => {
        popup.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
    document.addEventListener("DOMContentLoaded", function () {
        console.log("JavaScript Loaded!");  // Debugging line to check if script runs.
    
        const skills = document.querySelectorAll(".skill.planet");
        const popup = document.getElementById("skill-popup");
        const popupTitle = document.getElementById("popup-title");
        const popupDesc = document.getElementById("popup-desc");
        const closeBtn = document.querySelector(".close-btn");
    
        // Debugging: Check if elements exist
        if (!popup || !popupTitle || !popupDesc || !closeBtn) {
            console.error("Popup elements missing!");
            return;
        }
    
        const skillDetails = {
            "Java": "Advanced Java development, including Spring Boot.",
            "C++": "Expert in OOP, STL, and competitive programming.",
            "DSA": "Strong understanding of algorithms and data structures.",
            "PowerBI": "Creating dashboards and business intelligence solutions.",
            "HTML": "MERN Stack development with React and Node.js.",
            "CSS": "Expertise in MySQL database queries and optimizations.",
            "JS": "Worked on ML models for AI applications.",
            "MongoDB": "Building AI-driven apps with Generative AI."
        };
    
        // Attach event listeners to each skill
        skills.forEach(skill => {
            skill.addEventListener("click", function () {
                let skillName = this.getAttribute("data-skill");
                
                console.log("Clicked on:", skillName);  // Debugging line to check click events.
    
                if (!skillDetails[skillName]) {
                    console.error("No details found for:", skillName);
                    return;
                }
    
                popupTitle.innerText = skillName;
                popupDesc.innerText = skillDetails[skillName];
    
                popup.style.display = "flex";
            });
        });
    
        // Close popup on button click
        closeBtn.addEventListener("click", function () {
            popup.style.display = "none";
        });
    
        // Close popup when clicking outside
        window.addEventListener("click", function (event) {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
    });
    
    
    
    document.getElementById("messageForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let name = document.querySelector('input[name="name"]').value;
        let email = document.querySelector('input[name="email"]').value;
        let message = document.querySelector('textarea[name="message"]').value;
        
        if (name && email && message) {
            document.getElementById("statusMessage").textContent = "Message sent successfully!";
            document.getElementById("statusMessage").style.color = "#28a745";
            this.reset();
        } else {
            document.getElementById("statusMessage").textContent = "Please fill out all fields!";
            document.getElementById("statusMessage").style.color = "red";
        }
    });
    document.getElementById("messageForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let name = document.querySelector('input[name="name"]').value;
        let email = document.querySelector('input[name="email"]').value;
        let message = document.querySelector('textarea[name="message"]').value;
    
        if (name && email && message) {
            // Create a new message element
            let messageItem = document.createElement("div");
            messageItem.classList.add("message-item");
            messageItem.innerHTML = `
                <h4>${name} (${email})</h4>
                <p>${message}</p>
                <span class="delete-btn" onclick="deleteMessage(this)">🗑️</span>
            `;
    
            // Append message to the inbox
            document.getElementById("inboxMessages").appendChild(messageItem);
    
            // Store in localStorage (Temporary storage)
            let messages = JSON.parse(localStorage.getItem("messages")) || [];
            messages.push({ name, email, message });
            localStorage.setItem("messages", JSON.stringify(messages));
    
            // Success message
            document.getElementById("statusMessage").textContent = "Message received!";
            document.getElementById("statusMessage").style.color = "#28a745";
            this.reset();
        } else {
            document.getElementById("statusMessage").textContent = "Please fill out all fields!";
            document.getElementById("statusMessage").style.color = "red";
        }
    });
    
    // Load stored messages on page load
    window.onload = function() {
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.forEach(msg => {
            let messageItem = document.createElement("div");
            messageItem.classList.add("message-item");
            messageItem.innerHTML = `
                <h4>${msg.name} (${msg.email})</h4>
                <p>${msg.message}</p>
                <span class="delete-btn" onclick="deleteMessage(this)">🗑️</span>
            `;
            document.getElementById("inboxMessages").appendChild(messageItem);
        });
    };
    
    // Function to delete a message
    function deleteMessage(element) {
        element.parentElement.remove();
        let name = element.parentElement.querySelector("h4").textContent.split(" (")[0];
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages = messages.filter(msg => msg.name !== name);
        localStorage.setItem("messages", JSON.stringify(messages));
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        const text = "Hello, I'm Shailesh Singh...!";
        const typingEffect = document.querySelector(".typing-effect");
        let index = 0;
    
        function type() {
            if (index < text.length) {
                typingEffect.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 50); // Typing speed
            } else {
                setTimeout(erase, 1000); // Wait before erasing
            }
        }
    
        function erase() {
            if (index > 0) {
                typingEffect.innerHTML = text.substring(0, index - 1);
                index--;
                setTimeout(erase, 50); // Erasing speed
            } else {
                setTimeout(type, 1500); // Restart typing
            }
        }
    
        type();
    });
    
    

