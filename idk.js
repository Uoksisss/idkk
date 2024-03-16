function renderstuff(url) {
    const questionCounter = document.querySelector('[data-functional-selector="question-index-counter"]');
    if (questionCounter) {
        const questionIdFromDom = parseInt(questionCounter.textContent);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200 && data.data) {
                    data.data.forEach((question, index) => {
                        const questionIdFromApi = index + 1;
                        if (questionIdFromApi === questionIdFromDom) {
                            var outputDiv = document.querySelector('.rendered-question-answers');
                            if (!outputDiv) {
                                outputDiv = document.createElement('div');
                                outputDiv.className = 'rendered-question-answers';
                                outputDiv.style.position = 'fixed';
                                outputDiv.style.top = '10px';
                                outputDiv.style.left = '50%';
                                outputDiv.style.transform = 'translateX(-50%)';
                                outputDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                                outputDiv.style.padding = '20px';
                                outputDiv.style.borderRadius = '10px';
                                outputDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
                                outputDiv.style.width = '80%';
                                outputDiv.style.maxWidth = '400px';
                                outputDiv.style.zIndex = '9999';
                                document.body.appendChild(outputDiv);
                            }
                            var questionText = document.createElement('p');
                            questionText.textContent = `${questionIdFromApi}. ${question.question.text}`;
                            outputDiv.innerHTML = '';
                            outputDiv.appendChild(questionText);
                            question.answers.forEach((answer, answerIndex) => {
                                var answerText = document.createElement('p');
                                answerText.textContent = `${String.fromCharCode(97 + answerIndex)}. ${answer.text}`;
                                outputDiv.appendChild(answerText);
                            });
                        }
                    });
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

const urlSuffix = prompt("Enter the ID:");
if (urlSuffix) {
    const url = `https://api.quizit.online/kahoot/answers/${urlSuffix}`;
    renderstuff(url);
    setInterval(() => {
        renderstuff(url);
    }, 3000);
}
