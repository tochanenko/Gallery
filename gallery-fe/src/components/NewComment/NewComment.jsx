import classes from "./NewComment.module.scss";
import { AvatarGenerator } from 'random-avatar-generator';
import { API_URL } from "../../lib/constants";
import Card from "../UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";

export default function NewComment({ photo }) {
  const generator = new AvatarGenerator();
  const dispatch = useDispatch();

  const userState = useSelector(state => state.user);

  async function handleUpdateAvatar() {
    const nextAvatar = userState.avatar + 1;

    console.log(userState);

    const response = await fetch(`${API_URL}/user/${userState.id}`, {
      method: 'PUT',
      body: JSON.stringify({ avatar: nextAvatar }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Could not update user' }), { status: 500 });
    } else {
      dispatch(userActions.updateUser({ avatar: nextAvatar }))
    }
  }

  return <Card className={classes.new_comment}>
    <img
      className={classes.new_comment__avatar}
      src={generator.generateRandomAvatar(userState.id + userState.avatar)} onClick={handleUpdateAvatar}
    />
    <div className={classes.new_comment__details}>
      <input name="user_name" />
      <input name="comment" />
      <button type="submit">Send</button>
    </div>
  </Card>
}