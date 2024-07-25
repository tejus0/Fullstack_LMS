import { useParams } from "react-router-dom";
import ShowAllleads from "../admin/showAllLeads";
import Table from "./Table/Table"
import { useDispatch } from "react-redux";
import { updateCounsellorId } from "../../redux/dataSlice";

const CounsellorDashboard = () => {
    const id = useParams().id;
    const dispatch = useDispatch()
    dispatch(updateCounsellorId(id))
    return (
        <div>
            {/* <Table /> */}

            {window.localStorage.getItem("user-type") == 'user' ? <Table /> : <ShowAllleads />}

        </div>
    )
}

export default CounsellorDashboard;
