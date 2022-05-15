import styles from './styles.module.css';

const Modal = ({ children, isOpen }) => {
  return (
    <div
      className={`${styles.container}`}
      style={isOpen ? {} : {display: 'none'}}>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Modal;