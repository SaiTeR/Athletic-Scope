/*
 * Форма заявки на пилот.
 *
 * Проверяет поля и отправляет данные POST-запросом (FormData) на адрес
 * из атрибута data-endpoint у <form>. Подходит для Formspree, Web3Forms,
 * Google Apps Script и любого своего обработчика, который отвечает 2xx.
 *
 * Пока data-endpoint пустой, заявка никуда не уходит — посетитель видит
 * честное сообщение, что приём заявок ещё не открыт.
 */
(function () {
  "use strict";

  var form = document.getElementById("pilot-form");
  if (!form) return;

  var MESSAGES = {
    required: "Обязательное поле",
    tooShort: "Слишком короткое значение",
    success: "Спасибо! Заявка отправлена — мы свяжемся с вами.",
    notConnected: "Приём заявок скоро откроется. Спасибо за интерес к AthleteScope!",
    failed: "Не удалось отправить заявку. Попробуйте ещё раз чуть позже."
  };

  var button = form.querySelector('[type="submit"]');
  var status = form.querySelector(".form__status");

  function errorBox(input) {
    return document.getElementById(input.getAttribute("aria-describedby"));
  }

  function validate(input) {
    var value = input.value.trim();
    var message = "";
    if (input.required && !value) message = MESSAGES.required;
    else if (input.minLength > 0 && value && value.length < input.minLength) message = MESSAGES.tooShort;

    var box = errorBox(input);
    if (box) box.textContent = message;
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
    return !message;
  }

  function setStatus(text, isError) {
    status.textContent = text;
    status.classList.toggle("is-error", Boolean(isError));
  }

  var checked = Array.prototype.filter.call(form.elements, function (el) {
    return el.tagName === "INPUT" && el.hasAttribute("aria-describedby");
  });

  checked.forEach(function (input) {
    input.addEventListener("input", function () {
      if (input.hasAttribute("aria-invalid")) validate(input);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setStatus("");

    var firstInvalid = null;
    checked.forEach(function (input) {
      if (!validate(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var endpoint = form.dataset.endpoint;
    if (!endpoint) {
      setStatus(MESSAGES.notConnected);
      return;
    }

    button.disabled = true;
    fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        form.reset();
        setStatus(MESSAGES.success);
      })
      .catch(function () {
        setStatus(MESSAGES.failed, true);
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();
