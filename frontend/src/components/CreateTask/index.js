import react, { useCallback, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import Modal from '../Modal';

const CreateTask = () => {

  const [descriptionInput, setDescriptionInput] = useState('');
  const [weekDays, setWeekDays] = useState([true, false, true, false, false, false, false]);

  const handleDescriptionInput = useCallback((e) => {
    setDescriptionInput(e.target.value);
  }, [descriptionInput]);

  const handleWeekDaysClick = useCallback((index) => {
    const newWeekDays = weekDays.slice();
    newWeekDays[index] = !newWeekDays[index];
    setWeekDays(newWeekDays);
  }, [weekDays]);

  return (
    <Modal isOpen={true}>
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

        <div className={styles.inputField}>
          <label>Duração</label>
          <input type="time" />
        </div>

        <div className={styles.inputField}>
          <label>Disponibilidade</label>
          <div>
            <input type="time" />
            <input type="time" />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CreateTask;