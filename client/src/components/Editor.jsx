import { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Action";

function Editor({ socket, roomId, onCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const initEditor = () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current = editor;
      editor.setSize(null, "100%");
      editor.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue" && socket && socket.current) {
          // Emit code change to the server
          socket.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    initEditor();
  }, [onCodeChange, roomId, socket]);

  useEffect(() => {
    if (socket && socket.current) {
      const handleCodeChange = ({ code }) => {
        if (code !== null && editorRef.current) {
          // Update code in the editor
          editorRef.current.setValue(code);
        }
      };

      // Listen for code changes from the server
      socket.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

      return () => {
        // Clean up event listener
        socket.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
      };
    }
  }, [socket]);

  return (
    <div style={{ height: "600px" }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
}

export default Editor;
