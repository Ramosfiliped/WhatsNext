import { useCallback, useMemo } from 'react';

import styles from './styles.module.scss';

const TaskCard = ({small = false, description, duration, dispBegin, dispEnd, timeBegin, timeEnd, editHandler, removeHandler }) => {

  const parsedDuration = useMemo(() => {
    const hours = String(Math.floor(duration / 60)).padStart(2, '0');
    const minutes = String(duration % 60).padStart(2, '0');
    return `${hours}:${minutes}`;
  }, [duration]);

  const formatTime = useCallback((time) => {
    return String(time[0]).padStart(2, '0') + ':' + String(time[1]).padStart(2, '0');
  }, []);

  return (
    <div className={`${styles.container} ${small ? styles.small : ''}`}>
      <p>{description}</p>
      <p>{parsedDuration}h</p>
      {
        timeBegin ?
        <p>{formatTime(timeBegin)} ~ {formatTime(timeEnd)}</p> :
        <p>{formatTime(dispBegin)} ~ {formatTime(dispEnd)}</p>
      }

      <div className={styles.actions}>
        <button onClick={editHandler}>
          <i className="fa-solid fa-pencil"></i>
        </button>
        <button onClick={removeHandler}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  )
}

export default TaskCard;