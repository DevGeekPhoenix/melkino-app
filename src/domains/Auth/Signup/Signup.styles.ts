import { styled } from '@/theme'

export const SignupForm = styled('form')(
  ({ theme: {} }) => `
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 320px;
  margin: auto;
  `,
)
