function ChooseCategory({ id, isChosen, onClick, sticker, category }) {
  const transform =
    +id === +isChosen
      ? "transition ease-in-out delay-200  transform -translate-y-6 "
      : "";
  return (
    <li onClick={onClick} className={`${transform} flex justify-center`}>
      <button className="flex flex-col items-center  hover:opacity-70">
        <span className="m-auto">{sticker}</span>
        <h3 className="text-md">{category}</h3>
      </button>
    </li>
  );
}

export default ChooseCategory;
