
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
import Loading from "components/ApnaLoading";
import BasicModal from "components/Modal";
import { Switch } from "@mui/material";
import SoftButton from "components/SoftButton";
// import ViewCustomer from "./";


const index = ({ show, unShow, handleFresh, data }) => {

    // const [data, setData] = useState([]);
    const [counts, setCounts] = useState([]);
    // const { columns, rows } = data;
    const [loading, setLoading] = useState(false);
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const [showCustomer, setshowCustomer] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [phone, setPhone] = useState('');
    const [resId, setResId] = useState('');
    const [connected, setConnected] = useState(false)
    const [payStatus, setPayStatus] = useState('');
    const [delStatus, setDelStatus] = useState('')
    const payment = ['pending', 'completed'];
    const status = ['ordered', 'shipped', 'outForDelivery', 'delivered', 'cancelled', 'returned'];

    useEffect(() => {
        // console.log(data, "sdfghjk");
        // data.map((op) => {
        //   console.log(op.id);
        // })
    }, []);

    const handleDropdownChange = (event) => {
        console.log(event.target, '234567890');
        const { name, value } = event.target;
        if (name == 'payment') setPayStatus(value);
        else setDelStatus(value)
    };

    const handleSwitch = async (e) => {
        unShow();
        console.log( data, 'fcku');

        try {
            // console.log("Switch changes", machineData, resId);
            const res = await fetch(`${process.env.REACT_APP_API}/api/v1/update/machineOrder/${data}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    "status": `${delStatus}`,
                    "paymentStatus": `${payStatus}`
                })
            });

            if (!res.ok) {
                console.log("Error in res.ok");
            }

            const result = await res.json();
            if (result.success) {
                toast.success(result.message);
                console.log("Order updated!", payStatus, delStatus);
                handleFresh();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message, ":Error in catch ");
        }
    }


    return (
        <BasicModal show={show} unShow={unShow} width={600} top="70%">
            {/* <ViewCustomer show={showCustomer} unShow={setshowCustomer} id={customerId}/> */}
            <SoftBox mt={3} >
                <Card >
                    <SoftBox display='flex' flexbasis='45%'>
                        <SoftBox>
                            <SoftBox p='10px 20px'>
                                Select Payment status
                            </SoftBox>
                            <SoftBox px="20px">
                                <select
                                    id="dynamicDropdown"
                                    value={payStatus}
                                    name="payment"
                                    onChange={handleDropdownChange}
                                    style={{
                                        padding: '8px',
                                        fontSize: '16px',
                                        width: '200px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    <option value="" disabled>
                                        Select status
                                    </option>
                                    {payment.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </SoftBox>
                        </SoftBox>

                        <SoftBox>
                            <SoftBox p='10px 20px'>
                                Select Delivery status
                            </SoftBox>
                            <SoftBox px="20px">
                                <select
                                    id="dynamicDropdown"
                                    name="order"
                                    value={delStatus}
                                    onChange={handleDropdownChange}
                                    style={{
                                        padding: '8px',
                                        fontSize: '16px',
                                        width: '200px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    <option value="" disabled>
                                        Select status
                                    </option>
                                    {status.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </SoftBox>
                        </SoftBox>
                    </SoftBox>

                    <SoftBox p='10px 20px' >
                        {(payStatus || delStatus) &&
                            <SoftButton
                                size="small"
                                color="black"
                                onClick={() => handleSwitch()}
                            >
                                Save
                            </SoftButton>
                        }
                    </SoftBox>

                </Card>
            </SoftBox>
        </BasicModal>
    );
}

export default index;
