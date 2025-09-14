
export const exportData = async (): Promise<void> =>  {
    const dbName = "expensesApp"; // Cambia esto por el nombre de tu base de datos
    const storeNames = ["budgets", "expenses"]; // Cambia esto por los nombres de tus almacenes
  
    const exportObject: Record<string, any[]> = {};
  
    const db = await openDB(dbName);
    for (const storeName of storeNames) {
      exportObject[storeName] = await getAllFromStore(db, storeName);
    }
  
    // Descargar como archivo JSON
    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
 // Obtener la fecha actual y formatearla como "Month-Year"
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" }); // Obtiene el nombre completo del mes
    const day = date.getDate().toString().padStart(2, '0'); // Obtiene el día y asegura que sea de 2 dígitos
    const year = date.getFullYear(); // Obtiene el año

    const formattedDate = `${day}-${month}-${year}`;
    a.href = url;
    a.download = `${formattedDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }  
  
  async function openDB(dbName: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Definición de la función getAllFromStore
async function getAllFromStore(db: IDBDatabase, storeName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
