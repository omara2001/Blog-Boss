

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  const navButtons = document.querySelector(".nav-buttons")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show")
      navButtons.classList.toggle("show")
    })
  }

  // Smooth scroll for navigation links
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Add animation classes on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".feature-card, .step-card, .pricing-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.classList.add("animate-fadeIn")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)

  // Initialize animations
  animateOnScroll()
})