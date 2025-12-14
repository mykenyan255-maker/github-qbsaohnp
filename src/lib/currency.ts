export const CONVERSION_RATE = 130;

export const formatKSH = (amount: number): string => {
  return `KSh ${Math.round(amount).toLocaleString()}`;
};

export const formatUSD = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const toKSH = (usd: number): number => {
  return Math.round(usd * CONVERSION_RATE);
};

export const toUSD = (ksh: number): number => {
  return Math.round((ksh / CONVERSION_RATE) * 100) / 100;
};
