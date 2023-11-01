import { useCallback } from 'react';
import { TagDto } from '../../../../../../../models';
import { setOpenAddNoteToast } from '../../../../../notesSlice';
import { IconButton } from '../../../../icon-button';
import styles from './TagItem.module.scss';
import { useAppDispatch } from '../../../../../../../store';

type Props = {
  tag: TagDto;
  onSelectTag: (tag: TagDto) => void;
};

export const TagItem = ({ tag, onSelectTag }: Props) => {
  const dispatch = useAppDispatch();

  const onCreateNote = useCallback(
    () => dispatch(setOpenAddNoteToast(true)),
    [dispatch]
  );

  const onSelect = useCallback(() => onSelectTag(tag), [onSelectTag, tag]);

  return (
    <div className={styles['tag']} onClick={onSelect}>
      <span className={styles['text']}>{tag?.name}</span>

      <div className={styles['right-part']}>
        <span>{tag.notesCount}</span>
        <IconButton src="/assets/icons/add.svg" onClick={onCreateNote} />
      </div>
    </div>
  );
};
