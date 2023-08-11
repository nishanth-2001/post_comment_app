/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react"
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import ImageIcon from '@mui/icons-material/Image';

// import ListItemText from '@mui/material/ListItemText';

// function UsersPage() {

//     const [usersData, setUsersData] = useState([]);

//     const getUsers = async () => {
//         const response = await fetch("https://jsonplaceholder.typicode.com/users", { method: "GET" });
//         const jsonData = await response.json();
//         return jsonData;
//     };

//     useEffect(() => {
//         getUsers()
//             .then((initialData) => {
//                 setUsersData(initialData);
//             })
//             .catch((err) => {
//                 alert(err);
//             });
//     }, []);
//     return (
//         <>
//             {usersData.map((users) => {
//                 return (
//                     <List key={users.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', }}>

//                         <ListItem >
//                             <ListItemAvatar>
//                                 <Avatar>
//                                     <ImageIcon />
//                                 </Avatar>
//                             </ListItemAvatar>


//                             <ListItemText primary={users.username} secondary={users.email}>

//                             </ListItemText>


//                         </ListItem>
//                     </List>
//                 );
//             })}
//         </>
//     );
// }

// export default UsersPage










import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const limit = 1

const UsersPage = () => {

  const [userData, setUsersData] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
 

  useEffect(() => {
    const getUsers = async () => {
      try{
      setLoading(true)
      const start = (currentPage - 1) * limit
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?_start=${start}&_limit=${limit}`, { method: "GET" })
      if (!response.ok) {
        throw new Error("Something Went Wrong....")

      }
      const jsonData = await response.json()
      const totalCount = response.headers.get("x-total-count")
      if (totalCount && !isNaN(totalCount)) {
        const count = Math.ceil(Number(totalCount) / limit)
        setPageCount(count)
      } else {
        setPageCount(1)
      }
      return jsonData
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

    getUsers()
      .then((initialData) => {
        setUsersData(initialData)

      })
      .catch((err) => {
        setErrorMessage(err?.message || err)
      })
      

  }, [currentPage])

  if (loading) {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            minHeight: '80vh',
            justifyContent: 'center',
            alignItems: 'center'
            
          }}>
          <CircularProgress />
        </Box>
      </>
    )

  }

  if (errorMessage.length > 0) {
    return (
      <>
        <Container>
          <Typography sx={{ textAlign: "center", mt: "20%" }} variant="h3" gutterBottom>
            {errorMessage}
          </Typography>
        </Container>
      </>
    )
  }




  return (
    <div>
      
      <TableContainer  component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell sx={{fontFamily:"sans-serif", fontSize:"20px",fontWeight:"bold"}} align="center">Name</TableCell>
              <TableCell sx={{fontFamily:"sans-serif", fontSize:"20px",fontWeight:"bold"}} align="center">Username</TableCell>
              <TableCell sx={{fontFamily:"sans-serif", fontSize:"20px",fontWeight:"bold"}} align="center">Email</TableCell>
              <TableCell sx={{fontFamily:"sans-serif", fontSize:"20px",fontWeight:"bold"}} align="center">Address</TableCell>
              <TableCell sx={{fontFamily:"sans-serif", fontSize:"20px",fontWeight:"bold"}} align="center">Phone</TableCell>
              <TableCell sx={{fontFamily:"sans-serif", fontSize:"20px",fontWeight:"bold"}} align="center">Website</TableCell>
              <TableCell sx={{fontFamily:"sans-serif", fontSize:"20px",fontWeight:"bold"}} align="center">Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{fontFamily:"cursive", fontSize:"20px"}}component="th" scope="row" >
                  {user.name}
                </TableCell>
                
                <TableCell sx={{fontFamily:"cursive", fontSize:"20px"}}align="left">{user.username}</TableCell>
                <TableCell sx={{fontFamily:"cursive", fontSize:"20px"}}align="left">{user.email}</TableCell>
                <TableCell sx={{fontFamily:"cursive", fontSize:"20px"}}align="left">{user.address && `${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</TableCell>
                <TableCell sx={{fontFamily:"cursive", fontSize:"20px"}}align="left">{user.phone}</TableCell>
                <TableCell sx={{fontFamily:"cursive", fontSize:"20px"}}align="left">{user.website}</TableCell>
                <TableCell sx={{fontFamily:"cursive", fontSize:"20px"}}align="left">{user.company && `${user.company.name}, ${user.company.catchPhrase}, ${user.company.bs}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
          count={pageCount}
          page={currentPage}
          color="primary"
          onChange={(e, newPage) => {
            setCurrentPage(newPage)
          }
          } sx={{ display:'flex', 
                  my: 3,
                  justifyContent:'center' 
                }}
        />
        
     
    </div>
  );
}

export default UsersPage