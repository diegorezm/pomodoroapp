import  './style.css';

interface Props {
  className: 'danger' | 'default' | 'hidden',
  onClick: () => void,
  text: string
}

export default function Button(props: Props) {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
