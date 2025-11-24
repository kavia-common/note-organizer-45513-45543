import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

/* NotesHeader JSX version */
function NotesHeader({ search, onSearchInput }) {
  return (
    <header class="header" role="banner">
      <span class="logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" focusable="false" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#2563EB" />
          <text x="16" y="21" text-anchor="middle" fill="#fff" font-size="17" font-weight="bold" font-family="Inter, sans-serif">✎</text>
        </svg>
        <span class="app-title">Ocean Notes</span>
      </span>
      <label class="sr-only" htmlFor="search-input">Search notes</label>
      <input
        id="search-input"
        class="search"
        type="search"
        placeholder="Search notes..."
        value={search}
        onInput={onSearchInput}
        autoComplete="off"
        aria-label="Search notes"
      />
      <style>{`
        .header { display: flex; align-items: center; gap: 2rem; padding: 1rem 2rem 1rem 1.5rem; background: linear-gradient(99deg, #2563EB1A 0%, #f9fafb 100%); box-shadow: 0 1px 8px #2563EB1A; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; }
        .logo { display: flex; align-items: center; font-size: 1.4rem; font-weight: 700; color: #2563EB; gap: 0.7rem; letter-spacing: -0.5px; }
        .app-title { font-weight: 700; letter-spacing: -0.5px; }
        .search { flex: 1; min-width: 120px; max-width: 420px; padding: 0.6rem 1.2rem; border: 1.5px solid #dbeafe; border-radius: 100px; font-size: 1rem; transition: border 0.18s, box-shadow 0.18s; background: #fff; box-shadow: 0 2px 16px 0 #2563EB14; color: #111827; }
        .search:focus { outline: none; border-color: #2563EB; box-shadow: 0 0 0 2px #2563EB33; }
        .sr-only { position: absolute !important; height: 1px; width: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap; }
        @media (max-width: 680px) { .header { flex-direction: column; gap: 0.6rem; padding: 0.6rem 0.5rem 0.6rem 0.5rem; } .app-title { font-size: 1rem; } }
      `}</style>
    </header>
  );
}

/* Utility for date formatting */
function formatDate(iso, kind = "full") {
  if (!iso) return "";
  const d = new Date(iso);
  if (kind === "full") {
    return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"});
  } else {
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }
}

