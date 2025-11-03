import React, { useState, useEffect } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { getClientePerfil } from '../../services/api';

export default function ChangePhone() {
  const [currentPhone, setCurrentPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await getClientePerfil();
        setCurrentPhone(response.telefone || '');
      } catch (error) {
        console.error('Erro ao buscar telefone do usuário:', error);
      }
    };

    fetchPhone();
  }, []);

  function saveNewPhone(event) {
    event.preventDefault();

    const phoneRegex = /^(?:\+55\s?)?(?:55\s?)?\(\d{2}\)\s\d{5}-\d{4}$/;

    if (!phoneRegex.test(newPhone)) {
      setError(true);
      return;

    }
    else {
      setError(false);
    }

    console.log(newPhone);

    setNewPhone("");
  }
  return (
    <section className='flex justify-center items-center mt-8'>

      <div className='flex flex-col items-center w-full max-w-xs'>
        <div>
          <FaPhoneAlt size={60} color="#F69027" />
        </div>
        <div>
          <h2 className='text-[#000000] mt-5 font-semibold'>Alterar Celular</h2>
        </div>
        <div className='mt-3'>
          <form>
            <label htmlFor="currentPhone" className='text-black text-[15px]'>Telefone Atual</label><br />
            <input type="tel" className={`bg-[#D9D9D9] w-[300px] h-[40px] pl-3 mt-2 mb-2
                     border-2 border-gray-300 focus:outline-none focus:border-[#F69027]
                     rounded cursor-not-allowed`}
              value={currentPhone}
              disabled
            /><br />

            <label htmlFor="newPhone" className='text-black text-[15px]'>Novo Telefone</label><br />
            <input type="tel" className={`bg-[#D9D9D9] w-[300px] h-[40px] pl-3 mt-2 mb-2
                     border-2 border-gray-300 focus:outline-none focus:border-[#F69027]
                     rounded
                     ${error ? "border-red-500 focus:border-red-500"
                : "focus:border-[#F69027]"} }`}
              placeholder='+55 (83) 99999-9999'
              value={newPhone}
              onChange={(event) => setNewPhone(event.target.value)}
            /><br />

            {error && (
              <span className="text-red-500 text-[12px]">
                Formato de telefone inválido. Use +55 (XX) XXXXX-XXXX
              </span>
            )}

            <button type='submit' className='w-[180px] h-[50px]
                    bg-[#F69027] mt-2 text-black rounded-[8px] cursor-pointer
                    hover:bg-[#fa820a]'
              onClick={saveNewPhone}>
              Salvar Novo Celular
            </button>
          </form>

          <div className='mt-15 text-center'>
            <p
              className='font-bold text-black text-[15px]'
            >Enviaremos um link de confirmação para seu novo celular</p>
          </div>

        </div>

      </div>

    </section>
  )
}
