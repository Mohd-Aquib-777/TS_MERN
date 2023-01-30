import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Button, Stack, Modal, Form } from 'react-bootstrap';
import './Crud.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link as MuiLink, Typography, useMediaQuery, useTheme, DialogContentText } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    // Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    // Stack,
    TextField,
    Tooltip,
} from '@mui/material';

import { Delete, Edit, Visibility } from '@mui/icons-material';

const editUserDetail = (userData, rowUpdate, toggleForm, setDataToUpdate, addOrEdit) => {
    addOrEdit.current = 0;
    toggleForm(1);
    setDataToUpdate(userData);
    
}


const deleteTableDataAPI = async (id) =>{
    const url = `${process.env.REACT_APP_BASE_URL}crud/${id}`
    const response = await fetch(url,{
        method:'DELETE',
    }).then(e=>e.json());
    return response;
} 

function DeleteRow(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteTableData = async () => {
        const response = await deleteTableDataAPI(props.row.original.id);
        if( response.status){
            
            props.tableData.splice(props.row.index, 1);
            props.setTableData([...props.tableData]);
            setOpen(false);
            toast.success(`${response.message}`, {
                position: toast.POSITION.TOP_RIGHT
            });
        }else{
            toast.error(`${response.message}`, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        
    }

    return (
        <div>
            <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={()=>handleClickOpen()} > 
                    <Delete />
                </IconButton>
            </Tooltip>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to delete this record
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        cancel
                    </Button>
                    <Button onClick={()=>{deleteTableData()}} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const ShowTable = (props) => {
    const [tableData, setTableData] = useState([])
    if (props.isRowUpdate) {
        getData().then(e => {
            setTableData(e.data);
            props.rowUpdate(0);
        });
    }

    const columns = useMemo(
        () => [

            {
                accessorFn: (row) => row.firstName + ' ' + row.lastName, //alternate way
                id: 'age', //id required if you use accessorFn instead of accessorKey
                header: 'Full Name',
                muiTableHeadCellProps: { sx: { color: 'green' } },
                Header: () => <i>Full Name</i>,
            },
            {
                accessorKey: 'email', //simple recommended way to define a column
                header: 'Email',
                muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
                Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
            {
                accessorKey: 'gender', //simple recommended way to define a column
                header: 'Gender',
                muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
                Cell: ({ cell }) => <span>{cell.getValue() == 'm' ? 'Male' : 'Female'}</span>, //optional custom cell render
            },
            {
                accessorKey: 'skills', //simple recommended way to define a column
                header: 'Skill',
                muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
                Cell: ({ cell }) => <span>{cell.getValue().toString(',')}</span>, //optional custom cell render
            },

        ],
        [],
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={tableData}
            enableColumnOrdering //enable some features
            enableRowSelection
            enableRowNumbers
            editingMode="modal"
            enableEditing
            enablePinning
            enablePagination={true}
            enableBottomToolbar={true}
            renderDetailPanel={({ row }) => (
                <Typography color={row.original.description ? 'secondary.main' : 'text.secondary'}>
                    {row.original.description || 'No Description Provided... Yet...'}
                </Typography>
            )}
            renderRowActions={({ row, table }) => (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip arrow placement="left" title="Edit">
                        <IconButton onClick={() => editUserDetail(row.original, props.rowUpdate, props.toggleForm, props.setDataToUpdate, props.addOrEdit)}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <DeleteRow row={row} tableData={tableData} setTableData = {setTableData}  />
                    <Tooltip arrow placement="right" title="View">
                        <IconButton color="error" >
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        />    
    );

}

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function FormError(props) {

    if (Object.keys(props.fields).length && !props.fields[props.fieldName] && Object.keys(props.fields).includes(props.fieldName)) {
        return (
            <span className="text-danger formError" >
                {props.name + ' is required'}
            </span>
        )
    } else {
        if (props.fieldName == 'email' && !emailRegex.test(props.fields[props.fieldName]) && Object.keys(props.fields).includes(props.fieldName)) {
            return (
                <span className="text-danger formError" >
                    {props.name + ' is not valid'}
                </span>
            )
        }
        return '';
    }

}


async function postData(url = '', data = {}) {
    console.log(`datatatatat--------0000000`, data);
    let method = data.id ? 'PATCH' : 'POST';
    console.log(`method------------`, method);
    const response = await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(e => { return e.json() });

    return response; // parses JSON response into native JavaScript objects
}


const getData = async () => {
    let response = [];
    let url = `${process.env.REACT_APP_BASE_URL}crud`;
    try {
        response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(data => { return data.json() });
        console.log('------------===========response', response)
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
    return response;
}

const genderOption = {
    options: {
        m: "Male",
        f: "Female",
        o: "Other"
    },
    required: true,
}

const subjectOption = {
    options: {
        node: "Node",
        java: "JAVA",
        react: "React.JS",
        mongoDB: "mongoDB",
        mysql: "mysql",
    },
    required: true,
}

const delhiNcrLocation = {
    options: {
        1: "Noida",
        2: "Ghaziabad",
        3: "Gurgaon",
        4: "Faridabad"
    },
    required: true

};

const inputFlieds = {
    options: {

        firstName: {
            title: "First Name",
            required: true,
            rules: {

            }
        },

        lastName: {
            title: "Last Name",
            required: true,
            rules: {

            }
        },

        email: {
            title: "Email",
            required: true,
            rules: {

            }
        },
    }

}

const requiredFields = [
    'firstName',
    "lastName",
    "email",
    "city",
    "gender",
    "skills",

]

const FormAlert = (props) => {
    if (props.showError)
        return (
            <div className="alert alert-danger">
                Please Fill All Required Fields
            </div>
        );
    else
        return '';
}

function AddUserForm(props) {
    const [field, setField] = useState({});
    const [showError, setshowError] = useState(0)
    if (props.dataToUpdate) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setField(props.dataToUpdate);
        }, [])
    }

    function HandleChange(e) {
        console.log(e.target, e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;

        setField({ ...field, [name]: value });
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let name = e.target.name;
            let value = URL.createObjectURL(e.target.files[0]);
            setField({ ...field, [name]: value });
        } else {
            return '';
        }

    }

    const selectSkills = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let skills = new Set(field[name]);

        if (e.target.checked) {
            skills.add(value);
        } else {
            skills.delete(value);
        }
        skills = Array.from(skills);
        setField({ ...field, [name]: skills });
    }

    const changeGender = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setField({ ...field, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        let requiredFieldsFlage = true

        for (let i = 0; i < requiredFields.length; i++) {
            let e = requiredFields[i];
            let value = field[e] && field[e].length ? field[e] : '';

            if (requiredFieldsFlage && !value)
                requiredFieldsFlage = false;
        }

        setshowError(!requiredFieldsFlage);

        if (requiredFieldsFlage) {
            let url = `${process.env.REACT_APP_BASE_URL}crud`;
            const response = await postData(url, field);
            if(response.status){
                props.rowUpdate(1);
                props.toggleForm(0);
                toast.success(response.message);
            }else{
                toast.error(response.message);
            }
            
        }

    }

    return (<form className="row g-2 needs-validation" onSubmit={(e) => { submitHandler(e) }} novalidate>
        <FormAlert showError={showError} />
        {Object.keys(inputFlieds.options).map(e => {
            let formError = inputFlieds.options[e].required ? <FormError name={inputFlieds.options[e].title} fieldName={e} fields={field} /> : '';
            return (
                <div className="col-md-6">
                    <label for={e} className="form-label">{inputFlieds.options[e].title}</label>
                    <input type="text" className="form-control" value={field[e]} name={e} onChange={(ev) => { HandleChange(ev) }} />
                    {formError}
                </div>
            )
        })}

        <div className="col-md-6">
            <label for="city" className="form-label">NCR City</label>
            <select className="form-select" name="city" value={field.city} onChange={(ev) => { HandleChange(ev) }}>
                <option selected disabled>select city</option>
                {Object.keys(delhiNcrLocation.options).map(e => {
                    return (
                        <option value={e} >{delhiNcrLocation.options[e]}</option>
                    )
                })}{ }=
            </select>
            <FormError name="City" fieldName="city" fields={field} />
        </div>

        <div className="col-md-12">
            <fieldset className="border p-2">
                <legend className="float-none w-auto fs-6">Gender</legend>
                <div className="row">
                    {Object.keys(genderOption.options).map((e) => {
                        return (<div className="col-md-3">
                            <input type="radio" name="gender" checked={e === field.gender} onChange={(e) => { changeGender(e) }} value={e} />:{genderOption.options[e]}
                        </div>)
                    })}
                </div>
            </fieldset>
            <FormError name="Gender" fieldName="gender" fields={field} />
        </div>

        <div className="col-md-12">
            <fieldset className="border p-2 ">
                <legend className="float-none w-auto fs-6">Select Skills</legend>
                <div className="row">
                    {Object.keys(subjectOption.options).map((e) => {
                        return (
                            <div className="col-md-4">
                                <input type="checkbox" name="skills" checked={field?.skills?.includes(e)} value={e} onChange={(e) => { selectSkills(e) }} />:{subjectOption.options[e]}
                            </div>
                        )
                    })}
                    <FormError name="Skills" fieldName="skills" fields={field} />
                </div>
            </fieldset>
        </div>

        <div className="col-md-12">
            <lable className="form-label">Detail:</lable><br />
            <textarea cols="42" placeholder="Enter you detail"></textarea>
        </div>
        <div className="col-md-12">
            <lable className="form-label">Profile Picture</lable><br />
            <input type="file" name="profilePic" onChange={(e) => { onImageChange(e) }} /><br /><br />
            <img src={field.profilePic} width="200px" height="200px" />
        </div>

        <div className="col-12">
            <button className="btn btn-primary" type="submit">Submit form</button>
        </div>
    </form>)
}

function ShowButton(props) {
    let addOrEdit = useRef(null);
    const [isShow, toggleForm] = useState(0);
    const [isRowUpdate, rowUpdate] = useState(1);
    const [dataToUpdate, setDataToUpdate] = useState({});
    return (
        <>
            <Stack direction="pt-3" gap={2}>
                <Button as="a" variant="primary"  onClick={() => { setDataToUpdate({}); addOrEdit.current=1;toggleForm(true) }}>
                    Add User
                </Button>
            </Stack>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={() => { toggleForm(false) }}>
                    <Modal.Title >{addOrEdit.current?'Add Data':'Edit Data'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <AddUserForm toggleForm = {toggleForm} rowUpdate={rowUpdate} dataToUpdate={dataToUpdate} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => { toggleForm(false) }}>
                        Close
                    </Button>
                    <Button variant="dark" >
                        Store
                    </Button>
                </Modal.Footer>
            </Modal>
            <ShowTable addOrEdit={addOrEdit} toggleForm={toggleForm} isRowUpdate={isRowUpdate} rowUpdate={rowUpdate} setDataToUpdate={setDataToUpdate} />
            <ToastContainer />
        </>
    )
}

export {
    ShowButton,

}

