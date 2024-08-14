// Function to show the selected tab content
function showTabContent(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    const tabs = document.querySelectorAll('.tab');
    
    contents.forEach(content => {
        content.classList.remove('active');
    });
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const targetContent = document.getElementById(tabId);
    targetContent.classList.add('active');
    document.querySelector(`a[data-target="${tabId}"]`).classList.add('active');

    // Adjust height of tab contents
    adjustTabContentHeight();
}

// Function to adjust the height of tab contents
function adjustTabContentHeight() {
    const activeContent = document.querySelector('.tab-content.active');
    const tabContents = document.querySelectorAll('.tab-content');
    const maxHeight = Array.from(tabContents).reduce((max, content) => {
        if (content.classList.contains('active')) {
            return Math.max(max, content.scrollHeight);
        }
        return max;
    }, 0);

    tabContents.forEach(content => {
        content.style.height = `${maxHeight}px`;
    });
}

// Event listener for tab clicks
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target.getAttribute('data-target');
        showTabContent(target);
    });
});

// Initialize by showing the earthquake info tab
showTabContent('gempabumi-terbaru');

// Fetch gempabumi
async function fetchGempabumiTerbaru() {
    try {
        const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json'); // Replace with actual URL
        const data = await response.json();
        const gempa = data.Infogempa.gempa;
        
        const infoHtml = `
            <p><strong>Tanggal:</strong> ${gempa.Tanggal}</p>
            <p><strong>Jam:</strong> ${gempa.Jam}</p>
            <p><strong>Koordinat:</strong> ${gempa.Coordinates}</p>
            <p><strong>Lintang:</strong> ${gempa.Lintang}</p>
            <p><strong>Bujur:</strong> ${gempa.Bujur}</p>
            <p><strong>Magnitude:</strong> ${gempa.Magnitude}</p>
            <p><strong>Kedalaman:</strong> ${gempa.Kedalaman}</p>
            <p><strong>Wilayah:</strong> ${gempa.Wilayah}</p>
            <p><strong>Potensi:</strong> ${gempa.Potensi}</p>
            <p><strong>MMI:</strong> ${gempa.Dirasakan}</p>
            <p><strong>Shakemap:</strong></p>
            <img src="https://data.bmkg.go.id/DataMKG/TEWS/${gempa.Shakemap}" alt="Shakemap" class="shakemap">
        `;

        document.getElementById('gempabumi-terbaru').innerHTML = infoHtml;
    } catch (error) {
        console.error('Error fetching gempabumi terbaru', error);
    }
}

async function fetchGempabumi5Lebih() {
    try {
        const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json'); // Replace with actual URL
        const data = await response.json();
        const earthquakes = data.Infogempa.gempa;

        const rows = earthquakes.map(eq => `
            <tr>
                <td>${eq.Tanggal}</td>
                <td>${eq.Jam}</td>
                <td>${eq.Coordinates}</td>
                <td>${eq.Lintang}</td>
                <td>${eq.Bujur}</td>
                <td>${eq.Magnitude}</td>
                <td>${eq.Kedalaman}</td>
                <td>${eq.Wilayah}</td>
                <td>${eq.Potensi}</td>
            </tr>
        `).join('');

        document.querySelector('#tabel-gempabumi-5lebih tbody').innerHTML = rows;
    } catch (error) {
        console.error('Error fetching gempabumi M 5.0+', error);
    }
}

async function fetchGempabumiDirasakan() {
    try {
        const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json'); // Replace with actual URL
        const data = await response.json();
        const earthquakes = data.Infogempa.gempa;

        const rows = earthquakes.map(eq => `
            <tr>
                <td>${eq.Tanggal}</td>
                <td>${eq.Jam}</td>
                <td>${eq.Coordinates}</td>
                <td>${eq.Lintang}</td>
                <td>${eq.Bujur}</td>
                <td>${eq.Magnitude}</td>
                <td>${eq.Kedalaman}</td>
                <td>${eq.Wilayah}</td>
                <td>${eq.Dirasakan}</td>
            </tr>
        `).join('');

        document.querySelector('#tabel-gempabumi-dirasakan tbody').innerHTML = rows;
    } catch (error) {
        console.error('Error fetching gempabumi dirasakan', error);
    }
}

// Fetch and display data on page load
fetchGempabumiTerbaru();
fetchGempabumi5Lebih();
fetchGempabumiDirasakan();