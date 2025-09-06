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
    const wordContainer= document.getElementById('word-container');
    wordContainer.innerHTML="";
  words.forEach((word) => {
    //console.log(word);
    //         {
    //     "id": 110,
    //     "level": 2,
    //     "word": "Yellow",
    //     "meaning": "হলুদ",
    //     "pronunciation": "ইয়েলো"
    // }
    const wordCard=document.createElement('div');
    wordCard.innerHTML=`<p>samim= samim</p>`;

    wordContainer.appendChild(wordCard);

  });
};

loadLesson();
