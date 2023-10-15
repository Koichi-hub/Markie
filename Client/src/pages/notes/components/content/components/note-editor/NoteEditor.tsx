import { ChangeEvent, useState } from 'react';
import styles from './NoteEditor.module.scss';
import Markdown from 'marked-react';

export const NoteEditor = () => {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  return (
    <div className={styles['note-editor']}>
      <div className={styles['src-text-container']}>
        <textarea
          className={styles['src-text']}
          cols={30}
          rows={10}
          placeholder="Новая заметка"
          value={value}
          onChange={onChange}></textarea>
      </div>
      <div className={styles['markdown-container']}>
        <div className={styles['markdown']}>
          <Markdown value={value} />
        </div>
      </div>
    </div>
  );
};
