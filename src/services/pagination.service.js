export const totalPages = (size, count) => {
  return count < size ? 1 : Math.ceil(count / size);
};
