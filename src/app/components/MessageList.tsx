import profileImage from "../images/profile-img.jpg"
import MessageItem from "./MessageItem";
import React from "react";

const MessageList: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-3 flex-1 p-2 overflow-y-auto scroll-smooth no-scrollbar">
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={false}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Hello" time="12:05" profileImage={profileImage} isSender={true}/>
    </div>
  );
}

export default MessageList