import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createListenerMiddleware,
  createSlice,
} from '@reduxjs/toolkit';
import {
  ChangeNoteDto,
  CreateNoteDto,
  CreateTagDto,
  NoteDto,
  TagDto,
} from '../../models';
import { notesApi, tagsApi } from '../../api/index';
import { RootState } from '../../store';

// state
export type NotesState = {
  baseTag: Partial<TagDto>;
  tag?: TagDto | null;
  tags?: TagDto[] | null;
  note?: NoteDto | null;
  notes?: NoteDto[] | null;
  openAddTagToast?: boolean;
  openAddNoteToast?: boolean;
  openEditNoteToast?: boolean;
};

const initialState: NotesState = {
  baseTag: {
    name: '#Все заметки',
    notesCount: 0,
  },
  notes: [],
  tags: [],
  openAddTagToast: false,
  openAddNoteToast: false,
  openEditNoteToast: false,
};

// thunks
export const createTag = createAsyncThunk(
  'notesSlice/createTag',
  async ({
    userGuid,
    createTagDto,
  }: {
    userGuid: string;
    createTagDto: CreateTagDto;
  }) => {
    const tag = await tagsApi.createTag(userGuid, createTagDto);
    return tag;
  }
);

export const deleteTags = createAsyncThunk(
  'notesSlice/deleteTags',
  async ({
    userGuid,
    tagsGuids,
  }: {
    userGuid: string;
    tagsGuids: string[];
  }) => {
    const tags = await tagsApi.deleteTags(userGuid, tagsGuids);
    return tags;
  }
);

export const fetchTags = createAsyncThunk(
  'notesSlice/fetchTags',
  async (userGuid: string) => {
    const tags = await tagsApi.fetchTags(userGuid);
    return tags;
  }
);

export const fetchNotes = createAsyncThunk(
  'notesSlice/fetchNotes',
  async (userGuid: string) => {
    const notes = await notesApi.fetchNotes(userGuid);
    return notes;
  }
);

export const fetchNotesByTag = createAsyncThunk(
  'notesSlice/fetchNotesByTag',
  async ({ userGuid, tagGuid }: { userGuid: string; tagGuid: string }) => {
    const notes = await notesApi.fetchNotesByTag(userGuid, tagGuid);
    return notes;
  }
);

export const fetchNotesCount = createAsyncThunk(
  'notesSlice/fetchNotesCount',
  async ({ userGuid }: { userGuid: string }) => {
    const notesCount = await notesApi.fetchNotesCount(userGuid);
    return notesCount;
  }
);

export const updateNote = createAsyncThunk(
  'notesSlice/updateNote',
  async ({
    userGuid,
    noteGuid,
    changeNoteDto,
  }: {
    userGuid: string;
    noteGuid: string;
    changeNoteDto: ChangeNoteDto;
  }) => {
    const note = await notesApi.changeNote(userGuid, noteGuid, changeNoteDto);
    return note;
  }
);

// actions
export const selectTagAction = createAction<TagDto>(
  'notesSlice/selectTagAction'
);
export const createNoteAction = createAction<CreateNoteDto>(
  'notesSlice/createNoteAction'
);
export const changeNoteAction = createAction<ChangeNoteDto>(
  'notesSlice/changeNoteAction'
);
export const deleteNoteAction = createAction('notesSlice/deleteNoteAction');
export const selectBaseTag = createAction('notesSlice/selectBaseTag');

