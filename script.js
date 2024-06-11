const url = "https://api.rezultatevot.ro/api/ballot?BallotId=114&Division=locality&CountyId=4481&LocalityId=4608";

async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch locale');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching locale:', error);
        return null;
    }
}

function update(elementId, data) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = data;
}

let toUpdate = [
    { id: 'locale', data: 'totalVotes' },
    { id: 'locale_total', data: 'eligibleVoters' },
    { id: 'locale_percentage', data: 'percentage' },
    { id: 'locale_valide', data: 'validVotes' },
    { id: 'locale_null', data: 'nullVotes' },
    { id: 'locale_counted', data: 'countedVotes' },
    { id: 'locale_winner', data: 'candidates' }
]

function updateData() {
    fetchData().then(data => {
        if (!data) return;
        console.log(data);
        toUpdate.forEach(item => {
            update(item.id, data.results[item.data]);
        });

        let winner = getWinner(data.results.candidates);
        update('locale_winner', winner);
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
    if(resetCountdown <= 0) {
        updateData();
        resetCountdown = 10;
    }
    resetCountdown--;

    document.getElementById('reset').textContent = resetCountdown;
}

function init() {
    updateData();

    setInterval(reset, 1000);
}

window.addEventListener('DOMContentLoaded', init);