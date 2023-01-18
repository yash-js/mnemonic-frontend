import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import FriendCard from "../../layouts/FriendCard";
import FriendsSkeleton from "../../skeletons/FriendsSkeleton";
import { useFriends } from "../../hooks/friends";
import AlertComponent from "../../components/AlertComponent";

function Friend() {
  const {
    loading,
    requests,
    getFriendsApiCall,
    getRequestsApiCall,
    removeFriendApiCall,
    open,
    setOpen,
    message,
    setMessage,
    type,
    setType,
    acceptFriendRequestApiCall,
    friend,
    request,
  } = useFriends();

  useEffect(() => {
    document.title = "Friends";
    return () => {
      getFriendsApiCall();
      getRequestsApiCall();
    };
  }, []);

  // useEffect(() => {
  //   return () => getFriendsApiCall();
  // }, [friend]);
  // useEffect(() => {
  //   return () => {
  //     dispatch(setFriends(user?.friends));
  //     console.log("Friends Updateds");
  //   };
  // }, [friends]);
  return (
    <div className="friend">
      <Grid container spacing={1} className="friendbox">
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          className="friendcontentbox"
        >
          <div className="friends">
            <div className="friendsheading">
              <p>Friends</p>
              <p>{friend && friend?.length}</p>
            </div>
            <div className="friendscontent">
              {loading ? (
                <FriendsSkeleton />
              ) : friend && friend.length > 0 ? (
                friend.map((item, index) => {
                  return (
                    <FriendCard
                      key={item._id + index}
                      friendsremove={() => removeFriendApiCall(item?._id)}
                      profileimage={item?.profilePic}
                      profileFirstname={item?.firstName}
                      porfileLastname={item?.lastName}
                      profileusername={item?.username}
                    />
                  );
                })
              ) : (
                <p className="noFriends">No Friends</p>
              )}
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          className="friendcontentbox"
        >
          <div className="friendrequest">
            <div className="friendrequestheading">
              <p>Friend Requests</p>
              <p>{requests && requests.length}</p>
            </div>
            <div className="friendrequestcontent">
              {loading ? (
                <FriendsSkeleton />
              ) : request && request.length > 0 ? (
                request.map((item, index) => {
                  return (
                    <FriendCard
                      key={item._id + index}
                      friendrequestaccept={() => acceptFriendRequestApiCall(item?._id)}
                      friendrequestremove={() => removeFriendApiCall(item?._id)}
                      profileimage={item?.profilePic}
                      profileFirstname={item?.firstName}
                      porfileLastname={item?.lastName}
                      profileusername={item?.username}
                    />
                  );
                })
              ) : (
                <p className="noFriends">No Friend Requests</p>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
      <AlertComponent
        setOpen={setOpen}
        setType={setType}
        setMessage={setMessage}
        alertOpen={open}
        alertMessage={message}
        alertType={type}
      />
    </div>
  );
}

export default Friend;
