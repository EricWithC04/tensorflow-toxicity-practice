const threshold = 0.9;

const evalue = async () => {
    console.log('Evaluando frases...');
    await toxicity.load(threshold).then(model => {
        const sentences = ['you suck', 'motherfucker'];
        
        model.classify(sentences).then(predictions => {
            console.log(predictions);
        });
    });
    console.log('Finalizado!');
}

evalue()