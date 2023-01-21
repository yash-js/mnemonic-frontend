import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

function TooltipComponent(props) {
  return (
    <Tooltip title={props.htmltitle} arrow>
        {props.children}
    </Tooltip>
  )
}

export default TooltipComponent
