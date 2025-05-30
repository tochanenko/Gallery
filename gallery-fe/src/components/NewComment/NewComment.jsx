import { useState } from "react";
import classes from "./NewComment.module.scss";
import { AvatarGenerator } from 'random-avatar-generator';
import { API_URL } from "../../utils/constants";

export default function NewComment({ photo }) {
  const [userAvatar, setUserAvatar] = useState(Number(localStorage.getItem("userAvatar")));

  const generator = new AvatarGenerator();

  const userId = localStorage.getItem("userUUID");

  async function handleUpdateAvatar() {
    const nextAvatar = userAvatar + 1;

    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ avatar: nextAvatar }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Could not update user' }), { status: 500 });
    } else {
      localStorage.setItem("userAvatar", nextAvatar.toString());
      setUserAvatar(nextAvatar);
    }
  }

  return <div className={classes.new_comment}>
    <img
      className={classes.new_comment__avatar}
      src={generator.generateRandomAvatar(userId + userAvatar)} onClick={handleUpdateAvatar}
    />
    <div className={classes.new_comment__details}>
      <input name="user_name" />
      <input name="comment" />
      <button type="submit">Send</button>
    </div>
  </div>
}