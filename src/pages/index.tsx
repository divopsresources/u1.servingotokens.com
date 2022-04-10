import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Separator,
  Stack,
  Text,
  Label,
  PrimaryButton,
  DefaultButton,
  TextField,
  Breadcrumb,
  IBreadcrumbItem,
  Dialog,
  DialogType,
  DialogFooter
} from "office-ui-fabric-react";
import FileUploadProgress from "react-fileupload-progress";
import "../styles.css";

const itemsWithHeading: IBreadcrumbItem[] = [
  {
    text: "Starter Template Library",
    key: "startertemplatelibrary"
  },
  {
    text: "Action-Oriented Communication",
    key: "startertemplatetitle",
    isCurrentItem: true
  }
];
export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}
function FileUploadForm(props: any) {
  return (
    <div style={{ textAlign: "left" }}>
      <Separator alignContent="start">Optional File Import</Separator>
      <Label styles={{ root: { display: "inline-block" } }}>
        Upload a Category Defination File from Workspace Analytics
      </Label>
      <FileUploadProgress
        styles={{ root: { display: "inline-block" } }}
        key="ex1"
        url="https://gn7cr3.csb.app/api/upload"
        onProgress={(e, request, progress) => {
          console.log("progress", e, request, progress);
        }}
        onLoad={(e, request) => {
          console.log("load", e, request);
        }}
        onError={(e, request) => {
          console.log("error", e, request);
        }}
        onAbort={(e, request) => {
          console.log("abort", e, request);
        }}
      />
    </div>
  );
}
function EditForm(props: any) {
  const [editValue, setEditValue] = useState(props.name);
  let handleSave = (e: any) => {
    props.handleEditOnClick(editValue);
  };
  return (
    <div
      className="edit-form"
      style={{ display: "inline-block", marginRight: "10px" }}
    >
      <TextField
        styles={{ root: { display: "inline-block" } }}
        value={editValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEditValue(e.target.value)
        }
      />
      <PrimaryButton
        ariaDescription="Detailed description used for screen reader."
        disabled={editValue !== "" ? false : true}
        onClick={handleSave}
        styles={{ root: { marginLeft: "10px", marginRight: "10px" } }}
      >
        Save
      </PrimaryButton>
    </div>
  );
}
function Category(props: any) {
  const [showCategoryName, toggleCategoryName] = useState(true);
  const [hideDialog, showDialog] = useState(true);
  let handleEditCategory = (e: any) => {
    toggleCategoryName(true);
    let categoryItem = props.item;
    categoryItem["name"] = e;
    props.onChangeCategory(categoryItem);
  };
  let handleDelete = (e: any) => {
    showDialog(false);
    //props.onDeleteCategory(props.item);
  };
  let closeDialog = () => {
    showDialog(true);
    props.onDeleteCategory(props.item);
  };
  return (
    <Stack
      key={"category" + props.id}
      horizontalAlign="start"
      styles={{ root: { border: "2px solid '#ababab", padding: "10px" } }}
    >
      <div
        className="category-name"
        style={{ textAlign: "left", marginTop: "10px" }}
      >
        {showCategoryName ? (
          <h4 onClick={() => toggleCategoryName(false)}>{props.name}</h4>
        ) : (
          <>
            <EditForm
              handleEditOnClick={handleEditCategory}
              name={props.name}
            />
            <DefaultButton onClick={handleDelete}>Delete</DefaultButton>
          </>
        )}
      </div>
      <div className="category-inputs" style={{ textAlign: "left" }}>
        <div
          className="category-exclude-keywords"
          style={{
            display: "inline-block",
            width: "40%",
            marginRight: "20px"
          }}
        ></div>
        <div
          key={"categorykeywordinclude" + props.id}
          className="category-exclude-keywords"
          style={{ display: "inline-block", width: "40%" }}
        >
          <TextField label="Keyword to include" multiline resizable={false} />
        </div>
      </div>
      <div className="file-upload-form-container">
        <FileUploadForm />
      </div>
      <Dialog
        hidden={hideDialog}
        onDismiss={closeDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Delete Category",
          closeButtonAriaLabel: "Close",
          subText: "Do you want to delete this category?"
        }}
        modalProps={{
          titleAriaId: this._labelId,
          subtitleAriaId: this._subTextId,
          isBlocking: false,
          styles: { main: { maxWidth: 450 } }
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={closeDialog} text="Yes" />
          <DefaultButton onClick={closeDialog} text="No" />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
}
function Categories(props: any) {
  let updateCategory = (e: any) => {
    let items = props.items.map((item) => {
      if (item.id === e.id && item.name !== e.name) {
        item["name"] = e.name;
      }
      return item;
    });
    props.onChangeCategories(items);
  };
  let handleDelete = (e: any) => {
    let items = props.items.filter((item) => item.id !== e.id);
    props.onChangeCategories(items);
  };
  let categoriesResult = props.items.map((item: any) => {
    return (
      <Category
        key={item.id}
        item={item}
        name={item.name}
        onChangeCategory={updateCategory}
        onDeleteCategory={handleDelete}
      />
    );
  });
  return <div>{categoriesResult}</div>;
}
function App() {
  const [showName, setFlag] = useState(true);
  const [starterTemplateName, setName] = useState(
    "Action-Oriented Communication"
  );
  const [categories, setCategory] = useState([
    {
      id: 2,
      name: "New Action oriented",
      includeText: "Sample Include keyword",
      excludeText: "Sample Exclulde keyword"
    }
  ]);
  const handleEditName = (event: any) => {
    setFlag(false);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setFlag(true);
  };
  return (
    <div className="App" style={{ textAlign: "left" }}>
      <div className="breadcrub-container">
        <Breadcrumb
          key="breadcrumbs-element"
          items={itemsWithHeading}
          maxDisplayedItems={3}
          ariaLabel="With custom rendered divider and overflow icon"
          overflowAriaLabel="More links"
        />
      </div>
      <div className="heading-container">
        <Text key="page-heading-text" variant="xLarge" nowrap block>
          Starter Template Settings
        </Text>
      </div>
      <Stack
        styles={{
          root: { padding: "5px", backgroundColor: "rgb(170, 230, 210)" }
        }}
      >
        <div className="starter-template-name-container">
          <Text
            styles={{
              root: { textAlign: "left", display: showName ? "block" : "none" }
            }}
            key="template-heading"
            variant="xLarge"
            nowrap
            onClick={handleEditName}
          >
            {starterTemplateName}
          </Text>
          <form
            onSubmit={handleSubmit}
            style={{ display: showName ? "none" : "block" }}
          >
            <TextField
              name="starterTemplateName"
              id="starterTemplateName"
              value={starterTemplateName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </form>
        </div>
      </Stack>
      <div className="categories-container">
        <Categories
          key="categories"
          items={categories}
          onChangeCategories={(item) => setCategory(item)}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
