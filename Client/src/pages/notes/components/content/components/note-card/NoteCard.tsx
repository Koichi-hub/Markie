import dayjs from 'dayjs';
import { NoteDto } from '../../../../../../models';
import styles from './NoteCard.module.scss';
import { IconButton } from './components/icon-button';
import { useMemo } from 'react';

type Props = {
  note: NoteDto;
  onClick?: () => void;
};

export const NoteCard = ({ note, onClick }: Props) => {
  const updatedAt = useMemo(() => {
    if (!note.updatedAt) return 'дата отсутствует';
    return dayjs(note.updatedAt).format('DD/MM/YYYY');
  }, [note.updatedAt]);

  const createdAt = useMemo(() => {
    if (!note.createdAt) return 'дата отсутствует';
    return dayjs(note.createdAt).format('DD/MM/YYYY');
  }, [note.createdAt]);

  const renderTags = useMemo(() => {
    return note.tags.map(tag => (
      <div key={tag.guid} className={styles['tags-list__item']}>
        <span>{tag.name}</span>
      </div>
    ));
  }, [note.tags]);

  return (
    <div className={styles['note-card']}>
      <div className={styles['note-card-top']}>
        <div className={styles['buttons']}>
          <IconButton src="assets/icons/edit.svg" onClick={onClick} />
        </div>
        <div className={styles['title']}>
          <span>{note?.name ?? 'название отсутствует'}</span>
        </div>
      </div>
      <div className={styles['note-card-bottom']}>
        <div className={styles['tags-list-container']}>
          <div className={styles['tags-list']}>
            <div className={styles['tags-list__caption']}>Теги: </div>
            {renderTags}
          </div>
        </div>
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
