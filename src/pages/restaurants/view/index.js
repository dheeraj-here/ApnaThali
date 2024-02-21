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
import avatar from 'assets/images/cust-avatar.jpg'
import nodata from 'assets/images/no-data.png'
import { CenterFocusStrong, Image } from '@mui/icons-material';

const index = ({ show, unShow, data, reviews }) => {

  // const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [profilesListData, setProfilesListData] = useState([]);
  const [attendListData, setAttendListData] = useState([]);
  const [plan, setPlan] = useState([]);
  console.log(data, "Data get");
  const [time, setTime] = useState('')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(reviews, "Data of Review...");

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
  };



  useEffect(() => {

    setPlan([]);
    setPlan(data.plans);

    // try {
    //   setLoading(true);

    //   setProfilesListData([]);

    //   fetch(`${process.env.REACT_APP_API}/api/v1/get/shop/${id}`, {
    //     method: "GET",
    //     headers: {
    //       Authorization: token
    //     }
    //   }).then((res) => res.json())
    //     .then((result) => {
    //       console.log(result, '234567');
    //       if (result.success) {
    //         console.log(result, 'Result');
    //         setLoading(false);
    //         setData(result?.data, "We got profile data");
    //         setTime(result?.averageEatingTime)
    //         result?.members && result?.members.length > 0 &&
    //           result?.members.map((elm, key) => {
    //             // console.log("dsertg", elm?.photo);

    //             setProfilesListData((prev) => [...prev, {
    //               image: elm?.photo ? `${process.env.REACT_APP_IMG}/${elm?.photo}` : avatar,
    //               name: elm?.name,
    //               description: `id : ${elm?.id} phone : ${elm?.phone} email : ${elm?.email}`,
    //               action: {
    //                 type: "internal",
    //                 route: "/pages/profile/profile-overview",
    //                 color: "info",
    //                 label: "Active",
    //               },
    //             }])
    //           });
    //         result?.plans && result?.plans.length > 0 &&
    //           result?.plans.map((elm) => {
    //             setAttendListData((prev) => [...prev, {
    //               image: team3,
    //               name: elm?.planName,
    //               description: `Amount : ${elm?.amount} , thaliCount : ${elm?.thaliCount}`,
    //               action: {
    //                 type: "internal",
    //                 route: "/",
    //                 color: "info",
    //                 label: `expiry : ${elm?.expiry} days`,
    //               },
    //             }])
    //           })
    //       }
    //       // console.log(result, 'erespnosef')
    //     })
    // } catch (error) {
    //   toast.error(error.message)
    // }
    console.log("it runs again...");
  }, []);

  // console.log(profilesListData, "123456")
  return (
    <SoftBox>
      <BasicModal show={show} unShow={unShow} height="70vh">
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

              <Tab label="Restaurant" />
              <Tab label="Plans" />
              <Tab label="Shallow Members" />
              <Tab label="Reviews" />

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
                  // mx: 3,
                  py: 2,
                  px: 2,
                }}
              >

                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <SoftAvatar
                      src={data?.userId?.userImage ? `${process.env.REACT_APP_IMG}/${data?.userId?.userImage}` : avatar}
                      alt="profile-image"
                      variant="rounded"
                      size="xl"
                      shadow="sm"
                    />
                  </Grid>

                  <Grid item>
                    {data.userId && data.userId != null && (
                      <SoftBox height="100%" mt={0.5} lineHeight={1}>
                        <SoftTypography variant="h5" fontWeight="medium">
                          {data?.userId?.fullName}
                        </SoftTypography>
                        <SoftTypography variant="button" color="text" fontWeight="medium">
                          {data?.userId?.email}
                        </SoftTypography><br></br>
                        <SoftTypography variant="button" color="text" fontWeight="medium">
                          {data?.userId?.phone}
                        </SoftTypography><br></br>
                      </SoftBox>
                    )}
                  </Grid>
                </Grid>
              </Card>

              <Card
                sx={{
                  backdropFilter: `saturate(200%) blur(30px)`,
                  backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                  boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                  position: "relative",
                  mt: 2,
                  // mx: 3,
                  py: 2,
                  px: 2,
                }}
              >

                <Grid container spacing={1} width='100%' alignItems="center">
                  <SoftTypography mb={1} ml={1} width='100%' variant="h3" fontWeight="medium">
                    Details
                  </SoftTypography>
                  <SoftBox width='100%' ml={2} style={{ display: 'flex', marginBottom: '8px' }}>
                    <SoftAvatar
                      src={data?.logo ? `${process.env.REACT_APP_IMG}/${data?.logo}` : avatar}
                      alt="profile-image"
                      variant="rounded"
                      size="xl"
                      shadow="sm"
                    />
                    <SoftBox height="100%" mt={0.5} lineHeight={1} style={{ marginLeft: '16px' }}>
                      <SoftTypography variant="h5" fontWeight="medium" width="200px">
                        {data?.fullName} - {data?.id}
                      </SoftTypography>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        {data?.email}
                      </SoftTypography>
                      <br />
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        {data?.contact}
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>

                  <Grid item m={1} width={{ xs: '100%', md: '60%' }} >
                    <SoftBox height="100%" mt={0.5} lineHeight={1} display="flex" flexDirection="column">

                      <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                        <SoftTypography width='40%' variant="h5" fontWeight="medium">
                          Name:
                        </SoftTypography>
                        <SoftTypography mt={0.5} variant="button" color="text" fontWeight="medium">
                          {data?.name}
                        </SoftTypography>
                      </SoftBox>

                      <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                        <SoftTypography width='40%' variant="h5" fontWeight="medium">
                          Tags:
                        </SoftTypography>
                        <SoftTypography mt={0.5} variant="button" color="text" fontWeight="medium">
                          {data.tags && data.tags.length > 1 ? data?.tags.join(', ') : ''}
                        </SoftTypography>
                      </SoftBox>

                      <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                        <SoftTypography width='40%' variant="h5" fontWeight="medium">
                          Preference:
                        </SoftTypography>
                        <SoftTypography mt={0.5} variant="button" color="text" fontWeight="medium">
                          {data?.preference}
                        </SoftTypography>
                      </SoftBox>

                      <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                        <SoftTypography width='40%' variant="h5" fontWeight="medium">
                          Last Seen:
                        </SoftTypography>
                        <SoftTypography mt={0.5} variant="button" color="text" fontWeight="medium">
                          {data?.lastSeen}
                        </SoftTypography>
                      </SoftBox>

                      <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                        <SoftTypography width='40%' variant="h5" fontWeight="medium">
                          Location:
                        </SoftTypography>
                        <SoftTypography mt={0.5} variant="button" color="text" fontWeight="medium">
                          {`${data?.location?.type}: ${data?.location?.coordinates?.join(', ')}`}
                        </SoftTypography>
                      </SoftBox>

                      {/* Add more key-value pairs as needed */}
                    </SoftBox>
                  </Grid>


                </Grid>

                <SoftBox m={1} width='100%'>
                  <SoftBox m={2} key={index} style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '1px' }}>
                    {data.photos && data.photos.length > 0 && data.photos.map((image, index) => (
                      <SoftBox key={index} flexBasis={{ md: '49%', sm: '100%' }} style={{ maxWidth: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                          <img
                            src={`${process.env.REACT_APP_IMG}/${image}`}
                            alt={`Selected Image ${index}`}
                            style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '10px' }}
                          />

                        </div>
                      </SoftBox>
                    ))}
                  </SoftBox>
                </SoftBox>
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
                        Lunch : {data.openTime ? data.openTime : data.launch}
                      </SoftTypography>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      Dinner : {data.closeTime ? data.closeTime : data.dinner}
                    </SoftTypography>
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
                      UPI ID
                    </SoftTypography>
                    <SoftBox height="100%" mt={0.5} lineHeight={1}>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        Id : {data.upiId}
                      </SoftTypography>
                    </SoftBox>

                  </SoftBox>
                </Grid>
              </Card>
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
              {data && data.plans.length > 0 ?

                <>
                  {data.plans.map((elm, i) => (
                    <SoftBox>
                      <Card
                        sx={{
                          backdropFilter: `saturate(200%) blur(30px)`,
                          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                          position: "relative",
                          mx: 3,
                          py: 2,
                          my: 2,
                          px: 3
                        }}
                      >
                        <Grid item m={1} width={{ xs: '100%', md: '80%' }} >
                          <SoftBox height="100%" mt={0.5} lineHeight={1} display="flex" flexDirection="column">
                            <SoftTypography variant='h3' mb={2}>Plan {i + 1}</SoftTypography>
                            <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                              <SoftTypography width='40%' variant="h5" fontWeight="medium">
                                Plane Name:
                              </SoftTypography>
                              <SoftTypography mt={0.5} variant="button" color="text" fontWeight="medium">
                                {elm?.planName}
                              </SoftTypography>
                            </SoftBox>
                            <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                              <SoftTypography width='40%' variant="h5" fontWeight="medium">
                                Items:
                              </SoftTypography>
                              <SoftTypography mt={0.5} variant="button" color="text" fontWeight="medium">
                                {elm?.items}
                              </SoftTypography>
                            </SoftBox>
                            <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                              <SoftTypography width='40%' variant="h5" fontWeight="medium">
                                Thali Count:
                              </SoftTypography>
                              <SoftTypography mt={0.5} variant="button" color="text" fontWeight="medium">
                                {elm?.thaliCount}
                              </SoftTypography>
                            </SoftBox>
                            <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                              <SoftTypography width='40%' variant="h5" fontWeight="medium">
                                Amount:
                              </SoftTypography>
                              <SoftTypography mt={0.5} variant="button" color="text" fontWeight="medium">
                                {elm?.amount}
                              </SoftTypography>
                            </SoftBox>
                            <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                              <SoftTypography width='40%' variant="h5" fontWeight="medium">
                                Expiry Date:
                              </SoftTypography>
                              <SoftTypography mt={0.5} variant="button" color="text" fontWeight="medium">
                                {elm?.expiry}
                              </SoftTypography>
                            </SoftBox>
                          </SoftBox>
                        </Grid>
                      </Card>
                    </SoftBox>

                  ))}
                </>

                : <SoftBox >
                  <img src={nodata} width='100%' style={{ maxWidth: "300px", marginLeft: 'auto', marginRight: 'auto', display: 'block' }} alt="" />
                </SoftBox>}
            </TabPanel>

            <TabPanel value={value} index={2} dir={theme.direction}>
              {profilesListData.length > 0 ?
                <ProfilesList title="All Shallow Members" profiles={profilesListData} />
                : <SoftBox >
                  <img src={nodata} width='100%' style={{ maxWidth: "300px", marginLeft: 'auto', marginRight: 'auto', display: 'block' }} alt="" />
                </SoftBox>
              }
            </TabPanel>

            <TabPanel value={value} index={3} dir={theme.direction}>

              {reviews.length > 0 ?
                <>
                  {reviews.map((elm, i) => (
                    <SoftBox>
                      <Card
                        sx={{
                          backdropFilter: `saturate(200%) blur(30px)`,
                          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                          position: "relative",
                          mx: 3,
                          py: 2,
                          my: 2,
                          px: 3
                        }}
                      >
                        <Grid item m={1} width={{ xs: '100%', md: '80%' }} >
                          <SoftBox height="100%" mt={0.5} lineHeight={1} display="flex" flexDirection="column">
                            <SoftBox style={{ display: 'flex', marginBottom: '12px' }}>
                              <SoftTypography width='100%' variant="h5" fontWeight="medium">
                                "{elm?.comment}"
                              </SoftTypography>
                            </SoftBox>
                            <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                              <SoftTypography mr={0.5} variant="button" fontWeight="medium">
                                By :
                              </SoftTypography>
                              <SoftTypography variant="button" color="text" fontWeight="medium">
                                {elm?.memberId.name}
                              </SoftTypography>
                            </SoftBox>

                            <SoftBox style={{ display: 'flex', marginBottom: '8px' }}>
                              <SoftTypography mr={0.5} variant="button" fontWeight="medium">
                                Phone :
                              </SoftTypography>
                              <SoftTypography variant="button" color="text" fontWeight="medium">
                                {elm?.memberId.phone}
                              </SoftTypography>
                            </SoftBox>

                          </SoftBox>
                        </Grid>
                      </Card>
                    </SoftBox>

                  ))}
                </>
                : <SoftBox >
                  <img src={nodata} width='100%' style={{ maxWidth: "300px", marginLeft: 'auto', marginRight: 'auto', display: 'block' }} alt="" />
                </SoftBox>
              }
            </TabPanel>
          </SwipeableViews>
        </SoftBox>
      </BasicModal>
    </SoftBox>
  )
}

export default index;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <SoftBox
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 0, md: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </SoftBox>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
