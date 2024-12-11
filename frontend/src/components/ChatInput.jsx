import { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { Image, Send } from 'lucide-react';
import toast from 'react-hot-toast';
export const ChatInput = () => {
  const [image, setImage] = useState(null)
  const [text, setText] = useState('');
  const fileInputRef = useRef(null);
  const { sendMessage, isSendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn ảnh");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result)
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = ""
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!text.trim() && !image) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: image
      });

      setText("");
      setImage(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>
      <div className='w-full pr-1 '>
        {image && (
          <div className='mb-3 flex items-center gap-2'>
            <div className='relative'>
              <img
                src={image}
                alt="image"
                className='w-20 h-20 object-cover rounded-lg border boder-zinc-700'
              />
              <button
                className='absolute -top-1.5 -right-1.5 w-5 h-5 
                    rounded-full bg-base-300 flex items-center 
                    justify-center'
                type='button'
                onClick={removeImage}
              >X</button>
            </div>
          </div>
        )}
        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
          <div className='flex-1 flex gap-2'>
            <input
              type="text"
              placeholder='Nhập...'
              value={text}
              className='w-full input input-bordered rounded-lg input-sm sm:input-md sm:text-base ml-1'
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="file"
              accept='image/*'
              className='hidden'
              ref={fileInputRef}
              onChange={handleImageChange}


            />
            <button
              type='button'
              className={`hidden sm:flex btn btn-circle
                ${image ? "text-emerald-500" : "text-zinc-400"}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={20} />
            </button>
          </div>
          <button
            type='submit'
            className='btn btn-md btn-circle'
            disabled={isSendMessage || !text.trim() && !image}
          >
            <Send size={22} />
          </button>
        </form>
      </div>
    </>
  )
}
