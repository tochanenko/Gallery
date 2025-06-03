import classes from "./NewComment.module.scss";
import Card from "../UI/Card/Card";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { putNewComment } from "../../lib/http";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import UserAvatar from "./UserAvatar";
import Username from "./Username";
import Skeleton from "../UI/Skelelton/Skeleton";

export default function NewComment({ photo, updateComments }) {
  const commentRef = useRef(undefined);

  const userState = useSelector(state => state.user);
  const loading = useSelector(state => state.progress.loading);

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
    {!photo ? <Skeleton className={classes["new_comment--skeleton"]}/> : <div className={classes.block}>
      <UserAvatar photo={photo} updateComments={updateComments} />
      <Username photo={photo} updateComments={updateComments} />
      {userState.name === "" ? <span className={classes.new_comment__hint}>Please add your username before posting your first comment</span> : undefined}
      <form onSubmit={handleAddComment} className={classes.new_comment__details__text}>
        <Input
          name="comment"
          id="comment"
          ref={commentRef}
          placeholder="Comment"
          required
          disabled={userState.name === "" || loading}
        />
        <Button disabled={userState.name === "" || loading}>Send</Button>
      </form>
    </div>}
  </Card>
}