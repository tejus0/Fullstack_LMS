import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import * as XLSX from 'xlsx';
import { requiredFields, requiredFieldsFornoteOnly, totalFields } from '../data/requiredFieldBulk';
import toast from 'react-hot-toast';
import axios from 'axios';
const BulkUpload = ({ open, onClose }) => {
    const baseUrl = import.meta.env.VITE_API;
    const [val, setVal] = useState('')

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            setVal(file)
            reader.onload = async (e) => {

                const ab = e.target.result;
                const workbook = XLSX.read(ab, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

                const filteredJsonData = jsonData.map(row => {
                    return Object.keys(row)
                        .filter(key => !key.startsWith("__EMPTY"))
                        .reduce((obj, key) => {
                            obj[key] = row[key];
                            return obj;
                        }, {});
                });

                if (filteredJsonData.length === 0) {
                    toast.error("The Sheet you uploaded don't have values");
                }

                else {
                    const uploadedField = Object.keys(filteredJsonData[0])
                    const allFieldPresent = requiredFields.every(field => uploadedField.includes(field))

                    const noExtraFields = uploadedField.every(field => totalFields.includes(field));

                    let count = 0;
                    let emptyAt;
                    if (!allFieldPresent || !noExtraFields) {
                        toast.error("Sheet you uploaded don't have required fields")
                    }
                    else {
                        let isIncorrect = false
                        const fieldsToCheckType = ['contactNumber', 'neetAIR']
                        const hasEmptyFields = filteredJsonData.some(row => {
                            count = count + 1
                            return requiredFields.some(field => {
                                const isEmpty = row[field] === "" || row[field] === null || row[field] === undefined;

                                if (isEmpty) {
                                    emptyAt = count
                                    toast.error(`${field} is empty in your excel sheet at line number ${emptyAt} `)
                                }
                                return isEmpty;
                            });
                        });


                        if (hasEmptyFields) {
                            // toast.error(`Some fields are empty at line number ${count}`)
                            setVal('')
                            return;
                        }

                        filteredJsonData.forEach((elem) => (
                            fieldsToCheckType.forEach((item) => {
                                if (typeof elem[item] === 'string') {
                                    return isIncorrect = true
                                }
                            })

                        ))

                        if (isIncorrect) {
                            toast.error("Some data is not in correct format")
                        }
                        else {
                            let arr = []
                            filteredJsonData.forEach(row => {
                                fieldsToCheckType.forEach(field => {
                                    row[field] = String(row[field]);
                                });
                                arr.push(row)
                            });


                            try {
                                const res = await toast.promise(
                                    axios.post(`${baseUrl}/insertFromSheet`, filteredJsonData, {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        withCredentials:true
                                    }),

                                    {
                                        loading: "File is Uploading ...",
                                        success: "File Uploaded Successfully",
                                        error: "Failed to upload file",
                                    }

                                )

                            } catch (error) {
                                toast.error(error.response.data.msg);
                            }
                        }
                    }
                }
                setVal('')
            };
            reader.readAsArrayBuffer(file);

        }
        // if (file) {
        //   const reader = new FileReader();
        //   reader.onload = async (e) => {
        //     const data = new Uint8Array(e.target.result);
        //     const workbook = XLSX.read(data, { type: "array" });
        //     const sheetName = workbook.SheetNames[0];
        //     const worksheet = workbook.Sheets[sheetName];
        //     const jsonData = XLSX.utils.sheet_to_json(worksheet);

        //     try {
        //       const response = await toast.promise(
        //         axios.post(`${baseUrl}/insertFromSheet`, jsonData, {
        //           headers: {
        //             "Content-Type": "application/json",
        //           },
        //         }),

        //         {
        //           loading: "File is Uploading ...",
        //           success: "File Uploaded Successfully",
        //           error: "Failed to upload file",
        //         }

        //       )
        //     } catch (error) {
        //       console.error("Error uploading file and inserting data", error);
        //     }
        //   };
        //   reader.readAsArrayBuffer(file);
        // }
    };

    const list = () => (
        <div className='m-5'>

            <div className="mb-4 p-4 bg-white shadow-md rounded-lg w-full ">
                <h2 className="text-xl font-bold mb-2">Required Fields</h2>
                <ul className="list-disc pl-5">
                    {requiredFieldsFornoteOnly.map((field, index) => (
                        <li key={index} className="mb-1">
                            <span className="font-semibold">{field.name}</span> - <span className="italic">{field.type}</span>
                        </li>
                    ))}
                </ul>

                <div className='my-5'>

                    <a
                        href="/Book1.xlsx"
                        download
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Download Template
                    </a>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center h-full ">
                <label htmlFor="file-input" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Choose File
                </label>
                <input
                    type="file"
                    id="file-input"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    key={val}
                    className="hidden"
                />
            </div>
        </div>
    );

    return (
        <Drawer
            anchor="top"
            open={open}
            onClose={onClose}
        >
            {list()}
        </Drawer>
    );
};

export default BulkUpload;