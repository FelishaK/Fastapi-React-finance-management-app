function Button({
  children,
  type,
  onClick,
  form = "",
  disabled = false,
  submit = "",
}) {
  const variations = {
    add: "flex w-16 items-center justify-center rounded-full bg-yellowAdd p-1 text-4xl font-bold hover:opacity-65 focus:outline-none focus:ring focus:ring-orange-300",
    cancel:
      "rounded-full bg-redCancel px-16 py-4 text-xl font-medium uppercase  shadow-md shadow-red-500/20 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none",
    confirm:
      "active:opacity-[0.85 rounded-full bg-greenConfirm px-16 py-4 text-xl font-medium uppercase shadow-md shadow-green-500/20 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
    delete:
      "absolute text-zinc-900 rounded-full bg-redDelete px-12 py-3 text-xl font-medium uppercase  shadow-md shadow-red-500/20 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none",
  };

  return (
    <button
      type={submit}
      disabled={disabled}
      onClick={onClick}
      className={variations[type]}
      form={form}
    >
      <span className="mb-2">{children}</span>
    </button>
  );
}

export default Button;
