import react, { useCallback, useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 } from 'uuid';

import styles from './styles.module.scss';
import Modal from '../Modal';

const EditTask = ({id}) => {
  const data = JSON.parse(localStorage.getItem('tasks'));
  let oldTask;
  data.forEach(element => {
    if (element.id === id){
      oldTask = element
    }
  });

  const index = data.findIndex((task) => {
    return task.id == id;
  });

  const [descriptionInput, setDescriptionInput] = useState(oldTask.description);
  const [weekDays, setWeekDays] = useState(oldTask.weekDays);
  const [durationInput, setDurationInput] = useState(oldTask.duration);
  const [dispBeginInput, setDispBeginInput] = useState('00:00');
  const [dispEndInput, setDispEndInput] = useState('00:00');

  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    durationToTime(oldTask.duration);
    dispBeginToTime(oldTask.dispBegin);
    dispEndToTime(oldTask.dispEnd);
  }, []);

  const handleDescriptionInput = useCallback((e) => {
    setDescriptionInput(e.target.value);
  }, [descriptionInput]);

  const handleWeekDaysClick = useCallback((index) => {
    const newWeekDays = weekDays.slice();
    newWeekDays[index] = !newWeekDays[index];
    setWeekDays(newWeekDays);
  }, [weekDays]);

  const handleToggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleDurationInput = useCallback((e) => {
    setDurationInput(e.target.value);
  }, [durationInput]);

  const handleDispBeginInput = useCallback((e) => {
    setDispBeginInput(e.target.value);
  }, [dispBeginInput]);

  const handleDispEndInput = useCallback((e) => {
    setDispEndInput(e.target.value);
  }, [dispEndInput]);

  const durationToTime = function (duration){
    let hour = Math.floor(duration/60).toString();
    let minute = (duration%60).toString();
    if(hour.length == 1) hour = "0" + hour;
    if(minute.length == 1) minute = "0" + minute;
    setDurationInput(hour + ":" + minute);
  }

  const dispBeginToTime = function (disp){
    let hour = disp[0].toString()
    let minute = disp[1].toString()
    if (hour.length == 1) hour = '0' + hour;
    if (minute.length == 1) minute = '0' + minute;
    setDispBeginInput(hour + ":" + minute);
  }

  const dispEndToTime = function (disp){
    let hour = disp[0].toString()
    let minute = disp[1].toString()
    if (hour.length == 1) hour = '0' + hour;
    if (minute.length == 1) minute = '0' + minute;
    setDispEndInput(hour + ":" + minute);
  }

  const handleEditTask = useCallback(() => {
    const [ durationHours, durationMinutes ] = durationInput.split(':').map(n => Number(n));
    const dispBegin = dispBeginInput.split(':').map(n => Number(n));
    const dispEnd = dispEndInput.split(':').map(n => Number(n));

    if (descriptionInput.length == 0) {
      toast.error('Descrição inválida.');
      return;
    }

    if (dispBegin[0] * 60 + dispBegin[1] >= dispEnd[0] * 60 + dispEnd[1]) {
      toast.error('Intervalo de disponibilidade inválido.');
      return;
    }

    const task = {
      id: id,
      description: descriptionInput,
      duration: durationHours * 60 + durationMinutes,
      dispBegin,
      dispEnd,
      isDone: false,
      weekDays,
      timeBegin: undefined,
      timeEnd: undefined
    }

    

    let currentTasks = localStorage.getItem('tasks');
    if (!currentTasks) currentTasks = '[]';

    currentTasks = JSON.parse(currentTasks);
    //currentTasks.push(task);
    currentTasks[index] = task;
    console.log(index);

    localStorage.setItem('tasks', JSON.stringify(currentTasks));

    setIsModalOpen(false);

    toast.success('Tarefa editada com sucesso!');
  }, [descriptionInput, durationInput, dispBeginInput, dispEndInput, weekDays]);

  return (
    <>
      <Modal isOpen={isModalOpen}>
        <div className={styles.container}>
          <h1>Adicionar Tarefa</h1>
          <div className={styles.divider}></div>

          <div className={styles.inputField}>
            <label>Descrição</label>
            <input
              type="text"
              placeholder="Ex. Academia"
              value={descriptionInput}
              onChange={(e) => handleDescriptionInput(e)}
            />
          </div>

          <div className={styles.inputField}>
            <label>Dias da Semana</label>
            <div>
              <button onClick={() => handleWeekDaysClick(0)} className={weekDays[0] && styles.active}>Dom</button>
              <button onClick={() => handleWeekDaysClick(1)} className={weekDays[1] && styles.active}>Seg</button>
              <button onClick={() => handleWeekDaysClick(2)} className={weekDays[2] && styles.active}>Ter</button>
              <button onClick={() => handleWeekDaysClick(3)} className={weekDays[3] && styles.active}>Qua</button>
              <button onClick={() => handleWeekDaysClick(4)} className={weekDays[4] && styles.active}>Qui</button>
              <button onClick={() => handleWeekDaysClick(5)} className={weekDays[5] && styles.active}>Sex</button>
              <button onClick={() => handleWeekDaysClick(6)} className={weekDays[6] && styles.active}>Sáb</button>
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputField}>
              <label>Duração</label>
              <input
                type="time"
                value={durationInput}
                onChange={(e) => handleDurationInput(e)}
              />
            </div>

            <div className={styles.inputField}>
              <label>Disponibilidade</label>
              <div>
                <input
                  type="time"
                  value={dispBeginInput}
                  onChange={(e) => handleDispBeginInput(e)}
                />
                <input
                  type="time"
                  value={dispEndInput}
                  onChange={(e) => handleDispEndInput(e)}
                />
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          <button
            className={styles.addBtn}
            type='submit'
            onClick={handleEditTask}
          >
            Editar
          </button>

          <div className={styles.closeBtn} onClick={handleToggleModal}>
            <i className="fa-solid fa-x"></i>
          </div>

        </div>
      </Modal>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}



export default EditTask;