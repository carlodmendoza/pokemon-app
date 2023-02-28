import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Container, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.main,
    width: '350px'
}));

const styles = {
    container: {
        display: 'flex', 
        alignItems: 'center',
        cursor: 'pointer'
    },
    avatar: { 
        width: 50, 
        height: 50,
        mr: '20px'
    },
    name: {
        color: 'primary.main',
        mr: '20px'
    }
}

function PokemonListItem(props) {
    return (
        <Item>
            <Container sx={styles.container} onClick={() => props.getClickedPokemon(props.id)}>
                <Avatar sx={styles.avatar} src={props.image} />
                <Typography sx={styles.name}>{props.number}</Typography>
                <Typography>{props.name}</Typography>
            </Container>
        </Item>
    )
}

PokemonListItem.propTypes = {
    id: PropTypes.string,
    image: PropTypes.string,
    number: PropTypes.string,
    name: PropTypes.string,
    getClickedPokemon: PropTypes.func
}

export default PokemonListItem;