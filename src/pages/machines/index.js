
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
import { useSelector } from "react-redux";
import SoftButton from "components/SoftButton";
import CreateExpense from "../machines/form";
import ViewRestro from "../machines/view";

function Tables() {

  const [data, setData] = useState([]);
  const { columns, rows } = data;
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


  const handleRefresh = () => setRefresh(refresh + 1);

  const handleShowForm = (e) => {
    // console.log("Handle running...", e);
    setShowForm(!showForm);
    setMachineID(e);
  };

  const handleConnect = (e) => {
    setReqMno(e.machineNo)
    setshowRestro(!showRestro)
    setShowForm(false);
    setMachineID(e)

  }

  const deleteMachine = (ev) => {
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
        // throw new Error(`HTTP error! Status: ${res.status}`)
        console.log("Error in res.ok");
      }
      const result = await res.json();
      // console.log(result, "res2");

      setMachineData(result.data)
      setData(customerData({
        data: result?.data,
        connect: handleConnect,
        disconnect: handledisconnect,
        deleto: deleteMachine
      }))
      console.log(result.data, "COLROW");
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomerList()

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
            console.log(result, "edrfgtyhujik");
            setLoading(false);
            setResData(result?.data)

          }
        })
    } catch (error) {
      toast.error(error.message)
    }
  }, [refresh]);
  // console.log(reqMno, "resdata got it!");


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CreateExpense show={showForm} unShow={setShowForm} data={machineID} handleRefresh={handleRefresh} />
      {/* <ViewCustomer show={showCustomer} unShow={setshowCustomer} data={customerId} /> */}
      {<ViewRestro show={showRestro} unShow={setshowRestro} handleFresh={handleRefresh} connect={handleConnect} data={resData} machineNo={reqMno} />}

      <SoftBox py={2}>
        <SoftBox mb={3}>
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

      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
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