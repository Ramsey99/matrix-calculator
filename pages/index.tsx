import { Container, Typography, Button, Box, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", py: 8, mt: 20, backgroundColor: "#d9c7c7", borderRadius: 2 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Unlock the Power of Matrix Calculations
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          From addition to multiplication, solve matrices effortlessly.
        </Typography>
      </motion.div>

      <Box sx={{ mt: 6 }}>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 5, py: 2, fontSize: "1.25rem", borderRadius: 6 }}
            onClick={() => router.push("/cms/matrixCalculator")}
          >
            Start Solving Now
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
}
