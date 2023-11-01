import { ChangeEvent, useEffect } from 'react';
import styles from './NoteEditor.module.scss';
import Markdown from 'marked-react';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { initNoteContent, setNoteContent } from '../../../../notesSlice';

export const NoteEditor = () => {
  const dispatch = useAppDispatch();
  const noteContent = useAppSelector(state => state.notes.noteContent);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setNoteContent(e.target.value));
  };

  useEffect(() => {
    dispatch(initNoteContent());
  }, [dispatch]);

  return (
    <div className={styles['note-editor']}>
      <div className={styles['src-text-container']}>
        <textarea
          className={styles['src-text']}
          cols={30}
          rows={10}
          placeholder="Новая заметка"
          value={noteContent}
          onChange={onChange}></textarea>
      </div>
      <div className={styles['markdown-container']}>
        <div className={styles['markdown']}>
          <Markdown value={noteContent} />
        </div>
      </div>
    </div>
  );
};
