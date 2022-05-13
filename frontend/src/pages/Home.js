import react from "react";
import CreateTask from '../components/CreateTask';
import EditTask from "../components/EditTask";

const Home = () => {
    return <>
        <div className="pages">
            Home Page
            <EditTask />
            {/*<CreateTask />*/}
        </div>
    </>;
};

export default Home;