// reducers
export const notesSlice = createSlice({
  initialState,
  name: 'notesSlice',
  reducers: {
    setTag: (state, { payload }: PayloadAction<TagDto>) => {
      state.tag = payload;
    },
    resetTag: state => {
      state.tag = null;
    },
    setTags: (state, { payload }: PayloadAction<TagDto[]>) => {
      state.tags = payload;
    },
    addTag: (state, { payload }: PayloadAction<TagDto>) => {
      state.tags?.push(payload);
    },
    resetTags: state => {
      state.tags = [];
    },
    setNote: (state, { payload }: PayloadAction<NoteDto>) => {
      state.note = payload;
    },
    resetNote: state => {
      state.note = null;
    },
    setNotes: (state, { payload }: PayloadAction<NoteDto[]>) => {
      state.notes = payload;
    },
    addNote: (state, { payload }: PayloadAction<NoteDto>) => {
      state.notes?.push(payload);
    },
    changeNote: (state, { payload }: PayloadAction<NoteDto>) => {
      state.note = payload;

      state.notes = state.notes?.filter(n => n.guid !== payload.guid);
      state.notes = [payload, ...(state.notes ?? [])];
    },
    deleteNote: (state, { payload }: PayloadAction<NoteDto>) => {
      state.notes = state.notes?.filter(n => n.guid !== payload.guid);
    },
    resetNotes: state => {
      state.notes = [];
    },
    setOpenAddTagToast: (state, { payload }: PayloadAction<boolean>) => {
      state.openAddTagToast = payload;
    },
    setOpenAddNoteToast: (state, { payload }: PayloadAction<boolean>) => {
      state.openAddNoteToast = payload;
    },
    setOpenEditNoteToast: (state, { payload }: PayloadAction<boolean>) => {
      state.openEditNoteToast = payload;
    },
    incrementBaseTagNotesCount: state => {
      (state.baseTag as TagDto).notesCount++;
    },
    decrementBaseTagNotesCount: state => {
      (state.baseTag as TagDto).notesCount--;
    },
  },
  extraReducers: builder => {
    builder.addCase(createTag.fulfilled, (state, action) => {
      state.tags?.push(action.payload);
      state.tag = action.payload;
      state.notes = [];
    });
    builder.addCase(deleteTags.fulfilled, (state, action) => {
      state.tags = state.tags?.filter(
        tag => !action.payload.some(deletedTag => deletedTag.guid === tag.guid)
      );
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(fetchNotesByTag.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(fetchNotesCount.fulfilled, (state, action) => {
      state.baseTag.notesCount = action.payload;
    });
  },
});

// actions
export const {
  setNote,
  resetNote,
  setNotes,
  addNote,
  changeNote,
  deleteNote,
  resetNotes,
  setTag,
  resetTag,
  setTags,
  addTag,
  resetTags,
  setOpenAddTagToast,
  setOpenAddNoteToast,
  setOpenEditNoteToast,
  incrementBaseTagNotesCount,
  decrementBaseTagNotesCount,
} = notesSlice.actions;

// middleware
export const selectTagListenerMiddleware = createListenerMiddleware();
selectTagListenerMiddleware.startListening({
  actionCreator: selectTagAction,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    const store = listenerApi.getState() as RootState;
    const userGuid = store.app.user?.guid as string;
    const notes = await notesApi.fetchNotesByTag(userGuid, action.payload.guid);

    listenerApi.dispatch(setTag(action.payload));
    listenerApi.dispatch(setNotes(notes));
    listenerApi.dispatch(resetNote());
  },
});

export const selectBaseTagListenerMiddleware = createListenerMiddleware();
selectBaseTagListenerMiddleware.startListening({
  actionCreator: selectBaseTag,
  effect: async (_action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    const store = listenerApi.getState() as RootState;
    const userGuid = store.app.user!.guid;
    const baseTag = store.notes.baseTag;
    const notes = await notesApi.fetchNotes(userGuid);

    listenerApi.dispatch(setNotes(notes));
    listenerApi.dispatch(setTag(baseTag as TagDto));
    listenerApi.dispatch(resetNote());
  },
});

export const createNoteListenerMiddleware = createListenerMiddleware();
createNoteListenerMiddleware.startListening({
  actionCreator: createNoteAction,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    const store = listenerApi.getState() as RootState;
    const userGuid = store.app.user?.guid as string;
    const note = await notesApi.createNote(userGuid, action.payload);
    const tags = await tagsApi.fetchTags(userGuid);

    listenerApi.dispatch(addNote(note));
    listenerApi.dispatch(setTags(tags));
    listenerApi.dispatch(incrementBaseTagNotesCount());
  },
});

export const changeNoteListenerMiddleware = createListenerMiddleware();
changeNoteListenerMiddleware.startListening({
  actionCreator: changeNoteAction,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    const store = listenerApi.getState() as RootState;
    const userGuid = store.app.user?.guid as string;
    const noteGuid = store.notes.note?.guid as string;
    const note = await notesApi.changeNote(userGuid, noteGuid, action.payload);
    const tags = await tagsApi.fetchTags(userGuid);

    listenerApi.dispatch(changeNote(note));
    listenerApi.dispatch(setTags(tags));
  },
});

export const deleteNoteListenerMiddleware = createListenerMiddleware();
deleteNoteListenerMiddleware.startListening({
  actionCreator: deleteNoteAction,
  effect: async (_action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    const store = listenerApi.getState() as RootState;
    const userGuid = store.app.user?.guid as string;
    const noteGuid = store.notes.note?.guid as string;
    const note = await notesApi.deleteNote(userGuid, noteGuid);
    const tags = await tagsApi.fetchTags(userGuid);

    listenerApi.dispatch(deleteNote(note));
    listenerApi.dispatch(setTags(tags));
    listenerApi.dispatch(resetNote());
  },
});

export default notesSlice.reducer;
