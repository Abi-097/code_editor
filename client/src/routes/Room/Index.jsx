import "./Style.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-noconflict/keybinding-vim";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

const Room = () => {
  const languageAvailable = [
    "javascript",
    "typescript",
    "java",
    "python",
    "yami",
    "golang",
    "html",
    "css",
  ];
  const codeKeyBindingsAvailable = ["default", "emacs", "vim"];
  // function copyToClipboard(e) {}
  return (
    <div className="room">
      <div className="roomSidebar">
        <div className="roomSidebarUsersWrapper">
          <div className="languageFieldWrapper">
            <select name="language" className="languageField" id="language">
              {languageAvailable.map((eachLanguage) => (
                <option value={eachLanguage} key={eachLanguage}>
                  {eachLanguage}
                </option>
              ))}
            </select>
          </div>
          <div className="languageFieldWrapper">
            <select name="language" className="languageField" id="language" />
          </div>
          <p>Connected users:</p>
          <div className="roomSidebarUsers"></div>
          <button className=" roomSidebarCopyBtn"> Copy Room ID</button>
          <button className="roomSidebarBtn">Leave</button>
        </div>
      </div>

      <AceEditor
        placeholder="Enter the code here"
        className="roomCodeEditor"
        mode="javascript"
        // theme="monokai"
        name="CollabEditor"
        width="auto"
        height="auto"
        fontSize={15}
        showPrintMargin={true}
        showGutter={true}
        tabSize={2}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};

export default Room;
