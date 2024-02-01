
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
import SoftTypography from 'components/SoftTypography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const index = () => {
    const [n, setN] = useState(0)
    const [refresh, setRefresh] = useState(0);
    const options = ['Restaurents', 'Members']
    const [mess, setMess] = useState([
        {
            message: ''
        },
        {
            message: ''
        }
    ])
    const [inputFields, setInputFields] = useState([
        {
            name: 'desc-0',
            value: ''
        },
    ]);

    const [selectedValue, setSelectedValue] = useState('')
    const handleRefresh = () => setRefresh(refresh + 1);
    const [values, setValues] = useState({
        message: "",
        no: ""
    });

    useEffect(() => {
        setValues({
            message: "",
            no: ""
        })
    }, [refresh])

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value)
        console.log(event.target.value);
    };

    const addPhoneBox = () => {
        console.log('Add clicked', inputFields.length);
        const newIndex = inputFields.length;
        const newField = {
            name: `desc-${newIndex}`,
            value: '',
        };
        setInputFields((prev) => [...prev, newField]);
        console.log(inputFields.length);
    }
    const removePhoneBox = (index) => {
        if (inputFields.length === 1) {
            // Ensure there is always at least one phone box
            return;
        }
        const newInputFields = [...inputFields];
        newInputFields.splice(index, 1);
        setInputFields(newInputFields);
    }

    const onChangeMessage = (index, value) => {
        console.log(index, value.target.value, '12345');
        if (index === 0) {
            setMess((prev) => [
                {
                    message: value.target.value,
                },
                ...prev.slice(1)
            ])
        }
        else {
            setMess((prev) => [
                ...prev.slice(0, 1),
                {
                    message: value.target.value
                }
            ])
        }
    }

    const onChange = (index, value) => {
        // console.log(index, value.target.value, '123456');
        const newInputFields = [...inputFields];
        newInputFields[index].value = value.target.value;
        setInputFields(newInputFields);
    };
    const send = () => {
        try {
            const { message, no } = values;

            const formData = new FormData();
            formData.append('message', message);
            formData.append('no', no);

            //     fetch(data == null ? `${process.env.REACT_APP_API}/api/v1/create/expense/${id}` : `${process.env.REACT_APP_API}/api/v1/update/expense/${data?._id}`, {
            //         method: data == null ? "POST" : "PUT",
            //         headers: {
            //             Accept: "application/json",
            //             Authorization: token
            //         },
            //         body: formData
            //     }).then((res) => res.json())
            //         .then((result) => {
            //             if (result.success) {
            //                 toast.success(result.message);
            //                 unShow();
            //                 handleRefresh()
            //             } else {
            //                 toast.error(result.message)
            //             }
            //         })
        } catch (error) {
            toast.error(error.message)
        }
    }
    // const onChange = (e) => {
    //     const name = e.target.name;
    //     if (e.target.files) {
    //         if (e.target.files?.length > 1) {
    //             setValues({ ...values, [name]: [...e.target.files] });
    //         } else {
    //             setValues({ ...values, [name]: e.target.files[0] });
    //         }
    //     } else {
    //         const value = e.target.value;
    //         setValues({ ...values, [name]: value });
    //     }
    // };

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
                        <SoftBox mx='auto' mb={1}>
                            Send to a number
                        </SoftBox>
                        <SoftBox m={1}>

                            <SoftInput
                                index={0}
                                name="message"
                                placeholder="Write message..."
                                icon={{ component: "message", direction: "left" }}
                                onChange={(value) => onChangeMessage(0, value)}
                                value={mess[0].message}
                            />
                        </SoftBox>
                        <SoftBox display='flex' flexWrap='wrap'>
                            {inputFields.map((field, index) => (
                                <SoftBox key={index} m={1} display="flex" flexBasis="45%">
                                    <SoftInput
                                        name={`desc-${index}`}
                                        placeholder="Enter No."
                                        icon={{ component: "phone", direction: "left" }}
                                        onChange={(value) => onChange(index, value)}
                                        value={field.value}
                                    />
                                    {index > 0 && (
                                        <RemoveCircleOutlineIcon cursor="pointer" fontSize='large' onClick={() => removePhoneBox(index)} />
                                    )}

                                </SoftBox>
                            ))}
                        </SoftBox>
                        <SoftBox mt={2} sx={{ mx: 'auto' }}>
                            <AddCircleOutlineIcon cursor="pointer" fontSize='large' onClick={addPhoneBox} />
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
                <Card
                    sx={{
                        backdropFilter: `saturate(200%) blur(100px)`,
                        backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                        boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                        position: "relative",
                        mt: 5,
                        mx: 'auto',
                        py: 1,
                        px: 1,
                        maxWidth: '50px',
                        borderRadius: '100%'
                    }}
                >
                    <SoftBox color='black'>
                        OR
                    </SoftBox>
                </Card>
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
                        <SoftBox mx='auto' mb={1}>
                            Send to a community
                        </SoftBox>
                        <SoftBox m={1}>
                            <SoftInput
                                index={1}
                                name="message"
                                placeholder="Write message..."
                                icon={{ component: "message", direction: "left" }}
                                onChange={(value) => onChangeMessage(1, value)}
                                value={mess[1].message}
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
