import { useCallback, useMemo, useState } from 'react';

import { toast } from 'react-toastify';

import styles from './styles.module.scss';

const TaskCard = ({small = false, description, duration, dispBegin, dispEnd, timeBegin, timeEnd, color, editHandler, removeHandler, markTask, isDone }) => {

  const [isChecked, setIsChecked] = useState(isDone);

  const handleCheckboxChange = useCallback((e) => {
    const checked = e.target.checked;
    markTask(checked);
    setIsChecked(checked);
    
    if (checked) {
      toast.success('Tarefa marcada como concluída!');
    } else {
      toast.success('Tarefa marcada como não concluída!');
    }
  }, [markTask]);

  const parsedDuration = useMemo(() => {
    const hours = String(Math.floor(duration / 60)).padStart(2, '0');
    const minutes = String(duration % 60).padStart(2, '0');
    return `${hours}:${minutes}`;
  }, [duration]);

  const formatTime = useCallback((time) => {
    return String(time[0]).padStart(2, '0') + ':' + String(time[1]).padStart(2, '0');
  }, []);

  return (
    <div className={`${styles.container} ${small ? styles.small : ''}`} >
      <p>{description}</p>
      <p>{parsedDuration}h</p>
      {
        timeBegin ?
        <p>{formatTime(timeBegin)} ~ {formatTime(timeEnd)}</p> :
        <p>{formatTime(dispBegin)} ~ {formatTime(dispEnd)}</p>
      }

      {small && <div className={styles.checkBoxContainer}>
        <input type="checkbox" onChange={(e) => handleCheckboxChange(e)} checked={isChecked} />
      </div>}

      <div
        className={styles.colorBar}
        style={{ backgroundColor: color }}
      ></div>

      <section className={styles.actions}>
        <button onClick={editHandler}>
          <i className="fa-solid fa-pencil"></i>
        </button>
        <button onClick={removeHandler}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </section>
    </div>
  )
}

export default TaskCard;