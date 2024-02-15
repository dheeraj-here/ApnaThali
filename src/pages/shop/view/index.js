import BasicModal from 'components/Modal';
import React from 'react';
import { useEffect } from 'react';
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/logos/immigration.png";
import { useState } from 'react';
import toast from 'react-hot-toast';
import ProfilesList from "examples/Lists/ProfilesList";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import SoftBox from 'components/SoftBox';
import SoftButton from "components/SoftButton";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import burceMars from "assets/images/bruce-mars.jpg";
import Switch from '@mui/material/Switch';
import expense from "assets/images/expense.png"


const index = ({ show, unShow, data }) => {

  console.log(data, "View data");
  return (
    <div>
      <BasicModal show={show} unShow={unShow} height="70vh">
        <SoftBox m={2}>

          <Card
            sx={{
              backdropFilter: `saturate(200%) blur(30px)`,
              backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
              boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
              position: "relative",
              mt: 2,
              mx: 1,
              py: 2,
              px: 2,
            }}
          >

            <SoftTypography mt={2} variant="h3" color="text" fontWeight="large">
              Shop Details
            </SoftTypography>
            <Grid container spacing={{ xs: 0, md: 30 }} alignItems="center">
              {/* <Grid item>
                <img src={data?.photo ? `${process.env.REACT_APP_IMG}/${data?.photo}` : expense} width='90%'  style={{maxWidth:'200px'}}/>
              </Grid> */}
              <Grid item>
                <SoftBox height="100%" mt={0.5} style={{ marginLeft: "10px", display: 'block' }} lineHeight={1}>
                  
                  <SoftTypography mb={1} fontWeight="small">
                    Name:  {data?.name}
                  </SoftTypography>
                 
                  {/* <SoftTypography mb={1} fontWeight="small">
                    Sunday:   {data?.sunday}
                  </SoftTypography>
                  <SoftTypography mb={1} fontWeight="small">
                    Sunday Speacial:  {data?.sundaySpecial}
                  </SoftTypography> */}
                  <SoftTypography mb={3} fontWeight="small">
                    Preference:   {data?.preference}
                  </SoftTypography>
                  <SoftTypography mb={1} variant="h3" color='text' fontWeight="large">
                    Plans
                  </SoftTypography>
                  <SoftBox>
                    {data?.plans && data.plans.map((elm, ind) => (
                      <SoftBox ml={1} mb={2} key={ind}>
                        {/* {data} */}
                        <SoftTypography mb={1} variant="h4" fontWeight="small">
                          Plan {ind + 1}
                        </SoftTypography>
                        <SoftBox ml={1}>
                          <SoftTypography mb={1} fontWeight="small">
                            Plan name:  {elm?.planName}
                          </SoftTypography>
                          <SoftTypography mb={1} fontWeight="small">
                            Items:  {elm?.items}
                          </SoftTypography>
                          <SoftTypography mb={1} fontWeight="small">
                            Amount:  {elm?.amount}
                          </SoftTypography>
                        </SoftBox>
                      </SoftBox>
                    ))}
                  </SoftBox>

                </SoftBox>
              </Grid>

            </Grid>
          </Card>
        </SoftBox>
      </BasicModal>
    </div>
  )
}

export default index;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
