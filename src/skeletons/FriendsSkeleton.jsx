import { Skeleton } from "@mui/material";
import React from "react";

const FriendsSkeleton = () => {
  return (
    <>
      <Skeleton
        width={"90%"}
        height={100}
        style={{
          borderRadius: 20,
        }}
      />{" "}
      <Skeleton
        width={"90%"}
        height={100}
        style={{
          borderRadius: 20,
        }}
      />{" "}
      <Skeleton
        width={"90%"}
        height={100}
        style={{
          borderRadius: 20,
        }}
      />{" "}
      <Skeleton
        width={"90%"}
        height={100}
        style={{
          borderRadius: 20,
        }}
      />{" "}
      <Skeleton
        width={"90%"}
        height={100}
        style={{
          borderRadius: 20,
        }}
      />{" "}
      <Skeleton
        width={"90%"}
        height={100}
        style={{
          borderRadius: 20,
        }}
      />
    </>
  );
};

export default FriendsSkeleton;
