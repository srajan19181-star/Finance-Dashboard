import { mockTransactions } from "../data/mockData";

const SIMULATED_DELAY = 900; // ms — simulates network round-trip

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock API — simulates server calls with realistic delays.
 * Reads/writes to localStorage as the persistence layer.
 */
export const mockApi = {
  /** Fetch all transactions (reads localStorage, falls back to seed data) */
  async fetchTransactions() {
    await delay(SIMULATED_DELAY);
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [...mockTransactions];
  },

  /** Persist a new transaction */
  async addTransaction(transaction) {
    await delay(300);
    return transaction;
  },

  /** Persist an edited transaction */
  async updateTransaction(transaction) {
    await delay(300);
    return transaction;
  },

  /** Remove a transaction by id */
  async deleteTransaction(id) {
    await delay(200);
    return { id };
  },
};
