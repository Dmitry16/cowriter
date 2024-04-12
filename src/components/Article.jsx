import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Article = ({
    id,
    title,
    body,
    image,
    date,
}) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ my: 4 }}>
            <Box sx={{display:'flex', justifyContent:'left', m: 2}}>
                <CardMedia sx={{width: 300, mr: 2}} component="img" height="250" image={image} alt={title} />
                <CardHeader
                    // action={
                    //     <IconButton aria-label="settings">
                    //         <FavoriteIcon />
                    //     </IconButton>
                    // }
                    title={title}
                    subheader={date}
                />
            </Box>
            <CardContent sx={{display:'flex', flexDirection:'row', justifyContent:'center', mb:0, pb:0}}>
                <Typography sx={{mb:0}} paragraph variant="body1" color="text.secondary">
                    {body && body.substring(0, 300)}
                </Typography>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{mt:0, pt:0}}>
                    <Typography paragraph variant="body1" color="text.secondary">
                        {body && body.substring(300)}
                    </Typography>
                </CardContent>
            </Collapse>
            <CardActions disableSpacing>
                <IconButton aria-label="settings">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
        </Card>
    );
};

export default Article;
