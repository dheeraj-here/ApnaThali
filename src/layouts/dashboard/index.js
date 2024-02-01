
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import team2 from "assets/images/team-2.jpg";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ProfilesList from "examples/Lists/ProfilesList";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import typography from "assets/theme/base/typography";
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Skeleton } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MoneySharp } from "@mui/icons-material";
import avatar from "assets/images/cust-avatar.jpg";

function Dashboard() {

  const { size } = typography;

  const [reportsBarChartData, setReportBarChartData] = useState({});
  const [items, setItems] = useState([])
  const [profilesListData, setProfilesListData] = useState([]);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [gradientLineChartData, setGradientLineChartData] = useState({})

  useEffect(() => {
    try {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/api/v1/get/dashboard`).then((res) => res.json())
        .then((result) => {
          // console.log("This is result" , result)
          if (result.success) {
            setData(result.data)
            setLoading(false);

            result?.data?.recentMembers.map((elm) => {
              setProfilesListData((prev) => [...prev, {
                image: elm?.photo ? `${process.env.REACT_APP_IMG}${elm?.photo}` : avatar,
                name: elm?.name,
                description: `${elm?.phone}`,
                action: {
                  type: "internal",
                  route: "/dashboard",
                  color: "info",
                  label: elm?.restaurantId?.id,
                },
              }])
            });
            setReportBarChartData({
              labels: Object.keys(result.data.planAmoutByMonth),
              datasets: { label: "Earn", data: Object.values(result.data.planAmoutByMonth) },
            })
            setGradientLineChartData({
              labels: Object.keys(result.data.restaurantCountBymonth),
              datasets: [
                {
                  label: "Restaurants",
                  color: "info",
                  data: Object.values(result.data.restaurantCountBymonth),
                },
                {
                  label: "Members",
                  color: "dark",
                  data: Object.values(result.data.memberCountBymonth),
                },
              ],
            })
          }
        })
    } catch (error) {
      toast.error(error.message)
    }
  }, []);
  

  useEffect(() => {
    
    setItems([
      {
       icon: { color: "primary", component: "library_books" },
       label: "users",
       progress: { content:data.activeMembers, percentage: 60 },
     },
     {
       icon: { color: "info", component: "touch_app" },
       label: "Expense",
       progress: { content: "₹" + data.totalExpense, percentage: 90 },
     },
     {
       icon: { color: "warning", component: "payment" },
       label: "Revenue",
       progress: { content: "₹" + data.totalRestaurantRevenue, percentage: 30 },
     },
     {
       icon: { color: "error", component: "extension" },
       label: "Restro",
       progress: { content: data.activeRestaurant, percentage: 50 },
     },
   ])
  }, [data])
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={2}>
              {
                loading ? <Skeleton variant="rounded" style={{ borderRadius: "12px" }} width={280} height={80} /> :
                  <MiniStatisticsCard
                    title={{ text: "Total Restaurants" }}
                    count={data.restroCount}
                    percentage={{ color: "success", text: "+55%" }}
                    icon={{ color: "info", component: <RestaurantIcon /> }}
                  />
              }

            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              {
                loading ? <Skeleton variant="rounded" style={{ borderRadius: "12px" }} width={280} height={80} /> :
                  <MiniStatisticsCard
                    title={{ text: "Total plan" }}
                    count={data.planCount}
                    percentage={{ color: "success", text: "+3%" }}
                    icon={{ color: "info", component: "public" }}
                  />
              }
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              {
                loading ? <Skeleton variant="rounded" style={{ borderRadius: "12px" }} width={280} height={80} /> :
                  <MiniStatisticsCard
                    title={{ text: "Total Shallow member" }}
                    count={data.shallowMemberCount}
                    percentage={{ color: "error", text: "-2%" }}
                    icon={{ color: "info", component: <PeopleIcon /> }}
                  />
              }
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              {
                loading ? <Skeleton variant="rounded" style={{ borderRadius: "12px" }} width={280} height={80} /> :
                  <MiniStatisticsCard
                    title={{ text: "Total Main member" }}
                    count={data.memberCount}
                    percentage={{ color: "success", text: "+5%" }}
                    icon={{
                      color: "info",
                      component: <AccountCircleIcon />,
                    }}
                  />
              }
            </Grid>
          </Grid>
        
        </SoftBox>
        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox> */}
        <SoftBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={6}>
              {
                loading ?<>
                  <Skeleton variant="rounded" style={{ borderRadius: "12px" }} width={500} height={80} /> 
                  <Skeleton variant="rounded" style={{ borderRadius: "12px",marginTop:"15px" }} width={500} height={80} /> 
                  <Skeleton variant="rounded" style={{ borderRadius: "12px",marginTop:"15px" }} width={500} height={80} /> 
                  <Skeleton variant="rounded" style={{ borderRadius: "12px",marginTop:"15px" }} width={500} height={80} /> 
                  <Skeleton variant="rounded" style={{ borderRadius: "12px",marginTop:"15px" }} width={500} height={80} /> 
                  
                  </>
                  :
                  <ReportsBarChart
                    title="active users"
                    description={
                      <>
                        Thali App
                      </>
                    }
                    chart={reportsBarChartData}
                    items={items}
                  />
              }
            </Grid>
            <Grid item xs={12} xl={6}>
              {
                loading ?
                <>
                <Skeleton variant="rounded" style={{ borderRadius: "12px" ,}} width={680} height={80} /> 
                <Skeleton variant="rounded" style={{ borderRadius: "12px",marginTop:"15px" }} width={680} height={80} /> 
                <Skeleton variant="rounded" style={{ borderRadius: "12px",marginTop:"15px" }} width={680} height={80} /> 
                <Skeleton variant="rounded" style={{ borderRadius: "12px",marginTop:"15px" }} width={680} height={80} /> 
                <Skeleton variant="rounded" style={{ borderRadius: "12px",marginTop:"15px" }} width={680} height={80} /> 
                
                </>
                  : <GradientLineChart
                    title="Sales Overview"
                    description={
                      <SoftBox display="flex" alignItems="center">
                        <SoftBox fontSize={size.xl} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                          <Icon className="font-bold">arrow_upward</Icon>
                        </SoftBox>
                        <SoftTypography variant="button" color="text" fontWeight="medium">
                          See restaurants & Members
                          <SoftTypography variant="button" color="text" fontWeight="regular">
                            in 2023
                          </SoftTypography>
                        </SoftTypography>
                      </SoftBox>
                    }
                    height="20.25rem"
                    chart={gradientLineChartData}
                  />
              }
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects data={data?.recentRestaurants} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ProfilesList title="Recent Members" profiles={profilesListData} />
          </Grid>
        </Grid>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
