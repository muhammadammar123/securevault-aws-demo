
const input = document.getElementById("searchInput");
const result = document.getElementById("result");

function sendRequest(value) {
  const url = new URL(window.location.href);
  url.searchParams.set("search", value);

  result.textContent = "Sending request...";

  fetch(url.toString(), { method: "GET" })
    .then(response => {
      result.textContent =
        `HTTP ${response.status} — ${response.ok ? "Request allowed" : "Request rejected"}`;
    })
    .catch(() => {
      result.textContent =
        "Request failed. Check the browser connection.";
    });
}

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  sendRequest(input.value);
});

document.querySelectorAll("[data-test]").forEach(button => {
  button.addEventListener("click", () => {
    const tests = {
      normal: "laptop",
      sqli: "' OR '1'='1",
      xss: "<script>alert(1)</script>"
    };

    input.value = tests[button.dataset.test];
    sendRequest(input.value);
  });
});
