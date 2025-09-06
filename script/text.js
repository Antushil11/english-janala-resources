const createrElemetns = (arr) => {
    const htmlElement = arr.map((el) => `<span class="bg-white rounded-xl 
    shadow-sm text-center py-10 px-5 space-y-4">${el}</span>`);
    console.log(htmlElement.join(" "));
}




const synonyms = ["hello", "hi", "greetings"];
createrElemetns(synonyms);
