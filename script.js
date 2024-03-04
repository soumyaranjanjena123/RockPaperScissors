 // Check if scores are in local storage
 let humanScore = localStorage.getItem('humanScore') || 0;
 let computerScore = localStorage.getItem('computerScore') || 0;

 // Update scores on the screen
 document.getElementById('human-score').textContent = humanScore;
 document.getElementById('computer-score').textContent = computerScore;

 // Function to play the game
 function play(playerChoice) {
     const choices = ['rock', 'paper', 'scissors'];
     const computerChoice = choices[Math.floor(Math.random() * 3)];

     document.getElementById('result').innerHTML = '';

     // Determine winner
     if (playerChoice === computerChoice) {
         document.getElementById('result').textContent = "It's a tie!";
     } else if (
         (playerChoice === 'rock' && computerChoice === 'scissors') ||
         (playerChoice === 'paper' && computerChoice === 'rock') ||
         (playerChoice === 'scissors' && computerChoice === 'paper')
     ) {
         document.getElementById('result').textContent = 'You win!';
         humanScore++;
         localStorage.setItem('humanScore', humanScore);
         document.getElementById('human-score').textContent = humanScore;
         if (humanScore == 5) {
             document.getElementById('celebration').style.display = 'block';
         } else {
             document.getElementById('celebration').style.display = 'none';
         }
     } else {
         document.getElementById('result').textContent = 'Computer wins!';
         computerScore++;
         localStorage.setItem('computerScore', computerScore);
         document.getElementById('computer-score').textContent = computerScore;
     }
 }

 // Function to show rules popup
 function showRules() {
     document.getElementById('rules-popup').style.display = 'block';
 }

 // Function to close rules popup
 function closeRules() {
     document.getElementById('rules-popup').style.display = 'none';
 }