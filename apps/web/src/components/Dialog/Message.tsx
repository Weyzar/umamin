import React from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { nanoid } from 'nanoid';

import { useLogEvent } from '../../hooks';
import { DialogContainer, DialogContainerProps } from '.';
import { useInboxContext } from '@/contexts/InboxContext';

interface Props extends DialogContainerProps {
  data: {
    receiverMsg: string,
    content: string
  };
}

export const MessageDialog = ({
  data,
  setIsOpen,
  ...rest
}: Props) => {
  const { user } = useInboxContext();
  const triggerEvent = useLogEvent();

  const saveImage = async () => {
    const imgUrl = await toPng(document.getElementById('card-img')!);
    download(imgUrl, `${user?.username}_${nanoid(5)}.png`);
  };

  return (
    <DialogContainer setIsOpen={setIsOpen} className='mt-12 lg:mt-32' {...rest}>
      <div id='card-img' className='bg-secondary-300 flex flex-col p-4'>
        <p className='font-syneExtrabold mb-2 self-center text-xl'>
          <span className='text-primary-200'>umamin</span>.link
        </p>

        <div className='msg-card overflow-hidden text-left'>
          <div className='receive chat-p bg-secondary-100 before:bg-secondary-100 after:bg-secondary-200 max-w-full px-6 py-5 text-lg text-white'>
            <p className='reply font-interMedium mb-3'>{data.receiverMsg}</p>
            <p>{data.content}</p>
          </div>
        </div>
      </div>

      <div className='flex justify-between px-4 lg:w-full'>
        <button
          onClick={() => setIsOpen(false)}
          type='button'
          className='hover:underline'
        >
          &larr; Go Back
        </button>

        <button
          className='primary-btn'
          type='button'
          onClick={() => {
            saveImage();
            triggerEvent('save_image');
          }}
        >
          Download
        </button>
      </div>
    </DialogContainer>
  );
};
