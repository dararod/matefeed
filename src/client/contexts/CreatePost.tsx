import { createContext, useState } from 'react';

export type CreatePostContextValue = {
  isModalOpen: boolean;
  openModal(): void;
  closeModal(): void;
};

const initialContextValue: CreatePostContextValue = {
  isModalOpen: false,
  openModal: null,
  closeModal: null,
};

export const CreatePostContext =
  createContext<CreatePostContextValue>(initialContextValue);

CreatePostContext.displayName = 'CreatePostContext';

export function CreatePostContextProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [isModalOpen, setModalOpen] = useState<boolean>(
    initialContextValue.isModalOpen,
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <CreatePostContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
}
