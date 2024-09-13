import { styled } from "..";

export const ProductContainer = styled('main', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'stretch',
    gap: '4rem',

    maxWidth: 1180,
    margin: '0 auto',
})

export const ImageContainer = styled('div', {
    
    borderRadius: "8px",
    padding: '0.25rem',
    width: '100%',
    maxWidth: 576,
    height: 656,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)}',

    img: {
        objectFit: 'cover',
    }
})

export const ProdutDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    h1: {
        fontSize: '$2xl',
        color: '$gray300',
    },

    span: {
        marginTop: '1rem',
        display: 'block',
        fontSize: '$2xl',
        color: '$gray300',
    },

    p: {
        marginTop: '2.5rem',
        fontSize: '$md',
        lineHeight: '1.6',
        color: '$gray300',
    },

    button: {
        marginTop: 'auto',
        backgroundColor: '$green500',
        border: 0,
        borderRadius: 8,
        padding: '1.25rem',
        color: '$white',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        fontSize: '$md',

        '&:hover': {
            backgroundColor: '$green300',
        }
    },
})