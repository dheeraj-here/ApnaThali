
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
    const options = ['users', 'members', 'all']
    const op = ['PUSH', 'APP', 'BOTH']
    // const [selectedValue, setSelectedValue] = useState('')

    const handleRefresh = () => setRefresh(refresh + 1);
    const [values, setValues] = useState({
        title: "",
        description: "",
        link: '',
        icon: "",
        selectedValue: '',
        op: ''
    });

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setValues({
            ...values,
            selectedValue: selectedValue
        })
    };

    const handleDropdownChange2 = (event) => {
        const op = event.target.value;
        setValues({
            ...values,
            op: op
        })
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
            console.log('send starts');
            const { title, description, link, icon, selectedValue, op } = values;

            const formData = new FormData();
            typeof (values.icon) == 'object' && formData.append('icon', icon);
            formData.append("send", op);
            formData.append('title', title);
            formData.append('link', link)
            formData.append('type', selectedValue);
            formData.append('description', description);

            fetch(`${process.env.REACT_APP_API}/api/v1/send/notification`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: token
                },
                body: formData,
                redirect: 'follow'
            }).then((res) => res.json())
                .then((result) => {
                    console.log(result, "this is result...");
                    if (result.success) {
                        toast.success("Message sent successfully!");
                        console.log(title, selectedValue, icon, description, "qwerty");
                        handleRefresh()
                    } else {
                        toast.error("Message not sent!")
                    }
                })
        } catch (error) {
            toast.error(error.message)
        }
    }
    const onChange = (e) => {
        console.log(e.target.value, '4567');
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
            link: "",
            icon: "",
            selectedValue: '',
            op: ''
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
                                name="link"
                                placeholder="Paste link"
                                icon={{ component: "link", direction: "left" }}
                                onChange={onChange}
                                value={values.link}
                            />
                        </SoftBox>
                        <Uploader name="icon" multiple={false} images={values.icon} onChange={onChange} />
                        <SoftBox px="10px" mb={2}>
                            <SoftBox mb={2}>
                                <select
                                    id="dynamicDropdown"
                                    value={values.selectedValue}
                                    onChange={handleDropdownChange}
                                    style={{
                                        padding: '8px',
                                        fontSize: '16px',
                                        width: '200px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                    }}
                                >w
                                    <option value="" disabled>
                                        Select the receiver
                                    </option>
                                    {options.map((option) => (
                                        <option key={option.length} value={option}>
                                            {option}
                                        </option>

                                    ))}
                                </select>
                            </SoftBox>
                            <SoftBox mb={2}>
                                <select
                                    id="dynamicDropdown"
                                    value={values.op}
                                    onChange={handleDropdownChange2}
                                    style={{
                                        padding: '8px',
                                        fontSize: '16px',
                                        width: '200px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                    }}
                                >w
                                    <option value="" disabled>
                                        Select
                                    </option>
                                    {op.map((op) => (
                                        <option key={op.length} value={op}>
                                            {op}
                                        </option>

                                    ))}
                                </select>
                            </SoftBox>
                        </SoftBox>
                        <SoftButton
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
