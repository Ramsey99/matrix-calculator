import { useState } from "react";
import {
  Button,
  TextField,
  Card,
  Typography,
  Box,
  Stack,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { lime } from "@mui/material/colors";

const generateMatrix = (
  rows: number,
  cols: number,
  operation: "sum" | "multiply"
) => {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) =>
      operation === "sum" ? r + c : r * c
    )
  );
};

const MatrixCalculator = () => {
  const [numRows, setNumRows] = useState<number | "">("");
  const [numCols, setNumCols] = useState<number | "">("");
  const [sumMatrix, setSumMatrix] = useState<number[][] | null>(null);
  const [productMatrix, setProductMatrix] = useState<number[][] | null>(null);
  const [addedMatrix, setAddedMatrix] = useState<number[][] | null>(null);

  const handleGenerate = () => {
    if (numRows && numCols) {
      const newSumMatrix = generateMatrix(
        Number(numRows),
        Number(numCols),
        "sum"
      );
      const newProductMatrix = generateMatrix(
        Number(numRows),
        Number(numCols),
        "multiply"
      );

      setSumMatrix(newSumMatrix);
      setProductMatrix(newProductMatrix);
      setAddedMatrix(null);
    }
  };

  const handleAddMatrices = () => {
    if (!sumMatrix || !productMatrix) return;

    const result = sumMatrix.map((row, rIdx) =>
      row.map((cell, cIdx) => cell + productMatrix[rIdx][cIdx])
    );

    setAddedMatrix(result);
  };

  const handleRefresh = () => {
    setNumRows("");
    setNumCols("");
    setSumMatrix(null);
    setProductMatrix(null);
    setAddedMatrix(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        mt: 6,
      }}
    >
      <Card
        elevation={6}
        sx={{
          p: 4,
          width: "420px",
          textAlign: "center",
          borderRadius: 4,
          backgroundColor: "#E3F2FD",
          boxShadow: "0px 4px 10px rgba(41, 186, 202, 0.85)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
          Matrix Calculator
        </Typography>
        <Stack spacing={2} alignItems="center">
          <TextField
            label="Rows"
            type="number"
            value={numRows}
            onChange={(e) => setNumRows(e.target.value === "" ? "" : Number(e.target.value))}
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            label="Columns"
            type="number"
            value={numCols}
            onChange={(e) => setNumCols(e.target.value === "" ? "" : Number(e.target.value))}
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerate}
              disabled={!numRows || !numCols}
              sx={{ fontWeight: "bold", px: 3, borderRadius: 2 }}
            >
              Generate
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
              sx={{ fontWeight: "bold", px: 3, borderRadius: 2 }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Card>

      {sumMatrix && productMatrix && (
        <Card
          elevation={4}
          sx={{
            p: 4,
            width: "95%",
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "#FFF",
            boxShadow: "0px 4px 10px rgb(0, 0, 0)",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Generated Matrices
          </Typography>
          <Stack
            spacing={3}
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
          >
            <MatrixDisplay title="Sum Matrix" matrix={sumMatrix} />
            <MatrixDisplay title="Product Matrix" matrix={productMatrix} />
          </Stack>
          <Box mt={3}>
            <Button
              variant="contained"
              color="success"
              onClick={handleAddMatrices}
              sx={{ fontWeight: "bold", borderRadius: 2 }}
            >
              Add Matrices
            </Button>
          </Box>
        </Card>
      )}

      {addedMatrix && (
        <Card
          elevation={4}
          sx={{
            p: 4,
            width: "95%",
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "#E3F2FD",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
            Added Matrix
          </Typography>
          <MatrixDisplay title="Result Matrix" matrix={addedMatrix} />
        </Card>
      )}
    </Box>
  );
};

const MatrixDisplay = ({
  title,
  matrix,
}: {
  title: string;
  matrix: number[][];
}) => {
  return (
    <Card
      sx={{
        flex: 1,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "#424242",
        color: "#fff",
      }}
      elevation={3}
    >
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        color="lime"
      >
        {title}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          backgroundColor: "#333",
          boxShadow: "0px 4px 8px rgb(0, 0, 0)",
        }}
      >
        <Table>
          <TableBody>
            {matrix.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell
                    key={colIndex}
                    sx={{
                      textAlign: "center",
                      color: "#fff",
                      borderColor: "#4FC3F7",
                      fontWeight: "bold",
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default MatrixCalculator;
