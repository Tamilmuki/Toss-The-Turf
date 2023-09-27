function generateQRCode(teamId) {
    const teamScore = document.getElementById(`${teamId}Score`).innerText;
    const teamWickets = document.getElementById(`${teamId}Wickets`).innerText;
    const url = `https://your-api-endpoint/${teamId}?score=${teamScore}&wickets=${teamWickets}`;

    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    return qr.createImgTag();
}

function updateScore(teamId) {
    const newScore = prompt(`Enter the new score for Team ${teamId}:`);
    if (newScore === null || isNaN(newScore)) {
        alert('Please enter a valid numeric score.');
        return;
    }

    const newWickets = prompt(`Enter the new wickets for Team ${teamId}:`);
    if (newWickets === null || isNaN(newWickets)) {
        alert('Please enter a valid numeric wicket count.');
        return;
    }

    document.getElementById(`${teamId}Score`).innerText = `${newScore} runs`;
    document.getElementById(`${teamId}Wickets`).innerText = `${newWickets} wickets`;

    if (newScore % 6 === 0) {
        playUmpireAnimation('umpireAnimationSix');
    } else if ((newScore + 1) % 6 === 0) {
        playUmpireAnimation('umpireAnimationFour');
    } else if (newWickets === '10') {
        playUmpireAnimation('umpireAnimationOut');
    }

    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = generateQRCode(teamId);
}

function playUmpireAnimation(animationClass) {
    const umpireAnimationDiv = document.getElementById('umpireAnimation');
    umpireAnimationDiv.className = animationClass;

    umpireAnimationDiv.addEventListener('animationend', () => {
        umpireAnimationDiv.className = '';
    });
}