import classes from "./Comment.module.scss";
import { AvatarGenerator } from 'random-avatar-generator';

import { relativeFormatDateTime } from "../../utils/utils";
import Card from "../UI/Card/Card";

export default function Comment({ comment, ...props }) {
  const generator = new AvatarGenerator();

  return <Card className={`${classes.comment} ${props.className ? props.className : ''}`} {...props}>
    <img className={classes.comment__avatar} src={generator.generateRandomAvatar(comment.userId + comment.avatar)} />
    <div className={classes.comment__content}>
      <p className={classes.comment__details}><span className={classes.comment__details__name}>{comment.name}</span><span className={classes.comment__details__time}>{relativeFormatDateTime(comment.date)}</span></p>
      <p className={classes.comment__content__text}>{comment.text}</p>
    </div>
  </Card>;
}