let currentStep = 1
let isInstalled = false
let trialCredentials = null

const stepContent = {
  1: `
        <h2>Install the WordPress Plugin</h2>
        <p>Download and install the AI Blog Agent plugin on your WordPress site</p>
        <button id="downloadButton">Download Plugin</button>
        <div>
            <h3>Installation Instructions:</h3>
            <ol>
                <li>Go to your WordPress Admin Dashboard</li>
                <li>Click Plugins > Add New > Upload Plugin</li>
                <li>Select the downloaded file and click Install Now</li>
                <li>Activate the plugin</li>
            </ol>
        </div>
        <div class="button-container">
            <button id="helpButton">Need help?</button>
            <button id="continueButton" disabled>Continue</button>
        </div>
    `,
  2: `
        <h2>Connect Your Site</h2>
        <p>Configure your AI Blog Agent settings</p>
        <p class="input-help">
        <i class="fa-solid fa-circle-info"></i> 
        Generate this in WordPress under Users > Profile > Application Passwords
        </p>
        <div>
            <h3>Quick Setup Guide:</h3>
            <ol>
                <li>Enter your WordPress site URL</li>
                <li>Add your admin username for authentication</li>
                <li>Generate and add an application password for secure access</li>
                <li>Test the connection to ensure everything works</li>
            </ol>
        </div>
        <div class="button-container">
            <button id="backButton">Back</button>
            <button id="continueButton">Continue</button>
        </div>
    `,
  3: `
        <h2>Set Your Preferences</h2>
        <p>Customize your content generation settings</p>
        <div>
            <h3>Content Configuration Steps:</h3>
            <ol>
                <li>Define your desired content type and style</li>
                <li>Set your preferred post length and frequency</li>
                <li>Configure SEO parameters and keywords</li>
                <li>Click "Fetch Data" to test your settings</li>
            </ol>
        </div>
        <div class="button-container">
            <button id="backButton">Back</button>
            <button id="continueButton">Continue</button>
        </div>
    `,
  4: `
        <h2>
        <i class="fa-solid fa-gift"></i>
        Your Free Trial Has Started!
        </h2>
        <div class="trial-banner">
        <p>Begin generating AI-powered blog content</p>  
        <button id="startTrialButton">Generate your Chat flow ID</button>
        <div id="trialCredentials" style="display: none;">
            <div class="input-group">
                <label for="chatFlowId">Chat Flow ID</label>
                <input id="chatFlowId" readonly>
                <button class="copy-button" data-target="chatFlowId">Copy</button>
            </div>
            <div class="input-group">
                <label for="apiKey">API Key</label>
                <input id="apiKey" readonly>
                <button class="copy-button" data-target="apiKey">Copy</button>
            </div>
            <div class="input-group">
                <label for="trialEndDate">Trial End Date</label>
                <input id="trialEndDate" readonly>
            </div>
            <p>
                  <i class="fa-solid fa-clock"></i> 
                  Current time: <span id="currentTime">Loading...</span>
                </p>
            <div>
                <h3>Next Steps:</h3>
                <ol>
                    <li>Copy your Chat Flow ID and API Key</li>
                    <li>Open the AI Blog Agent plugin in your WordPress dashboard</li>
                    <li>Paste your credentials in the plugin settings</li>
                    <li>Configure your content preferences</li>
                    <li>Start generating AI-powered blog posts!</li>
                </ol>
            </div>
           <div class="trial-info">
            <h3>Your Trial Details</h3>
            <p>Your 7-day free trial has started. You can generate up to 10 blog posts during this period.</p>
           <div class="plan-after-trial">
                <h4>After Your Trial</h4>
                <p>When your trial ends, you'll be automatically subscribed to the <span id="selectedPlanName">Professional</span> plan at <span id="selectedPlanPrice">$32/month</span>.</p>
                <p>You can cancel anytime before your trial ends to avoid being charged.</p>
            </div>
        </div>
        </div>
        <div class="button-container">
            <button id="backButton">
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <a href="../index.html" class="btn-outline">
              <i class="fa-solid fa-home"></i> Return to Homepage
            </a>
        </div>
    `,
}

function updateStepContent() {
  document.getElementById("stepContent").innerHTML = stepContent[currentStep]
  updateStepIndicators()
  attachEventListeners()
  updateDynamicContent()
}

function updateStepIndicators() {
  for (let i = 1; i <= 4; i++) {
    const stepElement = document.getElementById(`step${i}`)
    stepElement.classList.remove("active", "completed")
    if (i === currentStep) {
      stepElement.classList.add("active")
    } else if (i < currentStep) {
      stepElement.classList.add("completed")
    }
  }
}

