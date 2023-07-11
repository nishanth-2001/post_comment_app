import { useEffect, useState } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import ListItemText from '@mui/material/ListItemText';

function UsersPage() {

    const [usersData, setUsersData] = useState([]);

    const getUsers = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", { method: "GET" });
        const jsonData = await response.json();
        return jsonData;
    };

    useEffect(() => {
        getUsers()
            .then((initialData) => {
                setUsersData(initialData);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);
    return (
        <>
            {usersData.map((users) => {
                return (
                    <List key={users.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', }}>

                        <ListItem >
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>


                            <ListItemText primary={users.username} secondary={users.email}>

                            </ListItemText>


                        </ListItem>
                    </List>
                );
            })}
        </>
    );
}

export default UsersPage