import axios from "axios";
import { fetchDetailfail, fetchDetailreq, fetchDetailsucess } from "./dataSlice";
import { setPageData } from "./tableFunc";
const baseUrl = import.meta.env.VITE_API



const fetchData = async (dispatch) => {
    dispatch(fetchDetailreq())
    try {
        const res = await axios.get(`${baseUrl}/dashboard?page=1&limit=10`);
        const fetchedData = res.data.data; 
        
        dispatch(fetchDetailsucess(fetchedData))
        dispatch(setPageData(fetchedData)) 
    } catch (e) {
        dispatch(fetchDetailfail(e.message))
    }
};

export default fetchData;