import { useCallback, useMemo } from 'react'

import Modal from "../Modal"

import styles from './styles.module.scss';

/**
 * <i class="fa-solid fa-xmark"></i>
 * <i class="fa-solid fa-check"></i>
 * <i class="fa-solid fa-exclamation"></i>
 * 
 * 
 */

const NotificationModal = ({ type, message, text, btn1Text, btn2Text, isOpen, onSuccess, onClose, state }) => {

  const getIcon = useMemo(() => {
    const icons = {
      error: 'fa-xmark',
      alert: 'fa-triangle-exclamation',
      success: 'fa-check',
      information: 'fa-exclamation'
    }

    return icons[type];
  }, [type]);

  const getTitle = useMemo(() => {
    const titles = {
      error: 'Falha!',
      alert: 'Aviso!',
      success: 'Sucesso!',
      information: 'Informação'
    }

    return titles[type];
  }, [type]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSuccess = useCallback(() => {
    onSuccess();
  }, [onSuccess]);

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.container}>
        <h1>{getTitle}</h1>
        <div className={styles.iconContainer}>
          <i className={`fa-solid ${getIcon}`}></i>
        </div>
        <div className={styles.infoContainer}>
          <p>{message}</p>
          {text && <textarea cols="50" rows="6" readOnly value={text}></textarea>}
        </div>
        <div className={styles.footer}>
          <button className={`btnSecondary ${styles.btn}`} onClick={handleClose}>{btn1Text}</button>
          <button className={`btnPrimary ${styles.btn}`} onClick={handleSuccess}>{btn2Text}</button>
        </div>
      </div>
    </Modal>
  )
}

export default NotificationModal;