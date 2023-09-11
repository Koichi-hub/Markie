import { useCallback } from 'react';
import { Tag } from '../../../../../../../models/tag';
import { TagsNotesAmount } from '../../../../../mainSlice';
import { IconButton } from '../../../../icon-button';
import styles from './NotesGroup.module.scss';

type Props = {
  tagNotesAmount: TagsNotesAmount;
  onSelectTag: (tag: Tag) => void;
};

export const NotesGroup = ({ tagNotesAmount, onSelectTag }: Props) => {
  const onClick = useCallback(
    () => onSelectTag(tagNotesAmount.tag),
    [onSelectTag, tagNotesAmount.tag]
  );

  return (
    <div className={styles['notes-group']} onClick={onClick}>
      <span className={styles['text']}>{tagNotesAmount.tag.title}</span>

      <div className={styles['right-part']}>
        <span>{tagNotesAmount.notesAmount}</span>
        <IconButton src="assets/icons/add.svg" />
      </div>
    </div>
  );
};
