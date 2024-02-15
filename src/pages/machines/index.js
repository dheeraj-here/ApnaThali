import React from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import customerData from './data/authorsTableData';
import Loading from "components/ApnaLoading";
// import ViewCustomer from "./view"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation } from "react-router-dom";
import SoftButton from "components/SoftButton";
import CreateExpense from "../machines/form";
import ViewRestro from "../machines/view";
import ViewEdit from './vieworder/index'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BasicModal from 'components/Modal';
import ProfilesList from "examples/Lists/ProfilesList";
import orderData from './orderData/index'



function Tables() {

  const [data, setData] = useState([]);
  const { columns, rows } = data;
  const [orders, setOrders] = useState([]);
  const { orderCol, orderRow } = orders;
  const [loading, setLoading] = useState(false)
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [showRestro, setshowRestro] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [machineID, setMachineID] = useState(null);
  // const [expeneId, setExpeneId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState(null);
  const [resData, setResData] = useState([]);
  const [reqMno, setReqMno] = useState('');
  const [machineData, setMachineData] = useState([])
  const [value, setValue] = React.useState(0);
  const [showEdit, setShowEdit] = useState(false)
  const [orderId, setOrderId] = useState('')
  const theme = useTheme();



  const handleRefresh = () => setRefresh(refresh + 1);

  const handleChange = (event, newValue) => {
    console.log(newValue, "lkjh");
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    console.log(index, "asdfg");
  };

  const handleShowForm = (e) => {
    // console.log("Handle running...", e);
    setShowForm(!showForm);
    setMachineID(e);
  };

  const handleConnect = (e) => {
    // console.log(data, "werty");
    setReqMno(e.machineNo)
    setshowRestro(!showRestro)
    setShowForm(false);
    setMachineID(e)
  }

  const handleShowEdit = (elm)=> {
    console.log(elm._id, 'order elm');
    setOrderId(elm._id)
    setShowEdit(!showEdit)
  }

  const deleteMachine = (ev, connect) => {
    console.log(connect, "del mc");
    if (!connect) {
      try {

        fetch(`${process.env.REACT_APP_API}/api/v1/delete/machine/${ev}`, {
          method: "DELETE",
          headers: {
            Authorization: token
          }
        }).then((res) => res.json())
          .then((result) => {
            if (result.success) {
              toast.success(result.message);
              handleRefresh()
            } else {
              toast.error(result.message)
            }
          })
      } catch (error) {
        toast.error(error.message)
      }
    }
    else {
      toast.error("Mahcine is connected")
    }
  }

  const handledisconnect = async (e) => {
    console.log(e, "disconnect function runs");

    try {
      // console.log("Switch changes", machineData, resId);
      const res = await fetch(`${process.env.REACT_APP_API}/api/v1/connect/machine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          "phone": `${e.machineNo}`,
          "restaurantId": `${e.restaurantId._id}`,
          "connect": false
        })
      });

      if (!res.ok) {
        console.log("Error in res.ok");
      }

      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        handleRefresh()

        console.log("Machine disconnected successfully!");
      } else {
        toast.error(result.message);
        console.log(result.message);
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message, ":Error in catch ");
    }
  }

  const getCustomerList = async () => {
    try {
      console.log("Try runs...");
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API}/api/v1/get/all/machine`, {
        method: "GET",
        headers: {
          Authorization: token
        }
      });

      if (!res.ok) {
        console.log("Error in res.ok");
      }
      const result = await res.json();

      setMachineData(result.data)
      setData(customerData({
        data: result?.data,
        connect: handleConnect,
        disconnect: handledisconnect,
        deleto: deleteMachine
      }))
      // console.log(result.data, "COLROW");
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomerList()
    getMachineOrders()

    try {
      console.log("Got it");
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/api/v1/get/admin/Restaurant/${id}`, {
        method: "GET",
        headers: {
          Authorization: token
        }
      }).then((res) => res.json())
        .then((result) => {

          if (result.success) {
            // console.log(result, "edrfgtyhujik");
            setLoading(false);
            setResData(result?.data)

          }
        })
    } catch (error) {
      toast.error(error.message)
    }
  }, [refresh]);
  // console.log(reqMno, "resdata got it!");

  const getMachineOrders = async () => {
    console.log("Order function...");
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API}/api/v1/get/all/machineOrder`, {
        method: "GET",
        headers: {
          Authorization: token
        }
      })
      if (!res.ok) {
        console.log("error in res ", res);
      }
      const result = await res.json();

      console.log(result);
      if (result.success) {
        console.log(result, "Order data");
        setLoading(false);
        setOrders(orderData({
          data: result?.data,
          edit: handleShowEdit
        }))
      }

    } catch (error) {
      toast.error("Error in Machine Orders!")
    }
  }

  console.log(orders, columns, '1234');


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TabPanel value={value} index={0} dir={theme.direction}>

        <CreateExpense show={showForm} unShow={setShowForm} data={machineID} handleRefresh={handleRefresh} />
        {/* <ViewCustomer show={showCustomer} unShow={setshowCustomer} data={customerId} /> */}
        {<ViewRestro show={showRestro} unShow={setshowRestro} handleFresh={handleRefresh} connect={handleConnect} data={resData} machineNo={reqMno} />}

        <SoftBox py={2}>
          <SoftBox mb={3}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >

                <Tab label="Machines" />
                <Tab label="Orders" />

              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            ></SwipeableViews>

            <SoftBox mt={2}>
              <Card>
                <SoftButton
                  size="small"
                  color="black"
                  sx={{ width: '100px', borderRadius: '5px', mx: '10px', padding: '10px 80px' }}
                  onClick={() => handleShowForm(null)}
                >
                  Create Machine
                </SoftButton>
                <SoftBox
                  sx={{
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                          `${borderWidth[1]} solid ${borderColor}`,
                      },
                    },
                  }}
                >
                  {loading ? <Loading /> : <Table columns={columns} rows={rows} />}
                </SoftBox>
              </Card>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
      <ViewEdit show={showEdit} unShow={setShowEdit} handleFresh={handleRefresh} data={orderId} />

        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >

            <Tab label="Machines" />
            <Tab label="Orders" />

          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
        </SwipeableViews>

        <SoftBox mt={2}>
          {loading ? <Loading /> : <Table columns={orders.columns} rows={orders.rows} />}
        </SoftBox>
      </TabPanel>
      {/* <Footer /> */}
    </DashboardLayout>

  );
}

export default Tables;


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
          {/* <Typography>{children}</Typography> */}
          {children}
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

{/* <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
  <SoftTypography variant="h6">Authors table</SoftTypography>
</SoftBox> */}

{/* <Card>
  <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
    <SoftTypography variant="h6">Projects table</SoftTypography>
  </SoftBox>
  <SoftBox
    sx={{
      "& .MuiTableRow-root:not(:last-child)": {
        "& td": {
          borderBottom: ({ borders: { borderWidth, borderColor } }) =>
            `${borderWidth[1]} solid ${borderColor}`,
        },
      },
    }}
  >
    <Table columns={prCols} rows={prRows} />
  </SoftBox>
</Card> */}
