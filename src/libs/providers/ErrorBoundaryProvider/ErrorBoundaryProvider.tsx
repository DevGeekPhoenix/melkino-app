import { Component, ErrorInfo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type {
  ErrorBoundaryProviderProps,
  ErrorBoundaryProviderState,
  ErrorPageProps,
} from "./ErrorBoundaryProvider.types";
import {
  ErrorBoundaryContainer,
  ErrorBoundaryLink,
  ErrorBoundaryLinkContainer,
  ErrorBoundaryText,
} from "./ErrorBoundaryProvider.styles";
import { Button, Typography } from "@mui/material";

const ErrorPage = ({ handle }: ErrorPageProps) => {
  const { reload } = useRouter();

  const handleReloadPage = useCallback(() => reload(), []);
  const handleResetError = useCallback(() => handle && handle(), [handle]);

  return (
    <ErrorBoundaryContainer>
      <ErrorBoundaryText variant="h1">مشکلی پیش آمده است!!!</ErrorBoundaryText>

      <ErrorBoundaryLinkContainer
        item
        textAlign="center"
        onClick={handleResetError}
      >
        <Button className="button" onClick={handleReloadPage}>
          <Typography variant="h4">بارگذاری مجدد صفحه</Typography>
        </Button>

        <ErrorBoundaryLink>
          <Link legacyBehavior prefetch={false} href={"/"}>
            <a>
              <Typography variant="h4">بازگشت به خانه</Typography>
            </a>
          </Link>
        </ErrorBoundaryLink>
      </ErrorBoundaryLinkContainer>
    </ErrorBoundaryContainer>
  );
};

class ErrorBoundaryProvider extends Component<
  ErrorBoundaryProviderProps,
  ErrorBoundaryProviderState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryProviderState {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ error, errorInfo });
  }

  handle = () => this.setState({ hasError: false });

  render() {
    return this.state.hasError ? (
      <ErrorPage handle={this.handle} />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundaryProvider;
