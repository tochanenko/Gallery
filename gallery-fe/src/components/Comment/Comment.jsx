import classes from "./Comment.module.scss";
import { AvatarGenerator } from 'random-avatar-generator';

import { relativeFormatDateTime } from "../../lib/utils";
import Card from "../UI/Card/Card";
import Drawable from "../UI/Drawable/Drawable";

export default function Comment({ comment, ...props }) {
  const generator = new AvatarGenerator();

  return <Card className={`${classes.comment} ${props.className ? props.className : ''}`} {...props}>
    <Drawable
      className={classes.comment__avatar}
      src={generator.generateRandomAvatar(comment.userId + comment.avatar)}
      alt="User Avatar"
      predictedDims={{ height: "48px", width: "48px" }}
    />
    <div className={classes.comment__content}>
      <p className={classes.comment__details}><span className={classes.comment__details__name}>{comment.name}</span><span className={classes.comment__details__time}>{relativeFormatDateTime(comment.date)}</span></p>
      <p className={classes.comment__content__text}>{comment.text}</p>
    </div>
  </Card>;
}