import { useCallback } from 'react';
import { Tag } from '../../../../../../../models/tag';
import {
  TagsNotesAmount,
  setOpenAddNoteToast,
} from '../../../../../notesSlice';
import { IconButton } from '../../../../icon-button';
import styles from './TagItem.module.scss';
import { useDispatch } from 'react-redux';

type Props = {
  tagNotesAmount: TagsNotesAmount;
  onSelectTag: (tag: Tag) => void;
};

export const TagItem = ({ tagNotesAmount, onSelectTag }: Props) => {
  const dispatch = useDispatch();

  const onCreateNote = useCallback(
    () => dispatch(setOpenAddNoteToast(true)),
    [dispatch]
  );

  const onSelect = useCallback(
    () => onSelectTag(tagNotesAmount.tag!),
    [onSelectTag, tagNotesAmount.tag]
  );

  return (
    <div className={styles['notes-group']} onClick={onSelect}>
      <span className={styles['text']}>{tagNotesAmount.tag?.title}</span>

      <div className={styles['right-part']}>
        <span>{tagNotesAmount.notesAmount}</span>
        <IconButton src="/assets/icons/add.svg" onClick={onCreateNote} />
      </div>
    </div>
  );
};
