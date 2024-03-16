function renderThing(url) {
    const questionCounter = document.querySelector('[data-functional-selector="question-index-counter"]');
    const spanElement = document.querySelector('span[data-functional-selector="nickname"].bottom-bar__NicknameSection-sc-nic2t-3');
    const name = spanElement ? spanElement.textContent.trim() : "Anonymous";

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
                                outputDiv.style.width = '80%';
                                outputDiv.style.maxWidth = '400px';
                                outputDiv.style.zIndex = '9999';
                                outputDiv.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.5)';
                                document.body.appendChild(outputDiv);

                                let initialPinchDistance = 0;
                                let initialWidth = outputDiv.offsetWidth;
                                let initialHeight = outputDiv.offsetHeight;

                                function pinchToZoom(e) {
                                    if (e.touches.length === 2) {
                                        const touch1 = e.touches[0];
                                        const touch2 = e.touches[1];
                                        const currentPinchDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
                                        if (initialPinchDistance === 0) {
                                            initialPinchDistance = currentPinchDistance;
                                        } else {
                                            const scaleFactor = currentPinchDistance / initialPinchDistance;
                                            const newWidth = initialWidth * scaleFactor;
                                            const newHeight = initialHeight * scaleFactor;
                                            outputDiv.style.width = newWidth + 'px';
                                            outputDiv.style.height = newHeight + 'px';
                                        }
                                    }
                                }

                                function resetPinch() {
                                    initialPinchDistance = 0;
                                    initialWidth = outputDiv.offsetWidth;
                                    initialHeight = outputDiv.offsetHeight;
                                }

                                outputDiv.addEventListener('touchmove', pinchToZoom);
                                outputDiv.addEventListener('touchend', resetPinch);
                            }
                            outputDiv.innerHTML = '';
                            var nameText = document.createElement('p');
                            nameText.textContent = `Name: ${name}`;
                            nameText.style.fontWeight = 'bold';
                            outputDiv.appendChild(nameText);
                            var questionText = document.createElement('p');
                            questionText.textContent = `${questionIdFromApi}. ${question.question.text}`;
                            questionText.style.borderRadius = '100';
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

const urlSuffix = prompt("Enter the last part of the URL:");
if (urlSuffix) {
    const url = `https://api.quizit.online/kahoot/answers/${urlSuffix}`;
    renderThing(url);
    setInterval(() => {
        renderThing(url);
    }, 1000);
}
