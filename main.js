// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.querySelectorAll(".like-glyph");
  
  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      if (heart.classList.contains("activated-heart")) {
        // If heart is already full, make it empty
        heart.classList.remove("activated-heart");
        heart.innerText = EMPTY_HEART;
      } else {
        // If heart is empty, make it full
        mimicServerCall()
          .then(() => {
            heart.classList.add("activated-heart");
            heart.innerText = FULL_HEART;
          })
          .catch(error => {
            // Show error message if server request fails
            console.error(error);
            const modal = document.getElementById("modal");
            modal.classList.remove("hidden");
            const modalMessage = document.getElementById("modal-message");
            modalMessage.innerText = error;
            setTimeout(() => {
              modal.classList.add("hidden");
            }, 3000);
          });
      }
    });
  });
});

// Modal hidden by default
const modal = document.createElement("div");
modal.id = "modal";
modal.classList.add("hidden");

const modalMessage = document.createElement("div");
modalMessage.id = "modal-message";
modal.appendChild(modalMessage);

document.body.appendChild(modal);

// Don't change the code below: this function mocks the server response
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
