import react from "react";
import CreateTask from '../components/CreateTask';
import TaskCard from "../components/TaskCard";

const Home = () => {
    return <>
        <div className="pages">
            <TaskCard
                description='Natação'
                duration={255}
                dispBegin={[2, 5]}
                dispEnd={[4,13]}
                timeBegin={[15, 0]}
                timeEnd={[16, 0]}
            />
        </div>
    </>;
};

export default Home;