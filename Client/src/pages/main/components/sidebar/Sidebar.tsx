import { Button } from '../button';
import { NotesGroups } from '../notes-groups';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  const onEditTags = () => {};
  const onExit = () => {};

  return (
    <div className={styles['sidebar']}>
      <div></div>
      <NotesGroups />
      <Button color="grey-80" text="Редактировать теги" onClick={onEditTags} />
      <Button color="grey-0" text="выйти" onClick={onExit} />
    </div>
  );
};
