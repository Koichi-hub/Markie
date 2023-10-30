import { useCallback, useMemo } from 'react';
import styles from './TagsList.module.scss';
import { TagDto } from '../../../../../../models';

type Props = {
  tags: TagDto[];
  selectedTags: TagDto[];
  onSelectTag: (tag: TagDto) => void;
};

export const TagsList = ({ tags, selectedTags, onSelectTag }: Props) => {
  const onClickTag = useCallback(
    (tag: TagDto) => () => onSelectTag(tag),
    [onSelectTag]
  );

  const renderTags = useMemo(() => {
    return tags?.map(tag => {
      const selectedTagClassName = selectedTags.some(t => t.guid === tag.guid)
        ? styles['tag_selected']
        : '';
      return (
        <div
          key={tag.guid}
          className={[styles['tag'], selectedTagClassName].join(' ')}
          onClick={onClickTag(tag)}>
          {tag.name}
        </div>
      );
    });
  }, [onClickTag, selectedTags, tags]);

  return <div className={styles['tags-list']}>{renderTags}</div>;
};
