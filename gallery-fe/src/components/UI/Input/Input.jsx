import classes from "./Input.module.scss";

export default function Input({ multiline = false, ...props }) {
  return <>
    {multiline ? <textarea {...props} /> : <input {...props} />}
  </>
}