import React, { useEffect } from "react";

function Reminder() {
  useEffect(() => {
    return () => (document.title = "Reminder");
  });
  return <div className="reminder">reminder</div>;
}

export default Reminder;
