import { useDispatch, useSelector } from 'react-redux';
import { TagItem } from './tag-item';
import styles from './TagsList.module.scss';
import { RootState } from '../../../../../../store';
import { useCallback, useMemo } from 'react';
import { setTag } from '../../../../notesSlice';
import { TagDto } from '../../../../../../models';

export const TagsList = () => {
  const dispatch = useDispatch();
  const tagsNotesAmount = useSelector(
    (state: RootState) => state.notes.tagsNotesAmount
  );

  const onSelectTag = useCallback(
    (tag: TagDto) => dispatch(setTag(tag)),
    [dispatch]
  );

  const renderNotes = useMemo(
    () =>
      tagsNotesAmount?.map((tagNotesAmount, index) => (
        <TagItem
          key={index}
          tagNotesAmount={tagNotesAmount}
          onSelectTag={onSelectTag}
        />
      )),
    [onSelectTag, tagsNotesAmount]
  );

  return <div className={styles['notes-groups']}>{renderNotes}</div>;
};
