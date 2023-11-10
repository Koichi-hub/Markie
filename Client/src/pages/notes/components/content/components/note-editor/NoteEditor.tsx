import { ChangeEvent, useMemo } from 'react';
import styles from './NoteEditor.module.scss';
import Markdown from 'marked-react';
import { useAppDispatch } from '../../../../../../store';
import { setNoteContent } from '../../../../notesSlice';
import { Limits, NoteDto } from '../../../../../../models';

type Props = {
  note: NoteDto;
};

export const NoteEditor = ({ note }: Props) => {
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= Limits.nOTE_CONTENT_MAXLENGTH)
      dispatch(setNoteContent(e.target.value));
  };

  const renderSrcTextLength = useMemo(() => {
    const noteContentLength = note.content.length;
    return (
      <div
        className={[
          styles['src-text-length'],
          noteContentLength === Limits.nOTE_CONTENT_MAXLENGTH &&
            styles['src-text-length_limit'],
        ].join(' ')}>
        {noteContentLength}/{Limits.nOTE_CONTENT_MAXLENGTH}
      </div>
    );
  }, [note.content.length]);

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
        {renderSrcTextLength}
      </div>
      <div className={styles['markdown-container']}>
        <div className={styles['markdown']}>
          <Markdown value={note?.content} />
        </div>
      </div>
    </div>
  );
};
