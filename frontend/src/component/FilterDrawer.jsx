import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';

const FilterDrawer = ({ open, onClose, columns, handleSelectRow, setdate, filterDate, date, handleToggleTable, showNewTable, setShowNewTable, setShowUnassignedTable, isAdmin, resetUser, setYoutubeLeads, selectedCampaignId, setCampaignId, campaignOptions }) => {
    // State for dropdown selection       
    const baseUrl = import.meta.env.VITE_API
    const [selectedOption, setSelectedOption] = useState('');
    const [showFilter, setShowFilter] = useState(true)
    const [showCampaignDropdown, setShowCampaignDropdown] = useState(false);
    // const [showYoutubeLeads, setShowYoutubeLeads] = useState(false)
    // const [selectedCampaignId, setCampaignId] = useState('');
  

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setdate({ ...date, [name]: value });
    };

    useEffect(() => {
        const handleDropdownChange = () => {

            if (selectedOption === "allLeads") {
                setShowNewTable(false)
                setShowUnassignedTable(false)
                setShowFilter(true)
                setShowCampaignDropdown(false);
                setYoutubeLeads(false)
            }
            else if (selectedOption === "offlineVisits") {
                setShowUnassignedTable(false)
                setShowNewTable(true)
                setShowFilter(false)
                setShowCampaignDropdown(false);
                setYoutubeLeads(false)
            }
            else if (selectedOption === "unassignedLeads") {
                setShowUnassignedTable(true)
                setShowFilter(false)
                setShowCampaignDropdown(false);
                setYoutubeLeads(false)
            } 

            else if (selectedOption === "youtube") {
                setShowCampaignDropdown(true);
                setShowFilter(false);
                setYoutubeLeads(true);
                setShowUnassignedTable(false);
                setShowNewTable(false);
            }
        };

        handleDropdownChange()
    }, [selectedOption])


    const handleCampaignIdChange = (e) =>{
        const newValue = e.target.value
        setCampaignId((prev) => prev === newValue ? '' : newValue)
        // setShowYoutubeLeads(true)
    }



    const list = () => (
        <div className='p-4'>
            <List>
                <ListItem className='flex flex-col gap-5 justify-start items-start'>

                    {
                        showFilter &&
                        <>
                            <h1 className='bg-gray-200 p-2 rounded-sm font-semibold'>Select Fields</h1>
                            <div className='grid grid-cols-4 gap-4'>
                                {columns.map((pro, i) => (
                                    <div key={i} className='flex gap-2'>
                                        <input
                                            id={i}
                                            type="checkbox"
                                            checked={pro.visible}
                                            onChange={() => handleSelectRow(pro.label)}
                                            className='cursor-pointer'
                                        />
                                        <label htmlFor={i} className='font-semibold cursor-pointer'>{pro.label}</label>
                                    </div>
                                ))}
                            </div>
                        </>
                    }

                    {isAdmin ?
                        <div className='flex flex-col gap-2 mt-4'>
                            {
                                showFilter &&
                                <>
                                    <div className='flex gap-2'>
                                        <div className='flex flex-col'>
                                            <h1>Start Date</h1>
                                            <input
                                                name='startDate'
                                                type="date"
                                                onChange={handleDateChange}
                                                className=' cursor-pointer'
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <h1>End Date</h1>
                                            <input
                                                name='endDate'
                                                type="date"
                                                onChange={handleDateChange}
                                                className=' cursor-pointer '
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className='bg-blue-700 p-3 text-white rounded-lg mt-2'
                                        onClick={filterDate}
                                    >
                                        Sort
                                    </button>
                                    <button
                                        className='bg-blue-700 p-3 text-white rounded-lg mt-2'
                                        onClick={resetUser}
                                    >
                                        Reset
                                    </button>

                                </>

                            }
                            <div className='mt-4'>
                                <FormControl fullWidth>
                                    <p id="filter-label">Leads To Show</p>
                                    <Select
                                        labelId="filter-label"
                                        value={selectedOption}
                                        onChange={event => setSelectedOption(event.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="allLeads" >All Leads</MenuItem>
                                        <MenuItem value="offlineVisits">Offline Visits</MenuItem>
                                        <MenuItem value="unassignedLeads">Unassigned Leads</MenuItem>
                                        <MenuItem value="youtube">YouTube Leads</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {showCampaignDropdown && (
                                <div className='mt-4'>
                                    <FormControl fullWidth>
                                        <p id="campaign-label">Campaign Id</p>
                                        <Select
                                            labelId="campaign-label"
                                            value={selectedCampaignId}
                                            onChange={handleCampaignIdChange}
                                            displayEmpty
                                        >
                                            {campaignOptions?.map((option) => { 
                                                console.log(option)
                                                return <MenuItem value={option}>{option}</MenuItem>
                                            })}
                                            {/* <MenuItem value="2">2</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        className='mt-2'
                                        // onClick={handleApplyClick}
                                    >
                                        Apply
                                    </Button> */}
                                </div>
                            )}
                        </div> : ""}

                </ListItem>
            </List>
        </div>
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            {list()}
        </Drawer>
    );
};

export default FilterDrawer;