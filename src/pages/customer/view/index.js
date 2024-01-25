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
import avatar from "assets/images/cust-avatar.jpg"

const index = ({ show, unShow, id }) => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [profilesListData, setProfilesListData] = useState([]);
  const [attendListData, setAttendListData] = useState([]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const token = localStorage.getItem('token');
  function isDateExpired(date) {
    // Get the current date
    const currentDate = new Date();

    // Compare the given date with the current date
    if (date < currentDate) {
      return true; // Date has expired
    } else {
      return false; // Date has not expired
    }
  }
  useEffect(() => {

    try {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/api/v1/get/customer/detail/${id}`, {
        method: "GET",
        headers: {
          Authorization: token
        }
      }).then((res) => res.json())
        .then((result) => {

          if (result.success) {
            setLoading(false);
            setData(result?.data);

            result?.data?.shallowMember && result?.data?.shallowMember.length > 0 &&
              // result?.data?.shallowMember.map((elm) => {
              //   setProfilesListData((prev) => [...prev, {
              //     image: elm?.photo ? `${process.env.REACT_APP_IMG}/${elm?.photo}` : avatar,
              //     name: elm?.name,
              //     description: `current plan : ${elm?.currentPlanId?.plan?.name}`,
              //     action: {
              //       type: "internal",
              //       route: "/pages/profile/profile-overview",
              //       color: "info",
              //       label: isDateExpired(elm?.currentPlanId?.endDate) ? "Active" : "Experied",
              //     },
              //   }])
              // });
            result?.data?.attendance && result?.data?.attendance.length > 0 &&
              result?.data?.attendance.map((elm) => {
                setAttendListData((prev) => [...prev, {
                  image: team3,
                  name: elm?.createdAt,
                  description: `Shallow member : ${elm?.shallowMemberId} , markBy : ${elm?.markBy}`,
                  action: {
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: elm?.log,
                  },
                }])
              })
          }
          console.log(result, 'erespnosef')
        })
    } catch (error) {
      toast.error(error.message)
    }
  }, [id]);

  console.log(profilesListData)
  return (
    <div>
      <BasicModal show={show} unShow={unShow} width={800} height="70vh">
        <SoftBox mt={2}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >

              <Tab label="Profle" />
              <Tab label="Shallow Members" />
              <Tab label="Attendance" />
              <Tab label="Plans" />

            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>

              <Card
                sx={{
                  backdropFilter: `saturate(200%) blur(30px)`,
                  backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                  boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                  position: "relative",
                  mt: 2,
                  mx: 3,
                  py: 2,
                  px: 2,
                }}
              >


                <Grid container spacing={3} alignItems="center">
                  {/* <div className=""> */}
                  <Grid item>
                    <SoftAvatar
                      src={data?.member?.photo ? `${process.env.REACT_APP_IMG}/${data?.member?.photo}` : avatar}
                      alt="profile-image"
                      variant="rounded"
                      size="xl"
                      shadow="sm"
                    />

                    {/* </div> */}
                  </Grid>
                  <Grid item>
                    <SoftBox height="100%" mt={0.5} lineHeight={1}>
                      <SoftTypography variant="h5" fontWeight="medium">
                        {data?.member?.name}
                      </SoftTypography>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        {data?.member?.email}
                      </SoftTypography><br></br>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        {data?.member?.phone}
                      </SoftTypography><br></br>
                    </SoftBox>

                  </Grid>

                  <SoftBox sx={{ml: 40}} >
                    <SoftTypography variant="h5" fontWeight="medium">
                      Disable
                    </SoftTypography>
                    <Switch />
                  </SoftBox>

                </Grid>
              </Card>


              <Card
                sx={{
                  backdropFilter: `saturate(200%) blur(30px)`,
                  backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                  boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                  position: "relative",
                  mt: 2,
                  mx: 3,
                  py: 2,
                  px: 2,
                }}
              >

                <Grid item>
                  <SoftBox height="100%" mt={0.5} lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Average Eating Time
                    </SoftTypography>
                    <SoftBox height="100%" mt={0.5} lineHeight={1}>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        Launch : {data?.averageEatingTime?.morining}
                      </SoftTypography>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      Dinner : {data?.averageEatingTime?.night}
                    </SoftTypography>
                  </SoftBox>
                </Grid>
              </Card>


            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <ProfilesList title="All Shallow Members" profiles={profilesListData} />

            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <ProfilesList title="Attendance" profiles={attendListData} />

            </TabPanel>
          </SwipeableViews>
        </SoftBox>
      </BasicModal>
    </div >
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
        <Box sx={{ p: 3 }}>
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
