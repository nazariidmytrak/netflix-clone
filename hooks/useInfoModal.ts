import { create } from 'zustand';
import { ModalStoreProps } from '@/interfaces/modalStore';

const useInfoModal = create<ModalStoreProps>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModal;
