const form = document.querySelector('form');
const result = document.querySelector('.result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
    try {
        result.innerHTML = "Fetching Data...";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        let definitions = data[0].meanings[0].definitions[0];

        result.innerHTML =
            `<h2><strong>Word:</strong>${data[0].word}</h2>
                <p class="partofSpeech">${data[0].meanings[0].partOfSpeech}</p>
                <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not found" : definitions.definition}</p>
                <p><strong>Example:</strong>${definitions.example === undefined ? "Not found" : definitions.example}</p>
                <p><strong>Antonyms:</strong></p>`;

        if (definitions.antonyms.length === 0) {
            result.innerHTML += `<span>Not found</span>`;
        }
        else {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                result.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
            }

        }

        result.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;

        // console.log(data);
    }
    catch (error) {
        result.innerHTML = `<p>Sorry,the word could not be found</p>`;
    }
}