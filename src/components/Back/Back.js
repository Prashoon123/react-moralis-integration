import "./Back.css";
import { useNavigate } from "react-router-dom";

function Back() {
  const navigate = useNavigate();

  return (
    <a onClick={() => navigate("/")} title="Go Back" className="back">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: 40, width: 40 }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </a>
  );
}

export default Back;
