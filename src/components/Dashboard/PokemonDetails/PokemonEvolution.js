import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Avatar, Paper, Container } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_BASIC_INFO } from '../../../graphql/getPokemons';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.main,
    width: '250px'
}));

const styles = {
    item: {
        mt: '20px'
    },
    container: {
        display: 'flex', 
        alignItems: 'center',
        cursor: 'pointer'
    },
    avatar: {
        width: '24',
        height: '24'
    },
    name: {
        color: 'text.main',
        ml: '50px'
    }
}

function PokemonEvolution(props) {
    const [pokemonID, setPokemonID] = useState("");
    const { data } = useQuery( GET_POKEMON_BASIC_INFO, {
        variables: { id: pokemonID}
    });
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        if (data) {
            setPokemon(data.pokemon);
        }
        // eslint-disable-next-line 
    }, [data])

    useEffect(() => {
        if (props.id !== "") {
            setPokemonID(props.id);
        }
    }, [props.id])

    return (
        <Item sx={styles.item}>
            <Container sx={styles.container} onClick={() => props.getClickedPokemon(props.id)}>
                <Avatar sx={styles.avatar} src={pokemon?.image} variant="rounded"/>
                <Typography sx={styles.name}>{pokemon?.name}</Typography>
            </Container>
        </Item>          
    )
}

PokemonEvolution.propTypes = {
    id: PropTypes.string,
    getClickedPokemon: PropTypes.func
}

export default PokemonEvolution;