import React from "react";
import "./Page404.css";

const Page404 = () => {
  return (
    <div className="page-404">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>
        The page you're looking for doesn't exist. It might have been removed,
        had its name changed, or is temporarily unavailable.
      </p>
      <button onClick={() => window.location.href = "/"}>Go to Homepage</button>
    </div>
  );
};

export default Page404;
