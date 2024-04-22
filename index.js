const resultsContainer = document.getElementById('results');
const formContainer = document.getElementById('formulario');
const threshold = 0.9;

const evalue = async (sentences) => {
    console.log('Evaluando frases...');
    resultsContainer.innerHTML = 'Evaluando frases...';
    await toxicity.load(threshold).then(model => {
        // const sentences = ['you suck', 'you motherfucker', 'fuck'];
        
        model.classify(sentences).then(predictions => {
            console.log(predictions);
            resultsContainer.innerHTML = JSON.stringify(predictions, null, 2);
        });
    });
    console.log('Finalizado!');
}

formContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    evalue([e.target[0].value])
});