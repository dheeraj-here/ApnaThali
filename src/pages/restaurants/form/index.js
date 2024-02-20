import BasicModal from 'components/Modal'
import React, { useEffect, useState } from 'react'
import SoftInput from "components/SoftInput";
import Uploader from "components/ApnaUploader";
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import { Card } from '@mui/material';
import toast from 'react-hot-toast';
import SoftTypography from 'components/SoftTypography';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';

const index = ({ show, unShow, handleRefresh, data }) => {

    const [location, setLocation] = useState(null);
    const [fetched, setFetched] = useState('Get Current Location')

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                    setFetched("Location Fetched!")
                    console.log(latitude, '123', position.coords);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    console.log(data, 'data in form');
    const option = ['veg', 'non-veg', 'both'];
    const typeOfRes = ['restaurant', 'tiffin', 'mess']
    const [values, setValues] = useState({
        name: "",
        description: "",
        phone: "",
        sunday: "",
        sundaySpecial: "",
        launch: "",
        dinner: "",
        logo: '',
        prefVal: '',
        type: '',
        upiId: '',
        email: '',
        ownerName: ''
    });

    const [plans, setPlans] = useState([
        {
            name: '',
            thaliName: '',
            items: '',
            price: '',
            expiry: '',
            thaliCount: ''

        }
    ]);

    const tags = ['best', 'top'];

    const [selectedImages, setSelectedImages] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const newImages = Array.from(selectedFiles);
        setSelectedImages([...selectedImages, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    }
    // const addPlan = () => {
    //     const newPlan = {
    //         name: '',
    //         thaliName: '',
    //         items: '',
    //         price: '',
    //     };

    //     // Create a new array by spreading the existing plans and adding the new plan
    //     setPlans(prevPlans => [...prevPlans, newPlan]);
    // }

    useEffect(() => {
        setValues({
            name: "",
            description: "",
            phone: "",
            sunday: "",
            sundaySpecial: "",
            launch: "",
            dinner: "",
            logo: '',
            prefVal: '',
            type: '',
            upiId: '',
            email: '',
            ownerName: ''
        });

        setPlans([]);
    }, [handleRefresh])

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const handleCreateExpense = async () => {
        try {
            const { name, description, phone, sunday, sundaySpecial, launch, dinner, logo, prefVal, type, upiId, email, ownerName } = values;
            {
                plans.map((elm, i) => {
                    console.log(elm, elm.name, elm.thaliName, elm.items, elm.price, i, 'sdfgh');
                })
            };
            console.log(name, description, phone, sunday, sundaySpecial, launch, dinner, logo, prefVal, type, upiId, email, ownerName, "12345");
            let formData = new FormData();
            typeof (values.logo) == 'object' && formData.append('logo', logo);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('phone', phone);
            formData.append('sunday', sunday);
            formData.append('sundaySpecial', sundaySpecial);
            if (type === 'restaurant') {
                formData.append('openTime', launch);
                formData.append('closeTime', dinner);
            } else {
                formData.append('launch', launch);
                formData.append('dinner', dinner);
            }
            formData.append('preference', prefVal);
            formData.append('type', type)
            formData.append('upiId', upiId)
            formData.append('email', email)
            formData.append('ownerName', ownerName)
            formData.append('coordinates', JSON.stringify(location))


            {
                plans.map((elm, i) => {
                    console.log("map runs: ", elm);
                    formData.append(`plans[${i}][name]`, elm.name);
                    formData.append(`plans[${i}][thaliName]`, elm.thaliName);
                    formData.append(`plans[${i}][items]`, elm.items);
                    formData.append(`plans[${i}][price]`, elm.price);
                    formData.append(`plans[${i}][expiry]`, elm.expiry);
                    formData.append(`plans[${i}][thaliCount]`, elm.thaliCount);
                })
            }

            {
                tags.map((elm, i) => {
                    formData.append(`tags[${i}]`, elm);
                })
            }
            {
                selectedImages.map((elm, i) => {
                    formData.append(`photos`, elm)
                })
            }

            console.log(...formData, '1234567890');
            const res = await fetch(data == null ? `${process.env.REACT_APP_API}/api/v1/create/shop/${id}` : `${process.env.REACT_APP_API}/api/v1/update/shop/${data._id}`, {
                method: data == null ? 'POST' : 'PUT',
                headers: {
                    Accept: "application/json",
                    // 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: token
                },
                body: formData,
                redirect: 'follow'
            });
            if (!res.ok) console.log("Error in res!", res);
            const result = await res.json();

            console.log(result, "this is result.");
            if (result.success) {
                toast.success(result.message);
                unShow();
                handleRefresh();
            } else {
                toast.error("Can't create shop!")
            }
        } catch (error) {
            toast.error("Shop did not created!");
            console.log(error);
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

    const addPlan = () => {
        // console.log(plans, '34567');
        const newPlan = {
            name: '',
            thaliName: '',
            items: '',
            price: '',
            expiry: '',
            thaliCount: ''
        };

        // Update the plans state with the new plan
        setPlans([...plans, newPlan]);
    }

    const onChangePlan = (index, field, value) => {
        // console.log(index, value.target.value, '123456');
        // const newInputFields = [...inputFields];
        // newInputFields[index][field] = value.target.value;
        // setPlans(newInputFields);

        setPlans((prevPlans) => {
            const newPlans = [...prevPlans];
            newPlans[index][field] = value.target.value;
            return newPlans;
        });
    };

    const removePlan = (ind, value) => {
        if (plans.length === 1) {
            // Ensure there is always at least one phone box
            return;
        }
        const newInputFields = [...plans];
        newInputFields.splice(ind, 1);
        setPlans(newInputFields);
    }

    const handleDropdownChange = (e) => {
        console.log(e.target.name === 'pref');
        if (e.target.name === 'pref') {
            setValues({
                ...values,
                prefVal: e.target.value
            })
        } else {
            setValues({
                ...values,
                type: e.target.value
            })
        }
    }
    return (
        <div>
            <BasicModal show={show} unShow={unShow} height="90vh">
                <SoftBox mt={2}>
                    <SoftTypography ml={3} variant="h4"> Restaurent Details</SoftTypography>
                    <Card
                        sx={{
                            backdropFilter: `saturate(200%) blur(30px)`,
                            backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                            boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                            position: "relative",
                            mx: 3,
                            py: 2,
                            px: 2,
                            my: 1
                        }}
                    >
                        <SoftBox style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '1px' }}>
                            <SoftBox mb={2} >
                                <select
                                    name="pref"
                                    value={values.prefVal}
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
                                        Select Preference
                                    </option>
                                    {option.map((op) => (
                                        <option key={op.length} value={op}>
                                            {op}
                                        </option>
                                    ))}
                                </select>
                            </SoftBox>

                            <SoftBox mb={2} ml={{ md: '6px' }}>
                                <select
                                    name="type"
                                    value={values.type}
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
                                        Select Shop Type
                                    </option>
                                    {typeOfRes.map((op) => (
                                        <option key={op.length} value={op}>
                                            {op}
                                        </option>
                                    ))}
                                </select>
                            </SoftBox>

                            <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                <SoftInput
                                    name="name"
                                    placeholder="Enter Name"
                                    onChange={onChange}
                                    value={values.name}
                                />
                            </SoftBox>

                            <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                <SoftInput
                                    name="description"
                                    placeholder="Enter Description"
                                    onChange={onChange}
                                    value={values.description}
                                />
                            </SoftBox>
                            <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                <SoftInput
                                    name="sunday"
                                    placeholder="Enter Sunday plans"
                                    onChange={onChange}
                                    value={values.sunday}
                                />
                            </SoftBox>
                            <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                <SoftInput
                                    name="sundaySpecial"
                                    placeholder="Enter Sunday Special"
                                    onChange={onChange}
                                    value={values.sundaySpecial}
                                />
                            </SoftBox>
                            {values.type && values.type === 'restaurant' && <>
                                <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                    <SoftInput
                                        name="launch"
                                        placeholder='Open Time'
                                        onChange={onChange}
                                        value={values.launch}
                                    />
                                </SoftBox>
                                <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                    <SoftInput
                                        name="dinner"
                                        placeholder='Close Time'
                                        onChange={onChange}
                                        value={values.dinner}
                                    />
                                </SoftBox>
                            </>}

                            {values.type && values.type !== 'restaurant' && <>
                                <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                    <SoftInput
                                        name="launch"
                                        placeholder='Lunch Time'
                                        onChange={onChange}
                                        value={values.launch}
                                    />
                                </SoftBox>
                                <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                    <SoftInput
                                        name="dinner"
                                        placeholder='Dinner Time'
                                        onChange={onChange}
                                        value={values.dinner}
                                    />
                                </SoftBox>
                            </>}

                            <SoftBox display='flex'>
                                <SoftButton onClick={handleGetLocation}>{fetched} {location ? '✅' : ''}</SoftButton>
                            </SoftBox>
                        </SoftBox>

                    </Card>

                    <SoftTypography mt={4} ml={3} variant="h3">Personal Details</SoftTypography>
                    <Card
                        sx={{
                            backdropFilter: `saturate(200%) blur(30px)`,
                            backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                            boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                            position: "relative",
                            mx: 3,
                            py: 2,
                            px: 2,
                            my: 1,
                        }}
                    >
                        <SoftBox style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '1px' }}>

                            <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                <SoftInput
                                    name="ownerName"
                                    placeholder="Enter Owner Name"
                                    onChange={onChange}
                                    value={values.ownerName}
                                />
                            </SoftBox>
                            <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                <SoftInput
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    onChange={onChange}
                                    value={values.phone}
                                />
                            </SoftBox>
                            <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                <SoftInput
                                    name="email"
                                    placeholder="Enter Email"
                                    onChange={onChange}
                                    value={values.email}
                                />
                            </SoftBox>
                            <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                <SoftInput
                                    name="upiId"
                                    placeholder="Enter UPI id"
                                    onChange={onChange}
                                    value={values.upiId}
                                />
                            </SoftBox>
                        </SoftBox>
                    </Card>

                    <SoftTypography mt={4} ml={3} variant="h3">Plans</SoftTypography>
                    <Card
                        sx={{
                            backdropFilter: `saturate(200%) blur(30px)`,
                            backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                            boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                            position: "relative",
                            mx: 3,
                            py: 2,
                            px: 2,
                            my: 1,
                        }}
                    >
                        {plans.length > 0 && plans.map((elm, ind) => (
                            <SoftBox ml={2} mb={2} key={ind}>
                                <SoftTypography ml={2} variant="h5">Plan {ind + 1}</SoftTypography>

                                <SoftBox style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '1px' }}>
                                    <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                        <SoftInput name={`name-${ind}`} type="name" value={plans[ind].name} placeholder="Enter name" onChange={(e) => onChangePlan(ind, 'name', e)} />
                                    </SoftBox>
                                    <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>

                                        <SoftInput name={`thaliName-${ind}`} type="name" value={plans[ind].thaliName} placeholder="Enter Thali Name" onChange={(e) => onChangePlan(ind, 'thaliName', e)} />
                                    </SoftBox>

                                    <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                        <SoftInput name={`items-${ind}`} type="name" value={plans[ind].items} placeholder="Enter Items" onChange={(e) => onChangePlan(ind, 'items', e)} />
                                    </SoftBox>

                                    <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                        <SoftInput name={`price-${ind}`} type="number" value={plans[ind].price} placeholder="Enter Price" onChange={(e) => onChangePlan(ind, 'price', e)} onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }} />
                                    </SoftBox>

                                    <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                        <SoftInput name={`expiry-${ind}`} type="name" value={plans[ind].expiry} placeholder="Enter Expiry Date" onChange={(e) => onChangePlan(ind, 'expiry', e)} />
                                    </SoftBox>
                                    <SoftBox m={1} flexBasis={{ md: '47%', sm: '80%' }} style={{ maxWidth: '100%' }}>
                                        <SoftInput name={`thaliCount-${ind}`} type="name" value={plans[ind].thaliCount} placeholder="Enter thaliCount" onChange={(e) => onChangePlan(ind, 'thaliCount', e)} />
                                    </SoftBox>
                                </SoftBox>

                                {ind > 0 && (
                                    <SoftButton color='dark' size='small' onClick={(e) => removePlan(ind, e)}>Remove plan</SoftButton>
                                )}
                            </SoftBox>
                        ))}

                        <SoftBox m={2} style={{ maxWidth: '100%', justifyContent: 'center' }}>
                            <SoftButton size='small' color='dark' onClick={addPlan}>Add new plan</SoftButton>
                        </SoftBox>
                    </Card>

                    <SoftBox mt={2}>
                        <SoftTypography mt={2} ml={1} variant="h5">Select Photos</SoftTypography>

                        <SoftInput
                            type="file"
                            name="photo"
                            multiple
                            onChange={handleFileChange}
                        />
                        <SoftBox m={2} key={index} style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '1px' }}>
                            {selectedImages.map((image, index) => (
                                <SoftBox key={index} flexBasis={{ md: '49%', sm: '100%' }} style={{ maxWidth: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>

                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Selected Image ${index}`}
                                            style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '10px' }}
                                        />
                                        <SoftTypography mb={8} style={{
                                            position: 'relative',
                                            // top: '1px',
                                            // right: '5px',
                                            color: 'red',
                                            cursor: 'pointer',
                                        }} onClick={() => handleRemoveImage(index)}><CloseIcon /></SoftTypography>
                                    </div>
                                </SoftBox>
                            ))}
                        </SoftBox>
                    </SoftBox>

                    <SoftTypography mt={2} ml={1} variant="h5">Select Logo</SoftTypography>
                    <Uploader name="logo" multiple={false} images={values.logo} onChange={onChange} />
                    <SoftButton
                        type="submit"
                        size="small"
                        color="black"
                        fullWidth
                        onClick={handleCreateExpense}
                    >
                        {data == null ? 'submit' : 'update'}
                    </SoftButton>
                </SoftBox>
            </BasicModal>
        </div>
    )
}

export default index 