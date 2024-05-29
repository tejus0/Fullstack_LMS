import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
    const baseUrl = import.meta.env.VITE_API



    // TODO :- all this bunch of cluster will be removed and added to redux slice 
    const [data, setdata] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/dashboard?page=1&limit=10`);
                const fetchedData = res.data.data;
                console.log(fetchedData);
                setdata(fetchedData);
                setPagedata(fetchedData)
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [])

    const [Pagedata, setPagedata] = useState(data)

    const [selectedRows, setSelectedRows] = useState([]);

    const [selectAll, setSelectAll] = useState(false);

    const [sortOrder, setSortOrder] = useState('asc');

    const [search, setsearch] = useState("")

    const [SearchBy, setSearchBy] = useState("email")




    // Till here

    const handleSelectRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
            setSelectAll(false);
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    }

    // this is for select all rows
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(data.map((item) => item.id));
        }
        setSelectAll(!selectAll);
    }

    // till now only be sorted on the baises of name 
    const handleSortByName = () => {
        const sortedData = [...Pagedata].sort((a, b) => {
            if (a.name < b.name) return sortOrder === 'asc' ? -1 : 1;
            if (a.name > b.name) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setPagedata(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        console.log(sortOrder);
    };

    const handelChange = (e) => {
        setsearch(e.target.value)
        if (e.target.value === "") {
            setPagedata(data)
        }
        else {
            // const fldata = Pagedata.filter((item) => item[SearchBy].toLowerCase().includes(e.target.value.toLowerCase()))
            setPagedata(data.filter((item) => item[SearchBy].includes(e.target.value)))
        }
    }

    return (
        <div className="container mx-auto p-4">

            <div>
                <select value={SearchBy} onChange={(e) => setSearchBy(e.target.value)}>
                    <option value="email">Email</option>
                    <option value="name">Name</option>
                    <option value="mobile">Mobile</option>
                    <option value="state">State</option>
                    <option value="city">City</option>
                </select>
                <input type="text" placeholder='Enter email' className='border-2 border-black' value={search} onChange={handelChange} />

            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 text-center">
                    <thead>
                        <tr className="w-full bg-gray-100">
                            <th className="py-2 px-4 border-b">
                                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                            </th>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={handleSortByName}>Registered Name</th>
                            <th className="py-2 px-4 border-b">Registered Email</th>
                            <th className="py-2 px-4 border-b">Registered Mobile</th>
                            <th className="py-2 px-4 border-b">State</th>
                            <th className="py-2 px-4 border-b">City</th>
                            <th className="py-2 px-4 border-b">User Registration Date</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {Pagedata.length == 0 ?
                            <div className='flex justify-center items-center text-center w-full'>
                                No data Found
                            </div>

                            : Pagedata.map((item, i) => (
                                <tr key={i} className={`${selectedRows.includes(item.id) ? 'bg-blue-200' : ''} my-3`}>
                                    <td className="py-5 px-4 border-b border-b-black ">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.id)}
                                            onChange={() => handleSelectRow(item.id)}
                                        />
                                    </td>
                                    <td className="py-5 px-4 border-b border-b-black border-r border-r-black">{item.name}</td>
                                    <td className="py-5 px-4 border-b border-b-black border-r border-r-black">{item.email}</td>
                                    <td className="py-5 px-4 border-b border-b-black border-r border-r-black">{item.contactNumber}</td>
                                    <td className="py-5 px-4 border-b border-b-black border-r border-r-black">{item.state}</td>
                                    <td className="py-5 px-4 border-b border-b-black border-r border-r-black">{item.city}</td>
                                    <td className="py-5 px-4 border-b border-b-black border-r border-r-black">{item.createdAt}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">Show More Leads</button>
                <div>
                    <label className="mr-2">Show Rows</label>
                    <select className="border border-gray-300 rounded py-1 px-2">
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Table;
