import react, { useCallback, useEffect, useMemo } from 'react';

import styles from './styles.module.scss';

const TaskCard = ({ description, duration, dispBegin, dispEnd, timeBegin, timeEnd }) => {

  const parsedDuration = useMemo(() => {
    const hours = String(Math.floor(duration / 60)).padStart(2, '0');
    const minutes = String(duration % 60).padStart(2, '0');
    return `${hours}:${minutes}`;
  }, [duration]);

  const formatTime = useCallback((time) => {
    return String(time[0]).padStart(2, '0') + ':' + String(time[1]).padStart(2, '0');
  }, []);

  useEffect(() => console.log(timeBegin))

  return (
    <div className={styles.container}>
      <p>{description}</p>
      <p>{parsedDuration}h</p>
      {
        timeBegin ?
        <p>{formatTime(timeBegin)} ~ {formatTime(timeEnd)}</p> :
        <p>{formatTime(dispBegin)} ~ {formatTime(dispEnd)}</p>
      }
    </div>
  )
}

export default TaskCard;