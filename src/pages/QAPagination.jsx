import React, { useState } from "react";

const questions = [
  { id: 1, question: "What is React?", answer: "React is a JS library." },
  { id: 2, question: "What is JSX?", answer: "JSX looks like HTML in JS." },
  {
    id: 3,
    question: "What is state?",
    answer: "State stores data in a component.",
  },
  {
    id: 4,
    question: "What is props?",
    answer: "Props pass data to components.",
  },
  { id: 5, question: "What is useEffect?", answer: "It runs side effects." },
  { id: 6, question: "What is component?", answer: "Reusable UI block." },
];

const QAPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentQuestions = questions.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(questions.length / itemsPerPage);

  return (
    <div>
      <h2>Questions & Answers</h2>

      {currentQuestions.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <h4>{item.question}</h4>
          <p>{item.answer}</p>
        </div>
      ))}

      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: "5px",
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QAPagination;
