console.log("Main script running.");

const update = document.querySelector("#update");

update.addEventListener("click", function() {
  console.log("Update button clicked.");
  fetch("monsters", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ frequency: "Common" })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload(true);
    });
});
