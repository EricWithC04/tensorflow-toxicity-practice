import fs from "./fs"
const resultsContainer = document.getElementById('results');
const formContainer = document.getElementById('formulario');
const threshold = 0.9;

let model;

const data = JSON.parse(fs.readFileSync('bucket1.json', 'utf8'))

const dataSentences = data.map(entry => entry.text);
const dataLabels = data.map(entry => {
    return entry.rating === 'rejected' ? 1 : 0;
});

const trainModel = async (sentences, labels) => {
    model = await toxicity.load(threshold)

    console.log('Entrenando modelo...');
    document.getElementById("trainModel").innerHTML = "Entrenando modelo...";

    await model.fit(sentences, labels, {
        // batchSize: 32,
        epochs: 10
    })

    console.log("Entrenamiento finalizado!");
    document.getElementById("trainModel").innerHTML = "Entrenamiento finalizado!";
}
const evalue = async (sentences) => {
    console.log('Evaluando frases...');
    resultsContainer.innerHTML = 'Evaluando frases...';
    
    model.classify(sentences).then(predictions => {
        console.log(predictions);
        resultsContainer.innerHTML = JSON.stringify(predictions, null, 2);
    });

    console.log('Finalizado!');
}

document.getElementById("btnTrainModel").addEventListener("click", () => trainModel(dataSentences, dataLabels));

formContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    evalue([e.target[0].value])
});