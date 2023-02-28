import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PokemonList from './PokemonList/PokemonList';
import PokemonPagination from './PokemonPagination';
import PokemonDetails from './PokemonDetails/PokemonDetails';

const styles = {
    outerBox: {
        display: 'flex',
        height: '100vh',
        bgcolor: '#484d57'
    },
    outerGrid: {
        m: '0 auto',
        p: '0px',
        alignSelf: 'center',
        height: '600px',
        width: '1200px',
        bgcolor: '#484d57',
    },
    leftGrid: {
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
        height: '100%'
    },
    rightGrid: {
        bgcolor: 'secondary.main',
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
        height: '100%'
    },
    menu: {
        bgcolor: 'background.main',
        height: '90%'
    },
    pagination: {
        bgcolor: 'background.dark', 
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

function Dashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPokemon, setCurrentPokemon] = useState("");

    return (
        <Box sx={styles.outerBox}>
            <Grid sx={styles.outerGrid} container spacing={0}>
                <Grid item lg={5} md={6} sm={5}>
                    <Grid sx={styles.leftGrid} container>
                        <Grid sx={styles.menu} item lg={12} md={12} sm={12}>
                            <PokemonList currentPage={currentPage} getClickedPokemon={(id) => {setCurrentPokemon(id)}}/>
                        </Grid>
                        <Grid sx={styles.pagination} item lg={12} md={12} sm={12}>
                            <PokemonPagination getCurrentPage={(page) => {setCurrentPage(page)}}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={7} md={6} sm={7}>
                    <Grid container sx={styles.rightGrid}>
                        <PokemonDetails id={currentPokemon} />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;