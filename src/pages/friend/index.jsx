import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import FriendCard from "../../layouts/FriendCard";
import notification from "../../assets/images/notification.svg";
import FriendsSkeleton from "../../skeletons/FriendsSkeleton";
import { useFriends } from "../../hooks/friends";

function Friend() {
  const {
    friends,
    loading,
    requests,
    suggestions,
    suggestionLoading,
    friendsLoading,
    requestsLoading,
    getFriendsApiCall,
    getRequestsApiCall,
    getSuggestionsApiCall,
    removeFriendApiCall
  } = useFriends();

  useEffect(() => {
    document.title = "Friends";

    return () => {
      getFriendsApiCall();
      getRequestsApiCall();
      getSuggestionsApiCall()
    };
  }, []);

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
              <p>{friends && friends?.length}</p>
            </div>
            <div className="friendscontent">
              {(loading || friendsLoading) ? (
                <FriendsSkeleton />
              ) : friends && friends?.length > 0 ? (
                friends?.map((item) => {
                  console.log(item);
                  return (
                    <FriendCard
                      key={item._id}
                      name="friends"
                      onClick={()=>removeFriendApiCall(item?._id)}
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
              <p>{requests && requests.length }</p>
            </div>
            <div className="friendrequestcontent">
              {(loading || requestsLoading) ? (
                <FriendsSkeleton />
              ) : requests && requests.length > 0 ? (
                requests.map((item, index) => {
                  return (
                    <FriendCard
                      key={item._id}
                      name="friendrequest"
                      profileimage={item?.profilePic}
                      profileFirstname={item?.firstName}
                      porfileLastname={item?.lastName}
                      profileusername={item?.username}
                      custombuttonremoveclass={true}
                    />
                  );
                })
              ) : (
                <p className="noFriends">No Friend Requests</p>
              )}
            </div>
          </div>
        </Grid>
        {/* <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          className="friendcontentbox"
        >
          <div className="friendsuggestion">
            <div className="friendsuggestionheading">
              <p>Suggestions</p>
              <p>{suggestions && suggestions.length}</p>
            </div>
            <div className="friendsuggestioncontent">
              {(loading || suggestionLoading) ? (
                <FriendsSkeleton />
              ) : suggestions && suggestions.length > 0 ? (
                suggestions.map((item) => {
                  console.log('i', item);
                  return (
                    <FriendCard
                    key={item._id}
                    name="friendsuggestion"
                    profileimage={item?.profilePic}
                    profileFirstname={item?.firstName}
                    porfileLastname={item?.lastName}
                    profileusername={item?.username}
                    custombuttonremoveclass={true}
                  />
                  );
                })
              ) : (
                <p className="noFriends">No Suggestions</p>
              )}
            </div>
          </div>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default Friend;
