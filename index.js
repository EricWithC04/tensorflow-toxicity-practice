// import fs from "./fs"
const resultsContainer = document.getElementById('results');
const formContainer = document.getElementById('formulario');
const threshold = 0.5;

let model;

// const data = JSON.parse(fs.readFileSync('bucket1.json', 'utf8'))

// const dataSentences = data.map(entry => entry.text);
// const dataLabels = data.map(entry => {
//     return entry.rating === 'rejected' ? 1 : 0;
// });

const trainModel = async () => {
    console.log('Cargando modelo...');
    document.getElementById("trainModel").innerHTML = "Cargando modelo...";
    model = await toxicity.load(threshold)

    // await model.fit(sentences, labels, {
    //     // batchSize: 32,
    //     epochs: 10
    // })

    console.log("Modelo cargado correctamente!");
    document.getElementById("trainModel").innerHTML = "Modelo cargado correctamente!";
}
const evalue = async (sentences) => {
    console.log('Evaluando frases...');
    resultsContainer.innerHTML = 'Evaluando frases...';
    
    await model.classify(sentences).then(predictions => {
        console.log(predictions);
        resultsContainer.innerHTML = ''
        predictions.forEach(prediction => {
            resultsContainer.innerHTML += `<strong>${prediction.label}:</strong> ${prediction.results[0].match}</br>`
        })
    });

    console.log('Finalizado!');
}

document.getElementById("btnTrainModel").addEventListener("click", () => trainModel());

formContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    evalue([e.target[0].value])
});