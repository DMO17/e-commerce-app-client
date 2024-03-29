import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AppProvider";
import { mobile } from "../../responsive";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", marginTop: "15px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

export const ProductInfo = ({ product, productId }) => {
  const { user, accessToken, productsInCart } = useAuth();
  const navigate = useNavigate();

  const [size, setSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);

  const checkIfProductInCart = (cartProducts) =>
    cartProducts?.some(
      (product) =>
        product?.productId?._id === productId && product?.size === size
    );

  const itExists = checkIfProductInCart(productsInCart);

  const addProductToCart = async () => {
    if (user) {
      if (!itExists) {
        const { data } = await axios.put(
          `https://shop-fun-ecommerce-api.herokuapp.com/api/cart/${user?._id}`,
          {
            size,
            productId,
            quantity,
          },
          {
            headers: { authorization: `Bearer ${accessToken}` },
          }
        );
        data.success && navigate("../cart", { replace: true });
      }
    } else navigate("../login", { replace: true });
  };

  return (
    <Wrapper>
      <ImgContainer>
        <Image src={product?.img} />
      </ImgContainer>
      <InfoContainer>
        <Title>{product?.title}</Title>
        <Desc>{product?.description}</Desc>
        <Price>$ {product?.price}</Price>
        {product?.inStock ? (
          <>
            {" "}
            <FilterContainer>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                >
                  <FilterSizeOption>XS</FilterSizeOption>
                  <FilterSizeOption>S</FilterSizeOption>
                  <FilterSizeOption>M</FilterSizeOption>
                  <FilterSizeOption>L</FilterSizeOption>
                  <FilterSizeOption>XL</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <AiOutlineMinus
                  style={{ cursor: "pointer", fontSize: 20 }}
                  onClick={() => setQuantity((prevState) => prevState - 1)}
                />
                <Amount>{quantity}</Amount>
                <AiOutlinePlus
                  style={{ cursor: "pointer", fontSize: 20 }}
                  onClick={() => setQuantity((prevState) => prevState + 1)}
                />
              </AmountContainer>
              <Button onClick={addProductToCart}>ADD TO CART</Button>
            </AddContainer>
          </>
        ) : (
          <Title>PRODUCT IS OUT OF STOCK</Title>
        )}

        {itExists && (
          <h4 style={{ marginTop: 5 }}>
            Product with this size:{size} is in your cart
          </h4>
        )}
      </InfoContainer>
    </Wrapper>
  );
};
