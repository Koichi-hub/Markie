import dayjs from 'dayjs';
import { Note } from '../../../../../../models/note';
import styles from './NoteCard.module.scss';
import { IconButton } from './components/icon-button';
import { useMemo } from 'react';

type Props = {
  note: Note;
  onClick?: () => void;
};

export const NoteCard = ({ note, onClick }: Props) => {
  const updatedAt = useMemo(() => {
    if (!note.updated_at) return 'дата отсутствует';
    return dayjs(note.updated_at).format('DD/MM/YYYY');
  }, [note.updated_at]);

  const createdAt = useMemo(() => {
    if (!note.created_at) return 'дата отсутствует';
    return dayjs(note.created_at).format('DD/MM/YYYY');
  }, [note.created_at]);

  return (
    <div className={styles['note-card']} onClick={onClick}>
      <div className={styles['note-card-top']}>
        <div className={styles['buttons']}>
          <IconButton src="assets/icons/edit.svg" />
          <IconButton src="assets/icons/bookmark.svg" />
          <IconButton src="assets/icons/delete.svg" />
        </div>
        <div className={styles['title']}>
          {note?.title ?? 'название отсутствует'}
        </div>
      </div>
      <div className={styles['note-card-bottom']}>
        <div className={styles['date']}>
          <div className={styles['date-item']}>
            <span>Дата изменения:</span>
            <span>{updatedAt}</span>
          </div>
          <div className={styles['date-item']}>
            <span>Дата создания:</span>
            <span>{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
