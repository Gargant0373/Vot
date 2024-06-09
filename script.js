async function fetchLocale() {
    try {
        const response = await fetch('https://api.rezultatevot.ro/api/ballot?BallotId=117&Division=county&CountyId=4481');
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
        document.getElementById('locale').textContent = totalVotes;
        document.getElementById('locale_total').textContent = eligibleVoters;
        document.getElementById('locale_percentage').textContent = (totalVotes / eligibleVoters * 100) + '%';
    });
}

function init() {
    updateLocale();
    setInterval(updateLocale, 10000);
}

window.addEventListener('DOMContentLoaded', init);