const questions = [
    {
        title: "What does HTML stand for?",
        correctAnswer: 2,
        choices: [
            {
                title: 'Hyperlinks and Text Markup Language'
            },
            {
                title: 'Home Tool Markup Language'
            },
            {
                title: 'Hyper Text Markup Language'
            }
        ]
    },
    {
        title: "Who is making the Web standards?",
        correctAnswer: 1,
        choices: [
            {
                title: 'Mozilla'
            },
            {
                title: 'The World Wide Web Consortium'
            },
            {
                title: 'Google'
            },
            {
                title: 'Microsoft'
            }
        ]
    },
    {
        title: "Inline elements are normally displayed without starting a new line.",
        correctAnswer: 0,
        choices: [
            {
                title: `True`
            },
            {
                title: 'False'
            },
        ]
    },
    {
        title: "Block elements are normally displayed without starting a new line.",
        correctAnswer: 1,
        choices: [
            {
                title: `True`
            },
            {
                title: 'False'
            },
        ]
    },
    {
        title: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        correctAnswer: 1,
        choices: [
            {
                title: 'title'
            },
            {
                title: 'src'
            },
            {
                title: 'longdesc'
            },
            {
                title: 'alt'
            } 
        ]
    }
]

const prevFnc = (e) => {
    progress(e); 
}

const nextFnc = (e) => {
    const correctAnswer = questions[e].correctAnswer; // get the correct answer. 
    const nextPage = e + 1; 
    // console.log('correctAnswer', correctAnswer) 

    if(document.querySelector('input[class="choice-radio"]:checked') !== null) {
        console.log('not null')
        const userAnswer = document.querySelector('input[class="choice-radio"]:checked').value; // get chekced input..
        if(userAnswer != correctAnswer) {
            progress(0); // back to first question if the answer is incorrect. 
            alert(`Your answer is incorrect. ${e !== 0 ? 'You will restarted to the first question.' : 'Please try again.'}`)
        }else {
            // console.log('correct'); 
            progress(nextPage)
        }
    }else { 
        alert('Please choose an answer.'); 
    }
    
}

const progress = (e) => {
    // console.log('clicked!', e)
    // console.log(questions.length - 1);

    const previousPage = e - 1; 
    const nextPage = e + 1; 
    const lastPage = questions.length - 1; 

    if(e !== questions.length) {
        const choices = questions[e].choices.map((item, index) => {
            return `<div class="choice-item">
                
                <input id="q-${index}" class="choice-radio" type="radio" name="q-${e}" value="${index}"/>
                <label for="q-${index}"> 
                ${item.title}
                </label> 
            </div>`
        });
    
        document.querySelector('.quiz-items').innerHTML = `
            <div id="qid-${e}" class="q-item">
                <h2>${questions[e].title}</h2>
                <div class="choices">${choices.join('')}</div>

                <div class="actions">
                    ${e != 0 ? 
                        `<button class="action-prev" onclick="prevFnc(${previousPage})">Prev</button>` 
                    : ''}
                    <button class="action-next" onclick="nextFnc(${e})">Next</button>
                </div>
            </div>`; 

            // ${e != lastPage ? 
            //     `<button class="action-next" onclick="nextFnc(${e})">Next</button>`
            // : ''}
    }else { 
        // Take to sucess message after the last questions has been correctly answered.
        document.querySelector('.quiz-items').innerHTML = `
            <div class="success-msg">
                <h2>You've successfully taken the test.</h2>
            </div>`; 
    }
} 

document.querySelector('.btn-start').addEventListener('click', (() => {
    console.log('hello')
    document.querySelector('.quiz-start').remove(); 
    progress(0); 
})); 


