import UserProfileDetails from './UserProfileDetails'
import Modal from 'react-modal'

export default function UserProfileModal({ open, setOpen }) {

  return (
    <div className=''>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          overlayClassName={'fixed inset-0 bg-black/80'}
          ariaHideApp={false}
          className='max-w-2xl w-[70%] max-h-[80%] absolute top-40 left-[50%] translate-x-[-50%] bg-neutral-50 border-2 border-gray-200 rounded-xl shadow-md outline-none overflow-y-scroll'
        >
          <UserProfileDetails />
        </Modal>
      )}
    </div>
  )
}
