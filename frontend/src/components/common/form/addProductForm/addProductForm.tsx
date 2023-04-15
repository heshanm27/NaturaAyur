import { Box, Button, Grid, IconButton, ImageList, ImageListItem, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories, fetchSubCategory } from "../../../../api/categoryApi";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function AddProductForm() {
  const theme = useTheme();
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [mainCategoryOption, setMainCategoryOption] = useState<any>([]);
  const [subCategoryOption, setSubCategoryOption] = useState<any>([]);
  const [richText, setRichText] = useState<string>("");
  const { data: categorey, error: categoreyError, isLoading: categoreyIsLoading } = useQuery({ queryKey: ["mainCategory"], queryFn: fetchAllCategories });

  // Formik validation schema
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product Name is required"),
    productPrice: Yup.number().required("Product Price is required").min(1, "Minimum value is 1").max(100000, "Maximum value is 100000"),
    productQuantity: Yup.number().required("Product Quantity is required").min(1, "Minimum value is 0").max(10000, "Maximum value is 10000"),
  });

  // Formik form state and submission logic
  const { values, handleSubmit, errors, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      productName: "",
      productPrice: 1,
      productQuantity: 1,
      mainCategory: "",
      subCategory: [],
    },
    validationSchema,
    onSubmit: (values) => {
      // Submit logic here
      console.log("values ss", values);
    },
  });
  console.log(subCategoryOption);
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

  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", editor.getContent());
    setRichText(editor.getContent());
  };

  useEffect(() => {
    if (categorey) {
      setMainCategoryOption(categorey?.categories.map((item: any) => ({ value: item._id, label: item.name })));
    }
    if (values.mainCategory) {
      const foundCategory = categorey?.categories?.find((item: any) => item._id === values.mainCategory);

      setSubCategoryOption(foundCategory?.subCategory?.map((item: any) => ({ value: item, label: item })));
    }
  }, [categorey, values]);

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack direction={"column"} spacing={2}>
              <TextField
                label="Product Name"
                name="productName"
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus={errors.productName ? true : false}
                helperText={errors.productName ? errors.productName : null}
                error={errors.productName ? true : false}
              />
              <TextField
                label="Product Price"
                name="productPrice"
                type="number"
                onChange={handleChange}
                defaultValue={1}
                onBlur={handleBlur}
                autoFocus={errors.productPrice ? true : false}
                helperText={errors.productPrice ? errors.productPrice : null}
                error={errors.productPrice ? true : false}
                inputProps={{ min: "1", max: "100000" }}
              />
              <TextField
                type="number"
                label="Product Quantity"
                name="productQuantity"
                defaultValue={1}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus={errors.productQuantity ? true : false}
                helperText={errors.productQuantity ? errors.productQuantity : null}
                error={errors.productQuantity ? true : false}
                inputProps={{ min: "0", max: "10000" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction={"column"} spacing={2}>
              <Box>
                <Typography>Select Main Categorey</Typography>
                <Select
                  name="mainCategory"
                  options={mainCategoryOption}
                  // value={values.mainCategory}
                  onChange={(option: any) => {
                    console.log(values.mainCategory);
                    setFieldValue("mainCategory", option.value);
                  }}
                  onBlur={handleBlur}
                />
              </Box>
              <Box>
                <Typography>Select Sub Categorey</Typography>
                <Select
                  isMulti
                  name="mainCategory"
                  isDisabled={subCategoryOption?.length < 0 || !values?.mainCategory ? true : false}
                  // value={values.subCategory}
                  options={subCategoryOption}
                  onChange={(item: any) => setFieldValue("subCategory", item)}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onBlur={handleBlur}
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
            <Editor onInit={(evt, editor) => (editorRef!.current = editor)} onChange={handleEditorChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Paper>
  );
}
