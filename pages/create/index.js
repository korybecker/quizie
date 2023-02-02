import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([{ text: '', options: [{ text: '', isAnswer: false }] }]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex][event.target.name] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (questionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].text = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.map((option, i) => {
      return {
        ...option,
        isAnswer: i === optionIndex,
      };
    });
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = [      ...updatedQuestions[questionIndex].options,
      { text: '', isAnswer: false },
    ];
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length === 1) return;

    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.slice(0, updatedQuestions[questionIndex].options.length - 1);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: [{ text: '', isAnswer: false }] }]);
  };

  const removeQuestion = () => {
    setQuestions(questions.slice(0, questions.length - 1));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const quiz = {title, description, questions};
    console.log(quiz);

  };

  return (
    <>
    <h1>Create Quiz</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Quiz Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        Quiz Description:
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </label>
      <hr />
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label>
            {questionIndex + 1}. 
            <input type="text" name="text" value={question.text} onChange={(e) => handleQuestionChange(questionIndex, e)} />
          </label>
          <br />
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
            <label>
              Option {optionIndex + 1}:
              <input type="text" name="text" value={option.text} onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)} />
            </label>
            <br />
            <input type="radio" name={`question-${questionIndex}-answer`} checked={option.isAnswer} onChange={() => handleOptionAnswerChange(questionIndex, optionIndex)}></input>
            Correct Answer
            </div>
          ))}
          <button type="button" onClick={() => addOption(questionIndex)}>
            Add Option
          </button>
          <button type="button" onClick={() => removeOption(questionIndex)}>
            Remove Option
          </button>
          <label>
            Answer:
            <input type="text" name="answer" value={question.answer} onChange={(e) => handleQuestionChange(questionIndex, e)} />
          </label>
          <hr />
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
      {questions.length > 0 && <button type="button" onClick={removeQuestion}>
        Remove Question
      </button>}
      <br />
      <button type="submit">Submit</button>
    </form>
    </>
  );
};