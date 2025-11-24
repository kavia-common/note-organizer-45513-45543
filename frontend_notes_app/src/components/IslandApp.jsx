import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import NotesHeader from "./NotesHeader.astro";
import NotesSidebar from "./NotesSidebar.astro";
import NoteEditor from "./NoteEditor.astro";

export default function IslandApp() {
  // -- State
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [editing, setEditing] = useState(false);

  // ==== LocalStorage persistence
  function loadNotes() {
    try {
      const v = window.localStorage.getItem('ocean-notes-v1');
      if (v) {
        const arr = JSON.parse(v);
        if (Array.isArray(arr)) return arr;
      }
    } catch {}
    return [];
  }
  function saveNotes(arr) {
    window.localStorage.setItem('ocean-notes-v1', JSON.stringify(arr));
  }

  // EFFECT: load notes from localStorage
  useEffect(() => {
    const arr = loadNotes();
    setNotes(arr);
    if (arr.length) setSelectedId(arr[0].id);
  }, []);

  // EFFECT: whenever notes change, sync to localStorage
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // -- Handlers
  const handleSearchInput = (e) => setSearch(e.target.value);
  const handleNoteSelect = (id) => {
    setSelectedId(id);
    setEditing(false);
    setTimeout(() => {
      document.querySelector('.main-panel')?.focus();
    }, 120);
  };
  const handleCreateNote = () => {
    const newId = crypto.randomUUID();
    const now = new Date().toISOString();
    const newNote = { id: newId, title: '', content: '', updated: now };
    setNotes([newNote, ...notes]);
    setSelectedId(newId);
    setEditing(true);
    setTimeout(() => {
      document.querySelector('.note-title')?.focus();
    }, 180);
  };
  const handleDeleteNote = (id) => {
    let nextId = selectedId;
    if (id === selectedId) {
      const idx = notes.findIndex((n) => n.id === id);
      if (idx > 0) nextId = notes[idx - 1].id;
      else if (notes.length > 1) nextId = notes[1].id;
      else nextId = '';
    }
    setNotes(notes.filter((n) => n.id !== id));
    setSelectedId(nextId);
    setEditing(false);
  };
  const handleEditNote = () => setEditing(true);
  const handleCancelEdit = () => setEditing(false);
  const handleSaveNote = (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const title = form.querySelector('.note-title').value.trim();
    const content = form.querySelector('.note-body').value;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selectedId
          ? { ...n, title, content, updated: new Date().toISOString() }
          : n
      )
    );
    setEditing(false);
    setTimeout(() => {
      document.querySelector('.main-panel')?.focus();
    }, 120);
  };
  const handleTitleChange = (e) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selectedId ? { ...n, title: e.target.value } : n
      )
    );
  };
  const handleContentChange = (e) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selectedId ? { ...n, content: e.target.value } : n
      )
    );
  };

  // SEARCH: filter notes
  const filteredNotes = notes.filter((n) =>
    (n.title + '\n' + n.content).toLowerCase().includes(search.toLowerCase()));

  // Find the selected note from filtered+full lists for correct selection
  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  return h(Fragment, {}, [
    h(NotesHeader, {
      search,
      onSearchInput: (e) => handleSearchInput(e),
    }),
    h('div', { class: 'main-app-grid', style: "display:flex; min-height:70vh;" }, [
      h(NotesSidebar, {
        notes: filteredNotes,
        selectedId,
        onSelect: handleNoteSelect,
        onCreate: handleCreateNote,
        onDelete: handleDeleteNote,
      }),
      h(NoteEditor, {
        note: selectedNote,
        editing,
        onEdit: handleEditNote,
        onTitleChange: handleTitleChange,
        onContentChange: handleContentChange,
        onSave: handleSaveNote,
        onCancel: handleCancelEdit,
        onDelete: handleDeleteNote,
      }),
    ]),
  ]);
}
