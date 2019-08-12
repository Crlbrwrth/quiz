import axios from "axios";

export async function getQuestions() {
    const { data } = await axios.get("/questions/json");
    localStorage.setItem("questions", JSON.stringify(data));
    if (!localStorage.getItem("question_nr")) {
        localStorage.setItem("question_nr", 0);
    }
    return {
        type: "GET_QUESTIONS",
        questions: data
    };
}

export async function nextQuestion() {
    let counter = localStorage.getItem("question_nr");
    counter++;
    localStorage.setItem("question_nr", counter);
    return {
        type: "NEXT_QUESTION",
        question_nr: counter
    };
}
