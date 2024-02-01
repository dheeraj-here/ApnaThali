import BasicModal from 'components/Modal'
import React, { useEffect, useState } from 'react'
import SoftInput from "components/SoftInput";
import Uploader from "components/ApnaUploader";
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import { Card } from '@mui/material';
import toast from 'react-hot-toast';

const index = ({ show, unShow, handleRefresh, data }) => {

    const [values, setValues] = useState({
        title: "",
        description: "",
        amount: 0,
        photo: ""
    });

    useEffect(() => {
        if(id!=null){
        setValues({
            title: data?.title,
            description: data?.description,
            amount: data?.amount,
            photo: `${process.env.REACT_APP_IMG}/${data?.photo}`
        })
        console.log(data);
    }
    }, [data])

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const handleCreateExpense = () => {
        try {
            const { title, description, amount, photo } = values;

            const formData = new FormData();
           typeof(values.photo)=='object'&& formData.append('photo', photo);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('amount', amount);

            fetch(data==null?`${process.env.REACT_APP_API}/api/v1/create/expense/${id}`:`${process.env.REACT_APP_API}/api/v1/update/expense/${data?._id}`, {
                method: data==null?"POST":"PUT",
                headers: {
                    Accept: "application/json",
                    Authorization: token
                },
                body: formData
            }).then((res) => res.json())
                .then((result) => {
                    console.log(result, "this is result");
                    if (result.success) {
                        toast.success(result.message);
                        unShow();
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

    return (
        <div>

            <BasicModal show={show} unShow={unShow}>
                <SoftBox mt={2}>
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
                                placeholder="Enter Description"
                                icon={{ component: "subtitles", direction: "left" }}
                                onChange={onChange}
                                value={values.description}
                            />
                        </SoftBox>
                        <SoftBox m={1}>
                            <SoftInput
                                name="amount"
                                type="number"
                                value={values.amount}
                                placeholder="Enter Amount"
                                icon={{ component: "paid", direction: "left" }}
                                onChange={onChange}
                            />
                        </SoftBox>
                        <Uploader name="photo" multiple={false} images={values.photo} onChange={onChange} />
                        <SoftButton
                            type="submit"
                            size="small"
                            color="black"
                            fullWidth
                            onClick={handleCreateExpense}
                        >
                          {data==null?'submit':'update'} 
                        </SoftButton>
                    </Card>
                </SoftBox>
            </BasicModal>
        </div>
    )
}

export default index