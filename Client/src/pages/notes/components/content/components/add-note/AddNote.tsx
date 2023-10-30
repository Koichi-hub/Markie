import { useCallback, useMemo, useState } from 'react';
import { Button } from '../../../button';
import styles from './AddNote.module.scss';
import { useDispatch } from 'react-redux';
import { setOpenAddNoteToast } from '../../../../notesSlice';
import { Input } from '../../../input';

export const AddNote = () => {
  const dispatch = useDispatch();

  const [noteName, setNoteName] = useState('');

  const onClose = useCallback(
    () => dispatch(setOpenAddNoteToast(false)),
    [dispatch]
  );

  const renderTags = useMemo(() => <div></div>, []);

  return (
    <div className={styles['container']}>
      <div className={styles['controls']}>
        <span className={styles['title']}>Название заметки:</span>

        <Input value={noteName} onChange={setNoteName} />
        <Button text="Создать" color="grey-80" />
        <Button text="Закрыть" color="grey-80" onClick={onClose} />
      </div>
      <div className={styles['tags']}>
        <span className={styles['title']}>Теги:</span>
        <div className={styles['tags__list']}>{renderTags}</div>
      </div>
    </div>
  );
};
