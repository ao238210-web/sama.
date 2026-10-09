document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. PERSONAL SETTINGS - EDIT THESE
  // ==========================================

  // PASSWORD: Change the password here.
  const PASSWORD = "1010";

  // RELATIONSHIP START DATE:
  // Format: YYYY-MM-DD
  // Replace with your real relationship date.
  const START_DATE = "2019-09-12";

  // SONG:
  // Put your song at assets/audio/our-song.mp3
  const SONG_PATH = "assets/audio/our-song.mp3";

  // ==========================================
  // 2. QUIZ QUESTIONS - EXACTLY 3 QUESTIONS
  // ==========================================
  // correct: 0 means first answer
  // correct: 1 means second answer
  // correct: 2 means third answer

  const questions = [
    {
      question: "Who is my favorite person in the whole world? ❤️",
      answers: ["Samasemo", "  Soso  💗", "Sama"],
      correct: 1,
    },
    {
      question: " قولتيلي بحبك الساعه كام ؟",
      answers: ["تلاته ونص", "اتنين", "اتنين ونص"],
      correct: 0,
    },
    {
      question: "اي اكتر اكله بحبها ؟",
      answers: ["مكرونه بشاميل", "فراخ مشويه", "شفايف سوسو 🫦"],
      correct: 2,
    },
  ];

  // ==========================================
  // 3. REASONS I LOVE YOU - EDIT THESE
  // ==========================================

  const reasons = [
    "Your beautiful smile makes my day better. ❤️",
    "You understand parts of me no one else sees. 💗",
    "I can be myself when I'm with you. 🥹",
    "Your voice can make a bad day feel better. 🎀",
    "You make even ordinary moments special. ✨",
    "I love the way we can laugh together. ",
    "You have a place in my heart no one can replace. 💞",
    "I love all our memories and the ones still to come. ",
    "You're the person I want to share my future with. ",
    "After all this time, I'd still choose you. Always. ❤️",
  ];

  // ==========================================
  // 4. GET HTML ELEMENTS
  // ==========================================

  const passwordScreen = document.getElementById("password-screen");
  const passwordForm = document.getElementById("password-form");
  const passwordInput = document.getElementById("password-input");
  const passwordError = document.getElementById("password-error");

  const quizScreen = document.getElementById("quiz-screen");
  const questionNumber = document.getElementById("question-number");
  const questionText = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers-container");
  const quizFeedback = document.getElementById("quiz-feedback");
  const nextButton = document.getElementById("next-button");
  const progressBar = document.getElementById("progress-bar");

  const surpriseContent = document.getElementById("surprise-content");

  const song = document.getElementById("our-song");
  const musicButton = document.getElementById("music-button");

  const reasonDisplay = document.getElementById("reason-display");
  const reasonCounter = document.getElementById("reason-counter");
  const reasonText = document.getElementById("reason-text");
  const reasonButton = document.getElementById("reason-button");
  const reasonEnding = document.getElementById("reason-ending");

  const heartsBackground = document.getElementById("hearts-background");

  // ==========================================
  // 5. SET SONG PATH
  // ==========================================

  song.src = SONG_PATH;
  song.volume = 0.7;

  // ==========================================
  // 6. PASSWORD + START MUSIC + OPEN QUIZ
  // ==========================================

  passwordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (passwordInput.value.trim() !== PASSWORD) {
      passwordError.textContent = "غلط يا حيوانه";
      passwordInput.value = "";
      passwordInput.focus();
      return;
    }

    passwordError.textContent = "";
    passwordScreen.classList.add("hidden");

    // The password submission is a user interaction,
    // so the browser is more likely to allow the song to play.
    try {
      await song.play();
    } catch (error) {
      console.warn(
        "Music could not start. Check the MP3 file path or use the music button.",
        error,
      );
    }

    musicButton.classList.remove("hidden");
    updateMusicButton();

    quizScreen.classList.remove("hidden");
    showQuestion();
  });

  // ==========================================
  // 7. QUIZ LOGIC
  // ==========================================

  let currentQuestion = 0;
  let answeredCorrectly = false;

  function showQuestion() {
    const item = questions[currentQuestion];

    answeredCorrectly = false;

    questionNumber.textContent = `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

    questionText.textContent = item.question;
    quizFeedback.textContent = "";
    answersContainer.innerHTML = "";

    nextButton.classList.add("hidden");

    nextButton.textContent =
      currentQuestion === questions.length - 1
        ? "Unlock My Surprise 💌"
        : "Next Question ❤️";

    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;

    item.answers.forEach((answer, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "answer-btn";
      button.textContent = answer;

      button.addEventListener("click", () => {
        // No more answers after the correct one.
        if (answeredCorrectly) return;

        if (index === item.correct) {
          answeredCorrectly = true;

          button.classList.add("correct");

          answersContainer
            .querySelectorAll("button")
            .forEach((answerButton) => {
              answerButton.disabled = true;
            });

          quizFeedback.textContent =
            currentQuestion === questions.length - 1
              ? "شطوره يا وزتي بموت فيكي ❤️🥹"
              : "جدعه يا بت 💗";

          progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

          nextButton.classList.remove("hidden");
          createHearts(12);
        } else {
          button.classList.add("wrong");
          button.disabled = true;

          quizFeedback.textContent =
            "غلط يا حيوانه";
        }
      });

      answersContainer.appendChild(button);
    });
  }

  nextButton.addEventListener("click", () => {
    // Block moving on unless the answer was correct.
    if (!answeredCorrectly) return;

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
      return;
    }

    // All three answers are correct. Reveal the whole website.
    quizScreen.classList.add("hidden");
    surpriseContent.classList.remove("hidden");

    updateRelationshipCounter();
    createHearts(25);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ==========================================
  // 8. RELATIONSHIP COUNTER
  // ==========================================

  function updateRelationshipCounter() {
    const start = new Date(`${START_DATE}T00:00:00`);
    const now = new Date();

    if (Number.isNaN(start.getTime()) || start > now) {
      document.getElementById("days").textContent = "—";
      document.getElementById("hours").textContent = "—";
      document.getElementById("minutes").textContent = "—";
      document.getElementById("seconds").textContent = "—";
      return;
    }

    const totalSeconds = Math.floor((now - start) / 1000);

    document.getElementById("days").textContent = Math.floor(
      totalSeconds / 86400,
    ).toLocaleString();

    document.getElementById("hours").textContent = String(
      Math.floor((totalSeconds % 86400) / 3600),
    ).padStart(2, "0");

    document.getElementById("minutes").textContent = String(
      Math.floor((totalSeconds % 3600) / 60),
    ).padStart(2, "0");

    document.getElementById("seconds").textContent = String(
      totalSeconds % 60,
    ).padStart(2, "0");
  }

  updateRelationshipCounter();
  setInterval(updateRelationshipCounter, 1000);

  // ==========================================
  // 9. MUSIC PLAY / PAUSE BUTTON
  // ==========================================

  function updateMusicButton() {
    musicButton.textContent = song.paused ? "🔇 Play Music" : "🔊 Music On";
  }

  musicButton.addEventListener("click", async () => {
    if (song.paused) {
      try {
        await song.play();
      } catch (error) {
        console.warn("Music could not play:", error);
      }
    } else {
      song.pause();
    }

    updateMusicButton();
  });

  song.addEventListener("play", updateMusicButton);
  song.addEventListener("pause", updateMusicButton);

  // ==========================================
  // 10. REASONS I LOVE YOU PAGE
  // ==========================================

  let currentReason = 0;

  reasonButton.addEventListener("click", () => {
    if (currentReason < reasons.length) {
      reasonCounter.textContent = `Reason ${currentReason + 1} of ${reasons.length}`;

      // Restart the text animation each time.
      reasonText.style.animation = "none";
      void reasonText.offsetWidth;
      reasonText.style.animation = "";

      reasonText.textContent = reasons[currentReason];

      currentReason++;

      if (currentReason === reasons.length) {
        reasonButton.textContent = "One Last Thing ❤️";
      } else {
        reasonButton.textContent = "Tell Me Another 💕";
      }

      createHearts(5);
      return;
    }

    // Final extra message after all 10 reasons.
    reasonDisplay.classList.add("hidden");
    reasonButton.classList.add("hidden");
    reasonEnding.classList.remove("hidden");

    createHearts(25);
  });

  // ==========================================
  // 11. FLOATING HEARTS
  // ==========================================

  function createHearts(amount = 5) {
    const symbols = ["💗", "💕", "💖", "❤️", "💘"];

    for (let i = 0; i < amount; i++) {
      const heart = document.createElement("span");

      heart.className = "floating-heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${16 + Math.random() * 20}px`;
      heart.style.animationDuration = `${4 + Math.random() * 4}s`;

      heartsBackground.appendChild(heart);

      heart.addEventListener("animationend", () => {
        heart.remove();
      });
    }
  }

  // A few hearts float up continuously.
  setInterval(() => createHearts(2), 1800);
});
