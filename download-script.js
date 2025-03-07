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
        <div>
            <h3>Quick Setup Guide:</h3>
            <ol>
                <li>Open your Flowise dashboard</li>
                <li>Locate your Chat Flow ID for the agent</li>
                <li>Select the content category for your blog posts</li>
                <li>Copy and paste your Chat Flow ID in the field below</li>
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
        <h2>Start Your Free Trial</h2>
        <p>Begin generating AI-powered blog content</p>
        <button id="startTrialButton">Start Free Trial Now</button>
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
        </div>
        <div class="button-container">
            <button id="backButton">Back</button>
        </div>
    `,
}

function updateStepContent() {
  document.getElementById("stepContent").innerHTML = stepContent[currentStep]
  updateStepIndicators()
  attachEventListeners()
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

  const copyButtons = document.querySelectorAll(".copy-button")
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target")
      const targetElement = document.getElementById(targetId)
      copyToClipboard(targetElement.value)
    })
  })
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

// Initialize the application
updateStepContent()
