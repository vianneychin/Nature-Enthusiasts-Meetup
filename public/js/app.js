// #TeamVanillaJS

/// Event listener for the "Yes" button on the even show page \\\

// yesBtn will hold the yes button on the events show page
const yesBtn = document.querySelector(".yes-btn");

yesBtn.addEventListener("click", () => {
  console.log("yes btn has been clicked");
});

// Making Yes button disappear on click so that users can only join once.
yesBtn.addEventListener("click", () => {
  yesBtn.style.display = "none";
});

/// Event listen for the Cancel Participation button on the event show page \\\

// cancelBtn will hold the cancel button on the events show page
const cancelBtn = document.querySelector(".cancel-btn");

cancelBtn.addEventListener("click", () => {
  console.log("Cancel button has been clicked");
});

// Making the yes button re-appear and the cancel button disappear if user cancels out of event.
// This will give them the option to join again if they want to in the future.

cancelBtn.addEventListener("click", () => {
  cancelBtn.style.display = "none";
  yesBtn.style.display = "";
