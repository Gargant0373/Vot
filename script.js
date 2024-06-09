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

let percentage = 0;

function updateLocale() {
    fetchLocale().then(data => {
        if (!data) return;
        let totalVotes = data.results.totalVotes;
        let eligibleVoters = data.results.eligibleVoters;
        percentage = totalVotes / eligibleVoters * 100;
        document.getElementById('locale').textContent = totalVotes.toLocaleString();
        document.getElementById('locale_total').textContent = eligibleVoters.toLocaleString();
        document.getElementById('locale_percentage').textContent = percentage.toFixed() + '%';
        updateOverlay();
    });
}

function updateOverlay() {
    let overlayHeight = percentage * 0.01 * 464;
    document.getElementById('overlay').style.height = overlayHeight + 'px';
}

function init() {
    updateLocale();
    setInterval(updateLocale, 10000);
}

window.addEventListener('DOMContentLoaded', init);