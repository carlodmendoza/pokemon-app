import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Pagination, Button } from '@mui/material';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paginationItem: {
        '& .MuiPaginationItem-root': {
            color: 'white',
            bgcolor: 'background.main',
            '&.Mui-selected': {
                bgcolor: 'primary.main'
            },
        }
    },
    button: {
        color: 'white',
        bgcolor: 'background.main',
        '&.Mui-disabled': {
            color: 'dimgray'
        }
    }
}

function PokemonPagination(props) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        props.getCurrentPage(currentPage);
        // eslint-disable-next-line 
    }, [currentPage])

    const handleClickPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(1);
        }
    }

    const handleClickNext = () => {
        if (currentPage < 16) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(16);
        }
    }

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    }

    return (
        <Grid sx={styles.container} container>
            <Grid item lg={7} md={7} sm={7}>
                <Grid sx={styles.container} container>
                    <Pagination sx={styles.paginationItem} count={16} shape="rounded" size="medium" page={currentPage} hidePrevButton hideNextButton 
                        onChange={handleChangePage}/>
                </Grid>
            </Grid>
            <Grid item lg={1} md={1} sm={1}></Grid>
            <Grid item lg={4} md={4} sm={4}>
                <Button sx={{...styles.button, mr:'10px'}} variant="contained" size="small" disabled={currentPage === 1}
                    onClick={handleClickPrev}>
                    Prev
                </Button>
                <Button sx={styles.button} variant="contained" size="small" disabled={currentPage === 16}
                    onClick={handleClickNext}>
                    Next
                </Button>
            </Grid>
        </Grid>
    )
}

PokemonPagination.propTypes = {
    getCurrentPage: PropTypes.func
}

export default PokemonPagination;