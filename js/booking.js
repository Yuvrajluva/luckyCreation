(function () {
  "use strict";
  var form = document.querySelector("#booking-form");
  if (!form) return;

  var serviceSelect = form.querySelector("#service");
  SITE.services.forEach(function (service) {
    var option = document.createElement("option");
    option.value = service.slug;
    option.textContent = service.title;
    serviceSelect.appendChild(option);
  });
  var requestedService = new URLSearchParams(window.location.search).get("service");
  if (requestedService && SITE.services.some(function (service) { return service.slug === requestedService; })) {
    serviceSelect.value = requestedService;
  }

  var whatsapp = document.querySelector("[data-whatsapp]");
  var whatsappHref = "https://wa.me/" + String(SITE.whatsappNumber || "").replace(/\D/g, "");
  if (whatsapp && SITE.whatsappNumber) whatsapp.href = whatsappHref;

  var success = document.querySelector("#booking-success");
  var again = document.querySelector("#whatsapp-again");
  var lastWhatsAppUrl = "";

  function setError(field, message) {
    var error = document.querySelector('[data-error-for="' + field.name + '"]');
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  }

  function validateField(field) {
    var value = field.value.trim();
    var message = "";
    if (field.required && !value) message = "Please complete this field.";
    if (field.name === "mobile" && value && !/^\+?[\d\s().-]{7,20}$/.test(value)) message = "Enter a valid mobile number.";
    if (field.name === "mobile" && value && value.replace(/\D/g, "").length < 7) message = "Enter at least 7 digits.";
    setError(field, message);
    return !message;
  }

  form.querySelectorAll("[required]").forEach(function (field) {
    field.addEventListener("blur", function () { validateField(field); });
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("change", function () {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  function openWhatsApp() {
    if (!lastWhatsAppUrl) return;
    window.open(lastWhatsAppUrl, "_blank", "noopener,noreferrer");
  }
  again.addEventListener("click", openWhatsApp);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    success.hidden = true;
    var honey = form.querySelector('[name="website"]');
    if (honey && honey.value) return;

    var fields = Array.from(form.querySelectorAll("[required]"));
    var valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var formData = new FormData(form);
    var selected = SITE.services.find(function (service) { return service.slug === formData.get("service"); });
    var message = [
      "Hello " + SITE.brandName + ", I'd like to book a slot.",
      "",
      "Name: " + formData.get("name"),
      "Service: " + (selected ? selected.title : formData.get("service")),
      "Preferred date & time: " + formData.get("date"),
      "Budget: " + formData.get("budget"),
      "Location: " + formData.get("location"),
      "Mobile: " + formData.get("mobile"),
      "",
      "Project details:",
      formData.get("description")
    ].join("\n");
    lastWhatsAppUrl = "https://wa.me/" + String(SITE.whatsappNumber || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(message);
    openWhatsApp();
    success.hidden = false;
    success.focus();
    form.reset();
    serviceSelect.value = requestedService && SITE.services.some(function (service) { return service.slug === requestedService; }) ? requestedService : "";
    form.querySelectorAll("[aria-invalid]").forEach(function (field) { field.setAttribute("aria-invalid", "false"); });
    form.querySelectorAll(".field-error").forEach(function (error) { error.textContent = ""; });
  });
}());
