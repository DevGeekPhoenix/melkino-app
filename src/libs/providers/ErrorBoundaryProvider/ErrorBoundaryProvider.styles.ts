import { styled } from "@/theme";
import { Grid, Typography } from "@mui/material";

export const ErrorBoundaryContainer = styled("section")(
  ({ theme: { spacing } }) => `
  flex: 1;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  .logo {
    transform: scale(1.4);
    margin-bottom: ${spacing(12)};
  }
`
);

export const ErrorBoundaryText = styled(Typography)(
  ({ theme: { spacing, breakpoints } }) => `
  font-size: 32px;
  ${[breakpoints.down("md")]} {
    margin-top: ${spacing(3)};
  };
`
);

export const ErrorBoundaryLinkContainer = styled(Grid)(
  ({ theme: { spacing } }) => `
  margin-top: ${spacing(5)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button.button {
    width: 100%;
  }
`
);

export const ErrorBoundaryLink = styled("span")(
  ({ theme: { spacing } }) => `
  display: inline-block;
  margin-top: ${spacing(5)};
`
);
