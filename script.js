async function fetchLocale() {
    try {
        const response = await fetch('https://api.rezultatevot.ro/api/ballot?BallotId=114&Division=locality&CountyId=4481&LocalityId=4608');
        if (!response.ok) {
            throw new Error('Failed to fetch locale');
        }
        const data = await response.json();
        return data; // return the fetched data
    } catch (error) {
        console.error('Error fetching locale:', error);
        return null;
    }
}

function updateLocale() {
    fetchLocale().then(data => {
        if (!data) return;
        let totalVotes = data.results.totalVotes;
        let eligibleVoters = data.results.eligibleVoters;
        let percentage = (totalVotes / eligibleVoters * 100).toFixed(2);
        let localeValide = data.results.validVotes;
        let nullVotes = data.results.nullVotes;
        let countedVotes = data.results.countedVotes;
        document.getElementById('locale').textContent = totalVotes.toLocaleString();
        document.getElementById('locale_total').textContent = eligibleVoters.toLocaleString();
        document.getElementById('locale_percentage').textContent = percentage + '%';
        document.getElementById('locale_valide').textContent = localeValide.toLocaleString();
        document.getElementById('locale_null').textContent = nullVotes.toLocaleString();
        document.getElementById('locale_counted').textContent = countedVotes.toLocaleString();
        document.getElementById('locale_winner').textContent = getWinner(data.results.winners)
    });
}

function getWinner(winnerArray) {
    if(winnerArray.length === 0) return "?";
    let winner = winnerArray.sort((a, b) => b.votes - a.votes)[0];
    return winner.name;
}

let resetCountdown = 10;

function reset() {
    if(resetCountdown <= 0) resetCountdown = 10;
    resetCountdown--;

    document.getElementById('reset').textContent = resetCountdown;
}

function init() {
    updateLocale();
    setInterval(updateLocale, 10000);
    
    setInterval(reset, 1000);
}

window.addEventListener('DOMContentLoaded', init);