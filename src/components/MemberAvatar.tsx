import styled, { css } from "styled-components";

export const MemberAvatar = ({
  url,
  alt,
  width,
}: {
  url: string;
  width: number;
  alt: string;
}) => {
  return <StyledImg src={url} alt={alt} $width={width} />;
};

const StyledImg = styled.img<{ $width: number }>`
  border-radius: 50%;
  object-fit: cover;

  ${({ $width }) => {
    return css`
      width: ${$width}px;
      height: ${$width}px;
    `;
  }}
`;
