//addeventlistener to each like button
document.querySelectorAll(".patchButton").forEach((button) => {
  button.addEventListener("click", addLikes);
});
//find the id and add the new likes to send to the api, to add it to the database
async function addLikes(e) {
  const btn = e.target;
  const id = btn.id;
  const newLikes = parseInt(btn.value) + 1;
  //the body that will be send
  const data = {
    likes: newLikes,
  };
  //set which id gets updated
  await fetch(`http://localhost:3003/api/v1/blogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
