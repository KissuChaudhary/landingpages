import type { UiItem } from '../registry';

export const chatHistory: UiItem = {
  name: 'chat-history',
  title: 'Chat history',
  description: 'Past chats grouped by day, searchable, with titles that write themselves, rename in place and delete with Undo.',
  summary:
    'The sidebar people come back to every day. Chats group into Pinned, Today, Yesterday, Previous 7 days and older. A new chat shimmers "New chat" until its title is generated, then the title types itself in. Search filters as you type and marks the match. Hover a chat to pin, rename or delete it: renaming turns the row into a field in place, and deleting folds it into "Chat deleted · Undo", only deleting once the undo window has passed.',
  group: 'chat',
  file: 'chat-history.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-shimmer', '@keyframes ui-fade-in', '@keyframes ui-fade-up'],
  tabs: ['Live', 'Search'],
  states: [
    { name: 'grouped', description: 'Newest first under Pinned, Today, Yesterday, Previous 7 days, Previous 30 days, then month names. It regroups at midnight.' },
    { name: 'new', description: '"New chat" shimmers while generating is true; the title then types in once.' },
    { name: 'search', description: 'Rows filter as you type, the match is highlighted, Escape clears, and an empty search says so.' },
    { name: 'rename', description: 'The row becomes a field with the title selected; Enter or leaving saves, Escape cancels.' },
    { name: 'deleted', description: '"Chat deleted · Undo" for undoWindow, then the row folds away and onDelete is called.' },
  ],
  usage: `import { ChatHistory } from "@/components/chat-history";

<ChatHistory chats={chats} activeId={chatId} onSelect={openChat} onNew={newChat} onRename={rename} onDelete={remove} onPin={pin} />`,
  recipe: `// Server: name a new chat from its first message
import { generateText } from "ai";

export async function POST(req: Request) {
  const { chatId, firstMessage } = await req.json();
  const { text } = await generateText({
    model: "openai/gpt-5-mini",
    system: "Write a 2 to 5 word title for this chat. No quotes or punctuation at the end.",
    prompt: firstMessage,
  });
  await db.chats.update(chatId, { title: text.trim(), generating: false });
  return Response.json({ title: text.trim() });
}

// Client: create the chat with generating: true and send the first message;
// when the title comes back, update that chat and ChatHistory types it in.
const { sendMessage } = useChat({ id: chatId });
setChats((c) => [{ id: chatId, updatedAt: Date.now(), generating: true }, ...c]);
sendMessage({ text });
const { title } = await fetch("/api/title", { method: "POST", body: JSON.stringify({ chatId, firstMessage: text }) }).then((r) => r.json());
setChats((c) => c.map((x) => (x.id === chatId ? { ...x, title, generating: false } : x)));`,
  props: [
    { name: 'chats', type: '{ id; title?; updatedAt; pinned?; generating? }[]', description: 'Grouped and sorted for you. Leave title empty (or set generating) while it’s being named.' },
    { name: 'activeId / onSelect', type: 'string / (id) => void', description: 'The open chat, marked with aria-current.' },
    { name: 'onNew', type: '() => void', description: 'Shows the new-chat button beside search.' },
    { name: 'onRename / onPin', type: '(id, title) => void / (id, pinned) => void', description: 'Show Rename and Pin on hover or focus.' },
    { name: 'onDelete / undoWindow', type: '(id) => void / number', default: '— / 5000', description: 'Called once the undo window has passed, after the row has folded away.' },
    { name: 'searchable / defaultQuery', type: 'boolean / string', default: 'true / ""', description: 'The search field and its starting text.' },
  ],
  notes: [
    'A labelled navigation landmark with a heading per group; the open chat has aria-current="page".',
    'Up and Down move between chats from anywhere in the list, including the search field.',
    'Row actions appear on hover and keyboard focus, always on touch screens, and are labelled with the chat ("Delete Pistachio supplier prices").',
    'Nothing is deleted until Undo has had its chance, so a slip of the finger never costs a conversation.',
  ],
};
