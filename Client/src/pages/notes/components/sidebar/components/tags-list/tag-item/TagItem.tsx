import { useCallback } from 'react';
import { TagDto } from '../../../../../../../models';
import { setOpenAddNoteToast } from '../../../../../notesSlice';
import { IconButton } from '../../../../icon-button';
import styles from './TagItem.module.scss';
import { useAppDispatch } from '../../../../../../../store';

type Props = {
  tag: TagDto;
  onSelectTag: (tag: TagDto) => void;
  selected?: boolean;
};

export const TagItem = ({ tag, onSelectTag, selected }: Props) => {
  const dispatch = useAppDispatch();

  const onCreateNote = useCallback(
    () => dispatch(setOpenAddNoteToast(true)),
    [dispatch]
  );

  const onSelect = useCallback(() => onSelectTag(tag), [onSelectTag, tag]);

  return (
    <div
      className={[styles['tag'], selected ? styles['tag_selected'] : ''].join(
        ' '
      )}
      onClick={onSelect}>
      <span className={styles['tag__text']}>{tag?.name}</span>

      <div className={styles['tag__right-part']}>
        <span>{tag.notesCount}</span>
        <IconButton src="/assets/icons/add.svg" onClick={onCreateNote} />
      </div>
    </div>
  );
};
