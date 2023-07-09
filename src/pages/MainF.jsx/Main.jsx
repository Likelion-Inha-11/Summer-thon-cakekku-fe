import React from 'react';
import styled from  'styled-components'
import Footer from '../../components/Footer';
import MainTop from './MainTop';
import Layout from '../../components/Layout';
import MarketBox from '../../components/MaketBox';
import Head from '../../components/Heads/Head';
import Wrapper from '../../components/Wrapper';
import TopWrapper from '../../components/TopWrapper';
const Main = () => {
    return ( 
        <>
        <Layout color = '#FFF5E4'>
        <Head></Head>
        <TopWrapper>
        <MainTop></MainTop>
        </TopWrapper>
        <Wrapper>
        <MarketBox></MarketBox>
        <MarketBox></MarketBox>
        <MarketBox></MarketBox>
        <MarketBox></MarketBox>
        <MarketBox></MarketBox>
        <MarketBox></MarketBox>
        </Wrapper>
        <Footer></Footer>
        </Layout>
        </>
    );
};

export default Main;                            