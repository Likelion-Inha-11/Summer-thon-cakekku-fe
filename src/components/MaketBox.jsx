import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiSortZA } from 'react-icons/bi';
import StarMarketbox from './Star/StarMaketbox';

const FirstBox = styled.div`
  height: 140px;
  width:  330px;
  opacity: 90%;
  background-color: #ffffff;
  border-radius: 30px;
  margin: 0 auto;
  filter: drop-shadow(0px 10px 24px rgba(99, 99, 99, 0.15));
  overflow-x: hidden;
`

const ImgBox = styled.div`
  height: 140px;
  width:  140px;
  border-radius: 30px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`

const Marketname = styled.p`
  margin: 0;
  position: absolute;
  left: 53%;
  top: 6%;
  color: #FF9494;
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
`

const Marketaddres = styled.p`
  margin: 0;
  position: absolute;
  left: 53%;
  top: 22%;
  color: #747272;
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;
`

const HashBox = styled.div`
  display: inline-flex;
  align-items: center;
  background: #FFE3E1;
  border-radius: 10px;
  padding: 0 8px;
  margin-right: 8px;
  flex-shrink: 0;
  height: 21.847px;
  padding: 2px;
  margin: 0;
  position: absolute;
  left: 75%;
  top: 40%;
`;

const HashBox2 = styled.div`
  display: inline-flex;
  align-items: center;
  background: #FFE3E1;
  border-radius: 10px;
  margin-right: 8px;
  flex-shrink: 0;
  height: 21.847px;
  padding: 2px;
  margin-right: 15px;
  position: absolute;
  left: 53%;
  top: 40%;
`;

const Hashtag = styled.p`
  color: #747272;
  text-align: center;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const MarketPrice = styled.p`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  margin: 0;
  position: absolute;
  left: 53%;
  top: 80%;
`

const Container = styled.div`
  margin: 0 auto;
  margin-top: ${(props) => (props.Top ? props.Top : "30px")};
  margin-bottom: ${(props) => (props.Bottom ? props.Bottom : "30px")};
  display: flex;
  justify-content: center;
  align-items: center;
`

const MarketBox = (props) => {
  const { index, sort } = props;
  const [infor, setInfor] = useState([]);
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    axios
      .get(`https://cakekku.shop/marketlist/?order=${sort}`)
      .then((res) => {
        console.log(res);
        setInfor(res.data);
        calcStarRates(res.data[index].store_average_score);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [sort]);

  const calcStarRates = (avrRate) => {
    let AVR_RATE = avrRate * 20;
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (AVR_RATE * 70) / 100;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    setRatesResArr(tempStarRatesArr);
  };

  if (infor.length === 0) {
    return null;
  }

  const marketData = infor[index];
  const imageUrl = `https://cakekku.shop${marketData.store_thumbnail_image}`;

 

  return (
    <>
      <Link to={`/marketdetail/${marketData.store_id}`}>
        <Container Top={props.Top} Bottom={props.Bottom}>
          <FirstBox Firsttop={props.Firsttop}>
            <ImgBox imageUrl={imageUrl}>
              <Marketname>{marketData.store_name}</Marketname>
              <Marketaddres>{marketData.store_address}</Marketaddres>

              <HashBox>
                <Hashtag>{marketData.store_hashtag_1}</Hashtag>
              </HashBox>
              <HashBox2>
                <Hashtag>{marketData.store_hashtag_2}</Hashtag>
              </HashBox2>
            </ImgBox>
            <MarketPrice>
              기본 {marketData.store_lower_price} ~ {marketData.store_higher_price}
            </MarketPrice>
            별점수{marketData.store_average_score}
            <StarMarketbox avrRate={ratesResArr} />
          </FirstBox>
        </Container>
      </Link>
    </>
  );
};

export default MarketBox;
