import Container from "@mui/material/Container";
import Header from "./components/Header/Header";
import { useContext, useEffect, useState } from "react";
import { BudgetsContext } from "./context/BudgetContext";
import BudgetCard from "./components/BudgetCard/BudgetCard";
import "./App.css";
import { IconButton, Input, Typography } from "@mui/material";
import TotalBudget from "./components/TotalBudgets/TotalBudget";
import UncategorizedBudgetCard from "./components/UncategorizedBudget/UncategorizedBudget";
import { exportData } from "./utils/exportData";
import { handleImportFile } from "./utils/importData";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconUpdateNotification from "./components/IconUpdate/IconUpdateNotification";
import Modal from "./components/Modal/Modal";

function App() {
  const { budgets, expenses } = useContext(BudgetsContext);
  // Inicializa el estado a partir de localStorage, asegurándote de que el valor sea booleano
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("important") !== "true"
  );
  const hasTitle = budgets.length > 0 || expenses.length > 0;
  const [, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      handleImportFile(file); // Llamamos la función de devolución de llamada con el archivo seleccionado
    }
  };

  function handleClose() {
    setIsOpen(false);
    localStorage.setItem("important", "true");
  }

  useEffect(() => {
    const storedValue = localStorage.getItem("important");
    // Si no hay valor en localStorage, abre el modal; si hay "true", no lo abre
    if (storedValue !== "true") {
      setIsOpen(true);
    }
    return () => {
      setIsOpen(false); // Opcional: esto es solo para limpiar en el desmontaje
    };
  }, []);

  return (
    <Container maxWidth='sm'>
      <Header />
      {hasTitle && (
        <Typography
          variant='h5'
          sx={{ paddingBottom: "30px", fontWeight: "bold" }}
        >
          Budget list
        </Typography>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        {budgets.length > 0 && (
          <div
            style={{
              border: "1px solid #ccc",
              padding: "1em",
              borderRadius: "5px",
            }}
          >
            <Typography
              variant='h6'
              sx={{ fontWeight: "bold", marginBottom: "1em" }}
              textAlign='center'
            >
              Generate Backup
            </Typography>
            <Typography fontSize={14}>
              1.- To generate a backup of all your data, click on the following
              icon.
              <IconButton onClick={exportData}>
                <FileDownloadIcon />
              </IconButton>
            </Typography>
            <Typography fontSize={14}>
              2.- If you have a stored backup with your budget and expenses
              data, you can load it by clicking on the upload icon.
              <Input
                type='file'
                inputProps={{ accept: ".json" }} // Aceptar solo archivos JSON
                onChange={handleFileChange}
                style={{ display: "none" }} // Ocultar el input de tipo file
                id='file-input'
              />
              <label htmlFor='file-input'>
                <IconButton component='span'>
                  <FileUploadIcon />
                </IconButton>
              </label>
            </Typography>
          </div>
        )}
        {budgets.map((budget) => {
          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              max={budget.max}
              budgetId={budget.id}
            />
          );
        })}
        <UncategorizedBudgetCard />
        <TotalBudget />
      </div>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <IconUpdateNotification />
      </Modal>
    </Container>
  );
}

export default App;
