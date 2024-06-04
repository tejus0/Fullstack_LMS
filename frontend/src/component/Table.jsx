import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../redux/apiCall';
import { handleSelectAll, handleSelectRow, searchData, setPageData } from '../redux/tableFunc';
import { Link } from 'react-router-dom';

const Table = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        
        // fetchData(dispatch)
    }, [])

    const data = useSelector(state => state.data.data)
    const Pagedata = useSelector(state => state.func.pageData)
    const selectedRows = useSelector(state => state.func.selectedRows)
    const selectAll = useSelector(state => state.func.selectAll)

    // search functionality
    const [search, setsearch] = useState("")
    const [SearchBy, setSearchBy] = useState("email")
    const handelChange = (e) => {
        setsearch(e.target.value)
        if (e.target.value === "") {
            dispatch(searchData(data))
        }
        else {
            const search = data.filter((item) => item[SearchBy].toLowerCase().includes(e.target.value.toLowerCase()))
            dispatch(searchData(search))
        }
    }


    // showing Other prefreed detail of user if availabe
    const [expandedRow, setExpandedRow] = useState(null);
    const handleRowClick = (rowId) => {
        setExpandedRow(expandedRow === rowId ? null : rowId);
    };


    // sorting the table based on the user name 
    const [sortOrder, setSortOrder] = useState('asc');
    const handleSortByName = () => {
        const sortedData = [...Pagedata].sort((a, b) => {
            if (a.name < b.name) return sortOrder === 'asc' ? -1 : 1;
            if (a.name > b.name) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setPageData(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    };



    return (
        <div className="container mx-auto p-4 w">

            <div>
                <select value={SearchBy} onChange={(e) => setSearchBy(e.target.value)}>
                    <option value="email">Email</option>
                    <option value="name">Name</option>
                    <option value="state">State</option>
                    <option value="city">City</option>
                </select>
                <input type="text" placeholder='Enter email' className='border-2 border-black' value={search} onChange={handelChange} />

            </div>
            <div className={`overflow-x-auto w-${window.innerWidth}`}>
                <table className="w-full bg-white border border-gray-200 text-center">

                    <thead className=''>

                        <tr className="w-full bg-gray-100">
                            <th className="py-2 px-4 border-b">
                                <input type="checkbox" checked={selectAll} onChange={() => dispatch(handleSelectAll())} />
                            </th>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={handleSortByName}>Registered Name</th>
                            <th className="py-2 px-4 border-b"> Email</th>
                            <th className="py-2 px-4 border-b">Mobile Number</th>
                            <th className="py-2 px-4 border-b">State</th>
                            <th className="py-2 px-4 border-b">City</th>
                            <th className="py-2 px-4 border-b">Registration Date</th>
                            <th className="py-2 px-4 border-b">Source </th>
                            <th className="py-2 px-4 border-b">Preferred College </th>
                            <th className="py-2 px-4 border-b">Course Selected </th>
                            <th className="py-2 px-4 border-b">Assigned to </th>
                            <th className="py-2 px-4 border-b">Total Response </th>
                        </tr>

                    </thead>

                    <tbody className=''>

                        {
                            Pagedata.length == 0 ?
                                <tr>
                                    <td>
                                        No data Found
                                    </td>
                                </tr>
                                : Pagedata.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <tr key={i} className={`${selectedRows.includes(item._id) ? 'bg-blue-200' : ''} my-3 cursor-pointer`} onClick={() => handleRowClick(i)}>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(item._id)}
                                                    onChange={() => dispatch(handleSelectRow({ id: item._id }))}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap"> <Link to={`/student/${item._id}`}>{item.name}</Link></td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"> {item.contactNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.state}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"> {item.city}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"> {item.createdAt}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"> {item.source}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"> {item.preffredCollege}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"> {item.courseSelected}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"> {item.assignedCouns.length > 0 ? item.assignedCouns.length : "Not Yet Assigned"}</td>

                                            <td className="px-6 py-4 whitespace-nowrap"> {item.otherResponse.length}</td>
                                        </tr>

                                        {(expandedRow === i && item.otherResponse.length > 0) && (
                                            <tr className="hidden-row bg-gray-50">
                                                <td className="px-6 py-4"></td>
                                                {item.otherResponse.map((detail, index) => (
                                                    <React.Fragment key={i}>
                                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{detail.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap"> {detail.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap"> {detail.contactNumber}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{item.state}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap"> {item.city}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap"> {detail.submitedAt}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap"> {detail.source}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap"> {detail.preffredCollege}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap"> {detail.courseSelected}</td>
                                                    </React.Fragment>
                                                ))}
                                            </tr>
                                        )}

                                    </React.Fragment>
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
        </div >
    );
};

export default Table;
