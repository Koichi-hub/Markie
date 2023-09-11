import { useDispatch, useSelector } from 'react-redux';
import { NotesGroup } from './notes-group';
import styles from './NotesGroups.module.scss';
import { RootState } from '../../../../../../store';
import { useCallback, useMemo } from 'react';
import { setTag } from '../../../../mainSlice';
import { Tag } from '../../../../../../models/tag';

export const NotesGroups = () => {
  const dispatch = useDispatch();
  const tagsNotesAmount = useSelector(
    (state: RootState) => state.main.tagsNotesAmount
  );

  const onSelectTag = useCallback(
    (tag: Tag) => dispatch(setTag(tag)),
    [dispatch]
  );

  const renderNotes = useMemo(
    () =>
      tagsNotesAmount?.map((tagNotesAmount, index) => (
        <NotesGroup
          key={index}
          tagNotesAmount={tagNotesAmount}
          onSelectTag={onSelectTag}
        />
      )),
    [onSelectTag, tagsNotesAmount]
  );

  return <div className={styles['notes-groups']}>{renderNotes}</div>;
};
