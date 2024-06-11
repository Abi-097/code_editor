import { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
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
      // for sync the code
      editorRef.current = editor;

      editor.setSize(null, "100%");
      // editorRef.current.on("change", (instance, changes) => {
      //   // console.log("changes", instance ,  changes );
      //   const { origin } = changes;
      //   const code = instance.getValue(); // code has value which we write
      //   // onCodeChange(code);
      //   if (origin !== "setValue") {
      //     socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      //       roomId,
      //       code,
      //     });
      //   }
      // });
    };

    init();
  }, []);

  return (
    <div style={{ height: "600px" }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
};

export default Editor;
