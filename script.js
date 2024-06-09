const url = "https://api.rezultatevot.ro/api/ballot?BallotId=114&Division=locality&CountyId=4481&LocalityId=4608";

async function fetchLocale() {
    try {
        const response = await fetch(url);
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
        console.log(data.results.candidates);
        document.getElementById('locale_winner').textContent = getWinner(data.results.candidates)
    });
}

function getWinner(winnerArray) {
    if(winnerArray.length === 0) return "Aflam curand...";
    let winner = winnerArray[0];
    document.getElementById('locale_winner').style.color = winner.partyColor;
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