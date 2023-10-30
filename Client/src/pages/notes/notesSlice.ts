import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createListenerMiddleware,
  createSlice,
} from '@reduxjs/toolkit';
import { CreateNoteDto, CreateTagDto, NoteDto, TagDto } from '../../models';
import { notesApi, tagsApi } from '../../api/index';
import { RootState } from '../../store';

// state
export type NotesState = {
  tag?: TagDto | null;
  tags?: TagDto[] | null;
  notes?: NoteDto[] | null;
  openAddTagToast?: boolean;
  openAddNoteToast?: boolean;
};

const initialState: NotesState = {
  notes: [],
  tags: [],
  openAddTagToast: false,
  openAddNoteToast: false,
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

export const createNote = createAsyncThunk(
  'notesSlice/createNote',
  async ({
    userGuid,
    createNoteDto,
  }: {
    userGuid: string;
    createNoteDto: CreateNoteDto;
  }) => {
    const note = await notesApi.createNote(userGuid, createNoteDto);
    return note;
  }
);

export const fetchNotesByTag = createAsyncThunk(
  'notesSlice/getNotes',
  async ({ userGuid, tagGuid }: { userGuid: string; tagGuid: string }) => {
    const notes = await notesApi.fetchNotesByTag(userGuid, tagGuid);
    return notes;
  }
);

// actions
export const selectTagAction = createAction<TagDto>(
  'notesSlice/selectTagAction'
);

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
    setNotes: (state, { payload }: PayloadAction<NoteDto[]>) => {
      state.notes = payload;
    },
    resetNotes: state => {
      state.notes = [];
    },
    setOpenAddTagToast: (state, { payload }: PayloadAction<boolean>) => {
      state.openAddTagToast = payload;
    },
    toggleOpenAddTagToast: state => {
      state.openAddTagToast = !state.openAddTagToast;
    },
    setOpenAddNoteToast: (state, { payload }: PayloadAction<boolean>) => {
      state.openAddNoteToast = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createTag.fulfilled, (state, action) => {
      state.tags?.push(action.payload);
    });
    builder.addCase(deleteTags.fulfilled, (state, action) => {
      state.tags = state.tags?.filter(
        tag => !action.payload.some(deletedTag => deletedTag.guid === tag.guid)
      );
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.notes?.push(action.payload);
    });
    builder.addCase(fetchNotesByTag.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
  },
});

// actions
export const {
  setNotes,
  resetNotes,
  setTag,
  resetTag,
  setTags,
  addTag,
  resetTags,
  setOpenAddTagToast,
  toggleOpenAddTagToast,
  setOpenAddNoteToast,
} = notesSlice.actions;

// middleware
export const setTagListenerMiddleware = createListenerMiddleware();
setTagListenerMiddleware.startListening({
  actionCreator: selectTagAction,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    const store = listenerApi.getState() as RootState;
    const userGuid = store.app.user?.guid as string;
    const notes = await notesApi.fetchNotesByTag(userGuid, action.payload.guid);

    listenerApi.dispatch(setTag(action.payload));
    listenerApi.dispatch(setNotes(notes));
  },
});

export default notesSlice.reducer;
