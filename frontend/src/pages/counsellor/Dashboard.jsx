import ShowAllleads from "../admin/showAllLeads";
import Table from "./Table/Table"

const CounsellorDashboard = () => {

    return (
        <div>
            {/* <Table /> */}
            
            {window.localStorage.getItem("user-type") == 'user' ? <Table /> : <ShowAllleads />}

        </div>
    )
}

export default CounsellorDashboard;
