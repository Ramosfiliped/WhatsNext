import { useCallback, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { v4 } from 'uuid';

import styles from './styles.module.scss';
import Modal from '../Modal';

const EditTask = ({ task, isOpen, setIsOpen, update }) => {

  const [descriptionInput, setDescriptionInput] = useState('');
  const [weekDays, setWeekDays] = useState([]);
  const [durationInput, setDurationInput] = useState('00:00');
  const [dispBeginInput, setDispBeginInput] = useState('00:00');
  const [dispEndInput, setDispEndInput] = useState('00:00');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!task) return;
    durationToTime(task.duration);
    dispBeginToTime(task.dispBegin);
    dispEndToTime(task.dispEnd);
    setDescriptionInput(task.description);
    setWeekDays(task.weekDays);
  }, [task]);

  const handleDescriptionInput = useCallback((e) => {
    setDescriptionInput(e.target.value);
  }, []);

  const handleWeekDaysClick = useCallback((index) => {
    const newWeekDays = weekDays.slice();
    newWeekDays[index] = !newWeekDays[index];
    setWeekDays(newWeekDays);
  }, [weekDays]);

  const handleToggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
    setIsOpen(!isModalOpen);
  }, [isModalOpen, setIsOpen]);

  const handleDurationInput = useCallback((e) => {
    setDurationInput(e.target.value);
  }, []);

  const handleDispBeginInput = useCallback((e) => {
    setDispBeginInput(e.target.value);
  }, []);

  const handleDispEndInput = useCallback((e) => {
    setDispEndInput(e.target.value);
  }, []);

  const durationToTime = function (duration){
    let hour = Math.floor(duration/60).toString();
    let minute = (duration%60).toString();
    if(hour.length === 1) hour = "0" + hour;
    if(minute.length === 1) minute = "0" + minute;
    setDurationInput(hour + ":" + minute);
  }

  const dispBeginToTime = function (disp){
    let hour = disp[0].toString()
    let minute = disp[1].toString()
    if (hour.length === 1) hour = '0' + hour;
    if (minute.length === 1) minute = '0' + minute;
    setDispBeginInput(hour + ":" + minute);
  }

  const dispEndToTime = function (disp){
    let hour = disp[0].toString()
    let minute = disp[1].toString()
    if (hour.length === 1) hour = '0' + hour;
    if (minute.length === 1) minute = '0' + minute;
    setDispEndInput(hour + ":" + minute);
  }

  const handleEditTask = useCallback(() => {
    const [ durationHours, durationMinutes ] = durationInput.split(':').map(n => Number(n));
    const dispBegin = dispBeginInput.split(':').map(n => Number(n));
    const dispEnd = dispEndInput.split(':').map(n => Number(n));

    if (descriptionInput.length === 0) {
      toast.error('Descrição inválida.');
      return;
    }

    if (durationHours * 60 + durationMinutes === 0) {
      toast.error('Duração inválida.');
      return;
    }

    if (dispBegin[0] * 60 + dispBegin[1] >= dispEnd[0] * 60 + dispEnd[1]) {
      toast.error('Intervalo de disponibilidade inválido.');
      return;
    }

    const newTask = {
      id: v4(),
      description: descriptionInput,
      duration: durationHours * 60 + durationMinutes,
      dispBegin,
      dispEnd,
      isDone: false,
      weekDays,
      timeBegin: undefined,
      timeEnd: undefined,
      isDone: false,
    }

    const currentTasks = JSON.parse(localStorage.getItem('tasks'));

    let index = currentTasks.toBeAllocated.findIndex(_task => _task.id === task.id);
    if (index != -1) currentTasks.toBeAllocated.splice(index, 1);
    index = currentTasks.nonAllocated.findIndex(_task => _task.id === task.id);
    if (index != -1) currentTasks.nonAllocated.splice(index, 1);

    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    days.forEach(day => {
      index = currentTasks[day].findIndex(_task => _task.id === task.id);
      if (index != -1) currentTasks[day].splice(index, 1);
    });

    currentTasks.toBeAllocated.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(currentTasks));

    setIsModalOpen(false);
    setIsOpen(false);
    update();

    toast.success('Tarefa editada com sucesso!');
  }, [descriptionInput, durationInput, dispBeginInput, dispEndInput, weekDays, setIsOpen, task, update]);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen])

  return (
    <>
      <Modal isOpen={isModalOpen}>
        <div className={styles.container}>
          <h1>Editar Tarefa</h1>
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
              <button onClick={() => handleWeekDaysClick(0)} className={weekDays[0] ? styles.active : ''}>Dom</button>
              <button onClick={() => handleWeekDaysClick(1)} className={weekDays[1] ? styles.active : ''}>Seg</button>
              <button onClick={() => handleWeekDaysClick(2)} className={weekDays[2] ? styles.active : ''}>Ter</button>
              <button onClick={() => handleWeekDaysClick(3)} className={weekDays[3] ? styles.active : ''}>Qua</button>
              <button onClick={() => handleWeekDaysClick(4)} className={weekDays[4] ? styles.active : ''}>Qui</button>
              <button onClick={() => handleWeekDaysClick(5)} className={weekDays[5] ? styles.active : ''}>Sex</button>
              <button onClick={() => handleWeekDaysClick(6)} className={weekDays[6] ? styles.active : ''}>Sáb</button>
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
    </>
  )
}



export default EditTask;