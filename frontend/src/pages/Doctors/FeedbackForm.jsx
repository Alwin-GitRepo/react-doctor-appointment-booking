import { useState } from "react";
import { AiFillStar } from 'react-icons/ai';
import { BASE_URL, token } from "../../config";
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!rating || !reviewText) {
        setLoading(false);
        return toast.error('Rating & Review fields are required');
      }

      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating, reviewText })
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      setLoading(false);
      toast.success(result.message)
      window.location.reload();
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <form>
      <div>
        <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
          How would you rate the overall experience?
        </h3>

        <div>
          {[...Array(5).keys()].map((index) => {
            const starRating = index + 1;

            return (
              <button
                key={starRating}
                type='button'
                className={`${
                  starRating <= ((rating && hover) || hover)
                    ? "text-[#e3ef55]"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer `}
                onClick={() => setRating(starRating)}
                onMouseEnter={() => setHover(starRating)}
                onMouseLeave={() => setHover(rating)}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
          Share your feedback suggestions.
        </h3>

        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-[rgb(59,135,249)] w-full px-6 py-3 rounded-md"
          placeholder="Write your message..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          cols="30"
          rows="5"
        ></textarea>
        <button type="submit" className="m-5 btn" onClick={handleSubmitReview}>
          {loading ? <HashLoader size={25} color="#fff" /> : 'Submit Feedback'}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
