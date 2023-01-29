import { Skeleton } from "@mui/material";
import React from "react";

const NotesSkeleton = () => {
  let count = [0, 1, 2, 3];
  return count.map((count) => (
    <Skeleton
      key={count}
      height={500}
      width={500}
      style={{
        width: "20vw",
        height: "340px",
        marginLeft: "30px",
        marginTop: "-25px",
      }}
    />
  ));
};

export default NotesSkeleton;
