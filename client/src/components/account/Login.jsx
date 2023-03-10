import React, { useState } from 'react'
import { Box, TextField, Button, styled, Typography } from '@mui/material'


const Component = styled(Box)`
width:400px;
margin:auto;
min-height:40vh;
box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.4);  
`

const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
padding:25px 35px;
display:flex;
flex-direction:column;
flex:1;  
& > div, & > button ,& >P{
    margin-top:20px;
}
`

const LoginButton = styled(Button)`
text-transform:none;
background:#FB641B;
color:#fff;
height:48px,
border-radius:2px
`
const SignUpButton = styled(Button)`
text-transform:none;
background-color: #fff;
color:#2874f0;
height:48px,
border-radius:2px
box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);  
`

const Text = styled(Typography)`
color:#878787;
font-size:18px;
`

const Login = () => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount] = useState('login')

    const toggleSignup =() =>{
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup'); 
    }


    return (
        <Component>
            <Box>
                <Image src={imageURL} alt='login' />
                {
                    account === 'login' ?

                        <Wrapper>
                            <TextField variant='standard' label="Enter Username" />
                            <TextField variant='standard' label="Enter password" />
                            <LoginButton variant="contained">Login</LoginButton>
                            <Text style={{ textAlign: "center" }}>or</Text>
                            <SignUpButton onClick={() => toggleSignup()} >Register</SignUpButton>
                        </Wrapper>

                        :
                        <Wrapper>
                            <TextField variant='standard' label="Enter Name" />
                            <TextField variant='standard' label="Enter Username" />
                            <TextField variant='standard' label="Enter password" />
                            <LoginButton variant="contained">Register</LoginButton>
                            <Text style={{ textAlign: "center" }}>or</Text>
                            <SignUpButton onClick={() => toggleSignup()}>Already have account</SignUpButton>
                        </Wrapper>

                }
            </Box>
        </Component>
    )
}

export default Login