import { useDispatch, useSelector } from "react-redux";
import Drawable from "../UI/Drawable/Drawable";
import { putUpdateUserAvatar } from "../../lib/http";
import { userActions } from "../../store/user";

import classes from "./NewComment.module.scss";

export default function UserAvatar({ photo, updateComments }) {
  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();

  async function handleUpdateAvatar() {
    const nextAvatar = userState.avatar + 1;
    const user = await putUpdateUserAvatar({ id: userState.id, avatar: nextAvatar });
    dispatch(userActions.updateUser({ avatar: user.avatar }));
    updateComments(photo.comments.map(comment => comment.userId === userState.id ? { ...comment, avatar: user.avatar } : comment));
  }

  return <>
    <Drawable
      className={classes.new_comment__avatar}
      src={userState.avatarUrl} onClick={handleUpdateAvatar}
      alt="User Avatar"
      predictedDims={{ height: "128px", width: "128px" }}
    />
    <span className={classes.new_comment__hint}>You can change your avatar by tapping on it</span>
  </>
}