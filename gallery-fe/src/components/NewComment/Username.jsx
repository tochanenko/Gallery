import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

import classes from "./NewComment.module.scss";
import { putUpdateUserName } from "../../lib/http";
import { userActions } from "../../store/user";

export default function Username({ photo, updateComments }) {
  const userNameRef = useRef(undefined);
  const userState = useSelector(state => state.user);
  const [editingUsername, setEditingUsername] = useState(false);

  const dispatch = useDispatch();

  async function handleUpdateUsername(event) {
    event.preventDefault();

    const enteredUserName = userNameRef.current.value;
    if (enteredUserName !== userState.name) {
      const updatedUser = await putUpdateUserName({ id: userState.id, name: enteredUserName });
      if (updatedUser) {
        dispatch(userActions.updateUser({ name: updatedUser.name }));
        updateComments(photo.comments.map(comment => comment.userId === userState.id ? { ...comment, name: updatedUser.name } : comment));
      }
    }

    setEditingUsername(false);
  }

  function handleCancelNameChange() {
    userNameRef.current.value = userState.name;
    setEditingUsername(false);
  }

  return <>
    {editingUsername ? <>
      <form onSubmit={handleUpdateUsername} className={classes.new_comment__details__name}>
        <Input
          name="user_name"
          id="user_name"
          ref={userNameRef}
          defaultValue={userState.name}
          placeholder="Username"
          required
        />

        <Button inline>Set</Button>
        <Button inline onClick={handleCancelNameChange} type="button">Cancel</Button>
      </form>
    </> : <>
      <p className={classes.new_comment__details__name}>
        {userState.name !== "" ? userState.name : "Please add your name"}
        <Button onClick={() => setEditingUsername(true)} inline={true}>Edit</Button>
      </p>
    </>}
  </>;
}