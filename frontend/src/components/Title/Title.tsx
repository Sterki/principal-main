import { Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
}

export default function Title(props: Props): React.ReactElement {
  return (
    <Typography variant='h5' sx={{ fontWeight: "bold", paddingBottom: "20px" }}>
      {props.title}
    </Typography>
  );
}
