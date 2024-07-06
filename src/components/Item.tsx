export function Item({
  text,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
}) {
  return (
    <li>
      {text}
      <button style={{ marginLeft: "10px" }} onClick={handleClick}>
        Eliminar
      </button>
    </li>
  );
}
