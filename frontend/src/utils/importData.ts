export const importData = async (file: File): Promise<void> => {
    const dbName = "expensesApp"; // Cambia esto por el nombre de tu base de datos
    const storeNames = ["budgets", "expenses"]; // Cambia esto por los nombres de tus almacenes
    
    // Leer el archivo JSON
    const fileContent = await readFile(file);
    const importObject: Record<string, any[]> = JSON.parse(fileContent);
    
    const db = await openDB(dbName);
    
    // Insertar los datos en los almacenes
    for (const storeName of storeNames) {
      const storeData = importObject[storeName];
      if (storeData) {
        await insertIntoStore(db, storeName, storeData);
      }
    }
  };
  
  async function readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
  
  async function openDB(dbName: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  // Función para insertar datos en un almacén de IndexedDB
  async function insertIntoStore(db: IDBDatabase, storeName: string, data: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
  
      data.forEach(item => {
        store.put(item); // Usa put para insertar o actualizar registros
      });
  
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
  
  export const handleImportFile = async (file: File) => {
      await importData(file);
      window.location.reload();
  }