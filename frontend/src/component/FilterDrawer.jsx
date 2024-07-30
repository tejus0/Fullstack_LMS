import React, { useState,useEffect } from 'react';
import { Drawer, List, ListItem, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const FilterDrawer = ({ open, onClose, columns, handleSelectRow, setdate, filterDate, date, handleToggleTable,showNewTable,setShowNewTable,setShowUnassignedTable }) => {
    // State for dropdown selection
    const [selectedOption, setSelectedOption] = useState('');

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setdate({ ...date, [name]: value });
    };

    useEffect(() => {
        const handleDropdownChange = () => {
            
            if(selectedOption==="allLeads"){
                setShowNewTable(false)
            }
            else if(selectedOption==="offlineVisits"){
                setShowNewTable(true)
            }
            else if(selectedOption==="unassignedLeads"){
                setShowUnassignedTable(true)
            }
        };

    handleDropdownChange()
    }, [selectedOption])
    


    const list = () => (
        <div className='p-4'>
            <List>
                <ListItem className='flex flex-col gap-5 justify-start items-start'>
                    <h1>Select Fields</h1>
                    <div className='grid grid-cols-3 gap-3'>
                        {columns.map((pro, i) => (
                            <div key={i} className='flex gap-2'>
                                <input
                                    type="checkbox"
                                    checked={pro.visible}
                                    onChange={() => handleSelectRow(pro.label)}
                                />
                                <label>{pro.label}</label>
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2 mt-4'>
                        <div className='flex gap-2'>
                            <div className='flex flex-col'>
                                <h1>Start Date</h1>
                                <input
                                    name='startDate'
                                    type="date"
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <h1>End Date</h1>
                                <input
                                    name='endDate'
                                    type="date"
                                    onChange={handleDateChange}
                                />
                            </div>
                        </div>
                        <button
                            className='bg-blue-700 p-3 text-white rounded-lg mt-2'
                            onClick={filterDate}
                        >
                            Sort
                        </button>
                    <div className='mt-4'>
                        <FormControl fullWidth>
                            <p id="filter-label">Leads To Show</p>
                            <Select
                                labelId="filter-label"
                                value={selectedOption}
                                onChange={event=>setSelectedOption(event.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="allLeads" >All Leads</MenuItem>
                                <MenuItem value="offlineVisits">Offline Visits</MenuItem>
                                <MenuItem value="unassignedLeads">Unassigned Leads</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    </div>

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
