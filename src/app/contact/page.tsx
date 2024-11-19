'use client';
import ContactFormDisplay from '@/components/pages/contact/ContactFormDisplay';
import React from 'react';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
// import Button from '@/components/ui/Button';
// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useSearchParams } from 'next/navigation';
// import { toast } from 'react-toastify';
// import { useCreateData } from '@/hooks/useApi';
// import { CONTACT_API_ENDPOINTS } from '@/lib/constants/_apiEndpoints';

// const validationSchema = Yup.object().shape({
//   first_name: Yup.string().required('First Name is required'),
//   last_name: Yup.string().required('Last Name is required'),
//   email: Yup.string()
//     .email('Invalid email format')
//     .required('Email is required'),
//   phone_number: Yup.string()
//     .matches(/^[0-9]+$/, 'Phone number must be digits')
//     .required('Phone Number is required'),
//   subject: Yup.string().required('Select a subject'),
//   message: Yup.string().required('Message is required'),
// });

export default function Page() {
  // const { mutate, isPending } = useCreateData(
  //   CONTACT_API_ENDPOINTS.CONTACT,
  //   'contact'
  // );

  // const searchParams = useSearchParams();
  // const name = searchParams.get('name');
  // const model = searchParams.get('model');
  // const description = searchParams.get('description');

  // const {
  //   register,
  //   reset,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(validationSchema),
  // });

  // useEffect(() => {
  //   if (name && model && description) {
  //     setValue(
  //       'message',
  //       `Car Inquiry:\nName: ${name}\nModel: ${model}\nDescription: ${description}`
  //     );
  //   }
  // }, [name, model, description, setValue]);

  // const onSubmit = (data) => {
  //   mutate(data, {
  //     onSuccess: () => {
  //       toast.success('Message sent successfully!');
  //       reset();
  //     },
  //     onError: (error) => {
  //       console.error(error);
  //       toast.error('Failed to send message. Please try again.');
  //     },
  //   });
  // };

  return (
    <div className="flex w-full items-center  p-10">
       <div
        className="w-full max-w-xl  p-8 h-[75vh] text-white relative bg-cover bg-center rounded-t-lg "
        style={{ backgroundImage: "url('/speedmeter.jpeg')" }}
      >
        <div className="absolute inset-0 rounded-t-lg bg-black opacity-85"></div>
        <div className="relative z-10">
          <div>
            <h2 className="text-lg text-white font-extrabold mb-4">
              Contact Information
            </h2>
            <p>Say something to start a live chat!</p>
          </div>

          <div className="mt-20">
            <div className="flex items-center space-x-4 p-4 pl-0">
              <BiSolidPhoneCall />
              <p>+22 77812992</p>
            </div>

            <div className="flex items-center space-x-4 p-4 pl-0">
              <IoMdMail />
              <p>agro-life@mail.com</p>
            </div>

            <div className="flex items-center space-x-4 p-4 pl-0">
              <FaLocationDot />
              <p>Ghana</p>
            </div>
          </div>
        </div>
      </div>

      <ContactFormDisplay />
    </div>
  
  );
}
