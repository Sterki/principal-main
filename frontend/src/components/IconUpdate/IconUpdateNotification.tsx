import { Box, IconButton, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { exportData } from "../../utils/exportData";

const IconUpdateNotification = () => {
  return (
    <Box style={{ padding: "1em", backgroundColor: "#ffcc00", color: "#333" }}>
      <Typography sx={{ fontSize: "14px" }}>
        ¡Actualizacion web app! Para ver los nuevos cambios en el ícono, elimina
        la app de tu pantalla de inicio y agrégala nuevamente. si eres un
        usuario de iOS, puedes hacerlo desde la opción de compartir en Safari.
      </Typography>
      <ul>
        <li>
          <Typography sx={{ fontSize: "14px" }}>
            abre la opcion compartir pantilla desde la web
          </Typography>
        </li>
        <li>
          <Typography sx={{ fontSize: "14px" }}>
            selecciona la opcion agregar a pantalla de inicio
          </Typography>
        </li>
      </ul>
      <Typography variant='h6' textAlign='center'>
        Importante
      </Typography>
      <Typography fontSize={14} fontWeight={700}>
        Una vez borres la app perderas tus datos, recuerda generar primero un
        backup. haciendo click en el siguiente icono
        <IconButton onClick={exportData}>
          <FileDownloadIcon />
        </IconButton>
      </Typography>
    </Box>
  );
};

export default IconUpdateNotification;
