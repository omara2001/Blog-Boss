document.addEventListener("DOMContentLoaded", () => {
    // Tab functionality for examples section
    const tabButtons = document.querySelectorAll(".tab-button")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove("active"))
        tabContents.forEach(content => content.classList.remove("active"))
  
        // Add active class to clicked button
        button.classList.add("active")
  
        // Show corresponding content
        const tabId = button.getAttribute("data-tab")
        document.getElementById(`${tabId}-content`).classList.add("active")
      })
    })
  
    // Restart typing animation when it comes into view
    const observeTypingAnimation = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const typingText = entry.target.querySelectorAll(".typing-text p")
            typingText.forEach((text, index) => {
              text.style.animation = "none"
              setTimeout(() => {
                text.style.animation = `typingText 0.5s forwards ${index}s`
              }, 10)
            })
          }
        })
      }, { threshold: 0.5 })
  
      const typingAnimation = document.querySelector(".typing-animation")
      if (typingAnimation) {
        observer.observe(typingAnimation)
      }
    }
  
    observeTypingAnimation()
  })