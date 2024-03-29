import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

const Title = styled.h4`
  font-weight: 150;
  text-align: center;
  margin-bottom: 15px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
  margin-top: 15px;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 330px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

export const Product = ({ item, navigateToItemPage }) => {
  return (
    <Container id={item?._id}>
      <Title>{item?.title}</Title>
      <Image src={item?.img} />
      <Info>
        <Icon>
          <BsSearch onClick={() => navigateToItemPage(item?._id)} />
        </Icon>
        <Icon>
          <AiOutlineHeart style={{ fontSize: 25 }} />
        </Icon>
      </Info>
      <Price>£{item?.price}</Price>
    </Container>
  );
};
