import 'react-toastify/dist/ReactToastify.css'

import { CustomToastify } from './CustomToast.styled'

const CustomToast = () => {
  return (
    <CustomToastify
      position="top-left"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default CustomToast
