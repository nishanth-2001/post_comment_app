import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


const NewPostPage = () => {
    const navigate = useNavigate()
  return (
    <>
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <form style={{ marginTop: "50px", width: "40%" }}
        onSubmit={async (e)=>{
            try{
                e.preventDefault()
                const formData = new FormData(e.target)
                const title = formData.get("title")
                const body = formData.get("body")
                const reqInput = { title, body }
                const response = await fetch(
                    `http://localhost:3000/posts`,
                    { method: "POST", body: JSON.stringify(reqInput), headers: { "Content-Type": "application/json" } }
                  );
                  if (!response.ok) {
                    alert("Something Went Wrong....");
                    return
                  }
                  navigate("/posts")
            } catch (err){
                console.log(err)
                alert("Something Went Wrong....")
            }
        }}>
            
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            name="title"
            sx={{ mb: "30px" }}
          />
          <TextField
           label="Body"
            variant="outlined" 
            fullWidth required 
            name="body"
            sx={{ mb: "30px" }}/>
            <Button
            variant="contained"
            type="submit">
                
            save</Button>
        </form>
      </Container>
    </>
  );
};

export default NewPostPage;
