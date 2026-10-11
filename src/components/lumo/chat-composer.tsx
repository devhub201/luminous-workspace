import { createContext, useContext, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, Mic, Paperclip, Square, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  usePromptInputAttachments,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";

function AttachmentControls({ loading }: { loading: boolean }) {
  const attachments = usePromptInputAttachments();
  return (
    <>
      <div className="chat-attachments">
        {attachments.files.map((file) => (
          <span key={file.id}>
            <Paperclip size={12} />
            <span>{file.filename || "Attachment"}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove ${file.filename}`}
              title={`Remove ${file.filename}`}
              onClick={() => attachments.remove(file.id)}
            >
              <X />
            </Button>
          </span>
        ))}
      </div>
      <PromptInputFooter className="chat-composer-footer">
        <div className="chat-composer-tools">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={loading}
            aria-label="Attach files"
            title="Attach files"
            onClick={() => attachments.openFileDialog()}
          >
            <Paperclip />
          </Button>
          <span className="chat-composer-caption">Attachments · local preview only</span>
        </div>
        <div className="chat-send-tools">
          <Button asChild variant="ghost" size="icon" title="Voice mode">
            <Link to="/voice" aria-label="Voice mode">
              <Mic />
            </Link>
          </Button>
          <SubmitControl />
        </div>
      </PromptInputFooter>
    </>
  );
}
// Submit is composed below to keep chat status on the AI Elements submit primitive.
const SubmitContext = createContext({ loading: false, enabled: false, stop: () => {} });
function SubmitControl() {
  const { loading, enabled, stop } = useContext(SubmitContext);
  return (
    <PromptInputSubmit
      status={loading ? "submitted" : "ready"}
      onStop={stop}
      disabled={!loading && !enabled}
      aria-label={loading ? "Stop response" : "Send message"}
      title={loading ? "Stop response" : "Send message"}
    >
      {loading ? <Square /> : <ArrowUp />}
    </PromptInputSubmit>
  );
}
export function ChatComposer({
  draft,
  setDraft,
  loading,
  onSend,
  stop,
  onError,
}: {
  draft: string;
  setDraft: (draft: string) => void;
  loading: boolean;
  onSend: (message: PromptInputMessage) => void;
  stop: () => void;
  onError: (message: string) => void;
}) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!document.querySelector('[role="dialog"], [role="menu"]'))
      textarea.current?.focus({ preventScroll: true });
  }, [loading]);
  return (
    <SubmitContext.Provider value={{ loading, enabled: !!draft.trim(), stop }}>
      <PromptInput
        className="chat-composer"
        multiple
        maxFiles={5}
        maxFileSize={10 * 1024 * 1024}
        onError={(error) => onError(error.message)}
        onSubmit={(message) => {
          if (loading || !message.text.trim()) return;
          onSend(message);
          setDraft("");
          textarea.current?.focus({ preventScroll: true });
        }}
      >
        <PromptInputTextarea
          ref={textarea}
          aria-label="Message LUMO"
          placeholder="What’s on your mind?"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing &&
              window.matchMedia("(pointer: coarse)").matches
            ) {
              e.preventDefault();
              const start = e.currentTarget.selectionStart;
              const end = e.currentTarget.selectionEnd;
              setDraft(draft.slice(0, start) + "\n" + draft.slice(end));
              requestAnimationFrame(() =>
                textarea.current?.setSelectionRange(start + 1, start + 1),
              );
            }
          }}
        />
        <AttachmentControls loading={loading} />
      </PromptInput>
    </SubmitContext.Provider>
  );
}
