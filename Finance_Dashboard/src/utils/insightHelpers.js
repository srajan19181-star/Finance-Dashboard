export const getFinanceSummary = (transactions) => {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
};

export const getHighestSpendingCategory = (transactions) => {
  const categoryTotals = {};

  transactions
    .filter((item) => item.type === "expense")
    .forEach((item) => {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    });

  let maxCategory = "None";
  let maxAmount = 0;

  for (const category in categoryTotals) {
    if (categoryTotals[category] > maxAmount) {
      maxAmount = categoryTotals[category];
      maxCategory = category;
    }
  }

  return { category: maxCategory, amount: maxAmount };
};

export const getCategoryBreakdown = (transactions) => {
  const breakdown = {};

  transactions
    .filter((item) => item.type === "expense")
    .forEach((item) => {
      breakdown[item.category] = (breakdown[item.category] || 0) + item.amount;
    });

  return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
};

export const getTrendData = (transactions) => {
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;

  return sorted.map((item) => {
    if (item.type === "income") {
      runningBalance += item.amount;
    } else {
      runningBalance -= item.amount;
    }

    return {
      date: item.date,
      balance: runningBalance,
    };
  });
};