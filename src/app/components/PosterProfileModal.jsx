
import Modal from 'react-modal'
import PosterProfileDetails from './PosterProfileDetails'

export default function PosterProfileModal({ open, setOpen, posterId }) {
  return (
    <div className=''>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          overlayClassName={'fixed inset-0 bg-black/20'}
          ariaHideApp={false}
          className='max-w-2xl w-[70%] max-h-[80%] absolute top-40 left-[50%] translate-x-[-50%] border-2 border-gray-200 rounded-2xl shadow-md outline-none overflow-y-scroll'
        >
          <PosterProfileDetails posterId={posterId} />
        </Modal>
      )}
    </div>
  )
}