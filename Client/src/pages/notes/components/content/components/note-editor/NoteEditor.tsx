import { ChangeEvent } from 'react';
import styles from './NoteEditor.module.scss';
import Markdown from 'marked-react';
import { useAppDispatch } from '../../../../../../store';
import { setNoteContent } from '../../../../notesSlice';
import { NoteDto } from '../../../../../../models';

type Props = {
  note: NoteDto;
};

export const NoteEditor = ({ note }: Props) => {
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setNoteContent(e.target.value));
  };

  return (
    <div className={styles['note-editor']}>
      <div className={styles['src-text-container']}>
        <textarea
          className={styles['src-text']}
          cols={30}
          rows={10}
          placeholder="Новая заметка"
          value={note?.content}
          onChange={onChange}></textarea>
      </div>
      <div className={styles['markdown-container']}>
        <div className={styles['markdown']}>
          <Markdown value={note?.content} />
        </div>
      </div>
    </div>
  );
};
