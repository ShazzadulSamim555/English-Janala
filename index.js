const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const displayLesson = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  for (const lesson of lessons) {
    //console.log(lesson);
    //         {
    //     "id": 101,
    //     "level_no": 1,
    //     "lessonName": "Basic Vocabulary"
    // }
    const btnLesson = document.createElement("div");
    btnLesson.className = "";
    btnLesson.innerHTML = `
    <button id="label-word-${lesson.level_no}" onclick="loadLabelWord(${lesson.level_no})" class="btn btn-outline btn-primary btn-lesson"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    lessonContainer.appendChild(btnLesson);
  }
};

const removeActive = () => {
  const btnLesson = document.querySelectorAll(".btn-lesson");
  btnLesson.forEach((btn) => btn.classList.remove("active"));
};

const loadLabelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  //console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const btnClick = document.getElementById(`label-word-${id}`);
      btnClick.classList.add("active");
      displayLabelData(json.data);
    });
};

const displayLabelData = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  //console.log(words);
  if (words.length == 0) {
    wordContainer.innerHTML = `<div class=" col-span-full text-center space-y-3 p-5">
     <img class="mx-auto" src="assets/alert-error.png">
                <h4 class="font-bangla text-xl text-gray-600">এই Lesson এখনও কোণ Vocabulary যুক্ত করা হয় নি</h4>
                <h3 class="font-bangla text-2xl font-bold">নেক্সট Lesson Select করুন।</h3>
            </div>`;
  }
  words.forEach((word) => {
    //console.log(word);
    //         {
    //     "id": 110,
    //     "level": 2,
    //     "word": "Yellow",
    //     "meaning": "হলুদ",
    //     "pronunciation": "ইয়েলো"
    // }
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `<div class="bg-white p-5 rounded-lg text-center space-y-3 h-full">
                <p class="text-2xl font-bold">${
                  word.word ? word.word : "ওয়ার্ড পাওয়া যায়নি"
                }</p>
                <p>Meaning / Pronounciation</p>
                <p class="text-2xl font-semibold text-gray-700">${
                  word.meaning ? word.meaning : "কোন অর্থ পাওয়া যায় নি"
                } / ${
      word.pronunciation ? word.pronunciation : "কোন সমার্থক পাওয়া যায় নি"
    }</p>
                <div class="flex justify-between items-center">
                    <div onclick="loadWordDetails(${
                      word.id
                    })" onclick="my_modal_5.showModal()" class="bg-gray-200 p-2 rounded-lg"><i class="fa-solid fa-circle-info"></i></div>
                    <div class="bg-gray-200 p-2 rounded-lg"><i class="fa-solid fa-volume-high"></i></div>
                </div>
            </div>`;

    wordContainer.appendChild(wordCard);
  });
};

// {
//     "word": "Grateful",
//     "meaning": "কৃতজ্ঞ",
//     "pronunciation": "গ্রেটফুল",
//     "level": 3,
//     "sentence": "I am grateful for your help.",
//     "points": 3,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "thankful",
//         "appreciative",
//         "obliged"
//     ],
//     "id": 7
// }
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  const data = displayWordDetail(details.data);
};

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const displayWordDetail = (data) => {
  console.log(data);
  const wordContainer = document.getElementById("word_container");
  //console.log(wordContainer);
  // wordContainer.innerHTML="samim";
  wordContainer.innerHTML=`<div>
                    <h3 class="text-3xl font-bold">${data.word} (<i class="fa-solid fa-microphone-lines"></i>   :${data.pronunciation})</h3>
                </div>
                <div class="text-xl space-y-3">
                    <h4 class="text-xl font-semibold">Meaning</h4>
                    <p>${data.meaning}</p>
                </div>
                <div class="text-xl space-y-3">
                    <h5 class="text-xl font-semibold">Example</h5>
                    <p>${data.sentence}</p>
                </div>
                <div class="space-y-3">
                    <p class="text-xl font-semibold">সমার্থক শব্দ গুলো</p>
                    <div class="flex gap-3">
                        <p class="text-base bg-blue-50 px-3 py-1 rounded-lg">${data.synonyms[0]}</p>
                        <p class="text-base bg-blue-50 px-3 py-1 rounded-lg">${data.synonyms[1]}</p>
                        <p class="text-base bg-blue-50 px-3 py-1 rounded-lg">${data.synonyms[2]}</p>
                    </div>
                </div>
                <div>
                    <button class="btn btn-primary">Complete Learning</button>
                </div>`
  document.getElementById("my_modal_5").showModal();
};

loadLesson();
