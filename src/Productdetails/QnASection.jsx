import React from 'react';
import { FaUserCheck, FaRegThumbsUp } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import PageHeading from "../Style/PageHeading";

const QuestionAnswer = ({ 
  allQuestions, newQuestion, setNewQuestion, 
  onAddQuestion, likedQuestion, setLikedQuestion 
}) => {
  return (
    <div className="mb-20">
      <PageHeading h2="Questions and Answers" />
      <div className="bg-white shadow p-4 mb-6">
        <p className="text-lg font-medium text-[#224F34] mb-4">Have a question?</p>
        <div className="md:flex gap-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask your question here..."
            className="flex-1 justify-center w-full md:auto border px-3 py-2 rounded outline-none"
          />
          <button onClick={onAddQuestion} className="bg-[#93B9A2] hover:opacity-90 text-black px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer md:w-auto w-full justify-center mt-2">Submit</button>
        </div>
      </div>

      <div className="shadow text-sm py-4 px-4">
        {allQuestions.map((q) => (
          <div key={q.id} className="p-4 border-b">
            <p className="font-medium text-md">Q: {q.Q}</p>
            <p className="mt-1">A: {q.A}</p>
            <div className="flex justify-between mt-3 text-gray-500">
              <div className="flex items-center gap-1">
                <FaUserCheck /> <span className="text-xs">Rivo Seller</span>
              </div>
              <div className="flex gap-4">
                <div onClick={() => setLikedQuestion(likedQuestion === q.id ? null : q.id)} className="cursor-pointer">
                  {likedQuestion === q.id ? <BiSolidLike className="text-blue-600" size={18}/> : <FaRegThumbsUp size={18}/>}
                </div>
                <MdOutlineKeyboardArrowDown size={20}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnswer;