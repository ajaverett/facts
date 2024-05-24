document.getElementById('factForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const factName = document.getElementById('factName').value.trim();
    const tags = document.getElementById('tags').value.trim().split(',');
    const reference = document.getElementById('reference').value.trim();
    const table = document.getElementById('table').value.trim().split('\n').map(row => row.split(','));
    
    // Create new fact object
    const newFact = {   
        fact_name: factName,
        tags: tags.map(tag => tag.trim()),
        reference: reference
    };
    
    if (document.getElementById('table').value.trim() !== '') {
        newFact.table = table;
    }

    // Fetch existing facts
    fetch('factbook.json')
        .then(response => response.json())
        .then(data => {
            data.facts.push(newFact);

            // Save updated facts back to factbook.json
            fetch('factbook.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    alert('Fact added successfully!');
                } else {
                    alert('Error adding fact');
                }
            })
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
});
