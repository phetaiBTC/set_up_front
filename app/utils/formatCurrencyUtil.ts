export const formatCurrency = (value: number) => {
  if (isNaN(value)) return "₭0";
  const formatter = new Intl.NumberFormat("lo-LA", {
    minimumFractionDigits: 0,
  }).format(value);

  return `₭ ${formatter}`;
};
