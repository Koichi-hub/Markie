import { useSelector } from 'react-redux';
import { Button } from '../button';
import { NotesGroups } from './components/notes-groups';
import styles from './Sidebar.module.scss';
import { RootState } from '../../../../store';

export const Sidebar = () => {
  const user = useSelector((state: RootState) => state.app.user);

  const onEditTags = () => {};
  const onExit = () => {};

  return (
    <div className={styles['sidebar']}>
      <div className={styles['user']}>
        <img className={styles['user-picture']} src={user?.picture ?? ''} />
        <div className={styles['user-username']}>{user?.username}</div>
      </div>
      <NotesGroups />
      <Button color="grey-80" text="Редактировать теги" onClick={onEditTags} />
      <Button color="grey-0" text="выйти" onClick={onExit} />
    </div>
  );
};
