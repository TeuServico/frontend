import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";

export default function ChangeEmail() {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorNewEmail, setErrorNewEmail] = useState(false);


  function saveNewEmail(event) {
    event.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let hasError = false;

   if(!emailRegex.test(email)){
    setErrorEmail(true);
    hasError = true
   }
   else {
    setErrorEmail(false);
   }

   if(!emailRegex.test(newEmail)){
    setErrorNewEmail(true);
    hasError = true
   }
   else {
    setErrorNewEmail(false);
   }

   if(hasError) return;

    console.log(email)
    console.log(newEmail);

    setEmail("");
    setNewEmail("");

  }

  return (
    <section className='flex justify-center items-center mt-5'>
      <div className='flex flex-col items-center w-full max-w-xs'>
        <div>
          <MdEmail size={60} color='#F69027' />
        </div>
        <div>
          <h2 className='text-[#000000] mt-2 font-semibold'>Alterar E-mail</h2>
        </div>

        <div className='mt-3'>
          <form className='flex flex-col'>
            <label htmlFor="email">E-mail atual</label>
            <input type="email" className={`bg-[#D9D9D9] w-[300px] h-[40px] pl-3 mt-2 mb-2
                     border-2 border-gray-300 focus:outline-none focus:border-[#F69027]
                     rounded 
                     ${errorEmail ? "border-red-500 focus:border-red-500"
                : "focus:border-[#F69027]"}`}
              placeholder='atual@gmail.com'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            /><br />

            {errorEmail && (
              <span className="text-red-500 text-[12px]">
                E-mail inválido
              </span>
            )}

            <label htmlFor="newEmail">Novo e-mail</label>
            <input type="email" className={`bg-[#D9D9D9] w-[300px] h-[40px] pl-3 mt-2 mb-2
                     border-2 border-gray-300 focus:outline-none focus:border-[#F69027]
                     rounded
                     ${errorNewEmail ? "border-red-500 focus:border-red-500"
                : "focus:border-[#F69027]"} }`}

              value={newEmail}
              placeholder='novo@gmail.com'
              onChange={(event) => setNewEmail(event.target.value)}
            />

             {errorNewEmail && (
              <span className="text-red-500 text-[12px]">
                E-mail inválido
              </span>
            )}

            <button type='submit' className='w-[180px] h-[50px]
                    bg-[#F69027] mt-2 text-black rounded-[8px] cursor-pointer
                    hover:bg-[#fa820a]'
              onClick={saveNewEmail}
            >Salvar Novo E-mail
            </button>
          </form>
          <div className='mt-10 text-center'>
            <p
              className='font-bold text-black text-[15px]'
            >Enviaremos um link de confirmação para seu novo e-mail</p>
          </div>
        </div>

      </div>
    </section>
  )
}
