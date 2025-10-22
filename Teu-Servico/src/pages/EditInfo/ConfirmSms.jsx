import React, {useState, useRef} from 'react';
import {FaPhoneAlt} from "react-icons/fa";

export default function ConfirmSms() {

    const [code, setCode] = useState(["", "", "", "", ""]);
    const inputsRef = useRef([]);
    const [error, setError] = useState("");

    function handleChange(value, index) {

        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setError("");


        if (value && index < 4) {
            inputsRef.current[index + 1].focus();
        }

    };

    function handleKeyDown(event, index) {
        if (event.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    function confirmCode() {
        if (code.some((value) => value === "")) {
            setError("Por favor, insira o código de confirmação.");
            return;
        }

        alert("code: " + code.join(''));
        setCode(["", "", "", "", ""])
    }

    function resendCode() {
        console.log("Reenviar");
    }

    return (
        <section className='flex justify-center items-center mt-7'>
            <div className='flex flex-col items-center w-full max-w-xs'>
                <div>
                    <FaPhoneAlt size={60} color='#F69027' />
                </div>
                <div>
                    <h2 className='text-[#000000] mt-4 font-bold'>Confirme seu  celular</h2>
                </div>
                <div className='mt-10 text-center'>
                    <h3 className='font-semibold'>
                        Enviamos um código para seu celular cadastrado. 
                        Digite abaixo para confirmar.
                    </h3>
                </div>
                <div className='flex gap-7 justify-center mt-10'>
                    {code.map((value, index) => (
                        <input
                            type="text"
                            key={index}
                            ref={(element) => (inputsRef.current[index] = element)}
                            maxLength={1}
                            value={value}
                            onChange={(event) => handleChange(event.target.value, index)}
                            onKeyDown={(event) => handleKeyDown(event, index)}
                            className="w-12 h-12 text-center bg-[#D9D9D9] border-2 border-[#D9D9D9]
                          focus:outline-none
                          rounded text-xl focus:border-[#F69027] outline-none"
                        />
                    ))}
                </div>

                {error && (
                    <span className="text-red-500 text-[12px] mt-3 text-center">
                        {error}
                    </span>
                )}

                <div className='mt-8'>
                    <button className='bg-[#F69027] w-[180px] h-[50px]
                    cursor-pointer rounded-[8px] text-black font-bold
                    hover:bg-[#fa820a]'
                        onClick={confirmCode}
                    >Confirmar</button>
                </div>

                <div className='mt-4'>
                    <button className='text-black cursor-pointer font-semibold
                     hover:text-cyan-900'
                        onClick={resendCode}
                    >Reenviar código</button>
                </div>

            </div>
        </section>
    )
}
