async function loadCurrencies() {
    try {
        const response = await fetch('https://api.frankfurter.app/currencies');
        const data = await response.json();

        const fromCurrencySelect = document.getElementById('fromCurrency');
        const toCurrencySelect = document.getElementById('toCurrency');

        // Ajouter l'option "all"
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.text = 'Toutes les devises';
        fromCurrencySelect.add(allOption.cloneNode(true));
        toCurrencySelect.add(allOption);

        for (const currency in data) {
            const option = document.createElement('option');
            option.value = currency;
            option.text = `${currency} - ${data[currency]}`;
            fromCurrencySelect.add(option.cloneNode(true));
            toCurrencySelect.add(option);
        }
    } catch (error) {
        console.error(`Erreur lors du chargement des devises : ${error.message}`);
    }
}

// Fonction pour convertir le montant
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('result');

    // Vérifier si la devise source et la devise cible sont identiques
    if (fromCurrency === toCurrency) {
        resultElement.innerText = 'La devise source et la devise cible sont identiques.';
        return;
    }

    // Vérifier si le champ "Montant à convertir" est vide
    if (!amount) {
        resultElement.innerText = 'Veuillez entrer un montant à convertir.';
        return;
    }

    // Vérifier si le montant est négatif
    if (parseFloat(amount) <= 0) {
        resultElement.innerText = 'Veuillez entrer un montant positif.';
        return;
    }

    try {
        if (toCurrency === 'all') {
            const currencies = document.getElementById('toCurrency').options;
            const results = [];
        
            // Créer un tableau de promesses pour toutes les requêtes
            const conversionPromises = [];
        
            for (let i = 0; i < currencies.length; i++) {
                const targetCurrency = currencies[i].value;
        
                if (targetCurrency !== 'all' && targetCurrency !== fromCurrency) {
                    const conversionPromise = fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${targetCurrency}`)
                        .then(response => response.json())
                        .then(data => {
                            if (!data.error) {
                                const conversionResult = `${amount} ${fromCurrency} = ${data.rates[targetCurrency].toFixed(2)} ${targetCurrency}`;
                                results.push(conversionResult);
                            }
                        })
                        .catch(error => console.error(`Erreur lors de la conversion vers ${targetCurrency}: ${error.message}`));
        
                    conversionPromises.push(conversionPromise);
                }
            }
        
            // Attendre que toutes les promesses soient résolues
            await Promise.all(conversionPromises);
        
            // Afficher les résultats dans un tableau
            resultElement.innerHTML = `<table>${results.map(result => `<tr><td>${result}</td></tr>`).join('')}</table>`;
        } else {
            // Convertir vers une devise spécifique
            const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const result = `${amount} ${fromCurrency} = ${data.rates[toCurrency].toFixed(2)} ${toCurrency}`;
            resultElement.innerText = result;
        }

    } catch (error) {
        resultElement.innerText = `Erreur : ${error.message}`;
    }
}

// Charger les devises au chargement de la page
window.onload = function () {
    loadCurrencies();
    // Vous pouvez également appeler convertCurrency() ici si vous souhaitez effectuer une conversion initiale.
};