import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../features/userSlice";

function Mention() {
  const user = useSelector(userData);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    return () => {
      document.title = "Mentions";
      if (user && user?.notes && user.notes.length > 0) {
        setNotes(user?.notes.filter((note) => note?.author?._id !== user.id));
      } else {
        setNotes([]);
      }
    };
  }, []);

  return <div className="mention">
    {console.log(notes)}
  </div>;
}

export default Mention;
