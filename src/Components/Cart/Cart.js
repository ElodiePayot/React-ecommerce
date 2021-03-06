import React from 'react';
import {Container, Typography, Grid, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

function Cart({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) {
    const classes = useStyles();

    const EmptyCart = () => {
        return(
            <Typography variant="subtitle1">
                You have no items in your cart
                <Link to="/" className={classes.link}>Start adding articles</Link>
            </Typography>
        )

    }

    const FilledCart = () => {
        return(
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" variant="contained" color="secondary" onClick={handleEmptyCart}>
                            Empty Cart
                        </Button>
                        <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" variant="contained" color="primary">
                            Checkout Cart
                        </Button>
                    </div>
                </div>
            </>
        )
        
    }

    if (!cart.line_items) {
        return 'Loading...'
    }

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3">
                Your shopping Cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart;
