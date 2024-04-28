import { formatDate } from "../utils/helpers";

function Category({ category, date, amountSpent, sticker, onClick }) {
  return (
    <li className="px-2">
      <div
        onClick={onClick}
        role="button"
        className="1px flex cursor-pointer items-center overflow-y-hidden rounded  border-2 bg-cyan-50 py-4 hover:bg-yellow-50"
      >
        <span className="ml-4">{sticker}</span>
        <div className="ml-5 flex flex-col">
          <h2>{category}</h2>
          <h3>{formatDate(date)}</h3>
        </div>
        <span className="ml-auto mr-4 text-xl font-bold text-green-600">
          -{amountSpent}$
        </span>
      </div>
    </li>
  );
}

export default Category;
