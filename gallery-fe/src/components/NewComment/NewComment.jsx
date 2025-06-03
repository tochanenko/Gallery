import classes from "./NewComment.module.scss";
import Card from "../UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";
import Drawable from "../UI/Drawable/Drawable";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { putNewComment, putUpdateUserAvatar, putUpdateUserName } from "../../lib/http";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

export default function NewComment({ photo, updateComments }) {
  const userNameRef = useRef(undefined);
  const commentRef = useRef(undefined);

  const dispatch = useDispatch();

  const userState = useSelector(state => state.user);

  const [editingUsername, setEditingUsername] = useState(false);

  async function handleUpdateAvatar() {
    const nextAvatar = userState.avatar + 1;
    const user = await putUpdateUserAvatar({ id: userState.id, avatar: nextAvatar });
    dispatch(userActions.updateUser({ avatar: user.avatar }));
    updateComments(photo.comments.map(comment => comment.userId === userState.id ? { ...comment, avatar: user.avatar } : comment));
  }

  async function handleUpdateUsername(event) {
    event.preventDefault();

    const enteredUserName = userNameRef.current.value;
    if (enteredUserName !== userState.name) {
      const updatedUser = await putUpdateUserName({ id: userState.id, name: enteredUserName });
      dispatch(userActions.updateUser({ name: updatedUser.name }));
      updateComments(photo.comments.map(comment => comment.userId === userState.id ? { ...comment, name: updatedUser.name } : comment));
    }

    setEditingUsername(false);
  }

  async function handleAddComment(event) {
    event.preventDefault();

    const enteredComment = commentRef.current.value;

    const updatedPhoto = await putNewComment({
      photoId: photo.id,
      userId: userState.id,
      text: enteredComment,
      date: new Date().toString()
    });
    updateComments(updatedPhoto.comments);
    commentRef.current.value = "";
  }

  return <Card className={classes.new_comment} animateAppearance>
    {!photo ? <motion.div
      className={classes["new_comment--skeleton"]}
      initial={{ backgroundColor: "var(--skeleton-background)" }}
      animate={{
        backgroundColor: ["var(--skeleton-background)", "var(--skeleton-background-tinted)", "var(--skeleton-background)"]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    /> : <div className={classes.block}>
      <Drawable
        className={classes.new_comment__avatar}
        src={userState.avatarUrl} onClick={handleUpdateAvatar}
        alt="User Avatar"
        predictedDims={{ height: "128px", width: "128px" }}
      />
        {editingUsername ? <>
          <form onSubmit={handleUpdateUsername} className={classes.new_comment__details__name}>
            <Input
              name="user_name"
              id="user_name"
              ref={userNameRef}
              defaultValue={userState.name}
              placeholder="Username"
            />

            <Button inline>Set</Button>
          </form>
        </> : <>
          <p className={classes.new_comment__details__name}>{userState.name !== "" ? userState.name : "Please add your name"} <Button onClick={() => setEditingUsername(true)} inline={true}>Edit</Button></p>
        </>}

        <form onSubmit={handleAddComment} className={classes.new_comment__details__text}>
          <Input
            name="comment"
            id="comment"
            ref={commentRef}
            placeholder="Comment"
          />
          <Button>Send</Button>
        </form>
    </div>}
  </Card>
}