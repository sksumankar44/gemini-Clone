// import React, { useContext, useState } from "react";
// import "./Sidebar.css";
// import "../../assets/assets";
// import { assets } from "../../assets/assets";
// import { ContextNew } from "../../context/ContextNew";
// const Sidebar = () => {
//   const [extended, setExtended] = useState(false);
//   const { prevPrompts } = useContext(ContextNew);

//   return (
//     <div className="sidebar">
//       <div className="top">
//         <img
//           onClick={() => setExtended((prev) => !prev)}
//           className="menu"
//           src={assets.menu_icon}
//           alt=""
//         />
//         <div className="new-chat">
//           <img src={assets.plus_icon} alt="" />
//           {extended ? <p>New Chat</p> : null}
//         </div>
//         {extended && (
//           <div className="recent">
//             <p className="recent-title">Recent</p>
//             {Array.isArray(prevPrompts) &&
//               prevPrompts.map((item, index) => (
//                 <div className="recent-entry" key={index}>
//                   <img src={assets.message_icon} alt="message" />
//                   <p>{item.slice(0, 18)}...</p>
//                 </div>
//               ))}
//           </div>
//         )}
//       </div>
//       <div className="bottom">
//         <div className="bottom-item recent-entry">
//           <img src={assets.question_icon} alt="" />
//           {extended ? <p>Help</p> : null}
//         </div>
//         <div className="bottom-item recent-entry">
//           <img src={assets.history_icon} alt="" />
//           {extended ? <p>Activity</p> : null}
//         </div>
//         <div className="bottom-item recent-entry">
//           <img src={assets.setting_icon} alt="" />
//           {extended ? <p>Settings</p> : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { ContextNew } from "../../context/ContextNew";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevprompt, setRecentPrompt, newChat } =
    useContext(ContextNew);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu"
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="plus" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {Array.isArray(prevprompt) && // Ensure prevprompt is an array
              prevprompt.map((item, index) => (
                <div
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                  key={index}
                >
                  <img src={assets.message_icon} alt="message" />
                  <p>{item.slice(0, 18)}...</p>{" "}
                  {/* Displaying a slice of the prompt */}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="activity" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
