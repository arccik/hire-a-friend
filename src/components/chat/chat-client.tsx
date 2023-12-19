import React from "react";

interface Props {
  isConnected: boolean;
  members: string[];
  chatRows: React.ReactNode[];
  onPublicMessage: () => void;
  onPrivateMessage: (to: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const ChatClient = (props: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#f4ede3",
        display: "flex",
        alignItems: "center",
      }}
    >
      {props.members.map((item) => (
        <div
          key={item}
          onClick={() => {
            props.onPrivateMessage(item);
          }}
        >
          <p style={{ fontWeight: 800 }}>{item}</p>
        </div>
      ))}

      <ul
        style={{
          paddingTop: 20,
          paddingLeft: 44,
          listStyleType: "none",
        }}
      >
        {props.chatRows.map((item, i) => (
          <li key={i} style={{ paddingBottom: 9 }}>
            {item}
          </li>
        ))}
      </ul>
      <div style={{ margin: 10 }}>
        {props.isConnected && (
          <button style={{ marginRight: 7 }} onClick={props.onPublicMessage}>
            Send Public Message
          </button>
        )}
        {props.isConnected && (
          <button onClick={props.onDisconnect}>Disconnect</button>
        )}
        {!props.isConnected && (
          <button onClick={props.onConnect}>Connect</button>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          right: 9,
          top: 8,
          width: 12,
          height: 12,
          backgroundColor: props.isConnected ? "#00da00" : "#e2e2e2",
          borderRadius: 50,
        }}
      />
    </div>
  );
};
