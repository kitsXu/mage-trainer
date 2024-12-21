import "./spinkit.css";
import "./LoadingIndicator.css";

export const LoadingIndicator = () => {
  return (
    <div>
      <div className="loadingIndicator">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    </div>
  );
};
