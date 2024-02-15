
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
import ViewCustomer from "./view";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import SoftButton from "components/SoftButton";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useSelector } from "react-redux/es/hooks/useSelector";
import CreateShop from "./form/index";

function Tables() {

  const [data, setData] = useState([]);
  const [counts, setCounts] = useState([]);
  const { columns, rows } = data;
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [showCustomer, setshowCustomer] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [c, setC] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [result, setResult] = useState(null);
  const search = useSelector((state) => state.searchSlice.search);
  const [showForm, setShowForm] = useState(false);
  const [shopId, setShopId] = useState(null);
  const [refresh, setRefresh] = useState(0);


  const handleRefresh = () => setRefresh(refresh + 1);

  const handleShowForm = (e) => {
    console.log("ID", e);
    setShowForm(!showForm)
    setShopId(e)
  };

  const handleActive = (e, elm) => {
    console.log(e, elm, "status runs...");
  }
  const handlePageChange = (newPage) => {
    console.log(newPage);
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(result?.data.length / itemsPerPage);


  const renderPaginationControls = () => (
    <SoftBox>
      <SoftButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ArrowBackIosNewOutlinedIcon />
      </SoftButton>
      <span>{currentPage}</span>
      <SoftButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ArrowForwardIosOutlinedIcon />
      </SoftButton>
    </SoftBox>
  );


  const handleViewCustomer = async (e) => {
    setC(c + 1)
    setshowCustomer(!showCustomer)
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/v1/get/shop/${e}`, {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: token
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      const result = await res.json();
      console.log(result, "eryhg");

      if (result.success) {
        setCustomerId(result.data);
        console.log(result.data, 'got res data');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }



  const downloadQR = async (e) => {
    console.log("Download", e);
    try {
      // setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_APE}/api/v1/get/Restaurant/qrCode/${e}`, {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: token
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      const result = await res.json();
      console.log(result, "eryhg");

      if (result.success) {
        console.log(result, "THis is result");
        const url = `${process.env.REACT_APP_APE}/${result?.data.pdf}`;
        console.log(url);
        console.log(url);
        window.open(url, "_blank");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const getRestro = (ev) => {
    try {
      setLoading(true);
      fetch(`https://devserver.apnathali.com/api/v1/get/admin/Restaurant/${id}?search=${search}`, {
        method: "GET",
        headers: {
          Authorization: token
        }
      }).then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setResult(result)
            const startIdx = (currentPage - 1) * itemsPerPage;
            const endIdx = startIdx + itemsPerPage;
            const slicedData = customerData({
              data: result?.data.slice(startIdx, endIdx),
              view: handleViewCustomer,
              downloadQR: downloadQR,
              handleActive: handleActive
            });
            setCounts(result.counts);
            setData(slicedData);
            setLoading(false)
            //  console.log(result?.data, "This is our data for row/col");
          }
        })

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (location.pathname == '/restaurants') {
      getRestro(search);
    }
  }, [id, currentPage, search])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CreateShop show={showForm} unShow={setShowForm} data={shopId} handleRefresh={handleRefresh} />
      <ViewCustomer show={showCustomer} unShow={setshowCustomer} data={customerId} dep={c} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          {/* <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "today's money" }}
                  count="$53,000"
                  percentage={{ color: "success", text: "+55%" }}
                  icon={{ color: "info", component: "paid" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "today's users" }}
                  count="2,300"
                  percentage={{ color: "success", text: "+3%" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "new clients" }}
                  count="+3,462"
                  percentage={{ color: "error", text: "-2%" }}
                  icon={{ color: "info", component: "emoji_events" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "sales" }}
                  count="$103,430"
                  percentage={{ color: "success", text: "+5%" }}
                  icon={{
                    color: "info",
                    component: "shopping_cart",
                  }}
                />
              </Grid>
            </Grid>
          </SoftBox> */}
          <Card>
            <SoftButton
              size="small"
              color="black"
              sx={{ width: '100px', borderRadius: '5px', mx: '10px', padding: '10px 80px' }}
              onClick={() => handleShowForm(null)}
            >
              Create Shop
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
            <SoftBox py={2} mx='auto'>
              {renderPaginationControls()}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
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