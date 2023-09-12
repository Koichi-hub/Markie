import styles from './NoteCard.module.scss';

export const NoteCard = () => {
  return (
    <div className={styles['note-card']}>
      <div className={styles['note-card-icons']}>
        <img
          className={styles['note-card-icons-edit']}
          src="public\assets\icons\edit.svg"
          alt="edit"
        />
        <img
          className={styles['note-card-icons-bookmark']}
          src="public\assets\icons\bookmark.svg"
          alt="edit"
        />
        <img
          className={styles['note-card-icons-delete']}
          src="public\assets\icons\delete.svg"
          alt="edit"
        />
      </div>
      <div className={styles['note-card-main']}>
        <div className={styles['note-card-main-title']}>Название заметки</div>
        <div className={styles['note-card-main-dates']}>
          <div className={styles['note-card-main-dates-before']}>
            дата изменения: 20.05.2003
          </div>
          <div className={styles['note-card-main-dates-after']}>
            дата создания: 11.09.2001
          </div>
        </div>
      </div>
    </div>
  );
};
