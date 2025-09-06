const createrElemetns = (arr) => {
    const htmlElement = arr.map((el) => `<span class="btn bg-white ">${el}</span>`);
    return(htmlElement.join(" "));
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const managespinner=(status)=>{
    if(status){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
          document.getElementById("word-container spinner").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data))
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons)

    lessonButtons.forEach(btn => btn.classList.remove("active"))
}



const loadLevelWord = (id) => {
    managespinner


    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();//remove active class from all button
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            // console.log(clickBtn)
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        })
}


const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url)
    const details = await res.json();
    displayWordDetail(details.data);
}

// {
//     "word": "Reluctant",
//     "meaning": "অনিচ্ছুক",
//     "pronunciation": "রিলাকট্যান্ট",
//     "level": 2,
//     "sentence": "She was reluctant to speak in public.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "unwilling",
//         "hesitant"
//     ],
//     "id": 18  <span class="btn">Syn</span>
                    // <span class="btn">Syn</span>
                    // <span class="btn">Syn</span>
// }



const displayWordDetail = (word) => {
    console.log(word)
    const deatilsBox = document.getElementById("details-container");
    deatilsBox.innerHTML = `<div class="">
                    <h2 class="font-bold text-2xl">${word.word} 
                    (<i class="fa-solid fa-microphone-lines"></i>    :${word.pronunciation} )</h2>
                </div>

                <div class="">
                    <h2 class="font-bold" >Meaning</h2>
                    <p class="font-bangla">${word.meaning} </p>
                </div>

                <div class="">
                    <h2 class="font-bold" >Example</h2>
                    <p class="font-bangla">${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold" >Synonym</h2>
                    <div class="">${createrElemetns(word.synonyms)}</div>
                    
                </div>`;

    document.getElementById("word_modal").showModal();

}

const displayLevelWord = (words) => {
    const wordConainer = document.getElementById("word-container");
    wordConainer.innerHTML = "";

    if (words.length === 0) {
        wordConainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6  font-bangla">
            
              <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class=" text-xl font-medium text-gray-400">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>

            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>

        </div>`;
        return;

    }

    // {
    //     "id": 78,
    //     "level": 1,
    //     "word": "Hot",
    //     "meaning": "গরম",
    //     "pronunciation": "হট"
    // }

    words.forEach(word => {
        console.log(word)
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শদ্ব পাওয়া যায় নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>

            <div class="text-2xl font-medium font-bangla">"
            ${word.meaning ? word.meaning : "শদ্ব পাওয়া যায় নি"} /
             ${word.pronunciation ? word.pronunciation : "শদ্ব পাওয়া যায় নি"} "</div>

            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#067bf0ef]"><i class="fa-solid fa-circle-info"></i> </button>
                <button onclick="pronounceWord('${word.word}')"  class="btn bg-[#1a91ff1a] hover:bg-[#067bf0ef]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordConainer.appendChild(card);
    })
}

const displayLesson = (lessons) => {
    // 1.get the contanier
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    //.2get inti every lesson

    for (let lesson of lessons) {

        // 3.creat element
        console.log(lesson)


        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}"  onclick="loadLevelWord(${lesson.level_no})" 
        class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        `;

        //4,append int container 
        levelContainer.append(btnDiv);

    }


};


loadLessons();


document.getElementById("btn-search").addEventListener("click", ()  =>{
    removeActive();
    const input= document.getElementById("input-search");
    const searchValue = input.value.tirm().tolowwerCase();
    console.log(searchValue);

    fetch(`https://openapi.programming-hero.com/api/words/all`)
    .then(res=>res.json())
    .then((data )=> {
        const allWords = data.data;
        console.log(allWords);
        const matchedWord = allWords.filter((word) => 
            word.word.toLowerCase().includes(searchValue));
        console.log(matchedWord);
        displayLevelWord(matchedWord);
    })
        

});






