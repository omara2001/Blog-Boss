document.addEventListener("DOMContentLoaded", () => {
    // Toggle between monthly and annual pricing
    const billingToggle = document.getElementById("billing-toggle")
    const monthlyAmounts = document.querySelectorAll(".amount.monthly")
    const annualAmounts = document.querySelectorAll(".amount.annual")
  
    if (billingToggle) {
      billingToggle.addEventListener("change", () => {
        if (billingToggle.checked) {
          // Show annual pricing
          monthlyAmounts.forEach(amount => amount.style.display = "none")
          annualAmounts.forEach(amount => amount.style.display = "inline")
        } else {
          // Show monthly pricing
          monthlyAmounts.forEach(amount => amount.style.display = "inline")
          annualAmounts.forEach(amount => amount.style.display = "none")
        }
      })
    }
  
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