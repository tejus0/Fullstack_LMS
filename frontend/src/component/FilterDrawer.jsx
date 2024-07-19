// CustomDrawer.jsx
import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, TextField } from '@mui/material';

const FilterDrawer = ({ open, onClose, onChange, SearchBy, search, setSearchBy, columns, handleSelectRow }) => {

    const list = () => (
        <div>
            <List>
                <ListItem>
                    <div className="flex justify-end">
                        <select value={SearchBy} onChange={(e) => setSearchBy(e.target.value)} className="border-2 border-black border-r-0 w-[100px]">
                            {/* <option value="email">Email</option> */}
                            <option value="name">Name</option>
                            <option value="neetScore">neetScore</option>
                            <option value="state">state</option>
                            <option value="courseSelected">courseSelected</option>
                            <option value="contactNumber">contactNumber</option>
                        </select>
                        <input type="text" placeholder="Search..." value={search} onChange={onChange} />

                    </div>
                </ListItem>

                <ListItem className='flex flex-col gap-5  justify-start items-start'>
                    <h1>
                        Select Fields
                    </h1>
                    <div className='grid grid-cols-3 gap-3'>
                        {

                            columns.map((pro, i) => (
                                <div key={i} className='flex gap-2'>

                                    <input type="checkbox" checked={pro.visible} onChange={() => handleSelectRow(pro.label)} />
                                    <label>{pro.label}</label>

                                </div>
                            ))
                        }
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
