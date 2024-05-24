document.addEventListener('DOMContentLoaded', () => {
    fetch('factbook.json')
        .then(response => response.json())
        .then(data => {
            window.factData = data.facts;
            const tags = Array.from(new Set(data.facts.flatMap(fact => fact.tags))).sort();
            const tagSelect = document.getElementById('tag-select');
            tags.forEach(tag => {
                const option = document.createElement('option');
                option.value = tag;
                option.text = tag;
                tagSelect.appendChild(option);
            });

            // Initialize Select2 on the select element
            $('#tag-select').select2({
                placeholder: 'Select tags',
                allowClear: true
            });
        });
});

function filterFacts() {
    const selectedTags = Array.from(document.getElementById('tag-select').selectedOptions).map(option => option.value);
    const filteredFacts = window.factData.filter(fact => selectedTags.every(tag => fact.tags.includes(tag)));

    const factList = document.getElementById('fact-list');
    factList.innerHTML = '';

    if (filteredFacts.length > 0) {
        filteredFacts.forEach(fact => {
            const factTile = document.createElement('div');
            factTile.className = 'fact-tile';
            factTile.innerHTML = `
                <div class="fact-title">${fact.fact_name}</div>
                <div class="fact-tags">Tags: ${fact.tags.join(', ')}</div>
                <div class="fact-reference">Reference: ${fact.reference}</div>
                <div class="fact-space"></div>
            `;
            
            if (fact.table && fact.table.length > 0) {
                const table = document.createElement('table');
                fact.table.forEach((row, rowIndex) => {
                    const tr = document.createElement('tr');
                    row.forEach(cell => {
                        const cellElement = rowIndex === 0 ? document.createElement('th') : document.createElement('td');
                        cellElement.textContent = cell;
                        tr.appendChild(cellElement);
                    });
                    table.appendChild(tr);
                });
                factTile.appendChild(table);
            }

            factList.appendChild(factTile);
        });
    } else {
        factList.innerHTML = '<p>No facts match the selected tags.</p>';
    }
}
