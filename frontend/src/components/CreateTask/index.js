import { useCallback, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { v4 } from 'uuid';

import styles from './styles.module.scss';
import Modal from '../Modal';

const CreateTask = ({ isOpen, setIsOpen, update }) => {

  const [descriptionInput, setDescriptionInput] = useState('');
  const [weekDays, setWeekDays] = useState([false, false, false, false, false, false, false]);
  const [durationInput, setDurationInput] = useState('00:00');
  const [dispBeginInput, setDispBeginInput] = useState('00:00');
  const [dispEndInput, setDispEndInput] = useState('00:00');
  const [colorInput, setColorInput] = useState('#ff7a8e');

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleColorInput = useCallback((e) => {
    setColorInput(e.target.value);
  }, []);

  const handleAddTask = useCallback(() => {
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

    const task = {
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
      color: colorInput
    }

    const currentTasks = JSON.parse(localStorage.getItem('tasks'));

    currentTasks.toBeAllocated.push(task);

    localStorage.setItem('tasks', JSON.stringify(currentTasks));

    setIsModalOpen(false);
    setIsOpen(false);
    update();

    setDescriptionInput('');
    setWeekDays([false, false, false, false, false, false, false]);
    setDurationInput('00:00');
    setDispBeginInput('00:00');
    setDispEndInput('00:00');
    setColorInput('#ff7a8e');

    toast.success('Tarefa criada com sucesso!');

  }, [descriptionInput, durationInput, dispBeginInput, dispEndInput, colorInput, weekDays, setIsOpen, update]);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen])

  return (
    <>
      <Modal isOpen={isModalOpen}>
        <div className={styles.container}>
          <h1>Adicionar Tarefa</h1>
          <div className={styles.divider}></div>

          <div className={styles.inputField}>
            <label>Descrição</label>
            <div>
              <input
                type="text"
                placeholder="Ex. Academia"
                value={descriptionInput}
                onChange={(e) => handleDescriptionInput(e)}
                style={{ flex: 1, marginRight: '8px' }}
              />
              <div className={styles.colorPickerWrapper}>
                <input 
                  type="color"
                  onChange={(e) => handleColorInput(e)}
                  value={colorInput}
                />
                <i className="fa-solid fa-eye-dropper"></i>
              </div>
            </div>
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
            onClick={handleAddTask}
          >
            Adicionar
          </button>

          <div className={styles.closeBtn} onClick={handleToggleModal}>
            <i className="fa-solid fa-x"></i>
          </div>

        </div>
      </Modal>
    </>
  )
}

export default CreateTask;