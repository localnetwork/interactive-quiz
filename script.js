const questions = [
  {
    title: "What does HTML stand for?",
    correctAnswer: 2,
    type: "choice",
    choices: [
      {
        title: "Hyperlinks and Text Markup Language",
      },
      {
        title: "Home Tool Markup Language",
      },
      {
        title: "Hyper Text Markup Language",
      },
    ],
  },

  {
    title: "Who is making the Web standards?",
    correctAnswer: 1,
    type: "choice",
    choices: [
      {
        title: "Mozilla",
      },
      {
        title: "The World Wide Web Consortium",
      },
      {
        title: "Google",
      },
      {
        title: "Microsoft",
      },
    ],
  },
  {
    title: "What is the first capital of the Philippines?",
    correctAnswer: "Cebu",
    type: "write",
  },
  {
    title:
      "Inline elements are normally displayed without starting a new line.",
    correctAnswer: 0,
    type: "choice",
    choices: [
      {
        title: `True`,
      },
      {
        title: "False",
      },
    ],
  },
  {
    title: "Block elements are normally displayed without starting a new line.",
    correctAnswer: 1,
    type: "choice",
    choices: [
      {
        title: `True`,
      },
      {
        title: "False",
      },
    ],
  },
];

const retake = (e) => {
  progress(0);
};

const prevFnc = (e) => {
  progress(e);
};

const nextFnc = (e) => {
  const qtype = questions[e].type;
  let correctAnswer = questions[e].correctAnswer; // get the correct answer.
  const nextPage = e + 1;

  switch (qtype) {
    case "choice":
      if (
        document.querySelector('input[class="choice-radio"]:checked') !== null
      ) {
        const userAnswer = document.querySelector(
          'input[class="choice-radio"]:checked'
        ).value; // get chekced input..
        if (userAnswer != correctAnswer) {
          progress(0); // back to first question if the answer is incorrect.
          Swal.fire({
            title: "Error!",
            text: `Your answer is incorrect. ${
              e !== 0
                ? "You will restarted to the first question."
                : "Please try again."
            }`,
            icon: "error",
          });
        } else {
          progress(nextPage);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Your answer is correct!",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Please choose an answer.",
          icon: "error",
        });
      }
    case "write":
      if (document.querySelector(".answer-input")) {
        correctAnswer =
          typeof correctAnswer === "string" ? correctAnswer.toLowerCase() : "";

        let userAnswer = document.querySelector(".answer-input").value;
        userAnswer = userAnswer.toLowerCase();
        if (userAnswer.includes(correctAnswer)) {
          progress(nextPage);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Your answer is correct!",
          });
        } else if (userAnswer == "") {
          console.log("Please enter your answer");
          Swal.fire({
            title: "Error!",
            text: "Please provide your answer.",
            icon: "error",
          });
        } else {
          progress(0);
          Swal.fire({
            title: "Error!",
            text: `Your answer is incorrect. ${
              e !== 0
                ? "You will restarted to the first question."
                : "Please try again."
            }`,
            icon: "error",
          });
        }
      }

    default:
      break;
  }
};

const progress = (e) => {
  // console.log('clicked!', e)
  // console.log(questions.length - 1);

  const previousPage = e - 1;
  const nextPage = e + 1;
  const lastPage = questions.length - 1;

  if (e !== questions.length) {
    const question = questions[e];
    const qtype = question.type;

    switch (qtype) {
      case "choice":
        const choices = questions[e].choices.map((item, index) => {
          return `
            <div class="choice-item">
                <input id="q-${index}" class="choice-radio" type="radio" name="q-${e}" value="${index}"/>
                <label for="q-${index}">
                ${item.title}
                </label>
            </div>`;
        });

        document.querySelector(".quiz-items").innerHTML = `
            <div id="qid-${e}" class="q-item">
                <h2>${questions[e].title}</h2>
                <div class="choices">${choices.join("")}</div>
        
                <div class="actions">
                    ${
                      e != 0
                        ? `<button class="action-prev" onclick="prevFnc(${previousPage})">Prev</button>`
                        : ""
                    }
                    <button class="action-next" onclick="nextFnc(${e})">Next</button>
                </div>
            </div>`;
        break;
      case "write":
        document.querySelector(".quiz-items").innerHTML = `
            <div id="qid-${e}" class="q-item">
                <h2>${questions[e].title}</h2>
                <input type="text" class="answer-input" placeholder="Enter your answer" value="" />
                <div class="actions">
                    ${
                      e != 0
                        ? `<button class="action-prev" onclick="prevFnc(${previousPage})">Prev</button>`
                        : ""
                    }
                    <button class="action-next" onclick="nextFnc(${e})">Next</button>
                </div>
            </div>`;
        break;
      default:
    }
  } else {
    // Take to sucess message after the last questions has been correctly answered.
    document.querySelector(".quiz-items").innerHTML = `
            <div class="success-msg">
                <h2>You've successfully taken the test.</h2>

                <div class="">
                    Do you want to retake? <button class="btn-submit" onclick="retake()">Click here</button>
                </div>
            </div>`;
  }
};

document.querySelector(".btn-start").addEventListener("click", () => {
  console.log("hello");
  document.querySelector(".quiz-start").remove();
  progress(0);
});