function attachEventListeners() {
  const downloadButton = document.getElementById("downloadButton")
  if (downloadButton) {
    downloadButton.addEventListener("click", handleDownload)
  }

  const continueButton = document.getElementById("continueButton")
  if (continueButton) {
    continueButton.addEventListener("click", () => {
      currentStep++
      updateStepContent()
    })
  }

  const backButton = document.getElementById("backButton")
  if (backButton) {
    backButton.addEventListener("click", () => {
      currentStep--
      updateStepContent()
    })
  }

  const startTrialButton = document.getElementById("startTrialButton")
  if (startTrialButton) {
    startTrialButton.addEventListener("click", handleStartTrial)
  }

  const helpButton = document.getElementById("helpButton")
  if (helpButton) {
    helpButton.addEventListener("click", () => {
      alert("Our support team is available 24/7. Please email info@criticalfuture.co.uk or call us at 1-800-BLOG-AI")
    })
  }

  const copyButtons = document.querySelectorAll(".copy-button")
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target")
      const targetElement = document.getElementById(targetId)
      copyToClipboard(targetElement.value)
    })
  })
}

function updateDynamicContent() {
  // Update current time
  const currentTimeElement = document.getElementById("currentTime")
  if (currentTimeElement) {
    updateCurrentTime()
    setInterval(updateCurrentTime, 1000)
  }

  // Update trial end date
  const trialEndDateElement = document.getElementById("trialEndDate")
  if (trialEndDateElement) {
    // Get trial end date from localStorage or calculate it
    let trialEndDate = localStorage.getItem("trialEndDate")
    if (!trialEndDate) {
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 7) // 7-day trial
      trialEndDate = endDate.toISOString()
      localStorage.setItem("trialEndDate", trialEndDate)
    }

    trialEndDateElement.textContent = new Date(trialEndDate).toLocaleDateString()
  }

  // Update selected plan details
  const selectedPlanNameElement = document.getElementById("selectedPlanName")
  const selectedPlanPriceElement = document.getElementById("selectedPlanPrice")

  if (selectedPlanNameElement && selectedPlanPriceElement) {
    const planType = localStorage.getItem("selectedPlanType") || "professional"
    const billingCycle = localStorage.getItem("billingCycle") || "monthly"

    const planDetails = {
      starter: {
        name: "Starter",
        monthlyPrice: 16,
        annualPrice: 12,
      },
      professional: {
        name: "Professional",
        monthlyPrice: 32,
        annualPrice: 30,
      },
      enterprise: {
        name: "Enterprise",
        monthlyPrice: 48,
        annualPrice: 40,
      },
    }

    const plan = planDetails[planType] || planDetails.professional
    const isAnnual = billingCycle === "annual"
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice

    selectedPlanNameElement.textContent = plan.name
    selectedPlanPriceElement.textContent = `$${price}/${isAnnual ? "year" : "month"}`
  }

  // Initialize testimonial slider
  initTestimonialSlider()
}

function updateCurrentTime() {
  const currentTimeElement = document.getElementById("currentTime")
  if (currentTimeElement) {
    const now = new Date()
    currentTimeElement.textContent = now.toLocaleTimeString()
  }
}

function handleDownload() {
  const pluginUrl = "./plugins/ai-auto-blog.zip"
  const filename = "ai-auto-blog.zip"

  // Create a temporary anchor element
  const downloadLink = document.createElement("a")
  downloadLink.href = pluginUrl
  downloadLink.download = filename

  // Append the anchor to the body (required for Firefox)
  document.body.appendChild(downloadLink)

  // Trigger the download
  downloadLink.click()

  // Remove the anchor from the DOM
  document.body.removeChild(downloadLink)

  // Show success message
  const downloadButton = document.getElementById("downloadButton")
  downloadButton.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded'
  downloadButton.classList.add("success")

  // Enable the "Continue" button
  isInstalled = true
  document.getElementById("continueButton").disabled = false
}

function handleStartTrial() {
  // Simulating API call to start trial
  trialCredentials = {
    chatFlowId: "cf_" + Math.random().toString(36).substr(2, 9),
    apiKey: "ak_" + Math.random().toString(36).substr(2, 9),
    trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  }

  document.getElementById("startTrialButton").style.display = "none"
  document.getElementById("trialCredentials").style.display = "block"

  document.getElementById("chatFlowId").value = trialCredentials.chatFlowId
  document.getElementById("apiKey").value = trialCredentials.apiKey
  document.getElementById("trialEndDate").value = trialCredentials.trialEndDate
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Copied to clipboard")
    })
    .catch((err) => {
      console.error("Failed to copy: ", err)
    })
}

function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial")
  const dots = document.querySelectorAll(".dot")
  let currentTestimonial = 0

  // Set first testimonial as active
  if (testimonials.length > 0) {
    testimonials[0].classList.add("active")
  }

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
    })
  })

  // Auto rotate testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    showTestimonial(currentTestimonial)
  }, 5000)

  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active")
    })

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show selected testimonial
    testimonials[index].classList.add("active")
    dots[index].classList.add("active")
    currentTestimonial = index
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is coming from checkout page with active trial
  const isTrialActive = localStorage.getItem("isTrialActive") === "true"

  if (isTrialActive) {
    // Skip to the last step if trial is active
    currentStep = 4
  }

  updateStepContent()
})
