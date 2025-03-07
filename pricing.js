document.addEventListener("DOMContentLoaded", () => {
  // Toggle between monthly and annual pricing
  const billingToggle = document.getElementById("billing-toggle")
  const monthlyAmounts = document.querySelectorAll(".amount.monthly")
  const annualAmounts = document.querySelectorAll(".amount.annual")
  const checkoutLinks = document.querySelectorAll(".pricing-card-footer a")
  
  // Set initial state based on localStorage or default to monthly
  const savedBillingCycle = localStorage.getItem('billingCycle') || 'monthly'
  if (savedBillingCycle === 'annual') {
    billingToggle.checked = true
    togglePricing(true) // Show annual pricing
  }

  if (billingToggle) {
    billingToggle.addEventListener("change", () => {
      const isAnnual = billingToggle.checked
      togglePricing(isAnnual)
      
      // Update checkout links with billing cycle parameter
      updateCheckoutLinks(isAnnual)
      
      // Save preference to localStorage
      localStorage.setItem('billingCycle', isAnnual ? 'annual' : 'monthly')
    })
  }
  
  // Function to toggle pricing display
  function togglePricing(isAnnual) {
    if (isAnnual) {
      // Show annual pricing
      monthlyAmounts.forEach(amount => amount.style.display = "none")
      annualAmounts.forEach(amount => amount.style.display = "inline")
    } else {
      // Show monthly pricing
      monthlyAmounts.forEach(amount => amount.style.display = "inline")
      annualAmounts.forEach(amount => amount.style.display = "none")
    }
  }
  
  // Function to update checkout links with billing cycle parameter
  function updateCheckoutLinks(isAnnual) {
    checkoutLinks.forEach(link => {
      const href = link.getAttribute('href')
      // Extract the plan parameter
      let plan = 'professional' // Default
      
      if (href.includes('plan=')) {
        plan = href.split('plan=')[1].split('&')[0]
      } else {
        // If no plan parameter, determine from context
        const cardElement = link.closest('.pricing-card')
        if (cardElement) {
          const cardTitle = cardElement.querySelector('h3')
          if (cardTitle) {
            const title = cardTitle.textContent.toLowerCase()
            if (title.includes('starter')) plan = 'starter'
            else if (title.includes('enterprise')) plan = 'enterprise'
          }
        }
      }
      
      // Update the href with both parameters
      link.href = `checkout.html?plan=${plan}&billing=${isAnnual ? 'annual' : 'monthly'}`
    })
  }
  
  // Initialize checkout links with current billing cycle
  updateCheckoutLinks(savedBillingCycle === 'annual')

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-item")
  
  faqItems.forEach(item => {
    const question = item.querySelector("h4")
    const answer = item.querySelector("p")
    
    if (question && answer) {
      question.addEventListener("click", () => {
        // Close all other answers
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherAnswer = otherItem.querySelector("p")
            if (otherAnswer) {
              otherAnswer.style.maxHeight = null
              otherItem.classList.remove("active")
            }
          }
        })
        
        // Toggle current answer
        item.classList.toggle("active")
        if (item.classList.contains("active")) {
          answer.style.maxHeight = answer.scrollHeight + "px"
        } else {
          answer.style.maxHeight = null
        }
      })
    }
  })
})