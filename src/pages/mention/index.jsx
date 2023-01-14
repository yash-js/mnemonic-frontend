import React, { useEffect } from "react";

function Mention() {
  useEffect(() => {
    document.title = "Mentions";
  });

  return <div className="mention">mention</div>;
}

export default Mention;
