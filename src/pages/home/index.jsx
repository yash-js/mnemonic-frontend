import React, { useEffect } from "react";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    document.title = "Mnemonic";
  });

  return (
    <>
      <div className="home">
        <div className="homecontent">Home</div>
        <div className="notebtn">
          <Button aria-describedby={id} variant="contained" onClick={handleClick}>
            Open Popover
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <h1>The content of the Popover.</h1>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Home;
