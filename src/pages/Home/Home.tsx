import { useNavigate } from "react-router";
import { Box, Typography } from "@mui/material";
import Button from "../../components/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={3}
    >
      <Typography variant="h2" fontWeight="bold">
        Pikatype
      </Typography>
      <Box display="flex" gap={2}>
        <Button
          label="Levels"
          variant="contained"
          size="large"
          onClick={() => navigate("/levels")}
        />
        <Button
          label="Battle"
          variant="outlined"
          size="large"
          onClick={() => navigate("/battle")}
        />
      </Box>
    </Box>
  );
}

export default Home;
