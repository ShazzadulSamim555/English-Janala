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
    <button onclick="loadLabelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    lessonContainer.appendChild(btnLesson);
  }
};

const loadLabelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  //console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLabelData(json.data));
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
                <p class="text-2xl font-bold">${word.word ? word.word : 'ওয়ার্ড পাওয়া যায়নি'}</p>
                <p>Meaning / Pronounciation</p>
                <p class="text-2xl font-semibold text-gray-700">${word.meaning ? word.meaning : 'কোন অর্থ পাওয়া যায় নি'} / ${word.pronunciation ? word.pronunciation : 'কোন সমার্থক পাওয়া যায় নি'}</p>
                <div class="flex justify-between items-center">
                    <div class="bg-gray-200 p-2 rounded-lg"><i class="fa-solid fa-circle-info"></i></div>
                    <div class="bg-gray-200 p-2 rounded-lg"><i class="fa-solid fa-volume-high"></i></div>
                </div>
            </div>`;

    wordContainer.appendChild(wordCard);
  });
};

loadLesson();
