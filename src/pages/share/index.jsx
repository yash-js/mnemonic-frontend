import React, { useEffect } from "react";

function Share() {
  useEffect(() => {
    return () => (document.title = "Share");
  });
  return <div className="share">share</div>;
}

export default Share;
