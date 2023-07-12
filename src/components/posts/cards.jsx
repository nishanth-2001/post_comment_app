
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PostCard = (props) => {
  const { post,handleClick } = props
  
  return (
    <><Card sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"

    }} >

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions>
      <Button 
      size="small" 
      onClick={() => handleClick(post.id)}
      >View</Button>
      </CardActions>
    </Card>


    </>
  )
}

export default PostCard
