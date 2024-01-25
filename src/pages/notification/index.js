
import BasicModal from 'components/Modal'
import React, { useEffect, useState } from 'react'
import SoftInput from "components/SoftInput";
import Uploader from "components/ApnaUploader";
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import { Card } from '@mui/material';
import toast from 'react-hot-toast';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Dashboard from "layouts/dashboard";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const index = () => {

    const [refresh, setRefresh] = useState(0);
    const options = ['Restaurents', 'Members']
    const [selectedValue, setSelectedValue] = useState('')

    const handleRefresh = () => setRefresh(refresh + 1);
    const [values, setValues] = useState({
        title: "",
        description: "",
        icon: "",
    });

    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value)
        console.log(event.target.value,);
    };

    // useEffect(() => {
    //     if (id != null) {
    //         setValues({
    //             title: data?.title,
    //             description: data?.description,
    //             amount: data?.amount,
    //         })
    //         console.log(data);
    //     }
    // }, [data])

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const send = () => {
        try {
            const { title, description, icon } = values;

            const formData = new FormData();
            typeof (values.photo) == 'object' && formData.append('photo', photo);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('icon', icon);

            fetch( `${process.env.REACT_APP_API}/api/v1/create/expense/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: token
                },
                body: formData
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
    const onChange = (e) => {
        const name = e.target.name;
        if (e.target.files) {
            if (e.target.files?.length > 1) {
                setValues({ ...values, [name]: [...e.target.files] });
            } else {
                setValues({ ...values, [name]: e.target.files[0] });
            }
        } else {
            const value = e.target.value;
            setValues({ ...values, [name]: value });
        }
    };

    useEffect(() => {
        setValues({
            title: "",
            description: "",
            icon: "",
        });
    }, [refresh])

    return (
        <div>

            <DashboardLayout>
                <DashboardNavbar />
                <SoftBox mt={2} >
                    <Card
                        sx={{
                            backdropFilter: `saturate(200%) blur(30px)`,
                            backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                            boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                            position: "relative",
                            mt: 5,
                            mx: 'auto',
                            py: 2,
                            px: 2,
                            maxWidth: '500px'
                        }}
                    >
                        <SoftBox m={1}>
                            <SoftInput
                                name="title"
                                placeholder="Enter Title"
                                icon={{ component: "title", direction: "left" }}
                                onChange={onChange}
                                value={values.title}
                            />
                        </SoftBox>
                        <SoftBox m={1}>
                            <SoftInput
                                name="description"
                                placeholder="Write message..."
                                icon={{ component: "message", direction: "left" }}
                                onChange={onChange}
                                value={values.description}
                            />
                        </SoftBox>
                        <SoftBox m={1}>
                            <SoftInput
                                name="icon"
                                value={values.icon}
                                placeholder="Icon" 
                                icon={{ component: "icon", direction: "left" }}
                                onChange={onChange}
                            />
                        </SoftBox>
                        <SoftBox px="10px" mb={2}>
                            <select
                                id="dynamicDropdown"
                                value={selectedValue}
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
                                    Select the receiver
                                </option>
                                {options.map((option) => (
                                    <option key={option.length} value={option}>
                                        {option}
                                    </option>

                                ))}
                            </select>
                        </SoftBox>                        <SoftButton
                            type="submit"
                            size="small"
                            color="black"
                            fullWidth
                            onClick={send}
                        >
                            send
                        </SoftButton>
                    </Card>
                </SoftBox>
            </DashboardLayout>
        </div>
    )
}

export default index
