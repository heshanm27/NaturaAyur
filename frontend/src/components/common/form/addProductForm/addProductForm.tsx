import { Box, Grid, IconButton, ImageList, ImageListItem, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export default function AddProductForm() {
  const theme = useTheme();
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles),
    maxFiles: 6,
    multiple: true,
    accept: { "image/jpeg": [".jpeg", ".png"] },
    maxSize: 1000000,
  });
  const [selectedFiles, setSelectedFiles] = useState<any>([]);

  const handleDrop = (acceptedFiles: any) => {
    // Create an array from the acceptedFiles object

    // Calculate the total number of files after adding the new files
    const totalFiles = selectedFiles.length + acceptedFiles.length;

    // If the total number of files exceeds 6, show an error or take appropriate action
    if (totalFiles > 6) {
      toast.error("Maximum file count reached", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // You can replace this with your desired action
      return;
    }
    const newFiles = Array.from(acceptedFiles);
    // Add the new files to the selectedFiles array
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };

  const handleRemoveImage = (index: any) => {
    // Remove image from selectedFiles array
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  return (
    <Paper sx={{ p: 2 }}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack direction={"column"} spacing={2}>
              <TextField label="Product Name" />
              <TextField label="Product Price" />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction={"column"} spacing={2}>
              <Box>
                <Typography>Select Main Categorey</Typography>
                <Select options={options} />
              </Box>
              <Box>
                <Typography>Select Sub Categorey</Typography>
                <Select
                  defaultValue={[options[2], options[3]]}
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                border: `2px dashed ${theme.palette.primary.main}`,
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(2),
                textAlign: "center",
                alignItems: "center",
                cursor: "pointer",
                height: "400px",
                display: "flex", // Add display:flex
                justifyContent: "center", // Add justifyContent: center
              }}
              {...getRootProps()}
              ref={dropzoneRef}
            >
              <input {...getInputProps()} />
              {selectedFiles.length === 0 ? (
                <Typography variant="body1" align="center" color="textSecondary">
                  Drag and drop files here, or click to select files
                </Typography>
              ) : (
                <ImageList sx={{ height: "100%", overflow: "auto" }} cols={3} rowHeight={200}>
                  {selectedFiles.map((file: any, index: any) => (
                    <ImageListItem key={file.img}>
                      <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: "100%", maxHeight: "100%" }} loading="lazy" />
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        style={{ position: "absolute", top: 0, right: 0, backgroundColor: "white" }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} spacing={2}>
            <Typography>Product Description</Typography>
            <Editor onInit={(evt, editor) => (editorRef!.current = editor)} />
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Paper>
  );
}
