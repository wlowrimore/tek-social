import { HiX } from 'react-icons/hi'
import Modal from 'react-modal'
export default function ImageModal({ open, setOpen, src }) {
  return (
    <div className='bg-white'>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          overlayClassName={'fixed inset-0 bg-black/80'}
          ariaHideApp={false}
          className='max-w-4xl w-[90%] max-h-[80%] absolute top-40 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-y-scroll'
        >
          <div className='absolute right-2 top-1 p-2'>
            <button
              onClick={() => setOpen(false)}
              className='bg-transarent p-1 rounded-full hover:bg-primaryRed transition duration-300'
            ><HiX className='text-white text-2xl' /></button>
          </div>
          <img src={src} alt="post image" className='w-full h-full object-cover' loading='lazy' />
        </Modal>
      )}
    </div>
  )
}