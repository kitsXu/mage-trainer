import { useState } from "react";

//what do users have?
//name?
//level
//daily quests completed
//total quests completed
//total quests abandoned
//

export const user = {
  name: 'Solah',
  level:'1',
  questsCompleted:0,
  abandonedQuests:0,
  dailyQuestsCompleted:0,
  abaondonedDailyQuests:0,
  totalQuestsCompleted:0,
  totalQuestsAbandoned:0,
};

export default function userProfile() {


  return (
    <div className="profile">
      <h1 className="userHeader">{user.name}'s Profile</h1>
      <div className="divider">__________</div>
      <div className= "profileInfo">
        <div className="profile">Username: {user.name}</div>
        <div className="profile">Level: {user.level}</div>
        <div className="profile">Total Quests Completed: {user.questsCompleted + user.dailyQuestsCompleted}</div>
        <div className="profile">Total Quests Abandoned: {user.abandonedQuests + user.abaondonedDailyQuests}</div>
        </div>
    </div>
  );
}