/* NotesSidebar JSX version */
function NotesSidebar({ notes, selectedId, onSelect, onCreate, onDelete }) {
  return (
    <aside class="sidebar" role="navigation" aria-label="Notes list">
      <div class="sidebar-header">
        <button
          class="new-btn"
          title="New note"
          onClick={onCreate}
          aria-label="Create a new note"
          tabIndex="0"
        >
          <span aria-hidden="true">+</span> New Note
        </button>
      </div>
      <ul class="notes-list" role="listbox">
        {notes.length === 0 &&
          <li class="empty" aria-live="polite">No notes found</li>
        }
        {notes.map((note) => (
          <li
            class={`note-item${note.id === selectedId ? " active" : ""}`}
            role="option"
            aria-selected={note.id === selectedId}
            tabIndex={note.id === selectedId ? "0" : "-1"}
            onClick={() => onSelect(note.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(note.id);
            }}>
            <span class="item-title">{note.title || "Untitled note"}</span>
            <span class="item-date">{formatDate(note.updated, "list")}</span>
            <button type="button" class="delete" title="Delete note" aria-label={`Delete ${note.title || 'untitled note'}`}
              onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M6 8v5a2 2 0 001 1.73V15h6a2 2 0 002-2V8m-9 1h10M9 4v1h2V4M4 6h12" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <style>{`
        .sidebar { width: 264px; min-width: 200px; max-width: 320px; background: linear-gradient(120deg, #2563EB0A 0%, #fff 70%); border-right: 1.5px solid #d1d5db40; padding: 1.25rem 0 0; display: flex; flex-direction: column; border-top-left-radius: 2rem; border-bottom-left-radius: 2rem; box-shadow: 2px 0 24px #2563eb10; transition: box-shadow 0.22s, background 0.22s; }
        .sidebar-header { padding: 0 1.3rem 1rem 2rem; display: flex; justify-content: flex-end; }
        .new-btn { display: flex; align-items: center; gap: 0.4em; font-size: 1.04em; padding: 0.54em 1.15em; background: linear-gradient(90deg,#2563EB 90%, #F59E0B 100%); color: #fff; font-weight: 600; border: none; border-radius: 50px; cursor: pointer; transition: background 0.25s, box-shadow 0.2s; box-shadow: 0 2px 8px #2563eb24; }
        .new-btn:focus, .new-btn:hover { background: linear-gradient(99deg,#2563EB 80%, #F59E0B 100%); box-shadow: 0 4px 12px #2563eb33; outline: 2px solid #2563EB33; }
        .notes-list { list-style: none; margin: 0; padding: 0 0.3rem 1rem 0.3rem; flex: 1 1 0%; min-height: 320px; overflow-y: auto; }
        .note-item { display: flex; align-items: center; justify-content: space-between; gap: 0.9em; padding: 0.7em 2em 0.7em 2.2em; margin-bottom: 0.13em; border-radius: 1.3em; background: transparent; color: #111827; font-size: 1.06em; cursor: pointer; transition: background 0.16s, color 0.16s; border: 1.3px solid transparent; position: relative; user-select: none; }
        .note-item.active, .note-item:focus { background: linear-gradient(90deg,#2563EB16 5%, #fff 80%); color: #2563EB; border: 1.3px solid #2563EB66; box-shadow: 0 4px 10px #2563EB13; z-index: 1; }
        .note-item:active { background: #2563eb22; }
        .note-item .item-title { flex: 1; font-weight: 600; font-size: 1.06em; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
        .item-date { flex: none; font-size: 0.93em; color: #4b5563; margin-left: 1em; }
        .delete { background: none; border: none; color: inherit; cursor: pointer; font-size: 1em; padding: 0.2em 0.3em; margin-left: 0.3em; border-radius: 0.7em; transition: background 0.16s; flex-shrink: 0; }
        .delete:focus, .delete:hover { background: #ef4444; color: #fff; outline: 2px solid #ef444433; }
        .empty { padding: 2em 1em 1em 2em; color: #9ca3af; font-size: 1.1em; text-align: left; }
        @media (max-width: 700px) { .sidebar { min-width: 60px; width: 90vw; max-width: 99vw; border-radius: 1.2rem; box-shadow: 0 2px 10px #2563eb1a; } .sidebar-header { padding-left: 1em; } .note-item, .notes-list { padding: 0 0.15em; } }
      `}</style>
    </aside>
  );
}

/* NoteEditor JSX version */
function NoteEditor({ note, editing, onEdit, onTitleChange, onContentChange, onSave, onCancel, onDelete }) {
  return (
    <main class="main-panel" role="main" tabIndex="0">
      { note ?
        (
          <article class="note-detail">
            { editing ?
              (
                <form class="note-form" onSubmit={onSave} autoComplete="off">
                  <input
                    class="note-title"
                    value={note.title}
                    placeholder="Note title..."
                    aria-label="Title"
                    onInput={onTitleChange}
                    autoFocus
                    required
                    tabIndex="0"
                    maxLength="64"
                  />
                  <textarea
                    class="note-body"
                    value={note.content}
                    placeholder="Type something important…"
                    aria-label="Content"
                    rows={16}
                    onInput={onContentChange}
                    spellCheck={true}
                    tabIndex="0"
                    maxLength={4096}
                  ></textarea>
                  <div class="editor-actions">
                    <button class="save" type="submit">Save</button>
                    <button class="cancel" type="button" onClick={onCancel}>Cancel</button>
                    <button class="danger" type="button" onClick={() => {if(window.confirm('Delete this note?')) onDelete(note.id)}}>Delete</button>
                  </div>
                </form>
              ) : (
                <div class="note-read">
                  <h2 class="note-title" tabIndex="0">{note.title || "Untitled note"}</h2>
                  <div class="note-body" tabIndex="0" aria-label="Note content">{note.content || <em>No content</em>}</div>
                  <div class="editor-actions">
                    <button class="edit" type="button" onClick={onEdit}>Edit</button>
                    <button class="danger" type="button" onClick={() => {if(window.confirm('Delete this note?')) onDelete(note.id)}}>Delete</button>
                  </div>
                  <div class="note-date">Last updated: {formatDate(note.updated, "full")}</div>
                </div>
              )
            }
          </article>
        ) : (
          <section class="empty-state" tabIndex="0" aria-live="polite">
            <svg width="62" height="56" fill="none"><rect x="2" y="6" rx="7" width="58" height="38" fill="#f9fafb"/><rect x="7" y="13" rx="3" width="47" height="11" fill="#2563EB22"/><rect x="7" y="28" rx="3" width="28" height="6" fill="#9faecb33"/></svg>
            <div>
              <h3>Welcome to Ocean Notes</h3>
              <p>Select a note or create a new one to get started.</p>
            </div>
          </section>
        )
      }
      <style>{`
        .main-panel { flex: 1 1 0%; background: linear-gradient(109deg,#f9fafb 60%,#fff 100%); padding: 2.4rem 2.7rem 2.8rem 2.7rem; border-radius: 2.2rem; min-width: 0; min-height: 84vh; box-shadow: 0 4px 36px 0 #2563eb15; overflow: auto; display: flex; }
        .note-detail { width: 100%; max-width: 710px; margin: auto; }
        .note-title { font-size: 2.12em; font-weight: bold; margin-bottom: 1.1em; background: transparent; border: none; border-bottom: 2.2px solid #728ad1; border-radius: 0.4em 0.4em 0 0; padding: 0.2em 0 0.18em 0.12em; width: 100%; color: #111827; outline: none; transition: border 0.16s;}
        .note-title:focus { border-bottom: 2.2px solid #2563EB; background: #e0ebfa20; }
        .note-form .note-body, .note-read .note-body { font-size: 1.16em; width: 100%; margin-top: 1.2em; min-height: 280px; padding: 0.9em 1.1em; border-radius: 1.1em; border: 1.4px solid #dbeafe; background: #fff; color: #111827; resize: vertical; transition: border 0.16s, box-shadow 0.16s; box-shadow: 0 3px 12px #2563eb07; }
        .note-body:focus { border: 1.4px solid #2563EB; background: #f1f5ff; }
        .note-read .note-title { margin-bottom: 0.8em; border-bottom: none; background: none; color: #2563EB; font-size: 2.08em; }
        .editor-actions { display: flex; gap: 1em; justify-content: flex-start; margin-top: 1.7em; }
        .editor-actions button { font-size: 1.07em; font-weight: 600; border: none; border-radius: 99px; padding: 0.5em 1.4em; cursor: pointer; background: #2563EB; color: #fff; transition: background 0.13s, box-shadow 0.13s; box-shadow: 0 1px 8px #2563EB22; }
        .editor-actions .edit { background: linear-gradient(90deg,#2563EB 92%, #F59E0B 100%); }
        .editor-actions .save { background: #2563EB; }
        .editor-actions .cancel { background: #6b7280; }
        .editor-actions .danger { background: #EF4444; color: #fff; }
        .editor-actions button:focus, .editor-actions button:hover { outline: 2px solid #2563EB44; background: #2563EB; box-shadow: 0 2px 16px #2563EB18; }
        .editor-actions .danger:focus, .editor-actions .danger:hover { outline: 2px solid #ef444433; background: #b91c1c; }
        .note-date { font-size: 0.98em; color: #6b7280; margin-top: 2em; }
        .empty-state { max-width: 380px; margin: auto; min-height: 340px; display: flex; gap: 1.4em; align-items: center; justify-content: center; color: #2563EBaa; border: 2px dashed #2563EB33; border-radius: 2.2em; background: #f9fafb; box-shadow: 0 2px 12px #2563EB10; flex-direction: column; padding: 2.4em 1.6em; text-align: center; animation: fade-in 0.5s ease;}
        .empty-state h3 { font-size: 1.3em; font-weight: 600; }
        .empty-state svg { margin-bottom: 0.6em; }
        @media (max-width: 800px) { .main-panel { padding: 0.7em; min-height: 78vh; border-radius: 1.2rem; } .empty-state { min-height: 180px; } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </main>
  );
}

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
