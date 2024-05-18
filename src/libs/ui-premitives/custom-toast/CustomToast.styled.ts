import { styled } from '@/theme'
import { ToastContainer } from 'react-toastify'

export const CustomToastify = styled(ToastContainer)(
  () => `
  &.Toastify__toast-container {
    z-index: 100001;
    
  }
  .Toastify__toast {

  }
  .Toastify__toast-body {}
  .Toastify__progress-bar {}
  .Toastify__toast-theme--colored.Toastify__toast--default {

  }
  .Toastify__toast-theme--colored.Toastify__toast--info {
  }
  .Toastify__toast-theme--colored.Toastify__toast--success {
  }
  .Toastify__toast-theme--colored.Toastify__toast--warning {
  }
  .Toastify__toast--error {}
`,
)
