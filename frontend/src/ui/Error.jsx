function Error({ errors, field }) {
  return (
    <p>
      {errors?.field?.message && (
        <span className="text-base text-red-600">{errors.field.message}</span>
      )}
    </p>
  );
}

export default Error;
