import { useCallback, useEffect, useMemo, useState } from "react";

import CreateTask from '../components/CreateTask';
import EditTask from "../components/EditTask";
import TaskCard from "../components/TaskCard";
import NotificationModal from "../components/NotificationModal";

import styles from './styles.module.scss';

const Home = () => {

    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(undefined);
    const [removingTask, setRemovingTask] = useState({});
    const [tasks, setTasks] = useState({
        toBeAllocated: [],
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        nonAllocated: [],
    });

    const [isNotificationOpen, setIsNotificationOpen] = useState(true);

    const dayOfWeek = useMemo(() => {
        const days = [
            { symbol: 'D', name: 'sunday' },
            { symbol: 'S', name: 'monday' },
            { symbol: 'T', name: 'tuesday' },
            { symbol: 'Q', name: 'wednesday' },
            { symbol: 'Q', name: 'thursday' },
            { symbol: 'S', name: 'friday' },
            { symbol: 'S', name: 'saturday' },
        ]
        return days;
    }, []);

    const updateTasks = useCallback(() => {
        const data = localStorage.getItem('tasks');
        if (!data) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return;
        }
        setTasks(JSON.parse(data));
    }, [tasks]);

    const editTask = useCallback((task, region, day = null) => {
        setEditingTask(Object.assign(task, { region, day }));
        setIsEditTaskOpen(true);
    }, []);

    const handleRemoveTask = useCallback((task, region, day = null) => {
        setRemovingTask({ task, region, day });
        setIsNotificationOpen(true);
    }, []);

    const removeTask = useCallback(() => {
        const { task, region, day } = removingTask;
        console.log(removingTask, task, region, day)
        
        if (region === 0) {
            const index = tasks.toBeAllocated.findIndex(_task => _task.id === task.id);
            tasks.toBeAllocated.splice(index, 1);
        } else if (region === 1) {
            const index = tasks.nonAllocated.findIndex(_task => _task.id === task.id);
            tasks.nonAllocated.splice(index, 1);
        } else {
            const index = tasks[day].findIndex(_task => _task.id === task.id);
            tasks[day].splice(index, 1);
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTasks();

        setIsNotificationOpen(false);
    }, [removingTask, updateTasks, tasks]);

    useEffect(() => {
        updateTasks();
    }, []);

    return <>
        <div className={`pages ${styles.container}`}>
            <div className={styles.tasks}>
                <div>
                    <h1>Tarefas que serão<br></br>alocadas</h1>
                    <div>
                        {tasks.toBeAllocated.map(task => (
                            <TaskCard
                                key={task.id}
                                description={task.description}
                                dispBegin={task.dispBegin}
                                dispEnd={task.dispEnd}
                                duration={task.duration}
                                editHandler={() => editTask(task, 0)}
                                removeHandler={() => handleRemoveTask(task, 0)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h1>Tarefas que não puderam<br></br>ser alocadas</h1>
                    <div>
                        {tasks.nonAllocated.map(task => (
                            <TaskCard
                                key={task.id}
                                description={task.description}
                                dispBegin={task.dispBegin}
                                dispEnd={task.dispEnd}
                                duration={task.duration}
                                editHandler={() => editTask(task, 1)}
                                removeHandler={() => handleRemoveTask(task, 1)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.schedule}>
                {dayOfWeek.map(({ symbol, name }, i) => (
                    <div key={name}>
                        <h1
                            style={i === (new Date()).getDay() ? {color: 'rgb(146, 107, 255)'} : {}}
                        >
                            {symbol}
                        </h1>
                        <div>
                            {tasks[name].map(task => (
                                <TaskCard
                                    key={task.id}
                                    small={true}
                                    description={task.description}
                                    dispBegin={task.dispBegin}
                                    dispEnd={task.dispEnd}
                                    duration={task.duration}
                                    editHandler={() => editTask(task, 2, name)}
                                    removeHandler={() => handleRemoveTask(task, 2, name)}
                                />
                            ))}
                        </div>
                    </div>
                
                ))}
            </div>
            <div className={styles.divider}></div>
            <div className={styles.footer}>
                <div>
                    <button className='btnSecondary'>
                        <i className="fa-solid fa-arrows-rotate"></i> Organizar
                    </button>
                </div>
                <div>
                    <button className='btnSecondary' onClick={() => setIsCreateTaskOpen(true)}>
                        Adicionar tarefa
                    </button>
                    <button className='btnPrimary'>
                        Salvar
                    </button>
                </div>
            </div>

            <CreateTask
                isOpen={isCreateTaskOpen}
                setIsOpen={setIsCreateTaskOpen}
                update={updateTasks}
            />

            <EditTask
                task={editingTask}
                isOpen={isEditTaskOpen}
                setIsOpen={setIsEditTaskOpen}
                update={updateTasks}
            />

            <NotificationModal
                type='alert'
                message='Deseja remover a tarefa?'
                text='Remover uma tarefa a excluirá do seu planejamento. Essa ação é irreversível!'
                btn1Text='Cancelar'
                btn2Text='Confirmar'
                isOpen={isNotificationOpen}
                onClose={() => {setIsNotificationOpen(false)}}
                onSuccess={() => {removeTask()}}
            />
        </div>
    </>;
};

export default Home;