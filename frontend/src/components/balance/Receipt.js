import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root_green: {
      margin: '5px 0px',
      borderRight: '5px solid green',
    },
    root_red: {
      margin: '5px 0px',
      borderRight: '5px solid red',
    },
    heading: {
      flex: 1,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    users: {
      margin: '0px 2px'
    },
  }));

export const Receipt = ({ receipt, user }) => {
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const classes = useStyles();
    return (
      <Box className={receipt.author.id === user.id ? classes.root_green : classes.root_red}>
        <Accordion expanded={expanded === '1'} onChange={handleChange('1')} >
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{receipt.info}</Typography>
            <Typography className={classes.secondaryHeading}>
            {receipt.author.id !== user.id ? '-' : ''}
              {receipt.value}
              PLN
              </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
                <Typography component="div">
                    { receipt.author.id === user.id ?
                    <>
                    <Box fontWeight="fontWeightBold" m={1}>
                        Users:
                    </Box>
                    {receipt.users.map((user) => <Chip label={user.username} key={user.id}/>)}
                    </>
                    :
                    <>
                    <Box fontWeight="fontWeightBold" m={1}>
                        Autor:
                    </Box>
                    <Chip label={receipt.author.username} />
                    </>
                    }
                   <Box fontWeight="fontWeightBold" m={1}>
                        Data:
                    </Box>
                    <Chip label={receipt.created_at} />
                </Typography>
                
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>
    )
}

export default Receipt;