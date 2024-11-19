import React from 'react'


export default function ContactFormDisplay({}) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 xl:ml-10">
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-12"
    >
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          // {...register('first_name')}
          className="border-b border-gray-600 focus:outline-none focus:border-blue-500 w-full py-2"
          placeholder=" "
        />
        {/* {errors.first_name && (
          <p className="text-red-500 text-sm">
            {`${errors.first_name.message}`}
          </p>
        )} */}
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          // {...register('last_name')}
          className="border-b border-gray-600 focus:outline-none focus:border-blue-500 w-full py-2"
          placeholder="Doe"
        />
        {/* {errors.last_name && (
          <p className="text-red-500 text-sm">{`${errors.last_name.message}`}</p>
        )} */}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          // {...register('email')}
          className="border-b border-gray-600 focus:outline-none focus:border-blue-500 w-full py-2"
          placeholder=""
        />
        {/* {errors.email && (
          <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>
        )} */}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="phone"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          // {...register('phone_number')}
          className="border-b border-gray-600 focus:outline-none focus:border-blue-500 w-full py-2"
          placeholder="+1012 3456 789"
        />
        {/* {errors.phone_number && (
          <p className="text-red-500 text-sm">
            {`${errors.phone_number.message}`}
          </p>
        )} */}
      </div>

     
      <div className="col-span-2 mt-10">
        <label htmlFor="message" className="block font-medium text-gray-500">
          Message
        </label>
        <textarea
          id="message"
          // {...register('message')}
          className="border-b border-gray-600 focus:outline-none focus:border-blue-500 w-full py-2"
          placeholder="Write your message..."
        />
        {/* {errors.message && (
          <p className="text-red-500 text-sm">{`${errors.message.message}`}</p>
        )} */}
      </div>

      <div className="col-span-2 flex justify-end">
        {/* <Button
          type="submit"
          isDisabled={isPending}
          isLoading={isPending}
          title=" Send Message"
          className="bg-yellow-500 mt-8 text-white rounded px-7 py-2 hover:bg-yellow-600"
          id="send_button"
        /> */}
      </div>
    </form>
  </div>  )
}