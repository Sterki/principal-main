import { openDB } from 'idb';

const DB_NAME = 'expensesApp';
const DB_VERSION = 1; // Incrementa este número si necesitas cambiar la estructura de la base de datos.

export const initDB = async () => {
  // Inicializa la base de datos con dos stores: budgets y expenses.
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('budgets')) {
        const budgetsStore = db.createObjectStore('budgets', { keyPath: 'id', autoIncrement: true });
        budgetsStore.createIndex('name', 'name', { unique: false });
      }
      if (!db.objectStoreNames.contains('expenses')) {
        const expensesStore = db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
        expensesStore.createIndex('budgetId', 'budgetId', { unique: false }); // Relación con budgets
      }
    },
  });
  return db;
};